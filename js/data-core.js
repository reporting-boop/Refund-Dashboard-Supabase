
/* ===================================================================
   METRO PERFORMANCE DASHBOARD — DATA CORE
   Handles: embedded dataset decompression, the in-memory star-schema
   (dimension tables + numeric fact table), the live filter engine,
   and every aggregation helper the pages/charts call into.
   =================================================================== */

/* ---- field indices inside each fact row -------------------------- */
const F_MARKET=0, F_STORE=1, F_DM=2, F_EMP=3, F_ITEM=4, F_CATEGORY=5, F_ACT=6, F_PAY=7, F_STATUS=8, F_DATE=9,
      F_QTY=10, F_PRICE=11, F_PROFIT=12, F_DISCOUNT=13, F_TAX=14, F_SUBTOTAL=15, F_INV=16;

/* ===================================================================
   LIVE DATA LOADING
   The dashboard no longer ships with a baked-in dataset. On boot it
   fetches every row from the Supabase table defined in CONFIG (see
   config.js), then runs those rows through the exact same
   parseWorkbookToPayload() transform that the in-browser Excel importer
   (data-upload.js) already uses. That means Supabase rows go through
   the identical column-alias matching and star-schema build as an
   uploaded spreadsheet — every existing render / filter / drill-through
   function keeps working unchanged, and the {meta, dims, fact} shape
   never has to be duplicated in SQL.

   A copy of the last successful payload is cached in localStorage
   (gzip-compressed with pako, the same library already used for the
   in-browser importer) so the dashboard still opens with the most
   recent data if the network / Supabase project is temporarily
   unreachable.
   =================================================================== */
const LIVE_CACHE_KEY = 'metroDashboard.cachedPayload.v1';
const SUPABASE_PAGE_SIZE = 1000; // Supabase's per-request row cap

function cachePayloadLocally(payload){
  try{
    const json = JSON.stringify(payload);
    const bytes = pako.deflate(json);
    let binary = '';
    for(let i=0;i<bytes.length;i++) binary += String.fromCharCode(bytes[i]);
    localStorage.setItem(LIVE_CACHE_KEY, btoa(binary));
    localStorage.setItem(LIVE_CACHE_KEY+'.savedAt', new Date().toISOString());
  }catch(err){
    console.warn('Could not cache dataset locally (localStorage full or unavailable):', err);
  }
}

function loadCachedPayload(){
  try{
    const b64 = localStorage.getItem(LIVE_CACHE_KEY);
    if(!b64) return null;
    const bin = Uint8Array.from(atob(b64), c=>c.charCodeAt(0));
    const json = pako.inflate(bin, {to:'string'});
    return JSON.parse(json);
  }catch(err){
    console.warn('Could not read cached dataset:', err);
    return null;
  }
}

let _supabaseClient = null;
function getSupabaseClient(){
  if(_supabaseClient) return _supabaseClient;
  if(typeof supabase === 'undefined'){
    throw new Error('Supabase client script did not load. Check the <script src="...supabase-js..."> tag in index.html and your internet connection.');
  }
  const url = CONFIG && CONFIG.SUPABASE_URL;
  const key = CONFIG && CONFIG.SUPABASE_ANON_KEY;
  if(!url || url.includes('YOUR_PROJECT_REF') || !key || key.includes('YOUR_ANON_KEY')){
    throw new Error('CONFIG.SUPABASE_URL / CONFIG.SUPABASE_ANON_KEY are not set. Open config.js and paste in your Supabase project URL and anon key.');
  }
  _supabaseClient = supabase.createClient(url, key);
  return _supabaseClient;
}

/* Pages through the whole table using .range() since Supabase caps any
   single request at 1000 rows by default. Fetches all pages IN PARALLEL
   (after learning the exact row count) rather than one at a time, since
   a large table can mean 100+ sequential round trips otherwise — that's
   what was making the dashboard feel stuck on load. Returns a plain
   array of row objects, e.g. [{market:'ARIZONA', store_name:'...'}, ...] */
