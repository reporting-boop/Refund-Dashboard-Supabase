# Metro Performance Dashboard — Restructured Project

A multi-file dashboard, wired up to load its data live from a
**Supabase** table. **See `docs/SUPABASE_SETUP.md` for step-by-step
setup and deployment instructions — read that first.**

## Files, by concern

| File | What it holds |
|---|---|
| `index.html` | Page shell only — no inline CSS/JS |
| `css/style.css` | All styling |
| `js/vendor/*.js` | Chart.js, SheetJS (xlsx), pako — unmodified, just externalized |
| `js/data-core.js` | Star-schema engine, filters, aggregation helpers — **plus the live-data loader** (see below) |
| `js/data-upload.js` | The "upload a new Excel export" feature — a manual local override/fallback, unchanged |
| `js/app.js` | UI shell, router, charts, drill-through |
| `config.js` | **The one file you edit after deployment** — your Supabase URL/key and refresh interval |
| `supabase/schema.sql` | Creates the `refund_transactions` table + Row Level Security policy |
| `supabase/bulk-load.js` | Optional Node script to push an Excel/CSV export into Supabase |
| `docs/SUPABASE_SETUP.md` | Full setup walkthrough |

## How the live data pipeline works

Rather than inventing a new data format, the dashboard fetches every
row from a Supabase table (one row per transaction — the same shape
as your Excel export) and runs it through the *exact same* transform
your dashboard's existing "Upload new data" feature already performs
client-side (`parseWorkbookToPayload` in `js/data-upload.js`): same
column-alias matching, same star-schema shape (`{meta, dims, fact}`).
That means:
- Every existing chart, filter, table, and drill-through page keeps
  working exactly as-is — they all consume `DB.dims` / `DB.fact` the
  same way they always did, in `loadPayloadObject()`.
- The manual "Upload new data" feature still works too, unchanged, as
  a local override/fallback if you ever want to preview a file before
  it's loaded into Supabase.

**Auto-refresh, two layers deep:**
- The dashboard re-fetches from Supabase on every page load, and again
  every `CONFIG.REFRESH_INTERVAL_MINUTES` while a tab stays open.
- A locally-cached copy (in the browser) keeps the dashboard usable if
  Supabase is briefly unreachable.

## What did *not* change

- UI, layout, colors, charts, filters, tables, and every drill-through
  page.
- The manual Excel-upload/replace feature.
- The star-schema data shape (`dims` + indexed `fact` rows) that all
  the rendering/aggregation code depends on.

## Next steps

Follow `docs/SUPABASE_SETUP.md` to: create a Supabase project, run
`supabase/schema.sql`, load your Excel/CSV export into the table,
paste your project URL/key into `config.js`, and push the folder to
GitHub Pages (or any static host).
