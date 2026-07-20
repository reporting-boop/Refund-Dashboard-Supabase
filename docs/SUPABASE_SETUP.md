# Connecting the dashboard to Supabase

This replaces the Google Sheets + Apps Script data source with a
Supabase table. Nothing about the dashboard's UI, charts, filters, or
drill-throughs changes — only where the raw rows come from.

## 1. Create a Supabase project
[supabase.com](https://supabase.com) -> New project. Note your
**Project URL** and, once created, go to **Settings -> API** to see
your keys.

## 2. Create the table
Open the **SQL Editor** in your Supabase project, paste in the
contents of `supabase/schema.sql`, and run it. This creates
`refund_transactions` with Row Level Security enabled and a policy
that lets anyone with the anon key *read* the table (not write to it).

## 3. Load your data in

You have two options — pick whichever is easier for you right now.

### Option A — Table Editor CSV import (no code, one-time or occasional refresh)
1. Export your Excel sheet as CSV (**File -> Save As -> CSV**).
2. In Supabase: **Table Editor -> refund_transactions -> Insert -> Import data from CSV**.
3. Map your CSV's columns to the table's columns when prompted (Market
   -> `market`, Store Name -> `store_name`, DM -> `dm`, Date -> `txn_date`,
   etc. — see the table in `supabase/schema.sql` for the full list).
4. Confirm the import. Re-running this replaces nothing automatically —
   if you're refreshing data, delete the old rows first (Table Editor ->
   select all -> Delete) or use Option B, which does that for you.

### Option B — `supabase/bulk-load.js` script (repeatable refreshes)
A small Node script that reads your Excel/CSV file directly and pushes
it to Supabase, clearing old rows first so re-running it is safe.

```bash
npm install @supabase/supabase-js xlsx

SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
node supabase/bulk-load.js /path/to/your/export.xlsx
```

Get the **service role key** from Settings -> API — it's different
from the anon key and bypasses Row Level Security so the script can
write. **Never** put the service role key in `config.js` or any file
the browser loads; only use it in this local script.

If your spreadsheet's column headers differ from the defaults, edit
the `HEADER_TO_COLUMN` map near the top of `supabase/bulk-load.js`.

## 4. Point the dashboard at your project
Open `config.js` and fill in:
```js
SUPABASE_URL: "https://YOUR_PROJECT_REF.supabase.co",
SUPABASE_ANON_KEY: "your-anon-public-key",
```
(the anon key, **not** the service role key — this one is safe to ship
in client-side code because RLS restricts it to read-only.)

## 5. Deploy / open the dashboard
Open `index.html` (or push the folder to your static host / GitHub
Pages as before). On load it fetches every row from
`refund_transactions`, rebuilds the same dims/fact structure the Excel
importer already produces, and renders exactly as before.

## Notes
- The manual **"Upload new data"** button in the dashboard still works
  unchanged, as a local override/preview — it never touches Supabase.
- The **"Reload live data from Supabase"** button and the
  `REFRESH_INTERVAL_MINUTES` auto-refresh both re-fetch straight from
  the table, so once new data is loaded (via either option above),
  open dashboards will pick it up.
- A copy of the last successful load is cached in the browser
  (`localStorage`), so the dashboard still opens with the most recent
  data if Supabase is briefly unreachable.
