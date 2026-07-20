-- =====================================================================
-- METRO PERFORMANCE DASHBOARD — SUPABASE SCHEMA
-- Run this ONCE in your Supabase project's SQL Editor (Supabase website
-- -> your project -> SQL Editor -> paste this whole file in -> Run).
-- This is a one-time step to CREATE the table; it does not load any
-- data by itself.
--
-- Columns below match every column in your refund_dash.xlsx export,
-- so a CSV import or the bulk-load.js script can map 1-to-1 with no
-- data left behind. The dashboard's column-alias matcher only reads
-- the columns it recognizes (market, store_name, dm, itmdesc, status,
-- qty, price, txn_date, etc.) — the rest (serial, minprice, cost,
-- realprice, adduser, all_category, subcategory, cashpaid,
-- creditcardpaid, debitcardpaid, financedpaid) are stored too, for
-- completeness and any future reporting, but the current dashboard
-- doesn't chart them.
-- =====================================================================

create table if not exists public.refund_transactions (
  id               bigint generated always as identity primary key,

  -- fields the dashboard actively uses
  market           text,           -- "Market"
  custno           text,           -- "custno"
  dm               text,           -- "DM" (district manager)
  store_name       text,           -- "Store Name"
  item             text,           -- "item" (SKU / item code)
  category         text,           -- "Category"
  itmdesc          text,           -- "itmdesc" (item description)
  status           text,           -- "Status" ('Sale' or 'Refund')
  qty              numeric,        -- "qty"
  price            numeric,        -- "price"
  discount         numeric,        -- "discount"
  taxamount        numeric,        -- "taxamount"
  subtotal         numeric,        -- "subtotal"
  profit           numeric,        -- "profit"
  employee_name    text,           -- "Employee Name"
  invno            text,           -- "Invoice"
  txn_date         date,           -- "Date" (normalizes to "txndate", matches the date alias)
  acttype          text,           -- "acttype"
  paytype          text,           -- "paytype"

  -- extra fields present in your export, stored but not yet charted
  serial           text,           -- "serial"
  minprice         numeric,        -- "minprice"
  cost             numeric,        -- "cost"
  realprice        numeric,        -- "realprice"
  adduser          text,           -- "adduser"
  all_category     text,           -- "All Category"
  subcategory      text,           -- "subcategory"
  cashpaid         numeric,        -- "cashpaid"
  creditcardpaid   numeric,        -- "creditcardpaid"
  debitcardpaid    numeric,        -- "debitcardpaid"
  financedpaid     numeric,        -- "financedpaid"

  created_at       timestamptz default now()
);

-- Helpful indexes for the columns the dashboard filters/sorts on most.
create index if not exists idx_refund_txn_date on public.refund_transactions (txn_date);
create index if not exists idx_refund_market   on public.refund_transactions (market);
create index if not exists idx_refund_status   on public.refund_transactions (status);

-- ---------------------------------------------------------------------
-- Row Level Security
-- The dashboard reads this table with the public "anon" key straight
-- from the browser (same trust model the Google Sheet + Apps Script
-- version had — anyone with the URL/key combo can read the data, but
-- not write to it). Adjust this if the data is sensitive.
-- ---------------------------------------------------------------------
alter table public.refund_transactions enable row level security;

create policy "Public read access"
  on public.refund_transactions
  for select
  to anon
  using (true);

-- No insert/update/delete policy is created for the anon role, so the
-- browser can only ever read — bulk loading happens via the Table
-- Editor CSV import or the service-role script in /supabase/bulk-load.js,
-- both of which use a privileged key that bypasses RLS.
