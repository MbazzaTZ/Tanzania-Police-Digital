-- =========================================================
-- Migration 00010: Row Level Security Policies
-- RBAC enforced at database level
-- =========================================================

-- ── ENABLE RLS ON ALL TABLES ──
alter table profiles           enable row level security;
alter table stations           enable row level security;
alter table citations          enable row level security;
alter table arrests            enable row level security;
alter table arrest_charges     enable row level security;
alter table detentions         enable row level security;
alter table incident_reports   enable row level security;
alter table accident_reports   enable row level security;
alter table cases              enable row level security;
alter table case_updates       enable row level security;
alter table evidence           enable row level security;
alter table evidence_chain     enable row level security;
alter table warrants           enable row level security;
alter table wanted_persons     enable row level security;
alter table missing_persons    enable row level security;
alter table intelligence_files enable row level security;
alter table intel_access_log   enable row level security;
alter table patrols            enable row level security;
alter table officer_locations  enable row level security;
alter table alerts             enable row level security;
alter table messages           enable row level security;
alter table audit_logs         enable row level security;
alter table prisoners          enable row level security;
alter table cells              enable row level security;
alter table firearms           enable row level security;
alter table hr_records         enable row level security;

-- ── HELPER FUNCTIONS ──

-- Get current officer's role
create or replace function get_my_role() returns text
  language sql security definer stable as $$
    select role from profiles where id = auth.uid()
  $$;

-- Get current officer's station_id
create or replace function get_my_station() returns uuid
  language sql security definer stable as $$
    select station_id from profiles where id = auth.uid()
  $$;

-- Get current officer's region_id
create or replace function get_my_region() returns uuid
  language sql security definer stable as $$
    select region_id from profiles where id = auth.uid()
  $$;

-- Get current officer's district_id
create or replace function get_my_district() returns uuid
  language sql security definer stable as $$
    select district_id from profiles where id = auth.uid()
  $$;

-- Check if national admin
create or replace function is_national() returns boolean
  language sql security definer stable as $$
    select get_my_role() in ('igp','digp')
  $$;

-- ── PROFILES ──
create policy "Officers can view own profile" on profiles
  for select using (id = auth.uid());

create policy "IGP/DIGP can view all profiles" on profiles
  for select using (is_national());

create policy "Officers update own profile" on profiles
  for update using (id = auth.uid());

-- ── CITATIONS ──

-- National admins see all
create policy "National: all citations" on citations
  for all using (is_national());

-- RPC sees region
create policy "RPC: region citations" on citations
  for select using (
    get_my_role() = 'rpc' and
    station_id in (select id from stations where region_id = get_my_region())
  );

-- OCD sees district
create policy "OCD: district citations" on citations
  for select using (
    get_my_role() = 'ocd' and
    station_id in (select id from stations where district_id = get_my_district())
  );

-- Station officers see own station
create policy "Station: own citations" on citations
  for select using (station_id = get_my_station());

-- Officers can create citations
create policy "Create citation" on citations
  for insert with check (officer_id = auth.uid());

-- Officers update their own citations
create policy "Update own citation" on citations
  for update using (officer_id = auth.uid());

-- ── ARRESTS ──
create policy "National: all arrests" on arrests
  for all using (is_national());

create policy "Station: own arrests" on arrests
  for select using (station_id = get_my_station());

create policy "Create arrest" on arrests
  for insert with check (officer_id = auth.uid());

create policy "Update own arrest" on arrests
  for update using (officer_id = auth.uid());

-- ── CASES ──
create policy "National: all cases" on cases
  for all using (is_national());

create policy "CID: all cases" on cases
  for all using (get_my_role() in ('cid_officer','inspector','asp','sp','ssp'));

create policy "Station: own cases" on cases
  for select using (station_id = get_my_station());

-- ── INTELLIGENCE: RPC and above only ──
create policy "Intelligence: national only" on intelligence_files
  for all using (get_my_role() in ('igp','digp','rpc'));

create policy "Intelligence access log: own entries" on intel_access_log
  for insert with check (officer_id = auth.uid());

-- ── AUDIT LOGS: IGP/DIGP read only ──
create policy "Audit: national read" on audit_logs
  for select using (is_national());

create policy "Audit: insert only" on audit_logs
  for insert with check (officer_id = auth.uid());

-- ── ALERTS: everyone in target sees them ──
create policy "Alerts: targeted role" on alerts
  for select using (
    target_role is null or
    target_role = get_my_role() or
    is_national()
  );

create policy "Alerts: create" on alerts
  for insert with check (created_by = auth.uid());

-- ── MESSAGES: own messages ──
create policy "Messages: own" on messages
  for select using (from_id = auth.uid() or to_id = auth.uid());

create policy "Messages: send" on messages
  for insert with check (from_id = auth.uid());

-- ── PRISONERS / CELLS: station-scoped ──
create policy "Prisoners: station" on prisoners
  for select using (station_id = get_my_station() or is_national());

create policy "Cells: station" on cells
  for select using (station_id = get_my_station() or is_national());

-- ── FIREARMS: station-scoped ──
create policy "Firearms: station" on firearms
  for select using (station_id = get_my_station() or is_national());

-- ── HR RECORDS: own records only ──
create policy "HR: own records" on hr_records
  for select using (officer_id = auth.uid() or is_national());
