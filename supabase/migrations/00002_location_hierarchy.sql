-- =========================================================
-- Migration 00002: Tanzania Location Hierarchy
-- zones → regions → districts → divisions → wards → stations
-- =========================================================

-- ZONES (Kanda)
create table public.zones (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  code       text unique,
  created_at timestamptz default now()
);
comment on table zones is 'Kanda za Tanzania (e.g. Kanda ya Kaskazini, Mashariki, n.k.)';

-- REGIONS (Mikoa – 26)
create table public.regions (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  code       text unique,
  zone_id    uuid references zones on delete set null,
  rpc_name   text,
  hq_address text,
  created_at timestamptz default now()
);
comment on table regions is 'Mikoa 26 ya Tanzania';

-- DISTRICTS (Wilaya)
create table public.districts (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  code       text unique,
  region_id  uuid not null references regions on delete cascade,
  ocd_name   text,
  created_at timestamptz default now(),
  unique(name, region_id)
);

-- DIVISIONS (Tarafa)
create table public.divisions (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  district_id uuid not null references districts on delete cascade,
  created_at  timestamptz default now()
);

-- WARDS (Kata)
create table public.wards (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  division_id uuid not null references divisions on delete cascade,
  created_at  timestamptz default now()
);

-- STATIONS (Vituo vya Polisi)
create table public.stations (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  code        text unique,
  type        text default 'police_post'
                check (type in ('police_post','police_station','district_hq','regional_hq','national_hq')),
  ward_id     uuid references wards on delete set null,
  district_id uuid references districts on delete set null,
  region_id   uuid references regions on delete set null,
  address     text,
  phone       text,
  email       text,
  lat         double precision,
  lng         double precision,
  ocs_id      uuid,   -- set after profiles table created
  cell_count  int default 0,
  capacity    int default 0,
  status      text default 'active' check (status in ('active','inactive','closed')),
  created_at  timestamptz default now()
);
comment on table stations is 'Vituo 312+ vya Polisi Tanzania';

-- Indexes for fast hierarchy lookups
create index idx_regions_zone    on regions(zone_id);
create index idx_districts_region on districts(region_id);
create index idx_stations_district on stations(district_id);
create index idx_stations_region   on stations(region_id);
