-- =========================================================
-- TPDOP – Complete Supabase PostgreSQL Schema
-- Tanzania Police Digital Operations Platform
-- =========================================================

-- EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- ── LOCATION HIERARCHY ──
create table zones     (id uuid default uuid_generate_v4() primary key, name text not null);
create table regions   (id uuid default uuid_generate_v4() primary key, name text not null, zone_id uuid references zones);
create table districts (id uuid default uuid_generate_v4() primary key, name text not null, region_id uuid references regions);
create table divisions (id uuid default uuid_generate_v4() primary key, name text not null, district_id uuid references districts);
create table wards     (id uuid default uuid_generate_v4() primary key, name text not null, division_id uuid references divisions);
create table stations  (id uuid default uuid_generate_v4() primary key, name text not null, type text, ward_id uuid references wards, lat float, lng float, phone text, address text, ocs_id uuid);

-- ── ROLES & PERMISSIONS ──
create table roles (id uuid default uuid_generate_v4() primary key, name text unique not null, label text, permissions jsonb default '[]');

-- ── PROFILES (Officers) ──
create table profiles (
  id            uuid references auth.users primary key,
  badge         text unique not null,
  full_name     text not null,
  rank          text not null,
  role          text references roles(name),
  station_id    uuid references stations,
  region_id     uuid references regions,
  district_id   uuid references districts,
  department    text,
  phone         text,
  email         text,
  photo_url     text,
  device_id     text,
  biometric_hash text,
  status        text default 'active',
  created_at    timestamptz default now()
);

-- ── PERSONS ──
create table persons (
  id          uuid default uuid_generate_v4() primary key,
  nida        text unique,
  tin         text unique,
  inec        text unique,
  passport    text unique,
  full_name   text not null,
  gender      text,
  dob         date,
  nationality text default 'Tanzanian',
  phone       text,
  email       text,
  address     text,
  region      text,
  district    text,
  ward        text,
  father_name text,
  mother_name text,
  photo_url   text,
  warning     boolean default false,
  watchlist   boolean default false,
  created_at  timestamptz default now()
);

-- ── VEHICLES ──
create table vehicles (
  id            uuid default uuid_generate_v4() primary key,
  plate         text unique not null,
  make          text,
  model         text,
  year          int,
  color         text,
  vin           text unique,
  engine_no     text,
  owner_id      uuid references persons,
  insurance_exp date,
  insurance_co  text,
  stolen        boolean default false,
  created_at    timestamptz default now()
);

-- ── CITATIONS ──
create table citations (
  id            uuid default uuid_generate_v4() primary key,
  citation_no   text unique not null,
  suspect_id    uuid references persons,
  vehicle_id    uuid references vehicles,
  officer_id    uuid references profiles,
  offence_code  text not null,
  offence_desc  text,
  law_section   text,
  fine_amount   bigint,
  location      text,
  lat           float,
  lng           float,
  device_id     text,
  photos        jsonb default '[]',
  signature_url text,
  status        text default 'issued',
  paid_at       timestamptz,
  created_at    timestamptz default now()
);

-- ── ARRESTS ──
create table arrests (
  id            uuid default uuid_generate_v4() primary key,
  arrest_no     text unique not null,
  suspect_id    uuid references persons,
  officer_id    uuid references profiles,
  station_id    uuid references stations,
  arrest_time   timestamptz not null,
  location      text,
  lat           float,
  lng           float,
  method        text,
  reason        text,
  rights_read   boolean default false,
  witnesses     jsonb default '[]',
  officers_present jsonb default '[]',
  photos        jsonb default '[]',
  device_id     text,
  status        text default 'pending',
  created_at    timestamptz default now()
);

create table arrest_charges (
  id         uuid default uuid_generate_v4() primary key,
  arrest_id  uuid references arrests,
  charge_code text,
  charge_desc text,
  law_section text,
  type        text
);

-- ── DETENTIONS ──
create table detentions (
  id          uuid default uuid_generate_v4() primary key,
  detention_no text unique not null,
  person_id   uuid references persons,
  arrest_id   uuid references arrests,
  officer_id  uuid references profiles,
  station_id  uuid references stations,
  cell_no     text,
  reason      text,
  checkin_time timestamptz default now(),
  checkout_time timestamptz,
  max_hours   int default 48,
  status      text default 'active',
  created_at  timestamptz default now()
);

-- ── INCIDENTS ──
create table incident_reports (
  id           uuid default uuid_generate_v4() primary key,
  report_no    text unique not null,
  type         text not null,
  description  text,
  officer_id   uuid references profiles,
  station_id   uuid references stations,
  location     text,
  lat          float,
  lng          float,
  occurred_at  timestamptz,
  priority     text default 'medium',
  damage_value bigint,
  injured      boolean default false,
  witnesses    jsonb default '[]',
  attachments  jsonb default '[]',
  status       text default 'pending',
  created_at   timestamptz default now()
);