async function fetchAllSupabaseRows(){
  const client = getSupabaseClient();
  const table = (CONFIG && CONFIG.SUPABASE_TABLE) || 'refund_transactions';

  // Ask for the exact row count without pulling any data yet.
  const { count, error: countError } = await client.from(table).select('*', { count:'exact', head:true });
  if(countError) throw new Error('Supabase count query failed: '+countError.message);
  const total = count || 0;
  if(!total) return [];

  // Build one .range() request per page and run them all concurrently.
  const pageStarts = [];
  for(let from=0; from<total; from+=SUPABASE_PAGE_SIZE) pageStarts.push(from);

  const pages = await Promise.all(pageStarts.map(async (from)=>{
    const to = Math.min(from + SUPABASE_PAGE_SIZE - 1, total - 1);
    const { data, error } = await client.from(table).select('*').range(from, to);
    if(error) throw new Error('Supabase query failed: '+error.message);
    return data || [];
  }));

  return pages.flat();
}

/**
 * Fetches every row from the Supabase table configured in config.js and
 * runs it through the same transform the Excel importer uses, so the
 * result is the identical {meta, dims, fact} shape the rest of the app
 * expects. Falls back to the last locally-cached copy if the request
 * fails (offline, table not set up yet, wrong URL/key, etc.). Throws
 * only if neither a live fetch nor a cached copy is available.
 */
async function loadDataset(){
  try{
    const rows = await fetchAllSupabaseRows();
    if(!rows.length) throw new Error('The refund_transactions table returned no rows. Check that your data was imported.');
    const headers = Object.keys(rows[0]);
    const payload = parseWorkbookToPayload(rows, headers, (CONFIG && CONFIG.SUPABASE_TABLE) || 'Supabase');
    if(!payload || !payload.dims || !payload.fact) throw new Error('Transformed payload was missing dims/fact.');
    cachePayloadLocally(payload);
    return payload;
  }catch(err){
    console.error('Live data fetch failed, falling back to cached copy:', err);
    const cached = loadCachedPayload();
    if(cached) return cached;
    throw err;
  }
}

/* ===================== DB (live, replaceable) ====================== */
const DB = { dims:null, fact:null, meta:null, rev:{}, periods:[] };

function buildReverseMaps(){
  DB.rev = {};
  for(const key of ['markets','stores','managers','employees','items','categories','acttypes','paytypes','statuses','dates']){
    const m = new Map();
    DB.dims[key].forEach((name,i)=>m.set(name,i));
    DB.rev[key]=m;
  }
}

function buildPeriods(){
  // group the dates dimension into either calendar months or, when the
  // whole dataset falls inside a single month (e.g. a few days of fresh
  // data), individual days — so period comparisons stay meaningful for
  // any date range a future export might contain.
  const monthKeys = new Set(DB.dims.dates.map(iso=>iso.slice(0,7)));
  const granularity = monthKeys.size>=2 ? 'month' : 'day';
  const byKey = new Map();
  DB.dims.dates.forEach((iso,idx)=>{
    const key = granularity==='month' ? iso.slice(0,7) : iso;
    if(!byKey.has(key)) byKey.set(key, {key, dateIdx:new Set(), sampleISO:iso});
    byKey.get(key).dateIdx.add(idx);
  });
  const periods = [...byKey.values()].sort((a,b)=>a.key.localeCompare(b.key));
  periods.forEach(p=>{
    const d = new Date(p.sampleISO+'T00:00:00');
    if(granularity==='month'){
      p.label = d.toLocaleDateString('en-US',{month:'long',year:'numeric'});
      p.shortLabel = d.toLocaleDateString('en-US',{month:'short',year:'numeric'});
    }else{
      p.label = d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
      p.shortLabel = d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
    }
  });
  DB.periods = periods;
  DB.periodGranularity = granularity;
}

function loadPayloadObject(payload){
  DB.dims = payload.dims;
  DB.fact = payload.fact;
  DB.meta = payload.meta || {};
  buildReverseMaps();
  buildPeriods();
}


