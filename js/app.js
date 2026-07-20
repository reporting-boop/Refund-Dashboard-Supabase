
/* ===================================================================
   METRO PERFORMANCE DASHBOARD — APP
   UI shell, filter bar, KPI cards, page router, charts, drill-through.
   =================================================================== */

/* ---------------------------- ICONS ---------------------------- */
const ICONS = {
  grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>',
  store:'<svg viewBox="0 0 24 24"><path d="M4 9v11h16V9"/><path d="M2 9l3.2-6h13.6L22 9"/><path d="M9 20v-6h6v6"/></svg>',
  users:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6"/><circle cx="17.2" cy="9" r="2.5"/><path d="M15 14.9c2.7.2 5 2.3 5 5.1"/></svg>',
  box:'<svg viewBox="0 0 24 24"><path d="M3 8l9-5 9 5-9 5-9-5Z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22Z"/><circle cx="12" cy="9.4" r="2.4"/></svg>',
  table:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.2"/><path d="M3 10h18"/><path d="M9 4v16"/></svg>',
  upload:'<svg viewBox="0 0 24 24"><path d="M7 18a4.6 4.6 0 0 1-1-9 5.6 5.6 0 0 1 10.8-1.7A4.1 4.1 0 0 1 17 16"/><path d="M12 11.5v7.5"/><path d="M9 14.3l3-2.8 3 2.8"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="10.4" cy="10.4" r="6.4"/><path d="M20 20l-4.4-4.4"/></svg>',
  menu:'<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  chevL:'<svg viewBox="0 0 24 24"><path d="M14.5 5l-7 7 7 7"/></svg>',
  chevR:'<svg viewBox="0 0 24 24"><path d="M9.5 5l7 7-7 7"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  filter:'<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h6"/><circle cx="16.5" cy="6" r="1.7"/><circle cx="11" cy="12" r="1.7"/><circle cx="7.5" cy="18" r="1.7"/></svg>',
  dollar:'<svg viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M16.5 6.6c0-1.8-2-2.9-4.5-2.9S7.5 4.9 7.5 6.8c0 4 9 2 9 6 0 1.9-2 3.1-4.5 3.1s-4.5-1.2-4.5-3"/></svg>',
  trendUp:'<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-9"/><path d="M15 6h6v6"/></svg>',
  trendDown:'<svg viewBox="0 0 24 24"><path d="M3 7l6 6 4-4 8 9"/><path d="M15 18h6v-6"/></svg>',
  refresh:'<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/></svg>',
  download:'<svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>',
  calendar:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2.2"/><path d="M3 10h18"/><path d="M8 3v4M16 3v4"/></svg>',
  info:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.7h.01"/></svg>',
  arrowR:'<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l5 5 9-10"/></svg>',
  alert:'<svg viewBox="0 0 24 24"><path d="M12 3l9 16H3z"/><path d="M12 9.5v4.5"/><path d="M12 17h.01"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></svg>',
  percent:'<svg viewBox="0 0 24 24"><path d="M5 19L19 5"/><circle cx="7.2" cy="7.2" r="2.2"/><circle cx="16.8" cy="16.8" r="2.2"/></svg>',
  user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
  layers:'<svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5Z"/><path d="M3 13l9 5 9-5"/></svg>',
  activity:'<svg viewBox="0 0 24 24"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg>',
  cog:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a8 8 0 0 0 0-2l2-1.6-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.6 11a8 8 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.8 1.7 1l.3 2.6h4l.3-2.6c.6-.2 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.6Z"/></svg>',
  bolt:'<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
  briefcase:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/><path d="M3 13h18"/></svg>',
  tag:'<svg viewBox="0 0 24 24"><path d="M12.5 3.5 20 11l-9 9-7.5-7.5L4 4l8.5-.5Z"/><circle cx="8.2" cy="8.2" r="1.4"/></svg>',
  dots:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>'
};
function ic(name,cls){ return (ICONS[name]||'').replace('<svg ', `<svg class="${cls||''}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" `); }

/* ---------------------------- GLOBAL STATE ---------------------------- */
const STATE = {
  page:'overview', drillIdx:null,
  sidebarCollapsed:false, mobileNavOpen:false,
  tableSearch:{}, tableSort:{}, tablePage:{},
  calPeriodIdx:null
};
const CHARTS = {};
function destroyChart(id){ if(CHARTS[id]){ CHARTS[id].destroy(); delete CHARTS[id]; } }
function makeChart(id, config){
  destroyChart(id);
  const el = document.getElementById(id);
  if(!el) return null;
  CHARTS[id] = new Chart(el, config);
  return CHARTS[id];
}

const PALETTE = ['#6C4FF6','#2FB6C4','#F2A93B','#9B8AFB','#1FAE7A','#F2545B','#4F3CC9','#C9BFFF'];

Chart.defaults.font.family = "'Arimo','Arial',Helvetica,sans-serif";
Chart.defaults.color = '#6B6680';
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.backgroundColor = '#241C3F';
Chart.defaults.plugins.tooltip.titleFont = {weight:'700', size:12};
Chart.defaults.plugins.tooltip.bodyFont = {size:12};
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.displayColors = true;

function baseGrid(){ return {color:'#EFEDFB', drawTicks:false}; }

/* ---------------------------- TOASTS ---------------------------- */
function toast(msg, type){
  const stack = document.getElementById('toast-stack');
  const div = document.createElement('div');
  div.className = 'toast'+(type?' '+type:'');
  div.innerHTML = ic(type==='success'?'check':type==='error'?'alert':'info')+`<span>${msg}</span>`;
  stack.appendChild(div);
  setTimeout(()=>{ div.style.opacity='0'; div.style.transition='opacity .3s'; setTimeout(()=>div.remove(),300); }, 4200);
}

/* ---------------------------- ENTITY CONFIG ---------------------------- */
const ENTITY = {
  market:   {field:F_MARKET, dimKey:'markets',   label:'Market',   plural:'Markets',   icon:'pin',       listPage:'markets',   detailPage:'marketDetail',   breakdown:[{field:F_DM,dimKey:'managers',label:'DM'},{field:F_STORE,dimKey:'stores',label:'Store Name'}]},
  manager:  {field:F_DM,     dimKey:'managers',  label:'DM', plural:'DM', icon:'briefcase', listPage:'managers', detailPage:'managerDetail', breakdown:[{field:F_STORE,dimKey:'stores',label:'Store Name'},{field:F_EMP,dimKey:'employees',label:'Employee Name'}]},
  store:    {field:F_STORE, dimKey:'stores',     label:'Store Name', plural:'Store Name', icon:'store', listPage:'stores',    detailPage:'storeDetail',    breakdown:[{field:F_EMP,dimKey:'employees',label:'Employee Name'},{field:F_ITEM,dimKey:'items',label:'itmdesc'}]},
  employee: {field:F_EMP,    dimKey:'employees', label:'Employee Name', plural:'Employee Name', icon:'users', listPage:'employees', detailPage:'employeeDetail', breakdown:[{field:F_STORE,dimKey:'stores',label:'Store Name'},{field:F_ITEM,dimKey:'items',label:'itmdesc'}]},
  product:  {field:F_ITEM,   dimKey:'items',     label:'itmdesc', plural:'itmdesc', icon:'box',         listPage:'products',  detailPage:'productDetail',  breakdown:[{field:F_STORE,dimKey:'stores',label:'Store Name'},{field:F_EMP,dimKey:'employees',label:'Employee Name'}]}
};
const NAV_ITEMS = [
  {page:'overview',      icon:'grid',      label:'Overview'},
  {page:'markets',       icon:'pin',       label:'Market',        entity:'market'},
  {page:'managers',      icon:'briefcase', label:'DM',            entity:'manager'},
  {page:'stores',        icon:'store',     label:'Store Name',    entity:'store'},
  {page:'employees',     icon:'users',     label:'Employee Name', entity:'employee'},
  {page:'products',      icon:'box',       label:'itmdesc',       entity:'product'},
  {page:'transactions',  icon:'table',     label:'Transactions'},
];

/* ---------------------------- NAVIGATION ---------------------------- */
function goTo(page, drillIdx){
  Object.keys(CHARTS).forEach(destroyChart);
  STATE.page = page; STATE.drillIdx = (drillIdx==null?null:drillIdx);
  STATE.mobileNavOpen = false;
  document.getElementById('sidebar')?.classList.remove('mobile-open');
  window.scrollTo({top:0,behavior:'instant'});
  renderShellActiveStates();
  renderPage();
}
function goToEntityDetail(entityKey, idx){ goTo(ENTITY[entityKey].detailPage, idx); }
function goBackFrom(entityKey){ goTo(ENTITY[entityKey].listPage, null); }

/* ---------------------------- SHELL: SIDEBAR / TOPBAR ---------------------------- */
function renderShell(){
  const root = document.getElementById('app');
  root.innerHTML = `
    <aside class="sidebar" id="sidebar">
      <button class="collapse-toggle" id="collapseToggle" title="Collapse sidebar">${ic('chevL')}</button>
      <div class="brand">
        <div class="brand-mark">M</div>
        <div class="brand-text"><b>Metro Performance</b><span>SDR BI Dashboard</span></div>
      </div>
      <nav class="nav" id="navList"></nav>
      <div class="sidebar-spacer"></div>
    </aside>
    <div class="main">
      <header class="topbar">
        <button class="menu-btn" id="menuBtn">${ic('menu')}</button>
        <div class="f-group" style="flex:1;max-width:420px;">
          <div class="search-wrap"><span style="display:flex">${ic('search')}</span><input id="globalSearch" placeholder="Search DM, Store Name, Employee Name, or itmdesc…" autocomplete="off"></div>
          <div class="search-results" id="searchResults"></div>
        </div>
        <div class="topbar-spacer"></div>
        <div class="topbar-right">
          <div class="profile">
            <div class="avatar">MT</div>
            <div class="profile-text"><b>Metro by T-Mobile</b><span>Refund Dashboard</span></div>
          </div>
        </div>
      </header>
      <main class="content" id="page-content"></main>
    </div>
    <div id="toast-stack"></div>
  `;
  renderNav();
  document.getElementById('collapseToggle').onclick = ()=>{ STATE.sidebarCollapsed=!STATE.sidebarCollapsed; document.getElementById('sidebar').classList.toggle('collapsed', STATE.sidebarCollapsed); document.getElementById('collapseToggle').innerHTML = ic(STATE.sidebarCollapsed?'chevR':'chevL'); };
  document.getElementById('menuBtn').onclick = ()=>{ STATE.mobileNavOpen=!STATE.mobileNavOpen; document.getElementById('sidebar').classList.toggle('mobile-open', STATE.mobileNavOpen); };
  const hcUploadBtn = document.getElementById('hcUploadBtn');
  if(hcUploadBtn) hcUploadBtn.onclick = ()=>goTo('data');
  const topUploadBtn = document.getElementById('topUploadBtn');
  if(topUploadBtn) topUploadBtn.onclick = ()=>goTo('data');
  document.addEventListener('click', (e)=>{
    if(!STATE.mobileNavOpen) return;
    const sb = document.getElementById('sidebar'), mb = document.getElementById('menuBtn');
    if(sb && !sb.contains(e.target) && mb && !mb.contains(e.target)){
      STATE.mobileNavOpen = false; sb.classList.remove('mobile-open');
    }
  });
  bindGlobalSearch();
}
function renderNav(){
  const idx = getFilteredIndices();
  const navList = document.getElementById('navList');
  navList.innerHTML = NAV_ITEMS.map(n=>{
    let badge='';
    if(n.entity){
      const cfg = ENTITY[n.entity];
      const count = new Set(idx.map(i=>DB.fact[i][cfg.field])).size;
      badge = `<span class="nav-badge">${count}</span>`;
    }
    const active = STATE.page===n.page || (ENTITY[n.entity] && STATE.page===ENTITY[n.entity].detailPage);
    return `<button class="nav-item${active?' active':''}" data-page="${n.page}">${ic(n.icon)}<span class="nav-label">${n.label}</span>${badge}</button>`;
  }).join('');
  navList.querySelectorAll('.nav-item').forEach(btn=>{
    btn.onclick = ()=>goTo(btn.dataset.page, null);
  });
}
function renderShellActiveStates(){ renderNav(); }

