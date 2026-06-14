-- =========================================================
-- Migration 00006: Investigation
-- Cases · Evidence · Chain of Custody · Warrants · Wanted · Missing
-- =========================================================

-- ── CASES (Kesi) ──
create table public.cases (
  id            uuid primary key default uuid_generate_v4(),
  case_no       text unique not null,   -- CASE-2024-00001
  title         text not null,
  type          text not null,          -- Criminal, Fraud, Narcotics, etc.
  officer_id    uuid not null references profiles,
  station_id    uuid references stations,
  region_id     uuid references regions,
  priority      text default 'medium'  check (priority in ('low','medium','high','critical')),
  status        text default 'open'    check (status in ('open','investigating','pending','court','closed')),
  description   text,
  suspects      jsonb default '[]',    -- [{person_id, name, nida, role}]
  witnesses     jsonb default '[]',
  linked_cases  jsonb default '[]',    -- [case_no, ...]
  closed_at     timestamptz,
  closed_reason text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.case_suspects (
  id         uuid primary key default uuid_generate_v4(),
  case_id    uuid not null references cases on delete cascade,
  person_id  uuid references persons on delete set null,
  role       text,
  status     text default 'suspected',
  notes      text,
  added_at   timestamptz default now()
);

create table public.case_updates (
  id         uuid primary key default uuid_generate_v4(),
  case_id    uuid not null references cases on delete cascade,
  officer_id uuid not null references profiles,
  type       text default 'update' check (type in ('update','evidence','arrest','court','close')),
  content    text not null,
  attachments jsonb default '[]',
  created_at timestamptz default now()
);

create index idx_cases_no       on cases(case_no);
create index idx_cases_officer  on cases(officer_id);
create index idx_cases_station  on cases(station_id);
create index idx_cases_status   on cases(status);
create index idx_cases_priority on cases(priority);
create index idx_cases_type     on cases(type);

create trigger trg_cases_updated_at before update on cases
  for each row execute function update_updated_at();

-- ── EVIDENCE ──
create table public.evidence (
  id              uuid primary key default uuid_generate_v4(),
  evidence_no     text unique not null,  -- EVD-2024-00001
  case_id         uuid not null references cases on delete cascade,
  type            text not null check (type in ('photo','video','audio','document','physical','digital','forensic')),
  description     text,
  file_url        text,
  file_name       text,
  file_size       bigint,
  file_hash       text,       -- SHA-256 for tamper detection
  collected_by    uuid not null references profiles,
  collected_at    timestamptz default now(),
  location        text,
  storage_location text,      -- physical storage e.g. "Shelf A-3"
  status          text default 'active' check (status in ('active','submitted','court','returned','destroyed')),
  tamper_detected boolean default false,
  created_at      timestamptz default now()
);

-- Chain of Custody — every hand that touched the evidence
create table public.evidence_chain (
  id          uuid primary key default uuid_generate_v4(),
  evidence_id uuid not null references evidence on delete cascade,
  officer_id  uuid not null references profiles,
  action      text not null check (action in ('collected','transferred','submitted','returned','examined','stored')),
  from_location text,
  to_location   text,
  notes         text,
  signature_url text,
  created_at    timestamptz default now()
);

create index idx_evidence_case    on evidence(case_id);
create index idx_evidence_type    on evidence(type);
create index idx_evidence_chain   on evidence_chain(evidence_id);

-- ── FORENSICS ──
create table public.forensic_reports (
  id          uuid primary key default uuid_generate_v4(),
  report_no   text unique not null,
  evidence_id uuid references evidence on delete set null,
  case_id     uuid references cases on delete cascade,
  type        text not null check (type in ('fingerprint','dna','ballistics','digital','document')),
  analyst     text,
  lab         text,
  findings    text,
  result      text check (result in ('match','no_match','inconclusive','pending')),
  submitted_at timestamptz,
  completed_at timestamptz,
  status      text default 'pending' check (status in ('pending','in_progress','completed')),
  created_at  timestamptz default now()
);

-- ── WARRANTS (Amri za Mahakama) ──
create table public.warrants (
  id          uuid primary key default uuid_generate_v4(),
  warrant_no  text unique not null,   -- WRT-2024-00001
  person_id   uuid references persons on delete set null,
  case_id     uuid references cases on delete set null,
  type        text not null check (type in ('arrest','search','seizure')),
  court       text not null,
  judge       text,
  description text,
  issued_at   timestamptz,
  expires_at  timestamptz,
  executed_at timestamptz,
  executed_by uuid references profiles,
  urgent      boolean default false,
  status      text default 'active' check (status in ('active','executed','expired','cancelled')),
  created_at  timestamptz default now()
);

create index idx_warrants_person  on warrants(person_id);
create index idx_warrants_status  on warrants(status);

-- ── WANTED PERSONS ──
create table public.wanted_persons (
  id           uuid primary key default uuid_generate_v4(),
  person_id    uuid references persons on delete set null,
  case_id      uuid references cases on delete set null,
  crime        text not null,
  alias        text,
  description  text,
  last_seen    text,
  last_seen_at timestamptz,
  region       text,
  reward       bigint default 0,
  dangerous    boolean default false,
  armed        boolean default false,
  photo_url    text,
  added_by     uuid references profiles,
  status       text default 'active' check (status in ('active','captured','deceased','cancelled')),
  created_at   timestamptz default now()
);

create index idx_wanted_status  on wanted_persons(status);
create index idx_wanted_region  on wanted_persons(region);

-- ── MISSING PERSONS ──
create table public.missing_persons (
  id              uuid primary key default uuid_generate_v4(),
  person_id       uuid references persons on delete set null,
  reporter_name   text,
  reporter_phone  text,
  reporter_relation text,
  last_seen       text,
  last_seen_at    timestamptz,
  last_seen_region text,
  description     text,
  photo_url       text,
  officer_id      uuid references profiles,
  station_id      uuid references stations,
  status          text default 'active' check (status in ('active','found','closed')),
  found_at        timestamptz,
  found_details   text,
  created_at      timestamptz default now()
);
