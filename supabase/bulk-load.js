/* ===================================================================
   BULK LOAD: Excel/CSV -> Supabase refund_transactions table
   Run this from your machine whenever you want to (re)load your export
   into Supabase. It reads the same column layout the dashboard's
   in-browser "Upload new data" feature accepts.

   SETUP (one time):
     npm install @supabase/supabase-js xlsx

   USAGE:
     SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co \
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
     node bulk-load.js /path/to/your/export.xlsx

   IMPORTANT: this uses the SERVICE ROLE key (Settings -> API), never
   the anon key — the service role key bypasses Row Level Security so
   it can write. Never put the service role key in config.js or any
   file the browser loads; only run it locally / in a trusted script.

   By default this REPLACES all rows in the table (delete then insert)
   so a re-run reflects the export exactly. Pass --append to add rows
   without deleting existing ones instead.
   =================================================================== */

const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = process.env.SUPABASE_TABLE || 'refund_transactions';
const BATCH_SIZE = 500;

// Maps your spreadsheet's header names -> the Supabase column names in
// schema.sql. Add/adjust entries on the left to match your actual
// column headers if they differ.
const HEADER_TO_COLUMN = {
  'Market': 'market',
  'custno': 'custno',
  'DM': 'dm',
  'Store Name': 'store_name',
  'item': 'item',
  'Category': 'category',
  'itmdesc': 'itmdesc',
  'serial': 'serial',
  'Status': 'status',
  'qty': 'qty',
  'price': 'price',
  'minprice': 'minprice',
  'cost': 'cost',
  'discount': 'discount',
  'realprice': 'realprice',
  'taxamount': 'taxamount',
  'subtotal': 'subtotal',
  'profit': 'profit',
  'adduser': 'adduser',
  'Employee Name': 'employee_name',
  'Invoice': 'invno',
  'Date': 'txn_date',
  'acttype': 'acttype',
  'paytype': 'paytype',
  'All Category': 'all_category',
  'subcategory': 'subcategory',
  'cashpaid': 'cashpaid',
  'creditcardpaid': 'creditcardpaid',
  'debitcardpaid': 'debitcardpaid',
  'financedpaid': 'financedpaid'
};

function excelSerialToISO(n) {
  const ms = Math.round((n - 25569) * 86400 * 1000);
  return new Date(ms).toISOString().slice(0, 10);
}
function toISODate(v) {
  if (v == null || v === '') return null;
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
  if (typeof v === 'number') return excelSerialToISO(v);
  const s = String(v).trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (m) return `${m[3]}-${String(m[1]).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
  const d = new Date(s);
  return isNaN(d) ? null : d.toISOString().slice(0, 10);
}

async function main() {
  const filePath = process.argv[2];
  const appendMode = process.argv.includes('--append');
  if (!filePath) {
    console.error('Usage: node bulk-load.js /path/to/export.xlsx [--append]');
    process.exit(1);
  }
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables first.');
    process.exit(1);
  }

  const wb = XLSX.readFile(path.resolve(filePath), { cellDates: true });
  const sheetName = wb.SheetNames.includes('Sheet1') ? 'Sheet1' : wb.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { defval: null, raw: true });
  if (!rows.length) { console.error('No rows found in that sheet.'); process.exit(1); }

  const records = rows.map(row => {
    const rec = {};
    for (const [header, column] of Object.entries(HEADER_TO_COLUMN)) {
      if (!(header in row)) continue;
      rec[column] = column === 'txn_date' ? toISODate(row[header]) : row[header];
    }
    return rec;
  }).filter(r => r.txn_date); // skip rows with no parseable date

  console.log(`Parsed ${records.length} rows from ${rows.length} source rows (dropped ${rows.length - records.length} with no valid date).`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  if (!appendMode) {
    console.log(`Clearing existing rows in "${TABLE}"...`);
    const { error: delErr } = await supabase.from(TABLE).delete().neq('id', 0);
    if (delErr) { console.error('Delete failed:', delErr.message); process.exit(1); }
  }

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from(TABLE).insert(batch);
    if (error) {
      console.error(`Insert failed at rows ${i}-${i + batch.length}:`, error.message);
      process.exit(1);
    }
    console.log(`Inserted ${Math.min(i + BATCH_SIZE, records.length)} / ${records.length}`);
  }

  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