/* ---------------------------- GLOBAL SEARCH ---------------------------- */
function bindGlobalSearch(){
  const input = document.getElementById('globalSearch');
  const results = document.getElementById('searchResults');
  function run(){
    const q = input.value.trim().toLowerCase();
    if(q.length<2){ results.classList.remove('show'); return; }
    const groups = [
      {key:'manager', title:'DM', names:DB.dims.managers},
      {key:'store', title:'Store Name', names:DB.dims.stores},
      {key:'employee', title:'Employee Name', names:DB.dims.employees},
      {key:'product', title:'itmdesc', names:DB.dims.items}
    ];
    let html=''; let any=false;
    groups.forEach(g=>{
      const matches=[];
      g.names.forEach((name,i)=>{ if(name.toLowerCase().includes(q)) matches.push({name,i}); });
      if(matches.length){
        any=true;
        html += `<div class="sr-group-title">${g.title}</div>`;
        matches.slice(0,6).forEach(m=>{
          html += `<div class="sr-item" data-entity="${g.key}" data-idx="${m.i}"><span>${m.name}</span><small>${ENTITY[g.key].label}</small></div>`;
        });
      }
    });
    results.innerHTML = any? html : `<div class="sr-empty">No matches for "${q}"</div>`;
    results.classList.add('show');
    results.querySelectorAll('.sr-item').forEach(el=>{
      el.onclick = ()=>{ goToEntityDetail(el.dataset.entity, Number(el.dataset.idx)); results.classList.remove('show'); input.value=''; };
    });
  }
  input.addEventListener('input', run);
  input.addEventListener('focus', run);
  document.addEventListener('click', (e)=>{ if(!results.contains(e.target) && e.target!==input) results.classList.remove('show'); });
}

/* ---------------------------- FILTER BAR ---------------------------- */
const FILTER_DROPDOWNS = [
  {key:'markets', dimKey:'markets', label:'Market'},
  {key:'managers', dimKey:'managers', label:'DM'},
  {key:'stores', dimKey:'stores', label:'Store Name'},
  {key:'employees', dimKey:'employees', label:'NTID + Employee Name'},
  {key:'items', dimKey:'items', label:'itmdesc'},
  {key:'categories', dimKey:'categories', label:'Category'},
  {key:'acttypes', dimKey:'acttypes', label:'acttype'},
  {key:'paytypes', dimKey:'paytypes', label:'paytype'}
];
const DIM_LABEL_SINGULAR = {markets:'Market', managers:'DM', stores:'Store Name', employees:'Employee Name', items:'itmdesc', categories:'Category', acttypes:'acttype', paytypes:'paytype'};
let openFilterKey = null;
const filterSearchText = {};

function renderFilterBar(){
  const allDates = (DB.dims.dates||[]).slice().sort();
  const minDate = allDates[0]||'';
  const maxDate = allDates[allDates.length-1]||'';
  const dateRangeHtml = `
    <div class="date-range-slicer">
      ${ic('calendar')}
      <label>From:</label>
      <input type="date" id="drFrom" min="${minDate}" max="${maxDate}" value="${FILTER.dateFrom||''}" class="${FILTER.dateFrom?'is-active':''}">
      <span class="date-range-sep">→</span>
      <label>To:</label>
      <input type="date" id="drTo" min="${minDate}" max="${maxDate}" value="${FILTER.dateTo||''}" class="${FILTER.dateTo?'is-active':''}">
    </div>`;

  document.getElementById('filterBarSlot').innerHTML = `
    <div class="filterbar" id="filterBar">
      ${dateRangeHtml}
      ${FILTER_DROPDOWNS.map(renderDropdownChip).join('')}
      ${renderMonthYearSlicers()}
      <div class="filterbar-spacer"></div>
      <button class="clear-btn" id="clearFiltersBtn">${ic('x')} Clear filters</button>
    </div>
    <div class="active-pills" id="activePills"></div>
  `;
  FILTER_DROPDOWNS.forEach(d=>bindDropdownChip(d));
  bindDateRangeSlicer();
  bindMonthYearSlicers();
  document.getElementById('clearFiltersBtn').onclick = ()=>{ clearAllFilters(); FILTER.months.clear(); FILTER.years.clear(); openFilterKey=null; onFiltersChanged(); };
  renderActivePills();
  if(openFilterKey){
    const panel = document.getElementById('panel-'+openFilterKey);
    if(panel && panel._open) panel._open();
  }
}
function isStatusActive(name){ return FILTER.status.has(DB.rev.statuses.get(name)); }

function renderDropdownChip(d){
  const count = FILTER[d.key] ? FILTER[d.key].size : 0;
  return `
    <div class="f-group" data-fgroup="${d.key}">
      <button class="f-chipbtn${count?' is-active':''}" data-toggle="${d.key}">
        <span class="dot"></span>${d.label}${count? `<span class="count">${count}</span>`:''}
      </button>
      <div class="f-panel" id="panel-${d.key}">
        <input class="f-search" type="text" placeholder="Search ${d.label.toLowerCase()}…" value="${(filterSearchText[d.key]||'').replace(/"/g,'&quot;')}">
        <div class="f-list"></div>
        <div class="f-panel-actions">
          <button class="f-link-btn" data-action="clear">Clear</button>
          <button class="f-link-btn" data-action="close">Done</button>
        </div>
      </div>
    </div>`;
}
function bindDropdownChip(d){
  const group = document.querySelector(`[data-fgroup="${d.key}"]`);
  const btn = group.querySelector('.f-chipbtn');
  const panel = group.querySelector('.f-panel');
  const searchInput = group.querySelector('.f-search');
  const listEl = group.querySelector('.f-list');

  function names(){ return DB.dims[d.dimKey]; }
  function renderList(){
    const q = searchInput.value.trim().toLowerCase();
    const all = names();
    let opts = all.map((name,i)=>({name,i})).filter(o=>!q || o.name.toLowerCase().includes(q));
    const truncated = opts.length>150;
    opts = opts.slice(0,150);
    listEl.innerHTML = opts.map(o=>`
      <label class="f-opt"><input type="checkbox" data-idx="${o.i}" ${FILTER[d.key].has(o.i)?'checked':''}><span>${o.name}</span></label>
    `).join('') + (truncated? `<div class="sr-empty" style="padding:8px;">Showing first 150 — refine your search</div>`:'') + (!opts.length? `<div class="sr-empty">No matches</div>`:'');
    listEl.querySelectorAll('input[type=checkbox]').forEach(cb=>{
      cb.onchange = ()=>{ toggleFilter(d.key, Number(cb.dataset.idx)); onFiltersChanged(); };
    });
  }
  panel._open = ()=>{ renderList(); panel.classList.add('show'); };
  btn.onclick = (e)=>{
    e.stopPropagation();
    const willShow = !panel.classList.contains('show');
    document.querySelectorAll('.f-panel.show').forEach(p=>p.classList.remove('show'));
    if(willShow){ openFilterKey = d.key; panel._open(); searchInput.focus(); }
    else { openFilterKey = null; }
  };
  searchInput.oninput = ()=>{ filterSearchText[d.key] = searchInput.value; renderList(); };
  panel.querySelector('[data-action="clear"]').onclick = (e)=>{ e.stopPropagation(); FILTER[d.key].clear(); onFiltersChanged(); };
  panel.querySelector('[data-action="close"]').onclick = (e)=>{ e.stopPropagation(); panel.classList.remove('show'); openFilterKey=null; };
  panel.onclick = (e)=>e.stopPropagation();
}
document.addEventListener('click', ()=>{ document.querySelectorAll('.f-panel.show').forEach(p=>p.classList.remove('show')); openFilterKey=null; });