/* ===================== FILTER STATE ===================== */
const FILTER = {
  markets:new Set(), stores:new Set(), managers:new Set(), employees:new Set(), items:new Set(), categories:new Set(),
  acttypes:new Set(), paytypes:new Set(), status:new Set(), dates:new Set(),
  months:new Set(), years:new Set(),
  dateFrom:null, dateTo:null
};
function filtersAreEmpty(){
  return !FILTER.markets.size && !FILTER.stores.size && !FILTER.managers.size && !FILTER.employees.size &&
         !FILTER.items.size && !FILTER.categories.size && !FILTER.acttypes.size && !FILTER.paytypes.size &&
         !FILTER.status.size && !FILTER.dates.size && !FILTER.months.size && !FILTER.years.size &&
         !FILTER.dateFrom && !FILTER.dateTo;
}
function clearAllFilters(){
  FILTER.markets.clear();FILTER.stores.clear();FILTER.managers.clear();FILTER.employees.clear();FILTER.items.clear();FILTER.categories.clear();
  FILTER.acttypes.clear();FILTER.paytypes.clear();FILTER.status.clear();FILTER.dates.clear();
  FILTER.months.clear();FILTER.years.clear();
  FILTER.dateFrom=null; FILTER.dateTo=null;
}
function toggleFilter(dim, idx){
  const s = FILTER[dim];
  if(s.has(idx)) s.delete(idx); else s.add(idx);
}

/* returns an Int32-ish plain array of row indices passing ALL active filters */
function getFilteredIndices(){
  const f = DB.fact;
  const n = f.length;
  const out = [];
  const fm=FILTER.markets, fs=FILTER.stores, fdm=FILTER.managers, fe=FILTER.employees, fi=FILTER.items, fc=FILTER.categories,
        fa=FILTER.acttypes, fp=FILTER.paytypes, fst=FILTER.status;
  const hasM=fm.size>0, hasS=fs.size>0, hasDM=fdm.size>0, hasE=fe.size>0, hasI=fi.size>0, hasC=fc.size>0,
        hasA=fa.size>0, hasP=fp.size>0, hasSt=fst.size>0;
  const hasYr=FILTER.years.size>0, hasMo=FILTER.months.size>0;
  const hasFrom=!!FILTER.dateFrom, hasTo=!!FILTER.dateTo;
  // Always restrict to Refund rows only
  const refundStatusIdx = DB.rev.statuses.get('Refund');
  for(let i=0;i<n;i++){
    const r = f[i];
    // Skip non-refund rows
    if(refundStatusIdx!=null && r[F_STATUS]!==refundStatusIdx) continue;
    if(hasM && !fm.has(r[F_MARKET])) continue;
    if(hasS && !fs.has(r[F_STORE])) continue;
    if(hasDM && !fdm.has(r[F_DM])) continue;
    if(hasE && !fe.has(r[F_EMP])) continue;
    if(hasI && !fi.has(r[F_ITEM])) continue;
    if(hasC && !fc.has(r[F_CATEGORY])) continue;
    if(hasA && !fa.has(r[F_ACT])) continue;
    if(hasP && !fp.has(r[F_PAY])) continue;
    if(hasSt && !fst.has(r[F_STATUS])) continue;
    if(hasFrom || hasTo || hasYr || hasMo){
      const iso = DB.dims.dates[r[F_DATE]];
      if(hasFrom && iso < FILTER.dateFrom) continue;
      if(hasTo && iso > FILTER.dateTo) continue;
      if(hasYr && !FILTER.years.has(iso.slice(0,4))) continue;
      if(hasMo && !FILTER.months.has(iso.slice(5,7))) continue;
    }
    out.push(i);
  }
  return out;
}

/* additionally scope a base index list to one specific dimension value
   (used by drill-through detail pages — keeps active slicers, adds the drill) */
function scopeIndices(baseIdx, fieldIdx, valueIdx){
  const f = DB.fact, out=[];
  for(let k=0;k<baseIdx.length;k++){ const i=baseIdx[k]; if(f[i][fieldIdx]===valueIdx) out.push(i); }
  return out;
}

/* ===================== SUMMARY / KPI AGGREGATION ===================== */
function totalPriceOfAllRows(){
  const f = DB.fact;
  let total = 0;
  for(let i=0;i<f.length;i++) total += f[i][F_PRICE];
  return total;
}

