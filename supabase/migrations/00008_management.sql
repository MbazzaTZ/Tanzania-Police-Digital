-- =========================================================
-- Migration 00008: Management
-- Cells · Prisoners · Courts · Firearms · Assets · HR
-- =========================================================

-- ── CELLS (Seli) ──
create table public.cells (
  id          uuid primary key default uuid_generate_v4(),
  cell_no     text not null,
  station_id  uuid not null references stations on delete cascade,
  capacity    int not null default 4,
  type        text default 'holding' check (type in ('holding','remand','isolation')),
  gender      text default 'mixed'   check (gender in ('male','female','juvenile','mixed')),
  status      text default 'available' check (status in ('available','partial','full','maintenance')),
  created_at  timestamptz default now(),
  unique(cell_no, station_id)
);

-- ── PRISONERS (Wafungwa) ──
create table public.prisoners (
  id             uuid primary key default uuid_generate_v4(),
  prisoner_no    text unique not null,
  person_id      uuid not null references persons on delete restrict,
  arrest_id      uuid references arrests on delete set null,
  cell_id        uuid references cells on delete set null,
  station_id     uuid not null references stations,
  checkin_time   timestamptz default now(),
  checkout_time  timestamptz,
  reason         text,
  medical_notes  text,
  officer_id     uuid not null references profiles,
  released_by    uuid references profiles,
  release_reason text,
  status         text default 'active' check (status in ('active','released','transferred','court')),
  created_at     timestamptz default now()
);

create table public.prisoner_transfers (
  id            uuid primary key default uuid_generate_v4(),
  prisoner_id   uuid not null references prisoners on delete cascade,
  from_station  uuid references stations,
  to_station    uuid references stations,
  from_cell     uuid references cells,
  to_cell       uuid references cells,
  reason        text,
  officer_id    uuid not null references profiles,
  transferred_at timestamptz default now()
);

-- ── COURT CASES (Kesi za Mahakama) ──
create table public.court_cases (
  id            uuid primary key default uuid_generate_v4(),
  case_id       uuid references cases on delete cascade,
  arrest_id     uuid references arrests on delete set null,
  court         text not null,
  court_location text,
  judge         text,
  prosecutor    text,
  defense       text,
  charge_summary text,
  next_hearing  date,
  verdict       text,
  sentence      text,
  status        text default 'pending' check (status in ('pending','ongoing','adjourned','verdict','closed')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.hearings (
  id             uuid primary key default uuid_generate_v4(),
  court_case_id  uuid not null references court_cases on delete cascade,
  hearing_date   timestamptz not null,
  type           text,
  outcome        text,
  notes          text,
  next_date      timestamptz,
  created_at     timestamptz default now()
);

-- ── FIREARMS ──
create table public.firearms (
  id            uuid primary key default uuid_generate_v4(),
  serial_no     text unique not null,
  type          text not null,    -- Pistol, Rifle, Shotgun, etc.
  make          text,
  model         text,
  caliber       text,
  station_id    uuid references stations,
  issued_to     uuid references profiles on delete set null,
  date_issued   date,
  date_returned date,
  condition     text default 'Good' check (condition in ('Excellent','Good','Fair','Poor','Condemned')),
  status        text default 'armory' check (status in ('armory','issued','lost','condemned','maintenance')),
  created_at    timestamptz default now()
);

create table public.firearm_licenses (
  id            uuid primary key default uuid_generate_v4(),
  license_no    text unique not null,
  person_id     uuid not null references persons on delete cascade,
  firearm_type  text,
  make          text,
  serial_no     text,
  purpose       text,
  issued_at     date,
  expires_at    date,
  issued_by     text,
  status        text default 'active' check (status in ('active','expired','revoked','suspended')),
  created_at    timestamptz default now()
);

-- ── ASSETS (Mali ya Kituo) ──
create table public.assets (
  id            uuid primary key default uuid_generate_v4(),
  asset_no      text unique not null,
  name          text not null,
  type          text,
  make          text,
  model         text,
  serial_no     text,
  station_id    uuid references stations,
  assigned_to   uuid references profiles on delete set null,
  purchase_date date,
  purchase_price bigint,
  condition     text default 'Good',
  status        text default 'active' check (status in ('active','maintenance','disposed','lost')),
  created_at    timestamptz default now()
);

-- ── HR RECORDS ──
create table public.hr_records (
  id          uuid primary key default uuid_generate_v4(),
  officer_id  uuid not null references profiles on delete cascade,
  type        text not null check (type in ('training','leave','promotion','commendation','disciplinary','medical','transfer')),
  title       text,
  description text,
  date        date,
  approved_by uuid references profiles,
  attachments jsonb default '[]',
  status      text default 'active',
  created_by  uuid references profiles,
  created_at  timestamptz default now()
);

create index idx_hr_officer on hr_records(officer_id);
create index idx_hr_type    on hr_records(type);