function bindDateRangeSlicer(){
  const fromEl = document.getElementById('drFrom');
  const toEl = document.getElementById('drTo');
  if(fromEl) fromEl.onchange = ()=>{
    FILTER.dateFrom = fromEl.value || null;
    // ensure From <= To
    if(FILTER.dateFrom && FILTER.dateTo && FILTER.dateFrom > FILTER.dateTo) FILTER.dateTo = FILTER.dateFrom;
    onFiltersChanged();
  };
  if(toEl) toEl.onchange = ()=>{
    FILTER.dateTo = toEl.value || null;
    if(FILTER.dateFrom && FILTER.dateTo && FILTER.dateFrom > FILTER.dateTo) FILTER.dateFrom = FILTER.dateTo;
    onFiltersChanged();
  };
}
function renderMonthYearSlicers(){
  // Build unique years and months from DB.dims.dates
  const years = new Set(), months = new Set();
  (DB.dims.dates||[]).forEach(iso=>{ years.add(iso.slice(0,4)); months.add(iso.slice(5,7)); });
  const sortedYears = [...years].sort();
  const sortedMonths = [...months].sort();
  const monthNames = {
    '01':'January','02':'February','03':'March','04':'April','05':'May','06':'June',
    '07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'
  };
  const yearOpts = `<option value="">All Years</option>`+sortedYears.map(y=>`<option value="${y}" ${FILTER.years.has(y)?'selected':''}>${y}</option>`).join('');
  const monthOpts = `<option value="">All Months</option>`+sortedMonths.map(m=>`<option value="${m}" ${FILTER.months.has(m)?'selected':''}>${monthNames[m]||m}</option>`).join('');
  return `
    <div class="my-slicer">
      <label>Year:</label>
      <select id="yearSlicer" class="${FILTER.years.size?'is-active':''}">${yearOpts}</select>
    </div>
    <div class="my-slicer">
      <label>Month:</label>
      <select id="monthSlicer" class="${FILTER.months.size?'is-active':''}">${monthOpts}</select>
    </div>`;
}
function bindMonthYearSlicers(){
  const yearSel = document.getElementById('yearSlicer');
  const monthSel = document.getElementById('monthSlicer');
  if(yearSel) yearSel.onchange = ()=>{
    FILTER.years.clear();
    if(yearSel.value) FILTER.years.add(yearSel.value);
    onFiltersChanged();
  };
  if(monthSel) monthSel.onchange = ()=>{
    FILTER.months.clear();
    if(monthSel.value) FILTER.months.add(monthSel.value);
    onFiltersChanged();
  };
}
function renderActivePills(){
  const pills = [];
  FILTER_DROPDOWNS.forEach(d=>{
    FILTER[d.key].forEach(i=>{
      pills.push({label:`${DIM_LABEL_SINGULAR[d.key]}: ${DB.dims[d.dimKey][i]}`, onRemove:()=>{ FILTER[d.key].delete(i); onFiltersChanged(); }});
    });
  });
  const monthNames2 = {'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'};
  if(FILTER.years.size){ FILTER.years.forEach(y=>pills.push({label:'Year: '+y, onRemove:()=>{ FILTER.years.clear(); onFiltersChanged(); }})); }
  if(FILTER.months.size){ FILTER.months.forEach(m=>pills.push({label:'Month: '+(monthNames2[m]||m), onRemove:()=>{ FILTER.months.clear(); onFiltersChanged(); }})); }
  if(FILTER.dateFrom || FILTER.dateTo){
    const label = 'Date: '+(FILTER.dateFrom||'start')+' → '+(FILTER.dateTo||'end');
    pills.push({label, onRemove:()=>{ FILTER.dateFrom=null; FILTER.dateTo=null; onFiltersChanged(); }});
  }
  const wrap = document.getElementById('activePills');
  wrap.innerHTML = pills.map((p,i)=>`<div class="pill"><span>${p.label}</span><button data-i="${i}">${ic('x')}</button></div>`).join('');
  wrap.querySelectorAll('button').forEach((btn,i)=>{ btn.onclick = pills[i].onRemove; });
}
function onFiltersChanged(){
  renderShellActiveStates();
  renderPage();
}

/* ---------------------------- KPI CARD HELPERS ---------------------------- */
function deltaBadge(delta, higherIsBetter){
  if(higherIsBetter===undefined) higherIsBetter=true;
  if(!delta || delta.pct==null) return `<div class="kpi-delta flat"><span class="ctx">${delta? 'vs '+delta.label.split(' → ')[0] : 'No prior period to compare'}</span></div>`;
  const up = delta.pct>=0;
  const good = higherIsBetter? up : !up;
  return `<div class="kpi-delta ${good?'up':'down'}">${ic(up?'trendUp':'trendDown')}<span>${(up?'+':'')}${(delta.pct*100).toFixed(1)}%</span><span class="ctx">${delta.label}</span></div>`;
}
function kpiCard({icon,iconBg,iconColor,label,value,delta,tip,compact,valueColor}){
  return `<div class="kpi-card${compact?' compact':''}">
    <div class="${compact?'kpi-icon':'kpi-top'}" ${compact?`style="background:${iconBg};color:${iconColor}"`:''}>
      ${compact? ic(icon) : `<div class="kpi-icon" style="background:${iconBg};color:${iconColor}">${ic(icon)}</div><div class="kpi-info">${ic('info')}<div class="kpi-tip">${tip}</div></div>`}
    </div>
    <div class="kpi-body">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value"${valueColor?` style="color:${valueColor}"`:''}>${value}</div>
      ${compact? '' : (delta||'')}
    </div>
  </div>`;
}

/* ---------------------------- TABLE HELPERS ---------------------------- */
function searchRows(rows, query, key){ if(!query) return rows; const q=query.toLowerCase(); return rows.filter(r=>String(r[key]||r.name||'').toLowerCase().includes(q)); }
function sortRowsBy(rows, col, dir){ const out=rows.slice(); out.sort((a,b)=>{ const av=a[col], bv=b[col]; let c; if(typeof av==='string') c=av.localeCompare(bv); else c=av-bv; return dir==='asc'? c : -c; }); return out; }
function paginateRows(rows, page, perPage){ const start=(page-1)*perPage; return {pageRows:rows.slice(start,start+perPage), total:rows.length, page, perPage, totalPages:Math.max(1,Math.ceil(rows.length/perPage))}; }
function renderPagination(containerId, total, page, perPage, onPage){
  const totalPages = Math.max(1, Math.ceil(total/perPage));
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = `<span>${total.toLocaleString()} result${total===1?'':'s'} • page ${page} of ${totalPages}</span>
    <div class="pg-btns">
      <button data-go="1" ${page<=1?'disabled':''}>«</button>
      <button data-go="${page-1}" ${page<=1?'disabled':''}>‹</button>
      <button data-go="${page+1}" ${page>=totalPages?'disabled':''}>›</button>
      <button data-go="${totalPages}" ${page>=totalPages?'disabled':''}>»</button>
    </div>`;
  el.querySelectorAll('button').forEach(b=>{ b.onclick = ()=>onPage(Number(b.dataset.go)); });
}
function exportCSV(filename, headers, rows){
  const csv = [headers.join(',')].concat(rows.map(r=>r.map(v=>{
    v = (v==null?'':String(v));
    return v.includes(',')? `"${v.replace(/"/g,'""')}"` : v;
  }).join(','))).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename;
  document.body.appendChild(a); a.click(); a.remove();
}

/* ---------------------------- SHARED UI BITS ---------------------------- */
function actBadgeClass(name){
  if(/new/i.test(name)) return 'new';
  if(/upgrade/i.test(name)) return 'upgrade';
  if(/react/i.test(name)) return 'react';
  return 'sor';
}
function statusBadgeClass(name){ return /refund/i.test(name)? 'refund':'sale'; }
function pageHead(breadcrumbHtml, title, sub, rightHtml){
  return `<div class="page-head">
    <div><div class="breadcrumb">${breadcrumbHtml}</div><div class="page-title">${title}</div>${sub?`<div class="page-sub">${sub}</div>`:''}</div>
    ${rightHtml||''}
  </div>`;
}
function crumb(parts){
  // parts: [{label, onClick}] last one bold/no link
  return parts.map((p,i)=>{
    const isLast = i===parts.length-1;
    const sep = i>0? '<span>/</span>' : '';
    return sep + (isLast? `<b>${p.label}</b>` : `<span class="bc-link" data-cidx="${i}">${p.label}</span>`);
  }).join('');
}
function bindCrumb(container, parts){
  container.querySelectorAll('.bc-link').forEach(el=>{
    el.onclick = parts[Number(el.dataset.cidx)].onClick;
  });
}

/* generic ranked rows table (used in Overview tabs + as a reusable building block) */
function rankTableHTML(rows, opts){
  opts = opts || {};
  const maxVal = rows.length? Math.max(...rows.map(r=>Math.abs(r.netRevenue)),1) : 1;
  if(!rows.length) return emptyStateHTML('No results', 'Try widening your filters.');
  return `<table class="dtable"><thead><tr>
      <th>${opts.nameLabel||'Name'}</th><th class="num">Total Price</th><th class="num">qty</th><th>Share</th>
    </tr></thead><tbody>
    ${rows.map((r,i)=>{
      const neg = r.netRevenue<0;
      return `
      <tr data-idx="${r.idx}">
        <td class="name-cell"><span class="rank">${i+1}</span>${r.name}</td>
        <td class="num"${neg?' style="color:var(--negative)"':''}>${fmtMoney(r.netRevenue)}</td>
        <td class="num">${fmtNum(r.netUnits)}</td>
        <td><div class="bar-cell"><div class="bar-track"><div class="bar-fill"${neg?' style="background:var(--negative);width:'+Math.max(4,Math.abs(r.netRevenue)/maxVal*100)+'%"':' style="width:'+Math.max(4,Math.abs(r.netRevenue)/maxVal*100)+'%"'}></div></div></div></td>
      </tr>`;}).join('')}
    </tbody></table>`;
}
function emptyStateHTML(title, sub){
  return `<div class="empty-state">${ic('filter')}<b>${title}</b><span>${sub}</span></div>`;
}

/* ---------------------------- PAGE ROUTER ---------------------------- */
function renderPage(){
  const fn = PAGE_RENDERERS[STATE.page] || renderOverview;
  fn();
}

/* ---------------------------- OVERVIEW PAGE ---------------------------- */
let overviewTab = 'store';
function renderOverview(){
  const idx = getFilteredIndices();
  const s = summarize(idx);
  const content = document.getElementById('page-content');
  content.innerHTML = `
    ${pageHead(crumb([{label:'Overview'}]), 'Refund Overview', overviewSubtitle())}
    <div id="filterBarSlot"></div>
    <div style="display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start;margin-bottom:16px;">
      <div>
        <div class="kpi-grid" id="kpiRow1" style="margin-bottom:16px;"></div>
        <div class="kpi-grid secondary" id="kpiRow2" style="margin-bottom:16px;"></div>
        <div class="kpi-grid" id="kpiRow3" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px;"></div>
      </div>
      <div class="panel" id="calendarPanel" style="width:420px;flex-shrink:0;"></div>
    </div>
    <div class="row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
      <div class="panel">
        <div class="panel-head"><div><div class="panel-title">Monthly Refund Total Price</div><div class="panel-sub">Click a bar to focus that month</div></div><div class="panel-tag">${fmtMoney(s.netRevenue,true)} total</div></div>
        <div class="chart-box" style="min-height:280px;"><canvas id="trendChart"></canvas></div>
      </div>
      <div class="panel" id="topPerformersPanel">
        <div class="panel-head"><div><div class="panel-title">Day Wise Category Count</div><div class="panel-sub">Daily item count — Phone · QPAY · Accessory · Others</div></div></div>
        <div class="chart-box" style="min-height:280px;"><canvas id="dayCatLineChart"></canvas></div>
      </div>
    </div>
    <div class="row cols-3">
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Category Mix</div></div>
        <div class="donut-wrap"><canvas id="catDonut"></canvas><div class="donut-center" id="catDonutCenter"></div></div>
        <div class="chart-legend" id="catLegend"></div>
      </div>
      <div class="panel" id="dmPanel"></div>
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Payment Method</div></div>
        <div class="chart-box short"><canvas id="payBar"></canvas></div>
      </div>
    </div>
    <div class="row cols-2-even">
      <div class="panel" id="storeCatPanel">
        <div class="panel-head">
          <div><div class="panel-title">Store × Category Breakdown</div><div class="panel-sub">Qty · Invoices · Price per store and category</div></div>
          <div class="scat-search-wrap"><input id="scatSearch" placeholder="Filter store…" style="border:1px solid var(--border);border-radius:9px;padding:6px 10px;font-size:12px;font-family:inherit;outline:none;width:160px;"></div>
        </div>
        <div class="table-wrap" id="storeCatTable" style="max-height:480px;overflow:auto;"></div>
      </div>
      <div class="panel" id="refundEmpPanel"></div>
    </div>
  `;
  renderFilterBar();
  renderKPIRows(idx, s);
  renderTrendChart(idx);
  renderTopPerformersPanel(idx);
  renderCategoryDonut(idx);
  renderManagerPanel(idx);
  renderPaymentBar(idx);
  renderCalendarPanel();
  renderStoreCategoryTable(idx);
  renderRefundEmployeesPanel(idx);
  const scatSearch = document.getElementById('scatSearch');
  if(scatSearch) scatSearch.oninput = ()=>renderStoreCategoryTable(getFilteredIndices(), scatSearch.value.trim().toLowerCase());
}
function ordinalSuffix(n){
  const j = n % 10, k = n % 100;
  if(j===1 && k!==11) return n+'st';
  if(j===2 && k!==12) return n+'nd';
  if(j===3 && k!==13) return n+'rd';
  return n+'th';
}
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function overviewSubtitle(){
  if(!DB.meta || !DB.meta.source) return 'All markets, stores and activation types';
  const sortedDates = (DB.dims.dates||[]).slice().sort();
  let rangeText = '';
  if(sortedDates.length){
    const start = new Date(sortedDates[0]+'T00:00:00');
    const end = new Date(sortedDates[sortedDates.length-1]+'T00:00:00');
    const startLabel = `${MONTHS_SHORT[start.getMonth()]} ${start.getFullYear()}`;
    const endLabel = `${ordinalSuffix(end.getDate())} ${MONTHS_FULL[end.getMonth()]} ${end.getFullYear()}`;
    rangeText = `The Data has Updated ${startLabel} Till ${endLabel}`;
  }
  return `Source: ${DB.meta.source} • ${fmtNum(DB.meta.rowCount)} line items • ${rangeText}`;
}