-- ── ACCIDENTS ──
create table accident_reports (
  id           uuid default uuid_generate_v4() primary key,
  report_no    text unique not null,
  officer_id   uuid references profiles,
  location     text,
  lat          float,
  lng          float,
  occurred_at  timestamptz,
  vehicles     jsonb default '[]',
  casualties   jsonb default '[]',
  description  text,
  damage_value bigint,
  photos       jsonb default '[]',
  status       text default 'pending',
  created_at   timestamptz default now()
);

-- ── PF3 FORMS ──
create table pf3_forms (
  id           uuid default uuid_generate_v4() primary key,
  form_no      text unique not null,
  person_id    uuid references persons,
  officer_id   uuid references profiles,
  station_id   uuid references stations,
  type         text,
  details      jsonb default '{}',
  status       text default 'draft',
  created_at   timestamptz default now()
);

-- ── CASES ──
create table cases (
  id           uuid default uuid_generate_v4() primary key,
  case_no      text unique not null,
  title        text not null,
  type         text not null,
  officer_id   uuid references profiles,
  station_id   uuid references stations,
  priority     text default 'medium',
  status       text default 'open',
  description  text,
  suspects     jsonb default '[]',
  witnesses    jsonb default '[]',
  created_at   timestamptz default now(),
  closed_at    timestamptz
);

create table case_updates (
  id         uuid default uuid_generate_v4() primary key,
  case_id    uuid references cases,
  officer_id uuid references profiles,
  content    text,
  type       text default 'update',
  created_at timestamptz default now()
);

-- ── EVIDENCE ──
create table evidence (
  id             uuid default uuid_generate_v4() primary key,
  evidence_no    text unique not null,
  case_id        uuid references cases,
  type           text,
  description    text,
  file_url       text,
  file_size      bigint,
  collected_by   uuid references profiles,
  collected_at   timestamptz default now(),
  location       text,
  hash           text,
  status         text default 'active',
  tamper_detected boolean default false
);

create table evidence_chain (
  id          uuid default uuid_generate_v4() primary key,
  evidence_id uuid references evidence,
  officer_id  uuid references profiles,
  action      text,
  notes       text,
  created_at  timestamptz default now()
);

-- ── WARRANTS ──
create table warrants (
  id           uuid default uuid_generate_v4() primary key,
  warrant_no   text unique not null,
  person_id    uuid references persons,
  case_id      uuid references cases,
  issued_by    text,
  court        text,
  type         text,
  description  text,
  issued_at    timestamptz,
  expires_at   timestamptz,
  status       text default 'active'
);

-- ── WANTED PERSONS ──
create table wanted_persons (
  id         uuid default uuid_generate_v4() primary key,
  person_id  uuid references persons,
  crime      text,
  description text,
  last_seen  text,
  last_seen_at timestamptz,
  reward     bigint default 0,
  dangerous  boolean default false,
  alias      text,
  status     text default 'active',
  created_at timestamptz default now()
);

-- ── MISSING PERSONS ──
create table missing_persons (
  id          uuid default uuid_generate_v4() primary key,
  person_id   uuid references persons,
  reporter_name text,
  reporter_phone text,
  last_seen   text,
  last_seen_at timestamptz,
  description text,
  officer_id  uuid references profiles,
  status      text default 'active',
  found_at    timestamptz,
  created_at  timestamptz default now()
);

-- ── STOLEN PROPERTY ──
create table stolen_vehicles (
  id         uuid default uuid_generate_v4() primary key,
  vehicle_id uuid references vehicles,
  incident_id uuid references incident_reports,
  stolen_at  timestamptz,
  recovered  boolean default false,
  created_at timestamptz default now()
);

create table stolen_property (
  id          uuid default uuid_generate_v4() primary key,
  description text,
  value       bigint,
  incident_id uuid references incident_reports,
  recovered   boolean default false,
  created_at  timestamptz default now()
);

-- ── PATROLS ──
create table patrols (
  id          uuid default uuid_generate_v4() primary key,
  officer_id  uuid references profiles,
  route       text,
  station_id  uuid references stations,
  start_time  timestamptz default now(),
  end_time    timestamptz,
  status      text default 'active',
  notes       text
);

create table officer_locations (
  officer_id  uuid references profiles primary key,
  lat         float,
  lng         float,
  accuracy    float,
  updated_at  timestamptz default now()
);

create table checkpoints (
  id          uuid default uuid_generate_v4() primary key,
  name        text,
  officer_id  uuid references profiles,
  location    text,
  lat         float,
  lng         float,
  start_time  timestamptz,
  end_time    timestamptz,
  status      text default 'active',
  checks_count int default 0
);

create table roadblocks (
  id          uuid default uuid_generate_v4() primary key,
  name        text,
  location    text,
  lat         float,
  lng         float,
  officer_id  uuid references profiles,
  start_time  timestamptz,
  end_time    timestamptz,
  status      text default 'active',
  authorized_by uuid references profiles
);

