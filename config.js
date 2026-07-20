/* ===================================================================
   METRO PERFORMANCE DASHBOARD — CONFIG
   This is the ONLY file you should need to edit after deployment.

   1. Create a Supabase project, run /supabase/schema.sql in the SQL
      Editor, and load your data into the refund_transactions table
      (see /docs/SUPABASE_SETUP.md for two ways to do that).
   2. Paste your Project URL and anon public API key below (Settings ->
      API in the Supabase dashboard).
   3. Optionally adjust the auto-refresh interval.
   =================================================================== */
const CONFIG = {
  // Settings -> API -> Project URL
  SUPABASE_URL: "https://ssgkjlovmeqocjrjsxfm.supabase.co",

  // Settings -> API -> Project API keys -> anon / public
  // Safe to expose in client-side code as long as Row Level Security
  // is enabled on the table (schema.sql does this for you).
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZ2tqbG92bWVxb2NqcmpzeGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwODk1MTIsImV4cCI6MjA5ODY2NTUxMn0.kD4R6VbTtd-MX6EXexsnrzfSCltuIqlRrMxgYpiTvBc",

  // Table created by /supabase/schema.sql
  SUPABASE_TABLE: "refund_transactions",

  // How often (in minutes) the dashboard silently re-fetches data in
  // the background so open tabs pick up new rows automatically.
  // Set to 0 to disable auto-refresh (data still loads fresh on every
  // page load / manual browser refresh).
  REFRESH_INTERVAL_MINUTES: 15,

  APP_TITLE: "Metro by T-Mobile — Refund Dashboard"
};