function renderKPIRows(idx, s){
  const dRevenue = periodDelta(i=>summarize(i).netRevenue);
  const dUnits   = periodDelta(i=>summarize(i).netUnits);
  const dInv     = periodDelta(i=>summarize(i).invoiceCount);
  const dTxn     = periodDelta(i=>summarize(i).rowCount);

  document.getElementById('kpiRow1').innerHTML = [
    kpiCard({icon:'dollar',    iconBg:'var(--primary-tint)',  iconColor:'var(--primary)',  label:'Refund Total Price',  value:fmtMoney(s.netRevenue),          valueColor:'var(--negative)', delta:deltaBadge(dRevenue),    tip:'Sum of price for all refund line items.'}),
    kpiCard({icon:'box',       iconBg:'var(--teal-tint)',     iconColor:'var(--teal)',     label:'Refund Qty',          value:fmtNum(Math.abs(s.netUnits)),                                  delta:deltaBadge(dUnits),      tip:'Sum of qty for all refund rows.'}),
    kpiCard({icon:'table',     iconBg:'var(--amber-tint)',    iconColor:'#9C6B14',         label:'Refund Invoices',     value:fmtNum(s.invoiceCount),                                        delta:deltaBadge(dInv),        tip:'Distinct invoices with a refund.'}),
    kpiCard({icon:'trendDown', iconBg:'var(--negative-tint)',iconColor:'var(--negative)',  label:'Total Count Of Rows', value:fmtNum(s.rowCount),                                            delta:deltaBadge(dTxn,false),  tip:'Total refund line items.'})
  ].join('');

  const kpiRow2El = document.getElementById('kpiRow2');
  kpiRow2El.style.gridTemplateColumns = 'repeat(2,1fr)';
  kpiRow2El.innerHTML = [
    kpiCard({icon:'store', iconBg:'var(--teal-tint)', iconColor:'var(--teal)', label:'Store Name', value:fmtNum(s.activeStores)+' / '+fmtNum(DB.dims.stores.length), compact:true}),
    kpiCard({icon:'users', iconBg:'var(--amber-tint)', iconColor:'#9C6B14', label:'Employee Name', value:fmtNum(s.activeEmployees)+' / '+fmtNum(DB.dims.employees.length), compact:true})
  ].join('');

  // Row 3 — Category KPIs: QPAY, Phone, Accessory, Others
  const f = DB.fact;
  const cs = {
    qpay:  {label:'QPAY',      count:0, price:0, invs:new Set()},
    phone: {label:'Phone',     count:0, price:0, invs:new Set()},
    acc:   {label:'Accessory', count:0, price:0, invs:new Set()},
    other: {label:'Others',    count:0, price:0, invs:new Set()}
  };
  for(let k=0;k<idx.length;k++){
    const r = f[idx[k]];
    const cn = (DB.dims.categories[r[F_CATEGORY]]||'').toLowerCase();
    let key = 'other';
    if(cn.includes('qpay')) key='qpay';
    else if(cn.includes('phone')) key='phone';
    else if(cn.includes('accessor')) key='acc';
    cs[key].count++;
    cs[key].price += r[F_PRICE];
    cs[key].invs.add(r[F_INV]);
  }

  const catColors = {
    qpay:  {dot:'#2FB6C4'},
    phone: {dot:'#6C4FF6'},
    acc:   {dot:'#F2A93B'},
    other: {dot:'#F2545B'}
  };

  function catCard(key){
    const d = cs[key];
    const col = catColors[key].dot;
    return `<div class="kpi-cat-card">
      <div class="kpi-cat-top">
        <span class="kpi-cat-dot" style="background:${col}"></span>
        <span class="kpi-cat-name">${d.label} Refunds</span>
      </div>
      <div class="kpi-cat-val" style="color:${col}">${fmtMoney(Math.abs(d.price),true)}</div>
      <div class="kpi-cat-row">
        <span class="kpi-cat-chip">${fmtNum(d.count)} txns</span>
        <span class="kpi-cat-chip">${fmtNum(d.invs.size)} inv</span>
      </div>
    </div>`;
  }

  const row3 = document.getElementById('kpiRow3');
  if(row3) row3.innerHTML = ['qpay','phone','acc','other'].map(catCard).join('');
}

function renderTrendChart(idx){
  // Aggregate by month (YYYY-MM)
  const f = DB.fact;
  const monthMap = new Map(); // 'YYYY-MM' → total price
  for(let k=0;k<idx.length;k++){
    const r = f[idx[k]];
    const iso = DB.dims.dates[r[F_DATE]]; // 'YYYY-MM-DD'
    if(!iso) continue;
    const ym = iso.slice(0,7); // 'YYYY-MM'
    monthMap.set(ym, (monthMap.get(ym)||0) + r[F_PRICE]);
  }
  const sortedMonths = [...monthMap.keys()].sort();
  const labels = sortedMonths.map(ym=>{
    const [yr,mo] = ym.split('-');
    const d = new Date(Number(yr), Number(mo)-1, 1);
    return d.toLocaleDateString('en-US',{month:'short', year:'numeric'}); // "Mar 2025"
  });
  const data = sortedMonths.map(ym=>monthMap.get(ym));
  const maxVal = data.length? Math.max(...data) : 0;
  const colors = data.map(v=> v===maxVal ? '#6C4FF6' : '#C9BFFF');
  makeChart('trendChart', {
    type:'bar',
    data:{labels, datasets:[{data, backgroundColor:colors, borderRadius:5, maxBarThickness:32}]},
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{ x:{grid:{display:false}, ticks:{maxRotation:0, autoSkip:true, maxTicksLimit:14, font:{size:10}}}, y:{grid:baseGrid(), ticks:{callback:v=>fmtCompactNum(v), font:{size:10}}} },
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label:(c)=>'Refund price: '+fmtMoney(c.parsed.y), title:(c)=>c[0].label } } }
    }
  });
}

function renderTopPerformersPanel(idx){
  const f = DB.fact;

  // Bucket categories: Phone, QPAY, Accessory, Others
  const bucket = (catName) => {
    const n = (catName||'').toLowerCase();
    if(n.includes('phone')) return 0;
    if(n.includes('qpay')) return 1;
    if(n.includes('accessor')) return 2;
    return 3;
  };
  const catBucket = DB.dims.categories.map(c=>bucket(c));

  // Aggregate by DAY-OF-MONTH number (1–31) across all dates
  // This matches Power BI "Day" field on X-axis
  const dayMap = new Map(); // dayNum (1-31) → [phone, qpay, acc, others]
  for(let k=0;k<idx.length;k++){
    const r = f[idx[k]];
    const iso = DB.dims.dates[r[F_DATE]]; // 'YYYY-MM-DD'
    if(!iso) continue;
    const dayNum = parseInt(iso.slice(8), 10); // 1–31
    const b = catBucket[r[F_CATEGORY]];
    if(!dayMap.has(dayNum)) dayMap.set(dayNum, [0,0,0,0]);
    dayMap.get(dayNum)[b] += 1;
  }

  // Build labels 1–max day found
  const allDays = [...dayMap.keys()].sort((a,b)=>a-b);
  if(!allDays.length){
    const wrap = document.getElementById('dayCatLineChart');
    if(wrap) wrap.parentElement.innerHTML = '<div class="empty-state">No data</div>';
    return;
  }
  const maxDay = allDays[allDays.length-1];
  const labels = [];
  const phones=[], qpays=[], accs=[], others=[];
  for(let d=1; d<=maxDay; d++){
    labels.push(d);
    const counts = dayMap.get(d) || [0,0,0,0];
    phones.push(counts[0]);
    qpays.push(counts[1]);
    accs.push(counts[2]);
    others.push(counts[3]);
  }

  makeChart('dayCatLineChart', {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Count of Phones',
          data: phones,
          borderColor: '#6C4FF6',
          backgroundColor: 'rgba(108,79,246,0.50)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.35,
          fill: true,
          order: 4
        },
        {
          label: 'Count of QPAY',
          data: qpays,
          borderColor: '#2FB6C4',
          backgroundColor: 'rgba(47,182,196,0.50)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.35,
          fill: true,
          order: 3
        },
        {
          label: 'Count of Accessory',
          data: accs,
          borderColor: '#F2A93B',
          backgroundColor: 'rgba(242,169,59,0.50)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.35,
          fill: true,
          order: 2
        },
        {
          label: 'Count of Others',
          data: others,
          borderColor: '#F2545B',
          backgroundColor: 'rgba(242,84,91,0.45)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.35,
          fill: true,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: {
          grid: { display: false },
          title: { display: true, text: 'Day', font: { size: 11 }, color: 'var(--ink-soft)' },
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: maxDay,
            font: { size: 10 },
            callback: v => labels[v]
          }
        },
        y: {
          grid: baseGrid(),
          beginAtZero: true,
          ticks: { callback: v => fmtCompactNum(v), font: { size: 10 } }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { boxWidth: 10, boxHeight: 10, font: { size: 11 }, padding: 10 }
        },
        tooltip: {
          callbacks: {
            title: (items) => `Day ${items[0].label}`,
            label: (c) => ` ${c.dataset.label}: ${fmtNum(c.parsed.y)}`
          }
        }
      }
    }
  });
}

