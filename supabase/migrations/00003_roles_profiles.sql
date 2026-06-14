-- =========================================================
-- Migration 00003: Roles, Permissions & Officer Profiles
-- =========================================================

-- ROLES TABLE
create table public.roles (
  id          uuid primary key default uuid_generate_v4(),
  name        text unique not null,
  label_sw    text,       -- Swahili label
  label_en    text,       -- English label
  scope       text not null check (scope in ('national','regional','district','station','unit')),
  permissions jsonb not null default '[]',
  created_at  timestamptz default now()
);

-- Insert all 9 TPDOP roles
insert into public.roles (name, label_sw, label_en, scope, permissions) values
  ('igp',             'Mkurugenzi Mkuu wa Polisi',          'Inspector General of Police',       'national',  '["all"]'),
  ('digp',            'Naibu Mkurugenzi Mkuu',              'Deputy IGP',                        'national',  '["all"]'),
  ('rpc',             'Kamanda wa Mkoa',                    'Regional Police Commander',          'regional',  '["view_intelligence","manage_region","all_reports","manage_officers"]'),
  ('ocd',             'Kamanda wa Wilaya',                  'Officer Commanding District',        'district',  '["manage_district","citations","arrests","cases","incidents","reports"]'),
  ('ocs',             'Kamanda wa Kituo',                   'Officer Commanding Station',         'station',   '["manage_station","citations","arrests","incidents","detentions","cells"]'),
  ('inspector',       'Inspekta',                           'Inspector',                         'station',   '["citations","arrests","incidents","cases","persons","vehicles"]'),
  ('cid_officer',     'Afisa wa CID',                       'CID Officer',                       'unit',      '["cases","evidence","warrants","forensics","persons","vehicles","arrests"]'),
  ('regular_officer', 'Afisa wa Kawaida',                   'Regular Officer',                   'station',   '["citations","arrests","incidents","patrol","persons","vehicles"]'),
  ('traffic_officer', 'Afisa wa Usalama wa Barabara',       'Traffic Officer',                   'station',   '["citations","accidents","vehicles","persons","patrol"]');

-- OFFICER PROFILES
create table public.profiles (
  id              uuid primary key references auth.users on delete cascade,
  badge           text unique not null,
  full_name       text not null,
  rank            text not null,
  role            text not null references roles(name),
  station_id      uuid references stations,
  region_id       uuid references regions,
  district_id     uuid references districts,
  department      text,
  specialization  text,
  phone           text,
  email           text unique,
  photo_url       text,
  nida            text unique,
  device_id       text,
  biometric_hash  text,
  gps_lat         double precision,
  gps_lng         double precision,
  gps_updated_at  timestamptz,
  status          text default 'active' check (status in ('active','inactive','suspended','retired')),
  last_login_at   timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
comment on table profiles is 'Maafisa wa Polisi (Officers) – extends auth.users';

-- Now set the FK from stations to ocs_id
alter table stations
  add constraint fk_stations_ocs foreign key (ocs_id) references profiles(id) on delete set null;

-- Performance indexes
create index idx_profiles_badge      on profiles(badge);
create index idx_profiles_station    on profiles(station_id);
create index idx_profiles_role       on profiles(role);
create index idx_profiles_status     on profiles(status);
create index idx_profiles_nida       on profiles(nida);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger trg_profiles_updated_at before update on profiles
  for each row execute function update_updated_at();
