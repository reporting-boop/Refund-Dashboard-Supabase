/* ===================================================================
   METRO PERFORMANCE DASHBOARD — DATA UPLOAD / REPLACE
   Lets the client drop in a refreshed export (same column layout, any
   row order/count) and the whole report rebuilds itself — no edits
   to this file are ever required for a routine data refresh.
   =================================================================== */

const REQUIRED_FIELDS = ['market','store','status','qty','price','employee','date'];

const FIELD_ALIASES = {
  market:   ['markets','market','region','area'],
  custno:   ['custno','customerno','custid','customerid','storeid','storecode','accountnumber'],
  ntid:     ['ntid','employeentid','empntid','employeeid','empid'],
  store:    ['storename','store','company','location','dealer','dealername','address'],
  manager:  ['dm','districtmanager','districtmgr','manager','regionalmanager','areamanager'],
  item:     ['item','itemcode','sku','skucode','partnumber'],
  itmdesc:  ['itmdesc','itemdesc','itemdescription','description','product','productname','model','itemname'],
  category: ['category','itemcategory','producttype','linetype'],
  status:   ['status','saletype','transactionstatus','saleorreturn'],
  qty:      ['qty','quantity','units','unit'],
  price:    ['price','saleprice','unitprice','amount','retailprice'],
  discount: ['discount','discountamount','promoamount'],
  taxamount:['taxamount','tax','salestax'],
  subtotal: ['subtotal','total','linetotal','grandtotal'],
  profit:   ['profit','commission','margin','earnings','netprofit'],
  employee: ['employeename','employee','rep','salesrep','repname','agent','staff','soldby'],
  invno:    ['invoice','invno','invoiceno','invoicenumber','transactionid','txnid','receiptno'],
  date:     ['date','transactiondate','saledate','activationdate','txndate'],
  acttype:  ['acttype','activationtype','activitytype','acttypename'],
  paytype:  ['paytype','paymenttype','paymentmethod','tendertype','payment']
};

function normHeader(h){ return String(h==null?'':h).trim().toLowerCase().replace(/[^a-z0-9]/g,''); }

function resolveColumnMap(headers){
  const normed = headers.map(normHeader);
  const map = {};
  for(const field of Object.keys(FIELD_ALIASES)){
    const aliasSet = new Set([field, ...FIELD_ALIASES[field]].map(normHeader));
    let foundAt = -1;
    for(let i=0;i<normed.length;i++){ if(aliasSet.has(normed[i])){ foundAt=i; break; } }
    if(foundAt>=0) map[field]=headers[foundAt];
  }
  return map;
}

function excelSerialToISO(n){
  const ms = Math.round((n-25569)*86400*1000);
  const d = new Date(ms);
  return d.toISOString().slice(0,10);
}
function toISODate(v){
  if(v==null || v==='') return null;
  if(v instanceof Date && !isNaN(v)) return v.toISOString().slice(0,10);
  if(typeof v==='number') return excelSerialToISO(v);
  const s = String(v).trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if(m) return `${m[3]}-${String(m[1]).padStart(2,'0')}-${String(m[2]).padStart(2,'0')}`;
  const d = new Date(s);
  if(!isNaN(d)) return d.toISOString().slice(0,10);
  return null;
}

const FACT_DIM_ORDER = ['markets','stores','managers','employees','items','categories','acttypes','paytypes','statuses','dates'];