function miniStat(icon,label,row,entityKey){
  if(!row) return `<div class="mini-stat"><div class="ms-icon">${ic(icon)}</div><div class="ms-body"><div class="ms-label">${label}</div><div class="ms-value">No data</div></div></div>`;
  return `<div class="mini-stat" data-entity="${entityKey}" data-idx="${row.idx}">
    <div class="ms-icon">${ic(icon)}</div>
    <div class="ms-body"><div class="ms-label">${label}</div><div class="ms-value">${row.name}</div></div>
    <div class="ms-go">${ic('arrowR')}</div>
  </div>`;
}

function renderActivationDonut(idx){
  const rows = groupBy(idx, F_ACT, DB.dims.acttypes, {});
  const colors = rows.map((r,i)=>PALETTE[i%PALETTE.length]);
  makeChart('actDonut', {
    type:'doughnut',
    data:{labels:rows.map(r=>r.name), datasets:[{data:rows.map(r=>Math.abs(r.netRevenue)), backgroundColor:colors, borderWidth:0}]},
    options:{cutout:'68%', responsive:true, maintainAspectRatio:false,
      onClick:(evt,els)=>{ if(!els.length) return; toggleFilter('acttypes', rows[els[0].index].idx); onFiltersChanged(); },
      plugins:{tooltip:{callbacks:{label:(c)=>c.label+': '+fmtMoney(c.parsed)}}}}
  });
  const total = rows.reduce((a,r)=>a+Math.abs(r.netRevenue),0);
  document.getElementById('actDonutCenter').innerHTML = `<b>${fmtMoney(total,true)}</b><span>Total</span>`;
  document.getElementById('actLegend').innerHTML = rows.map((r,i)=>`<div class="leg-item"><span class="leg-dot" style="background:${colors[i]}"></span>${r.name}</div>`).join('');
}

function renderCategoryDonut(idx){
  const rows = groupBy(idx, F_CATEGORY, DB.dims.categories, {sortBy:'name'});
  const colors = rows.map((r,i)=>PALETTE[i%PALETTE.length]);
  // by transaction volume, not revenue magnitude, so one big-ticket category
  // can't visually dominate a chart meant to show transaction mix.
  makeChart('catDonut', {
    type:'doughnut',
    data:{labels:rows.map(r=>r.name), datasets:[{data:rows.map(r=>r.rowCount), backgroundColor:colors, borderWidth:0}]},
    options:{cutout:'68%', responsive:true, maintainAspectRatio:false,
      onClick:(evt,els)=>{ if(!els.length) return; toggleFilter('categories', rows[els[0].index].idx); onFiltersChanged(); },
      plugins:{tooltip:{callbacks:{label:(c)=>{ const r=rows[c.dataIndex]; return c.label+': '+fmtNum(c.parsed)+' lines · '+fmtMoney(r.netRevenue)+' total price'; }}}}}
  });
  const total = rows.reduce((a,r)=>a+r.rowCount,0);
  document.getElementById('catDonutCenter').innerHTML = `<b>${fmtNum(total)}</b><span>Line items</span>`;
  document.getElementById('catLegend').innerHTML = rows.map((r,i)=>`<div class="leg-item"><span class="leg-dot" style="background:${colors[i]}"></span>${r.name}</div>`).join('');
}

function renderManagerPanel(idx){
  const rows = groupBy(idx, F_DM, DB.dims.managers, {limit:6});
  document.getElementById('dmPanel').innerHTML = `
    <div class="panel-head"><div><div class="panel-title">DM Leaderboard</div><div class="panel-sub">Top 6 by total price</div></div><button class="panel-action" id="dmViewAll">View all</button></div>
    <div class="table-wrap">${rankTableHTML(rows, {nameLabel:'DM'})}</div>
  `;
  document.getElementById('dmViewAll').onclick = ()=>goTo('managers');
  document.querySelectorAll('#dmPanel tbody tr').forEach(tr=>{ tr.onclick = ()=>goToEntityDetail('manager', Number(tr.dataset.idx)); });
}

function renderPaymentBar(idx){
  const rows = groupBy(idx, F_PAY, DB.dims.paytypes, {});
  const colors = rows.map((r,i)=>PALETTE[i%PALETTE.length]);
  makeChart('payBar', {
    type:'bar',
    data:{labels:rows.map(r=>r.name), datasets:[{data:rows.map(r=>r.rowCount), backgroundColor:colors, borderRadius:6, maxBarThickness:26}]},
    options:{indexAxis:'y', responsive:true, maintainAspectRatio:false,
      onClick:(evt,els)=>{ if(!els.length) return; toggleFilter('paytypes', rows[els[0].index].idx); onFiltersChanged(); },
      scales:{x:{grid:baseGrid(), ticks:{font:{size:10}}}, y:{grid:{display:false}, ticks:{font:{size:11}}}},
      plugins:{tooltip:{callbacks:{label:(c)=>fmtNum(c.parsed.x)+' transactions'}}}}
  });
}

function renderOverviewTable(idx){
  // kept for compatibility but no longer used by overview
}

function renderStoreCategoryTable(idx, storeFilter){
  const wrap = document.getElementById('storeCatTable');
  if(!wrap) return;
  const f = DB.fact;

  // Build store→category aggregation
  const storeMap = new Map(); // storeIdx → { catIdx → {qty, invSet, price} }
  const catSet = new Set();
  for(let k=0;k<idx.length;k++){
    const r = f[idx[k]];
    const si = r[F_STORE], ci = r[F_CATEGORY];
    catSet.add(ci);
    if(!storeMap.has(si)) storeMap.set(si, new Map());
    const catMap = storeMap.get(si);
    if(!catMap.has(ci)) catMap.set(ci, {qty:0, invSet:new Set(), price:0});
    const agg = catMap.get(ci);
    agg.qty += r[F_QTY];
    agg.invSet.add(r[F_INV]);
    agg.price += r[F_PRICE];
  }

  // Sort categories by name
  const cats = [...catSet].sort((a,b)=>DB.dims.categories[a].localeCompare(DB.dims.categories[b]));

  // Build store rows sorted by total price desc
  let storeRows = [...storeMap.entries()].map(([si, catMap])=>{
    let totalPrice=0;
    catMap.forEach(a=>{ totalPrice+=a.price; });
    return {si, catMap, totalPrice, name: DB.dims.stores[si]};
  }).sort((a,b)=>b.totalPrice - a.totalPrice);

  // Apply search filter
  if(storeFilter) storeRows = storeRows.filter(r=>r.name.toLowerCase().includes(storeFilter));

  if(!storeRows.length){ wrap.innerHTML=emptyStateHTML('No stores','Try clearing filters or search.'); return; }

  // Render animated-button header for categories
  const catHeader = cats.map(ci=>`
    <th class="num scat-cat-btn" data-ci="${ci}">
      <button class="scat-btn" title="${DB.dims.categories[ci]}">${DB.dims.categories[ci]}</button>
    </th>`).join('');

  const bodyRows = storeRows.map(({si, catMap, totalPrice, name})=>{
    const catCells = cats.map(ci=>{
      const agg = catMap.get(ci);
      if(!agg) return `<td class="num scat-empty">—</td>`;
      return `<td class="num scat-cell">
        <span class="sc-qty">${fmtNum(agg.qty)}</span>
        <span class="sc-inv">${fmtNum(agg.invSet.size)} inv</span>
        <span class="sc-price">${fmtMoney(agg.price)}</span>
      </td>`;
    }).join('');
    return `<tr>
      <td class="scat-name" title="${name}">${name}</td>
      ${catCells}
      <td class="num scat-total">${fmtMoney(totalPrice)}</td>
    </tr>`;
  }).join('');

  wrap.innerHTML = `
    <table class="dtable scat-table">
      <thead><tr>
        <th>Store Name</th>
        ${catHeader}
        <th class="num">Total Price</th>
      </tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>`;

  // Animate category buttons on hover
  wrap.querySelectorAll('.scat-btn').forEach(btn=>{
    btn.addEventListener('mouseenter', ()=>btn.classList.add('scat-btn-pulse'));
    btn.addEventListener('animationend', ()=>btn.classList.remove('scat-btn-pulse'));
  });
}

function renderRefundEmployeesPanel(idx){
  const panel = document.getElementById('refundEmpPanel');
  if(!panel) return;
  const refundStatusIdx = DB.rev.statuses.get('Refund');
  const refundIdx = idx.filter(i=>DB.fact[i][F_STATUS]===refundStatusIdx);
  const rows = groupBy(refundIdx, F_EMP, DB.dims.employees, {limit:10});
  const maxVal = rows.length? Math.max(...rows.map(r=>Math.abs(r.netRevenue)),1) : 1;
  panel.innerHTML = `
    <div class="panel-head">
      <div><div class="panel-title">Top 10 Refund Employees</div><div class="panel-sub">Employees with highest refund value</div></div>
      <span class="panel-tag" style="background:var(--negative)">${fmtNum(refundIdx.length)} refunds</span>
    </div>
    ${!rows.length ? `<div class="empty-state">${ic('check')}<b>No refunds</b><span>No refund transactions in the current filters.</span></div>` : `
    <div class="table-wrap">
      <table class="dtable"><thead><tr>
        <th>Employee</th><th class="num">Refund Value</th><th class="num">Count</th><th>Share</th>
      </tr></thead><tbody>
      ${rows.map((r,i)=>`<tr data-idx="${r.idx}" style="cursor:pointer;">
        <td class="name-cell"><span class="rank" style="background:var(--negative-tint);color:var(--negative)">${i+1}</span>${r.name}</td>
        <td class="num" style="color:var(--negative)">${fmtMoney(Math.abs(r.netRevenue))}</td>
        <td class="num">${fmtNum(r.rowCount)}</td>
        <td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="background:var(--negative);width:${Math.max(4,Math.abs(r.netRevenue)/maxVal*100)}%"></div></div></div></td>
      </tr>`).join('')}
      </tbody></table>
    </div>`}
  `;
  panel.querySelectorAll('tbody tr').forEach(tr=>{
    tr.onclick = ()=>goToEntityDetail('employee', Number(tr.dataset.idx));
  });
}

