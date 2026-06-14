-- =========================================================
-- Migration 00005: Enforcement
-- Citations · Arrests · Detentions · Incidents · Accidents · PF3
-- =========================================================

-- ── CITATIONS (Tiketi) ──
create table public.citations (
  id              uuid primary key default uuid_generate_v4(),
  citation_no     text unique not null,   -- CIT-2024-00001
  suspect_id      uuid references persons on delete set null,
  vehicle_id      uuid references vehicles on delete set null,
  officer_id      uuid not null references profiles,
  station_id      uuid references stations,
  -- Offence
  offence_code    text not null,
  offence_name    text,
  law             text,
  law_section     text,
  fine_amount     bigint not null,
  -- Location & time
  location        text,
  lat             double precision,
  lng             double precision,
  issued_at       timestamptz default now(),
  -- Evidence
  photos          jsonb default '[]',
  notes           text,
  -- Device
  device_id       text,
  gps_accuracy    double precision,
  -- Payment
  paid_at         timestamptz,
  payment_ref     text,
  -- Status
  status          text default 'issued'
                  check (status in ('draft','issued','paid','unpaid','cancelled','disputed')),
  cancelled_reason text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index idx_citations_no       on citations(citation_no);
create index idx_citations_suspect  on citations(suspect_id);
create index idx_citations_officer  on citations(officer_id);
create index idx_citations_station  on citations(station_id);
create index idx_citations_status   on citations(status);
create index idx_citations_issued   on citations(issued_at desc);
create index idx_citations_vehicle  on citations(vehicle_id);

create trigger trg_citations_updated_at before update on citations
  for each row execute function update_updated_at();

-- ── ARRESTS (Kukamatwa) ──
create table public.arrests (
  id                uuid primary key default uuid_generate_v4(),
  arrest_no         text unique not null,   -- AR-2024-00001
  suspect_id        uuid references persons on delete set null,
  officer_id        uuid not null references profiles,
  station_id        uuid references stations,
  -- Arrest details
  arrest_time       timestamptz not null,
  location          text,
  lat               double precision,
  lng               double precision,
  method            text check (method in ('in_person','warrant','surveillance','tip')),
  operation_type    text,
  lead_officer_name text,
  -- Rights
  rights_read       boolean default false,
  rights_read_at    timestamptz,
  -- Witnesses & officers
  witnesses         jsonb default '[]',  -- [{name, phone, location, relationship}]
  officers_present  jsonb default '[]',  -- [{name, badge, rank, role}]
  -- Evidence
  photos            jsonb default '[]',
  description       text,
  -- Device
  device_id         text,
  -- Status
  status            text default 'pending'
                    check (status in ('pending','detained','court','released','completed')),
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

create table public.arrest_charges (
  id          uuid primary key default uuid_generate_v4(),
  arrest_id   uuid not null references arrests on delete cascade,
  charge_code text not null,
  charge_name text,
  law         text,
  law_section text,
  charge_type text check (charge_type in ('Felony','Misdemeanor','Infraction')),
  status      text default 'pending',
  created_at  timestamptz default now()
);

create index idx_arrests_no       on arrests(arrest_no);
create index idx_arrests_suspect  on arrests(suspect_id);
create index idx_arrests_officer  on arrests(officer_id);
create index idx_arrests_station  on arrests(station_id);
create index idx_arrests_time     on arrests(arrest_time desc);
create index idx_arrests_status   on arrests(status);
create index idx_arrest_charges   on arrest_charges(arrest_id);

create trigger trg_arrests_updated_at before update on arrests
  for each row execute function update_updated_at();

-- ── DETENTIONS (Kizuizini) ──
create table public.detentions (
  id              uuid primary key default uuid_generate_v4(),
  detention_no    text unique not null,
  person_id       uuid references persons on delete set null,
  arrest_id       uuid references arrests on delete set null,
  officer_id      uuid not null references profiles,
  station_id      uuid references stations,
  cell_no         text,
  reason          text,
  checkin_time    timestamptz default now(),
  checkout_time   timestamptz,
  max_hours       int default 48,
  released_by     uuid references profiles,
  release_reason  text,
  status          text default 'active' check (status in ('active','released','transferred')),
  created_at      timestamptz default now()
);

create index idx_detentions_person  on detentions(person_id);
create index idx_detentions_station on detentions(station_id);
create index idx_detentions_status  on detentions(status);

-- ── INCIDENT REPORTS (Ripoti za Tukio) ──
create table public.incident_reports (
  id            uuid primary key default uuid_generate_v4(),
  report_no     text unique not null,
  type          text not null,
  description   text,
  officer_id    uuid not null references profiles,
  station_id    uuid references stations,
  location      text,
  lat           double precision,
  lng           double precision,
  occurred_at   timestamptz,
  reported_at   timestamptz default now(),
  priority      text default 'medium' check (priority in ('low','medium','high','critical')),
  -- Damage
  damage_type   text,
  damage_value  bigint default 0,
  injured       boolean default false,
  injuries_count int default 0,
  -- Involved parties
  suspects      jsonb default '[]',
  witnesses     jsonb default '[]',
  -- Attachments
  attachments   jsonb default '[]',
  -- Status
  status        text default 'pending' check (status in ('pending','investigating','resolved','closed')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index idx_incidents_type    on incident_reports(type);
create index idx_incidents_station on incident_reports(station_id);
create index idx_incidents_status  on incident_reports(status);
create index idx_incidents_date    on incident_reports(occurred_at desc);

create trigger trg_incidents_updated_at before update on incident_reports
  for each row execute function update_updated_at();

-- ── ACCIDENT REPORTS (Ripoti za Ajali) ──
create table public.accident_reports (
  id            uuid primary key default uuid_generate_v4(),
  report_no     text unique not null,
  officer_id    uuid not null references profiles,
  station_id    uuid references stations,
  location      text,
  lat           double precision,
  lng           double precision,
  occurred_at   timestamptz,
  type          text,
  vehicles_count int default 0,
  casualties_count int default 0,
  fatalities_count int default 0,
  vehicles      jsonb default '[]',  -- [{plate, make, model, driver_name, driver_nida}]
  casualties    jsonb default '[]',  -- [{name, type, injuries}]
  description   text,
  damage_value  bigint default 0,
  photos        jsonb default '[]',
  status        text default 'pending' check (status in ('pending','investigating','completed','court')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index idx_accidents_station on accident_reports(station_id);
create index idx_accidents_date    on accident_reports(occurred_at desc);

-- ── PF3 FORMS ──
create table public.pf3_forms (
  id           uuid primary key default uuid_generate_v4(),
  form_no      text unique not null,
  person_id    uuid references persons on delete set null,
  officer_id   uuid not null references profiles,
  station_id   uuid references stations,
  type         text not null,
  details      jsonb default '{}',
  status       text default 'draft' check (status in ('draft','submitted','approved','rejected')),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);