-- ── FIREARMS ──
create table firearms (
  id           uuid default uuid_generate_v4() primary key,
  serial_no    text unique not null,
  type         text,
  make         text,
  model        text,
  caliber      text,
  station_id   uuid references stations,
  issued_to    uuid references profiles,
  date_issued  date,
  condition    text default 'Good',
  status       text default 'armory'
);

create table firearm_licenses (
  id           uuid default uuid_generate_v4() primary key,
  license_no   text unique not null,
  person_id    uuid references persons,
  firearm_type text,
  issued_at    date,
  expires_at   date,
  status       text default 'active'
);

-- ── PRISONERS & CELLS ──
create table cells (
  id         uuid default uuid_generate_v4() primary key,
  cell_no    text not null,
  station_id uuid references stations,
  capacity   int default 4,
  type       text default 'holding',
  status     text default 'available'
);

create table prisoners (
  id           uuid default uuid_generate_v4() primary key,
  prisoner_no  text unique not null,
  person_id    uuid references persons,
  arrest_id    uuid references arrests,
  cell_id      uuid references cells,
  station_id   uuid references stations,
  checkin_time timestamptz default now(),
  checkout_time timestamptz,
  reason       text,
  officer_id   uuid references profiles,
  status       text default 'active'
);

create table transfers (
  id            uuid default uuid_generate_v4() primary key,
  prisoner_id   uuid references prisoners,
  from_station  uuid references stations,
  to_station    uuid references stations,
  officer_id    uuid references profiles,
  reason        text,
  transferred_at timestamptz default now()
);

-- ── COURTS ──
create table court_cases (
  id         uuid default uuid_generate_v4() primary key,
  case_id    uuid references cases,
  arrest_id  uuid references arrests,
  court      text,
  judge      text,
  prosecutor text,
  next_hearing date,
  status     text default 'pending'
);

create table hearings (
  id           uuid default uuid_generate_v4() primary key,
  court_case_id uuid references court_cases,
  hearing_date timestamptz,
  outcome      text,
  notes        text,
  next_date    timestamptz
);

-- ── COMMUNICATIONS ──
create table messages (
  id         uuid default uuid_generate_v4() primary key,
  from_id    uuid references profiles,
  to_id      uuid references profiles,
  content    text,
  priority   text default 'normal',
  read       boolean default false,
  created_at timestamptz default now()
);

create table alerts (
  id         uuid default uuid_generate_v4() primary key,
  type       text not null,
  title      text not null,
  message    text,
  priority   text default 'info',
  read       boolean default false,
  target_role text,
  target_region text,
  created_by uuid references profiles,
  created_at timestamptz default now()
);

create table escalations (
  id         uuid default uuid_generate_v4() primary key,
  from_id    uuid references profiles,
  to_id      uuid references profiles,
  content    text,
  status     text default 'pending',
  created_at timestamptz default now()
);

-- ── INTELLIGENCE ──
create table intelligence_files (
  id            uuid default uuid_generate_v4() primary key,
  title         text not null,
  classification text default 'confidential',
  content       text,
  region        text,
  created_by    uuid references profiles,
  created_at    timestamptz default now()
);

-- ── HR ──
create table hr_records (
  id          uuid default uuid_generate_v4() primary key,
  officer_id  uuid references profiles,
  type        text,
  description text,
  date        date,
  created_by  uuid references profiles,
  created_at  timestamptz default now()
);

-- ── AUDIT LOGS ──
create table audit_logs (
  id          uuid default uuid_generate_v4() primary key,
  officer_id  uuid references profiles,
  badge       text,
  rank        text,
  station_id  uuid references stations,
  action      text not null,
  table_name  text,
  record_id   uuid,
  details     jsonb default '{}',
  lat         float,
  lng         float,
  device_id   text,
  ip_address  text,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY POLICIES
-- ─────────────────────────────────────────────────────────

-- Enable RLS on all tables
alter table citations     enable row level security;
alter table arrests       enable row level security;
alter table detentions    enable row level security;
alter table cases         enable row level security;
alter table evidence      enable row level security;
alter table intelligence_files enable row level security;
alter table audit_logs    enable row level security;
alter table profiles      enable row level security;

-- IGP sees everything
create policy "IGP full access" on citations for all
  using (exists (select 1 from profiles where id = auth.uid() and role in ('igp','digp')));

-- Officers see station-scoped citations
create policy "Officers see own station citations" on citations for select
  using (exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.station_id = citations.station_id
  ));

-- CID officers see all cases
create policy "CID sees all cases" on cases for all
  using (exists (select 1 from profiles where id = auth.uid() and role in ('cid_officer','igp','digp')));

-- Intelligence: RPC and above only
create policy "Intelligence: RPC and above" on intelligence_files for all
  using (exists (select 1 from profiles where id = auth.uid() and role in ('rpc','igp','digp')));

-- Audit logs: IGP only
create policy "Audit: IGP only" on audit_logs for select
  using (exists (select 1 from profiles where id = auth.uid() and role in ('igp','digp')));