/* ---------------------------- CALENDAR WIDGET ---------------------------- */
function renderCalendarPanel(){
  if(STATE.calPeriodIdx==null || STATE.calPeriodIdx>=DB.periods.length) STATE.calPeriodIdx = DB.periods.length-1;
  const panel = document.getElementById('calendarPanel');
  if(!panel || !DB.periods.length){ if(panel) panel.innerHTML = emptyStateHTML('No dates available',''); return; }
  const period = DB.periods[STATE.calPeriodIdx];
  panel.innerHTML = `
    <div class="panel-head">
      <div><div class="panel-title">Calendar</div><div class="panel-sub">${period.label}</div></div>
      <div class="cal-nav"><button id="calPrev" ${STATE.calPeriodIdx<=0?'disabled':''}>${ic('chevL')}</button><button id="calNext" ${STATE.calPeriodIdx>=DB.periods.length-1?'disabled':''}>${ic('chevR')}</button></div>
    </div>
    <div class="cal-grid" id="calGrid"></div>
  `;
  renderCalGrid(period);
  document.getElementById('calPrev').onclick = ()=>{ STATE.calPeriodIdx--; renderCalendarPanel(); };
  document.getElementById('calNext').onclick = ()=>{ STATE.calPeriodIdx++; renderCalendarPanel(); };
}
function renderCalGrid(period){
  const grid = document.getElementById('calGrid');
  const dow = ['Mo','Tu','We','Th','Fr','Sa','Su'];
  const dateIdxs = [...period.dateIdx].sort((a,b)=>a-b);
  const d0 = new Date(DB.dims.dates[dateIdxs[0]]+'T00:00:00');
  const year = d0.getFullYear(), month = d0.getMonth();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const firstDow = (new Date(year, month, 1).getDay()+6)%7;
  let html = dow.map(d=>`<div class="cal-dow">${d}</div>`).join('');
  for(let i=0;i<firstDow;i++) html += `<div class="cal-day"></div>`;
  for(let day=1; day<=daysInMonth; day++){
    const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const hasData = DB.rev.dates.get(iso)!=null;
    const inRange = hasData && (!FILTER.dateFrom || iso >= FILTER.dateFrom) && (!FILTER.dateTo || iso <= FILTER.dateTo);
    const isEdge = inRange && ((iso === FILTER.dateFrom) || (iso === FILTER.dateTo));
    html += `<div class="cal-day ${hasData?'has-data':''} ${isEdge?'selected':''} ${inRange&&!isEdge?'in-range':''}" data-iso="${iso}">${day}</div>`;
  }
  grid.innerHTML = html;
  // Calendar days are now just visual — clicking sets the From date shortcut
  grid.querySelectorAll('.cal-day.has-data').forEach(el=>{
    el.onclick = ()=>{
      const iso = el.dataset.iso;
      if(!FILTER.dateFrom || (FILTER.dateFrom && FILTER.dateTo)){
        FILTER.dateFrom = iso; FILTER.dateTo = null;
      } else {
        if(iso >= FILTER.dateFrom) FILTER.dateTo = iso;
        else { FILTER.dateTo = FILTER.dateFrom; FILTER.dateFrom = iso; }
      }
      onFiltersChanged();
    };
  });
}

/* ---------------------------- GENERIC ENTITY LIST PAGE ---------------------------- */
function getEntityRows(entityKey){
  const cfg = ENTITY[entityKey];
  const allIdx = getFilteredIndices();
  // All rows are already Refund-only (filtered at getFilteredIndices level)
  return groupBy(allIdx, cfg.field, DB.dims[cfg.dimKey], {});
}
function renderEntityList(entityKey){
  const cfg = ENTITY[entityKey];
  const baseRows = getEntityRows(entityKey);
  const content = document.getElementById('page-content');
  const query = STATE.tableSearch['list_'+entityKey] || '';
  content.innerHTML = `
    ${pageHead(crumb([{label:'Overview',onClick:()=>goTo('overview')},{label:cfg.plural}]), cfg.plural+' Performance', `${fmtNum(baseRows.length)} ${cfg.label} records match current filters`)}
    <div id="filterBarSlot"></div>
    ${entityKey==='market' ? `<div class="tile-grid" id="entityGrid"></div>` : `
    <div class="panel">
      <div class="table-toolbar">
        <div class="tt-search">${ic('search')}<input id="listSearch" placeholder="Search ${cfg.label.toLowerCase()}…" value="${query}"></div>
        <div class="filterbar-spacer"></div>
        <button class="tt-export" id="listExport">${ic('download')} Export CSV</button>
      </div>
      <div class="table-wrap" id="entityTableWrap"></div>
      <div class="pagination" id="entityPagination"></div>
    </div>`}
  `;
  renderFilterBar();
  if(entityKey==='market'){
    refreshMarketTiles();
  }else{
    refreshEntityTable(entityKey);
    document.getElementById('listSearch').oninput = (e)=>{ STATE.tableSearch['list_'+entityKey]=e.target.value; STATE.tablePage['list_'+entityKey]=1; refreshEntityTable(entityKey); };
    document.getElementById('listExport').onclick = ()=>exportEntityCSV(entityKey);
  }
}
function refreshMarketTiles(){
  const rows = getEntityRows('market');
  const grid = document.getElementById('entityGrid');
  if(!grid) return;
  if(!rows.length){ grid.innerHTML = emptyStateHTML('No markets found','Try clearing your filters.'); return; }
  const maxVal = Math.max(...rows.map(r=>Math.abs(r.netRevenue)),1);
  grid.innerHTML = rows.map((r,i)=>{
    const neg = r.netRevenue<0;
    return `
    <div class="tile" data-idx="${r.idx}">
      <div class="tile-top"><div class="tile-icon">${ic('pin')}</div><div class="tile-rank">#${i+1}</div></div>
      <div class="tile-name">${r.name}</div>
      <div class="tile-sub">${fmtNum(r.invoiceCount)} invoices</div>
      <div class="tile-metric"><b${neg?' style="color:var(--negative)"':''}>${fmtMoney(r.netRevenue,true)}</b><span>total price</span></div>
      <div class="bar-cell" style="margin-top:8px;"><div class="bar-track"><div class="bar-fill"${neg?' style="background:var(--negative);width:'+Math.max(4,Math.abs(r.netRevenue)/maxVal*100)+'%"':' style="width:'+Math.max(4,Math.abs(r.netRevenue)/maxVal*100)+'%"'}></div></div></div>
      <div class="tile-foot"><span>${fmtNum(r.netUnits)} qty</span><span>${ic('arrowR')}</span></div>
    </div>`;}).join('');
  grid.querySelectorAll('.tile').forEach(t=>{ t.onclick = ()=>goToEntityDetail('market', Number(t.dataset.idx)); });
}
function refreshEntityTable(entityKey){
  const cfg = ENTITY[entityKey];
  let rows = getEntityRows(entityKey);
  const query = STATE.tableSearch['list_'+entityKey] || '';
  rows = searchRows(rows, query, 'name');
  const sort = STATE.tableSort['list_'+entityKey] || {col:'netRevenue', dir:'desc'};
  rows = sortRowsBy(rows, sort.col, sort.dir);
  const page = STATE.tablePage['list_'+entityKey] || 1;
  const perPage = 12;
  const {pageRows, total, totalPages} = paginateRows(rows, page, perPage);
  const cols = [
    {key:'name', label:cfg.label},
    {key:'netRevenue', label:'Total Price', num:true},
    {key:'netUnits', label:'qty', num:true},
    {key:'invoiceCount', label:'Invoice', num:true},
    {key:'avgPricePerUnit', label:'Avg price', num:true},
    {key:'refundRate', label:'Refund %', num:true}
  ];
  document.getElementById('entityTableWrap').innerHTML = !pageRows.length ? emptyStateHTML('No '+cfg.label.toLowerCase()+'s found','Try a different search or clear your filters.') : `
    <table class="dtable"><thead><tr>
      ${cols.map(c=>`<th data-col="${c.key}" class="${sort.col===c.key?'sorted '+sort.dir:''}">${c.label}</th>`).join('')}
    </tr></thead><tbody>
    ${pageRows.map((r,i)=>`<tr data-idx="${r.idx}">
      <td class="name-cell"><span class="rank">${(page-1)*perPage+i+1}</span>${r.name}</td>
      <td class="num"${r.netRevenue<0?' style="color:var(--negative)"':''}>${fmtMoney(r.netRevenue)}</td>
      <td class="num">${fmtNum(r.netUnits)}</td>
      <td class="num">${fmtNum(r.invoiceCount)}</td>
      <td class="num"${r.avgPricePerUnit<0?' style="color:var(--negative)"':''}>${fmtMoney2(r.avgPricePerUnit)}</td>
      <td class="num">${fmtPct(r.refundRate)}</td>
    </tr>`).join('')}
    </tbody></table>`;
  document.querySelectorAll('#entityTableWrap th').forEach(th=>{
    th.onclick = ()=>{
      const col = th.dataset.col;
      const cur = STATE.tableSort['list_'+entityKey] || {col:'netRevenue',dir:'desc'};
      const dir = (cur.col===col && cur.dir==='desc') ? 'asc':'desc';
      STATE.tableSort['list_'+entityKey] = {col, dir};
      refreshEntityTable(entityKey);
    };
  });
  document.querySelectorAll('#entityTableWrap tbody tr').forEach(tr=>{
    tr.onclick = ()=>goToEntityDetail(entityKey, Number(tr.dataset.idx));
  });
  renderPagination('entityPagination', total, page, perPage, (p)=>{ STATE.tablePage['list_'+entityKey]=p; refreshEntityTable(entityKey); });
}
function exportEntityCSV(entityKey){
  const cfg = ENTITY[entityKey];
  const query = STATE.tableSearch['list_'+entityKey]||'';
  const sort = STATE.tableSort['list_'+entityKey] || {col:'netRevenue',dir:'desc'};
  const rows = sortRowsBy(searchRows(getEntityRows(entityKey), query, 'name'), sort.col, sort.dir);
  exportCSV(cfg.plural.toLowerCase()+'_export.csv',
    [cfg.label,'Total Price','qty','Invoice','Avg price','Refund Rate'],
    rows.map(r=>[r.name, r.netRevenue.toFixed(2), r.netUnits, r.invoiceCount, r.avgPricePerUnit.toFixed(2), (r.refundRate*100).toFixed(2)+'%']));
}