function parseWorkbookToPayload(rows, headers, filename){
  const colMap = resolveColumnMap(headers);
  const missing = REQUIRED_FIELDS.filter(f=>!colMap[f]);
  const hasDesc = colMap.itmdesc || colMap.item;
  if(!hasDesc) missing.push('itmdesc/item');
  if(missing.length){
    const err = new Error('Missing required column(s): '+missing.join(', '));
    err.isSchemaError = true; err.missing = missing; err.headersFound = headers;
    throw err;
  }

  const markets=new Map(), stores=new Map(), managers=new Map(), employees=new Map(), items=new Map(),
        categories=new Map(), acttypes=new Map(), paytypes=new Map(), statuses=new Map(), dates=new Map();
  const itemCodeOf = new Map();
  function idOf(map, name){
    if(!map.has(name)) map.set(name, map.size);
    return map.get(name);
  }

  const fact = [];
  let skipped = 0;
  for(let r=0;r<rows.length;r++){
    const row = rows[r];
    const marketV = row[colMap.market];
    const storeV = row[colMap.store];
    if((marketV==null||marketV==='') && (storeV==null||storeV==='')){ skipped++; continue; }

    const iso = toISODate(row[colMap.date]);
    if(!iso){ skipped++; continue; }

    const statusV = String(row[colMap.status]??'Sale').trim() || 'Sale';
    const custnoV = colMap.custno ? String(row[colMap.custno]??'').trim() : '';
    const storeName = String(storeV??'Unknown Store').trim();
    const storeLabel = custnoV ? (custnoV+' — '+storeName) : storeName;
    const managerV = colMap.manager ? (String(row[colMap.manager]??'').trim() || 'Unassigned') : 'Unassigned';
    const descV = colMap.itmdesc ? String(row[colMap.itmdesc]??'').trim() : '';
    const codeV = colMap.item ? String(row[colMap.item]??'').trim() : '';
    const itmdesc = descV || codeV || 'UNKNOWN ITEM';
    if(codeV && !itemCodeOf.has(itmdesc)) itemCodeOf.set(itmdesc, codeV);
    const categoryV = colMap.category ? (String(row[colMap.category]??'').trim() || 'Uncategorized') : 'Uncategorized';

    let qty = Number(row[colMap.qty]);
    if(isNaN(qty) || qty===0) qty = /refund|return/i.test(statusV) ? -1 : 1;
    const price = Number(row[colMap.price]) || 0;
    const discount = colMap.discount ? (Number(row[colMap.discount]) || 0) : 0;
    const taxamount = colMap.taxamount ? (Number(row[colMap.taxamount]) || 0) : 0;
    const subtotal = colMap.subtotal ? (Number(row[colMap.subtotal]) || 0) : price;
    const profit = Number(row[colMap.profit]) || 0;
    const ntidV = colMap.ntid ? String(row[colMap.ntid]??'').trim() : '';
    const employeeName = String(row[colMap.employee]??'Unassigned').trim() || 'Unassigned';
    const employeeV = ntidV ? (ntidV+' — '+employeeName) : employeeName;
    const acttypeV = colMap.acttype ? (String(row[colMap.acttype]??'').trim() || 'Non-Activation') : 'Non-Activation';
    const paytypeV = colMap.paytype ? (String(row[colMap.paytype]??'').trim() || 'Unknown') : 'Unknown';
    const invnoV = colMap.invno ? Number(row[colMap.invno]) || (r+1) : (r+1);

    fact.push([
      idOf(markets, String(marketV??'Unknown Market').trim() || 'Unknown Market'),
      idOf(stores, storeLabel),
      idOf(managers, managerV),
      idOf(employees, employeeV),
      idOf(items, itmdesc),
      idOf(categories, categoryV),
      idOf(acttypes, acttypeV),
      idOf(paytypes, paytypeV),
      idOf(statuses, statusV),
      idOf(dates, iso),
      qty, Math.round(price*100)/100, Math.round(profit*100)/100,
      Math.round(discount*100)/100, Math.round(taxamount*100)/100, Math.round(subtotal*100)/100,
      invnoV
    ]);
  }

  function sortedDim(map){
    const entries=[...map.keys()];
    const order = entries.slice().sort();
    const remap = new Map(order.map((name,i)=>[map.get(name), i]));
    return {names:order, remap};
  }
  const dimsOut = {};
  const remaps = {};
  [['markets',markets],['stores',stores],['managers',managers],['employees',employees],['items',items],
   ['categories',categories],['acttypes',acttypes],['paytypes',paytypes],['statuses',statuses],['dates',dates]].forEach(([key,map])=>{
    const {names, remap} = sortedDim(map);
    dimsOut[key]=names; remaps[key]=remap;
  });
  for(const row of fact){
    for(let c=0;c<FACT_DIM_ORDER.length;c++){ row[c] = remaps[FACT_DIM_ORDER[c]].get(row[c]); }
  }
  dimsOut.itemCodes = dimsOut.items.map(name=>itemCodeOf.get(name)||'');

  return {
    meta:{ source:filename, rowCount:fact.length, skippedRows:skipped,
           invoiceCount: new Set(fact.map(r=>r[F_INV])).size,
           generated:new Date().toLocaleString('en-US') },
    dims: dimsOut, fact
  };
}

function handleWorkbookFile(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onerror = ()=>reject(new Error('Could not read the file.'));
    reader.onload = (e)=>{
      try{
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, {type:'array', cellDates:true});
        const sheetName = wb.SheetNames.includes('Sheet1') ? 'Sheet1' : wb.SheetNames[0];
        const ws = wb.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(ws, {defval:null, raw:true});
        if(!rows.length) throw new Error('That sheet looks empty — no rows were found.');
        const headers = Object.keys(rows[0]);
        const payload = parseWorkbookToPayload(rows, headers, file.name);
        if(payload.fact.length===0) throw new Error('No usable rows were found — check the Date and Status columns.');
        resolve(payload);
      }catch(err){ reject(err); }
    };
    reader.readAsArrayBuffer(file);
  });
}

function downloadSampleTemplate(){
  const headers = ['Market','custno','DM','Store Name','item','Category','itmdesc','Status','qty','price','discount','taxamount','subtotal','profit','NTID','Employee Name','Invoice','Date','acttype','paytype'];
  const sample = [
    ['ARIZONA','TECH10590','Shoeb Naqvi','10590 N 90TH AVE STE 4-SL-219','610214679659','Phone','SAM X218U TAB A9+ 5G 64G GRY KIT','Sale',1,49.99,0,2.64,32.63,24.74,'AYC42097','Jane Doe',91012,'2026-06-17','New Activation','Cash'],
    ['DALLAS','TECH40780','Imran Shaikh','4078 E LANCASTER AVE','356610173044799','Accessory','MOT XT24171 G 5G 128G GRN','Sale',1,0,0,0,0,143.00,'PYN80494','John Smith',91013,'2026-06-17','Upgrade','Debit Card']
  ];
  const csv = [headers.join(',')].concat(sample.map(r=>r.map(v=>typeof v==='string'&&v.includes(',')?`"${v}"`:v).join(','))).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'sales_data_template.csv';
  document.body.appendChild(a); a.click(); a.remove();
}