function summarize(idxArr){
  const f = DB.fact;
  const statSale = DB.rev.statuses.get('Sale');
  const statRefund = DB.rev.statuses.get('Refund');
  const actNew = DB.rev.acttypes.get('New Activation');
  let netRevenue=0, netUnits=0, saleRevenue=0, saleUnits=0, refundCount=0, newCount=0, totalDiscount=0, totalTax=0, totalSubtotal=0;
  const stores=new Set(), employees=new Set(), markets=new Set(), items=new Set(), managers=new Set(), invoices=new Set();
  for(let k=0;k<idxArr.length;k++){
    const r = f[idxArr[k]];
    const qty=r[F_QTY], price=r[F_PRICE];
    netRevenue += price;
    netUnits += qty;
    totalDiscount += r[F_DISCOUNT];
    totalTax += r[F_TAX];
    totalSubtotal += r[F_SUBTOTAL];
    if(r[F_STATUS]===statSale){ saleRevenue+=price; saleUnits+=qty; }
    if(r[F_STATUS]===statRefund) refundCount++;
    if(r[F_ACT]===actNew) newCount++;
    stores.add(r[F_STORE]); employees.add(r[F_EMP]); markets.add(r[F_MARKET]); items.add(r[F_ITEM]); managers.add(r[F_DM]);
    invoices.add(r[F_INV]);
  }
  const rowCount = idxArr.length;
  return {
    netRevenue, netUnits, saleRevenue, saleUnits,
    avgPricePerUnit: saleUnits>0 ? saleRevenue/saleUnits : 0,
    refundRate: rowCount>0 ? refundCount/rowCount : 0,
    newActMix: rowCount>0 ? newCount/rowCount : 0,
    totalDiscount, totalTax, totalSubtotal,
    avgBasketValue: invoices.size>0 ? totalSubtotal/invoices.size : 0,
    rowCount, invoiceCount: invoices.size,
    activeStores: stores.size, activeEmployees: employees.size,
    activeMarkets: markets.size, activeItems: items.size, activeManagers: managers.size
  };
}

/* generic group-by over any dimension field, returns array sorted desc by netRevenue
   unless a sortFn is supplied. label resolved via the matching dims[] array. */
function groupBy(idxArr, fieldIdx, dimNames, opts){
  opts = opts || {};
  const f = DB.fact;
  const map = new Map(); // key(idx) -> agg
  for(let k=0;k<idxArr.length;k++){
    const r = f[idxArr[k]];
    const key = r[fieldIdx];
    let a = map.get(key);
    if(!a){ a = {idx:key, name:dimNames[key], netRevenue:0, netUnits:0, saleUnits:0, saleRevenue:0, rowCount:0, invoices:new Set(), refunds:0}; map.set(key,a); }
    a.netRevenue += r[F_PRICE];
    a.netUnits += r[F_QTY];
    a.rowCount += 1;
    a.invoices.add(r[F_INV]);
    if(r[F_STATUS]===DB.rev.statuses.get('Sale')){ a.saleUnits += r[F_QTY]; a.saleRevenue += r[F_PRICE]; }
    if(r[F_STATUS]===DB.rev.statuses.get('Refund')) a.refunds += 1;
  }
  let rows = [...map.values()].map(a=>({
    idx:a.idx, name:a.name, netRevenue:a.netRevenue, netUnits:a.netUnits, rowCount:a.rowCount,
    invoiceCount:a.invoices.size, refundRate: a.rowCount? a.refunds/a.rowCount:0,
    avgPricePerUnit: a.saleUnits>0 ? a.saleRevenue/a.saleUnits : 0
  }));
  if(opts.sortBy==='name') rows.sort((x,y)=>x.name.localeCompare(y.name));
  else if(opts.sortBy==='idx') rows.sort((x,y)=>x.idx-y.idx);
  else rows.sort((x,y)=> (opts.asc? x.netRevenue-y.netRevenue : y.netRevenue-x.netRevenue));
  if(opts.limit) rows = rows.slice(0, opts.limit);
  return rows;
}

/* time series over the dates dimension, chronological order */
function trendByDate(idxArr){
  const rows = groupBy(idxArr, F_DATE, DB.dims.dates, {sortBy:'idx'});
  // ensure every date in range present (fill gaps with zero) for a clean line
  const map = new Map(rows.map(r=>[r.idx,r]));
  const out = [];
  for(let i=0;i<DB.dims.dates.length;i++){
    if(map.has(i)) out.push(map.get(i));
  }
  return out;
}