/* ---------------------------- GENERIC ENTITY DETAIL (drill-through) ---------------------------- */
function renderEntityDetail(entityKey){
  const cfg = ENTITY[entityKey];
  const valueIdx = STATE.drillIdx;
  if(valueIdx==null){ goTo(cfg.listPage); return; }
  const name = DB.dims[cfg.dimKey][valueIdx];
  const baseIdx = getFilteredIndices();
  const allScopedIdx = scopeIndices(baseIdx, cfg.field, valueIdx);
  // All rows are already Refund-only (filtered at getFilteredIndices level)
  const idx = allScopedIdx;
  const s = summarize(idx);
  const content = document.getElementById('page-content');
  content.innerHTML = `
    ${pageHead(crumb([{label:'Overview',onClick:()=>goTo('overview')},{label:cfg.plural,onClick:()=>goTo(cfg.listPage)},{label:name}]), name, cfg.label+' detail — scoped within your active filters', `<button class="back-btn" id="detailBack">${ic('chevL')} Back to ${cfg.plural}</button>`)}
    <div id="filterBarSlot"></div>
    <div class="detail-hero">
      <div class="dh-icon">${ic(cfg.icon)}</div>
      <div class="dh-body"><div class="dh-title">${name}</div><div class="dh-sub">${fmtNum(idx.length)} refund line items in scope</div></div>
      <div class="dh-stats">
        <div class="dh-stat"><b>${fmtMoney(s.netRevenue,true)}</b><span>Refund Total</span></div>
        <div class="dh-stat"><b>${fmtNum(Math.abs(s.netUnits))}</b><span>Refund Qty</span></div>
        <div class="dh-stat"><b>${fmtNum(s.invoiceCount)}</b><span>Invoices</span></div>
        <div class="dh-stat"><b>${fmtNum(s.rowCount)}</b><span>Transactions</span></div>
      </div>
    </div>
    ${!idx.length ? emptyStateHTML('No data for this '+cfg.label.toLowerCase()+' in the current filters', 'Try clearing a slicer above.') : `
    <div class="row cols-2">
      <div class="panel"><div class="panel-head"><div class="panel-title">Daily Total Price</div></div><div class="chart-box"><canvas id="detailTrend"></canvas></div></div>
      <div class="panel"><div class="panel-head"><div class="panel-title">Activation Mix</div></div><div class="donut-wrap" style="height:200px;"><canvas id="detailActDonut"></canvas></div><div class="chart-legend" id="detailActLegend"></div></div>
    </div>
    <div class="row cols-2-even">
      ${cfg.breakdown.map((b,i)=>`<div class="panel"><div class="panel-head"><div class="panel-title">${b.label}</div></div><div class="table-wrap" id="breakdown${i}"></div></div>`).join('')}
    </div>
    <div class="panel">
      <div class="panel-head"><div class="panel-title">Recent Sales Transactions</div><div class="panel-sub">Most recent 150 of ${fmtNum(idx.length)} sale line items</div></div>
      <div class="table-wrap" id="detailTxns"></div>
    </div>`}
  `;
  renderFilterBar();
  document.getElementById('detailBack').onclick = ()=>goBackFrom(entityKey);
  if(!idx.length) return;

  const trows = trendByDate(idx);
  makeChart('detailTrend', {
    type:'line',
    data:{labels:trows.map(r=>fmtDateShort(DB.dims.dates[r.idx])), datasets:[{data:trows.map(r=>r.netRevenue), borderColor:'#6C4FF6', backgroundColor:'rgba(108,79,246,.12)', fill:true, tension:.35, pointRadius:0, borderWidth:2}]},
    options:{responsive:true, maintainAspectRatio:false, plugins:{tooltip:{callbacks:{label:c=>fmtMoney(c.parsed.y)}}},
      scales:{x:{grid:{display:false}, ticks:{maxRotation:0, autoSkip:true, font:{size:10}}}, y:{grid:baseGrid(), ticks:{callback:v=>fmtCompactNum(v), font:{size:10}}}}}
  });
  const actRows = groupBy(idx, F_ACT, DB.dims.acttypes, {});
  const colors = actRows.map((r,i)=>PALETTE[i%PALETTE.length]);
  makeChart('detailActDonut', {type:'doughnut', data:{labels:actRows.map(r=>r.name), datasets:[{data:actRows.map(r=>Math.abs(r.netRevenue)), backgroundColor:colors, borderWidth:0}]},
    options:{cutout:'62%', responsive:true, maintainAspectRatio:false, plugins:{tooltip:{callbacks:{label:c=>c.label+': '+fmtMoney(c.parsed)}}}}});
  document.getElementById('detailActLegend').innerHTML = actRows.map((r,i)=>`<div class="leg-item"><span class="leg-dot" style="background:${colors[i]}"></span>${r.name}</div>`).join('');

  cfg.breakdown.forEach((b,i)=>{
    const rows = groupBy(idx, b.field, DB.dims[b.dimKey], {limit:8});
    document.getElementById('breakdown'+i).innerHTML = rankTableHTML(rows, {nameLabel:b.label});
    const ek = Object.keys(ENTITY).find(k=>ENTITY[k].field===b.field);
    document.querySelectorAll('#breakdown'+i+' tbody tr').forEach(tr=>{
      tr.onclick = ()=>goToEntityDetail(ek, Number(tr.dataset.idx));
    });
  });

  const recent = idx.slice().sort((a,b)=>DB.fact[b][F_DATE]-DB.fact[a][F_DATE]).slice(0,150);
  renderTxnTable(recent, 'detailTxns');
}

/* ---------------------------- TRANSACTIONS (raw rows) ---------------------------- */
function txnRowHTML(i){
  const r = DB.fact[i];
  return `<tr>
    <td>${r[F_INV]}</td>
    <td>${fmtDateShort(DB.dims.dates[r[F_DATE]])}</td>
    <td>${DB.dims.markets[r[F_MARKET]]}</td>
    <td>${DB.dims.managers[r[F_DM]]}</td>
    <td>${DB.dims.stores[r[F_STORE]]}</td>
    <td>${DB.dims.employees[r[F_EMP]]}</td>
    <td>${DB.dims.items[r[F_ITEM]]}</td>
    <td><span class="badge new">${DB.dims.categories[r[F_CATEGORY]]}</span></td>
    <td><span class="badge ${actBadgeClass(DB.dims.acttypes[r[F_ACT]])}">${DB.dims.acttypes[r[F_ACT]]}</span></td>
    <td>${DB.dims.paytypes[r[F_PAY]]}</td>
    <td><span class="badge ${statusBadgeClass(DB.dims.statuses[r[F_STATUS]])}">${DB.dims.statuses[r[F_STATUS]]}</span></td>
    <td class="num">${r[F_QTY]}</td>
    <td class="num">${fmtMoney2(r[F_PRICE])}</td>
  </tr>`;
}
function renderTxnTable(idxList, containerId){
  const headers = ['Invoice','Date','Market','DM','Store Name','Employee Name','itmdesc','Category','acttype','paytype','Status','qty','price'];
  const el = document.getElementById(containerId);
  el.innerHTML = !idxList.length ? emptyStateHTML('No transactions','Try widening your filters.') :
    `<table class="dtable"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${idxList.map(txnRowHTML).join('')}</tbody></table>`;
}
function getTxnIndices(){
  let idx = getFilteredIndices();
  const query = (STATE.tableSearch['txns']||'').trim().toLowerCase();
  if(query){
    idx = idx.filter(i=>{
      const r = DB.fact[i];
      return DB.dims.stores[r[F_STORE]].toLowerCase().includes(query) ||
             DB.dims.employees[r[F_EMP]].toLowerCase().includes(query) ||
             DB.dims.items[r[F_ITEM]].toLowerCase().includes(query) ||
             DB.dims.markets[r[F_MARKET]].toLowerCase().includes(query) ||
             DB.dims.managers[r[F_DM]].toLowerCase().includes(query) ||
             String(r[F_INV]).includes(query);
    });
  }
  const sort = STATE.tableSort['txns'] || {col:'date', dir:'desc'};
  const numericFieldMap = {date:F_DATE, qty:F_QTY, price:F_PRICE, invoice:F_INV};
  const dimFieldMap = {market:F_MARKET, manager:F_DM, store:F_STORE, employee:F_EMP, product:F_ITEM, category:F_CATEGORY, activation:F_ACT, payment:F_PAY, status:F_STATUS};
  const dimArrMap = {market:DB.dims.markets, manager:DB.dims.managers, store:DB.dims.stores, employee:DB.dims.employees, product:DB.dims.items, category:DB.dims.categories, activation:DB.dims.acttypes, payment:DB.dims.paytypes, status:DB.dims.statuses};
  if(numericFieldMap[sort.col]!=null){
    const fi = numericFieldMap[sort.col];
    idx = idx.slice().sort((a,b)=> sort.dir==='asc'? DB.fact[a][fi]-DB.fact[b][fi] : DB.fact[b][fi]-DB.fact[a][fi]);
  }else if(dimFieldMap[sort.col]!=null){
    const fi = dimFieldMap[sort.col], dimArr = dimArrMap[sort.col];
    idx = idx.slice().sort((a,b)=>{ const c = dimArr[DB.fact[a][fi]].localeCompare(dimArr[DB.fact[b][fi]]); return sort.dir==='asc'? c : -c; });
  }
  return idx;
}
function renderTransactionsPage(){
  const content = document.getElementById('page-content');
  const totalNow = getFilteredIndices().length;
  const query = STATE.tableSearch['txns'] || '';
  content.innerHTML = `
    ${pageHead(crumb([{label:'Overview',onClick:()=>goTo('overview')},{label:'Transactions'}]), 'Transaction Detail', `${fmtNum(totalNow)} line items match current filters`)}
    <div id="filterBarSlot"></div>
    <div class="panel">
      <div class="table-toolbar">
        <div class="tt-search">${ic('search')}<input id="txnSearch" placeholder="Search Store Name, Employee Name, itmdesc, Market, Invoice…" value="${query}"></div>
        <div class="filterbar-spacer"></div>
        <button class="tt-export" id="txnExport">${ic('download')} Export CSV</button>
      </div>
      <div class="table-wrap" id="txnTableWrap"></div>
      <div class="pagination" id="txnPagination"></div>
    </div>
  `;
  renderFilterBar();
  refreshTxnsPage();
  document.getElementById('txnSearch').oninput = (e)=>{ STATE.tableSearch['txns']=e.target.value; STATE.tablePage['txns']=1; refreshTxnsPage(); };
  document.getElementById('txnExport').onclick = ()=>exportTxnsCSV();
}
function refreshTxnsPage(){
  const idx = getTxnIndices();
  const page = STATE.tablePage['txns']||1;
  const perPage = 50;
  const {pageRows, total} = paginateRows(idx, page, perPage);
  const sort = STATE.tableSort['txns']||{col:'date',dir:'desc'};
  const headers = [
    {key:'invoice', label:'Invoice'},{key:'date', label:'Date'},{key:'market', label:'Market'},{key:'manager', label:'District Manager'},{key:'store', label:'Store'},
    {key:'employee', label:'Employee'},{key:'product', label:'Product'},{key:'category', label:'Category'},{key:'activation', label:'Activation'},
    {key:'payment', label:'Payment'},{key:'status', label:'Status'},{key:'qty', label:'Qty'},{key:'price', label:'Price'}
  ];
  document.getElementById('txnTableWrap').innerHTML = !pageRows.length ? emptyStateHTML('No transactions found','Try a different search or clear your filters.') : `
    <table class="dtable"><thead><tr>${headers.map(h=>`<th data-col="${h.key}" class="${sort.col===h.key?'sorted '+sort.dir:''}">${h.label}</th>`).join('')}</tr></thead>
    <tbody>${pageRows.map(txnRowHTML).join('')}</tbody></table>`;
  document.querySelectorAll('#txnTableWrap th').forEach(th=>{
    th.onclick = ()=>{
      const col = th.dataset.col;
      const cur = STATE.tableSort['txns']||{col:'date',dir:'desc'};
      const dir = (cur.col===col && cur.dir==='desc')?'asc':'desc';
      STATE.tableSort['txns'] = {col,dir};
      refreshTxnsPage();
    };
  });
  renderPagination('txnPagination', total, page, perPage, (p)=>{ STATE.tablePage['txns']=p; refreshTxnsPage(); window.scrollTo({top:0,behavior:'smooth'}); });
}
function exportTxnsCSV(){
  const idx = getTxnIndices();
  const capped = idx.slice(0, 20000);
  const headers = ['Invoice','Date','Market','DM','Store Name','Employee Name','itmdesc','Category','acttype','paytype','Status','qty','price','discount','taxamount','subtotal'];
  const rows = capped.map(i=>{
    const r = DB.fact[i];
    return [r[F_INV], DB.dims.dates[r[F_DATE]], DB.dims.markets[r[F_MARKET]], DB.dims.managers[r[F_DM]], DB.dims.stores[r[F_STORE]], DB.dims.employees[r[F_EMP]], DB.dims.items[r[F_ITEM]], DB.dims.categories[r[F_CATEGORY]], DB.dims.acttypes[r[F_ACT]], DB.dims.paytypes[r[F_PAY]], DB.dims.statuses[r[F_STATUS]], r[F_QTY], r[F_PRICE].toFixed(2), r[F_DISCOUNT].toFixed(2), r[F_TAX].toFixed(2), r[F_SUBTOTAL].toFixed(2)];
  });
  exportCSV('transactions_export.csv', headers, rows);
  if(idx.length>20000) toast('Exported the first 20,000 matching rows (of '+fmtNum(idx.length)+').','info');
}

