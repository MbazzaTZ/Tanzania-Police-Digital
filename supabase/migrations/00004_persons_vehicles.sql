-- =========================================================
-- Migration 00004: Persons (Watu) & Vehicles (Magari)
-- Integrates with NIDA, TRA-TIN, I-NEC, TAZARA
-- =========================================================

-- PERSONS (Watu)
create table public.persons (
  id            uuid primary key default uuid_generate_v4(),
  -- National IDs
  nida          text unique,
  tin           text unique,
  inec          text unique,
  passport      text unique,
  -- Personal info
  full_name     text not null,
  gender        text check (gender in ('male','female','other')),
  dob           date,
  nationality   text default 'Tanzanian',
  -- Contact
  phone         text,
  phone2        text,
  email         text,
  address       text,
  -- Location
  region        text,
  district      text,
  ward          text,
  -- Family
  father_name   text,
  mother_name   text,
  -- Photo & biometric
  photo_url     text,
  fingerprint_hash text,
  -- Police flags
  warning       boolean default false,
  watchlist     boolean default false,
  watchlist_reason text,
  -- Licenses
  license_no    text unique,
  license_class text,
  license_issued date,
  license_expires date,
  -- Metadata
  source        text default 'manual' check (source in ('manual','nida','inec','scan')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
comment on table persons is 'Watu wote walioingia kwenye mfumo – linked to NIDA, TIN, I-NEC';

-- Indexes for all search types
create index idx_persons_nida         on persons(nida);
create index idx_persons_tin          on persons(tin);
create index idx_persons_inec         on persons(inec);
create index idx_persons_passport     on persons(passport);
create index idx_persons_license      on persons(license_no);
create index idx_persons_phone        on persons(phone);
create index idx_persons_full_name    on persons using gin(full_name gin_trgm_ops);
create index idx_persons_watchlist    on persons(watchlist) where watchlist = true;
create index idx_persons_warning      on persons(warning)   where warning   = true;

create trigger trg_persons_updated_at before update on persons
  for each row execute function update_updated_at();

-- VEHICLES (Magari) — linked to TAZARA
create table public.vehicles (
  id            uuid primary key default uuid_generate_v4(),
  plate         text unique not null,
  make          text,
  model         text,
  body_type     text,
  year          int,
  color         text,
  vin           text unique,
  engine_no     text,
  engine_cc     int,
  fuel_type     text default 'petrol',
  owner_id      uuid references persons on delete set null,
  -- Insurance
  insurance_co   text,
  insurance_policy text,
  insurance_exp  date,
  -- Status flags
  stolen         boolean default false,
  stolen_at      timestamptz,
  recovered      boolean default false,
  -- Registration
  reg_date       date,
  reg_exp        date,
  -- Source
  source         text default 'manual' check (source in ('manual','tazara','scan')),
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);
comment on table vehicles is 'Magari – linked to TAZARA (Tanzania Registrar of Vehicles)';

create index idx_vehicles_plate   on vehicles(plate);
create index idx_vehicles_vin     on vehicles(vin);
create index idx_vehicles_owner   on vehicles(owner_id);
create index idx_vehicles_stolen  on vehicles(stolen) where stolen = true;

create trigger trg_vehicles_updated_at before update on vehicles
  for each row execute function update_updated_at();