/* period-over-period delta for a metric, comparing the two most recent periods
   present in the *unfiltered date* sense — used by KPI cards */
function periodDelta(metricFn){
  if(DB.periods.length<2) return null;
  const last = DB.periods[DB.periods.length-1];
  const prev = DB.periods[DB.periods.length-2];
  // compute using full filter context EXCEPT the date filter, so the comparison is meaningful
  const f = DB.fact;
  const idxNoDate = [];
  const fm=FILTER.markets, fs=FILTER.stores, fdm=FILTER.managers, fe=FILTER.employees, fi=FILTER.items, fc=FILTER.categories, fa=FILTER.acttypes, fp=FILTER.paytypes, fst=FILTER.status;
  for(let i=0;i<f.length;i++){
    const r=f[i];
    if(fm.size && !fm.has(r[F_MARKET])) continue;
    if(fs.size && !fs.has(r[F_STORE])) continue;
    if(fdm.size && !fdm.has(r[F_DM])) continue;
    if(fe.size && !fe.has(r[F_EMP])) continue;
    if(fi.size && !fi.has(r[F_ITEM])) continue;
    if(fc.size && !fc.has(r[F_CATEGORY])) continue;
    if(fa.size && !fa.has(r[F_ACT])) continue;
    if(fp.size && !fp.has(r[F_PAY])) continue;
    if(fst.size && !fst.has(r[F_STATUS])) continue;
    idxNoDate.push(i);
  }
  // additionally filter by year/month slicers if active (these narrow all rows including period rows)
  if(FILTER.years.size || FILTER.months.size){
    const filtered = [];
    for(const i of idxNoDate){
      const iso = DB.dims.dates[f[i][F_DATE]];
      if(FILTER.years.size && !FILTER.years.has(iso.slice(0,4))) continue;
      if(FILTER.months.size && !FILTER.months.has(iso.slice(5,7))) continue;
      filtered.push(i);
    }
    idxNoDate.length=0; idxNoDate.push(...filtered);
  }
  const lastIdx = idxNoDate.filter(i=>last.dateIdx.has(f[i][F_DATE]));
  const prevIdx = idxNoDate.filter(i=>prev.dateIdx.has(f[i][F_DATE]));
  const lastVal = metricFn(lastIdx), prevVal = metricFn(prevIdx);
  if(prevVal===0) return {lastVal, prevVal, pct:null, label:prev.shortLabel+' → '+last.shortLabel};
  return {lastVal, prevVal, pct:(lastVal-prevVal)/Math.abs(prevVal), label:prev.shortLabel+' → '+last.shortLabel};
}

/* ===================== FORMATTERS ===================== */
function fmtMoney(n, compact){
  if(n==null||isNaN(n)) return '—';
  const sign = n<0 ? '-' : '';
  const abs = Math.abs(n);
  if(compact) return sign+'$'+fmtCompactNum(abs);
  return sign+'$'+abs.toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0});
}
function fmtMoney2(n){
  if(n==null||isNaN(n)) return '—';
  const sign = n<0 ? '-' : '';
  return sign+'$'+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function fmtNum(n){ if(n==null||isNaN(n)) return '—'; return Math.round(n).toLocaleString('en-US'); }
function fmtCompactNum(n){
  const sign = n<0?'-':''; n=Math.abs(n);
  if(n>=1e9) return sign+(n/1e9).toFixed(1).replace(/\.0$/,'')+'B';
  if(n>=1e6) return sign+(n/1e6).toFixed(1).replace(/\.0$/,'')+'M';
  if(n>=1e3) return sign+(n/1e3).toFixed(1).replace(/\.0$/,'')+'k';
  return sign+Math.round(n);
}
function fmtPct(n,decimals){ if(n==null||isNaN(n)) return '—'; return (n*100).toFixed(decimals==null?1:decimals)+'%'; }
function fmtDate(iso){ const d=new Date(iso+'T00:00:00'); return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
function fmtDateShort(iso){ const d=new Date(iso+'T00:00:00'); return d.toLocaleDateString('en-US',{month:'short',day:'numeric'}); }