/* ---------------------------- DATA & UPLOAD PAGE ---------------------------- */
function renderDataPage(){
  const content = document.getElementById('page-content');
  content.innerHTML = `
    ${pageHead(crumb([{label:'Overview',onClick:()=>goTo('overview')},{label:'Data & Upload'}]), 'Data & Upload', 'Replace the dataset behind this dashboard any time a fresh export is ready — nothing else needs to change.')}
    <div class="row cols-2">
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Upload a new export</div></div>
        <div class="upload-zone" id="dropZone">
          ${ic('upload')}
          <b>Drag &amp; drop your Excel file here</b>
          <span>or click below to browse — .xlsx, .xls or .csv</span>
          <input type="file" id="fileInput" accept=".xlsx,.xls,.csv" style="display:none">
          <div>
            <button class="btn-primary" id="browseBtn">Choose file</button>
            <button class="btn-secondary" id="templateBtn">${ic('download')} Sample template</button>
          </div>
        </div>
        <div class="data-meta-row">
          <div class="data-meta-chip"><b>${(DB.meta&&DB.meta.source)||'—'}</b><span>Current source</span></div>
          <div class="data-meta-chip"><b>${fmtNum(DB.meta?DB.meta.rowCount:0)}</b><span>Total Rows</span></div>
          <div class="data-meta-chip"><b>${fmtNum(DB.meta?DB.meta.invoiceCount:0)}</b><span>Invoice count</span></div>
          <div class="data-meta-chip"><b>${fmtMoney(totalPriceOfAllRows())}</b><span>Total Price (SUM of price column)</span></div>
          <div class="data-meta-chip"><b>${(DB.meta&&DB.meta.generated)||'—'}</b><span>Last refreshed</span></div>
        </div>
        <button class="btn-secondary" id="resetBtn" style="margin-top:14px;">${ic('refresh')} Reload live data from Supabase</button>
      </div>
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Expected columns</div><div class="panel-sub">Headers can appear in any order — common naming variations are matched automatically.</div></div>
        <table class="schema-table"><thead><tr><th>Column</th><th>Required</th><th>Example</th></tr></thead><tbody>
          <tr><td><code>Market</code></td><td>Yes</td><td>ARIZONA</td></tr>
          <tr><td><code>custno</code></td><td>Recommended</td><td>TECH1255</td></tr>
          <tr><td><code>Store Name</code></td><td>Yes</td><td>1255 W Main Street</td></tr>
          <tr><td><code>DM</code></td><td>Recommended</td><td>Shoeb Naqvi</td></tr>
          <tr><td><code>itmdesc</code> / <code>item</code></td><td>Yes (one of)</td><td>SAM X218U TAB A9+</td></tr>
          <tr><td><code>Category</code></td><td>Recommended</td><td>Phone / Accessory / QPAY</td></tr>
          <tr><td><code>Status</code></td><td>Yes</td><td>Sale / Refund</td></tr>
          <tr><td><code>qty</code></td><td>Yes</td><td>1 or -1</td></tr>
          <tr><td><code>price</code></td><td>Yes — drives Total Price</td><td>49.99</td></tr>
          <tr><td><code>discount</code></td><td>Recommended</td><td>-12.00</td></tr>
          <tr><td><code>taxamount</code></td><td>Recommended</td><td>2.64</td></tr>
          <tr><td><code>subtotal</code></td><td>Recommended</td><td>32.63</td></tr>
          <tr><td><code>profit</code></td><td>Optional — not used by this dashboard</td><td>24.74</td></tr>
          <tr><td><code>Employee Name</code></td><td>Yes</td><td>Jane Doe</td></tr>
          <tr><td><code>Invoice</code></td><td>Recommended</td><td>91012</td></tr>
          <tr><td><code>Date</code></td><td>Yes</td><td>2026-06-17</td></tr>
          <tr><td><code>acttype</code></td><td>Recommended</td><td>New Activation</td></tr>
          <tr><td><code>paytype</code></td><td>Recommended</td><td>Cash</td></tr>
        </tbody></table>
      </div>
    </div>
  `;
  const fileInput = document.getElementById('fileInput');
  const dropZone = document.getElementById('dropZone');
  document.getElementById('browseBtn').onclick = (e)=>{ e.stopPropagation(); fileInput.click(); };
  document.getElementById('templateBtn').onclick = (e)=>{ e.stopPropagation(); downloadSampleTemplate(); };
  document.getElementById('resetBtn').onclick = async ()=>{
    toast('Reloading data from Supabase…','info');
    try{
      const payload = await loadDataset();
      loadPayloadObject(payload); clearAllFilters(); STATE.calPeriodIdx=null; STATE.tableSearch={}; STATE.tableSort={}; STATE.tablePage={};
      toast('Reloaded the live dataset from Supabase.','success'); goTo('overview');
    }catch(e){ toast('Could not reload live data: '+(e&&e.message?e.message:e),'error'); }
  };
  fileInput.onchange = ()=>{ if(fileInput.files[0]) processUploadedFile(fileInput.files[0]); };
  dropZone.addEventListener('click', ()=>fileInput.click());
  dropZone.addEventListener('dragover', (e)=>{ e.preventDefault(); dropZone.classList.add('drag'); });
  dropZone.addEventListener('dragleave', ()=>dropZone.classList.remove('drag'));
  dropZone.addEventListener('drop', (e)=>{
    e.preventDefault(); dropZone.classList.remove('drag');
    if(e.dataTransfer.files[0]) processUploadedFile(e.dataTransfer.files[0]);
  });
}
function processUploadedFile(file){
  toast('Reading '+file.name+'…','info');
  handleWorkbookFile(file).then(payload=>{
    loadPayloadObject(payload);
    clearAllFilters();
    STATE.calPeriodIdx = null; STATE.tableSearch={}; STATE.tableSort={}; STATE.tablePage={};
    const skippedNote = payload.meta.skippedRows ? ` (${fmtNum(payload.meta.skippedRows)} rows skipped — missing date/identifiers)` : '';
    toast(`Loaded ${fmtNum(payload.meta.rowCount)} rows from ${file.name}.${skippedNote}`, 'success');
    goTo('overview');
  }).catch(err=>{
    console.error(err);
    toast(err && err.message ? err.message : 'Could not read that file.', 'error');
  });
}

/* ---------------------------- PAGE ROUTER MAP ---------------------------- */
const PAGE_RENDERERS = {
  overview: renderOverview,
  markets: ()=>renderEntityList('market'),
  managers: ()=>renderEntityList('manager'),
  stores: ()=>renderEntityList('store'),
  employees: ()=>renderEntityList('employee'),
  products: ()=>renderEntityList('product'),
  marketDetail: ()=>renderEntityDetail('market'),
  managerDetail: ()=>renderEntityDetail('manager'),
  storeDetail: ()=>renderEntityDetail('store'),
  employeeDetail: ()=>renderEntityDetail('employee'),
  productDetail: ()=>renderEntityDetail('product'),
  transactions: renderTransactionsPage,
  data: renderDataPage
};

/* ---------------------------- BOOTSTRAP ---------------------------- */
function showBootError(err){
  const overlay = document.getElementById('loading-overlay');
  const msg = (err && err.message) ? err.message : String(err);
  const html = '<div style="max-width:520px;margin:12vh auto;padding:24px 28px;'
    + 'background:#fff;border:1px solid var(--border,#E7E4F7);border-radius:14px;'
    + 'font-family:Arimo,Arial,sans-serif;color:#241C3F;text-align:left;box-shadow:0 14px 38px rgba(58,31,158,.12)">'
    + '<div style="font-weight:700;font-size:17px;margin-bottom:8px;">Couldn\'t load dashboard data</div>'
    + '<div style="font-size:14px;color:#6B6680;line-height:1.5;">'+ msg
    + '<br><br>Check that <code>config.js</code> has the correct Supabase URL and anon key, '
    + 'that Row Level Security allows anon SELECT on the table, and that you have an internet connection.'
    + '</div></div>';
  if(overlay){ overlay.innerHTML = html; } else { document.body.insertAdjacentHTML('afterbegin', html); }
}

let _refreshTimer = null;
function startAutoRefresh(){
  const minutes = (typeof CONFIG !== 'undefined' && Number(CONFIG.REFRESH_INTERVAL_MINUTES)) || 0;
  if(_refreshTimer) clearInterval(_refreshTimer);
  if(!minutes || minutes <= 0) return;
  _refreshTimer = setInterval(async ()=>{
    try{
      const payload = await loadDataset();
      loadPayloadObject(payload);
      renderShell();
      goTo(STATE && STATE.page ? STATE.page : 'overview');
      console.info('Dashboard data refreshed automatically at', new Date().toLocaleTimeString());
    }catch(err){
      console.warn('Auto-refresh failed, keeping current data on screen:', err);
    }
  }, minutes * 60 * 1000);
}

async function boot(){
  try{
    const payload = await loadDataset();
    loadPayloadObject(payload);
    renderShell();
    goTo('overview');
    startAutoRefresh();
  }catch(err){
    console.error('Failed to load dataset', err);
    showBootError(err);
  }
  const overlay = document.getElementById('loading-overlay');
  if(overlay) overlay.remove();
}
if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); }

