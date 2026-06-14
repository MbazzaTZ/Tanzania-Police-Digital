-- =========================================================
-- Migration 00007: Operations
-- Patrols · GPS · Checkpoints · Roadblocks · Intelligence · Alerts
-- =========================================================

-- ── PATROLS (Doria) ──
create table public.patrols (
  id          uuid primary key default uuid_generate_v4(),
  patrol_no   text unique not null,
  officer_id  uuid not null references profiles,
  station_id  uuid references stations,
  route       text,
  vehicle_plate text,
  start_time  timestamptz default now(),
  end_time    timestamptz,
  start_lat   double precision,
  start_lng   double precision,
  notes       text,
  status      text default 'active' check (status in ('active','completed','aborted')),
  created_at  timestamptz default now()
);

-- Live GPS of every online officer (upsert by officer_id)
create table public.officer_locations (
  officer_id   uuid primary key references profiles on delete cascade,
  lat          double precision not null,
  lng          double precision not null,
  accuracy     double precision,
  heading      double precision,
  speed        double precision,
  patrol_id    uuid references patrols,
  status       text default 'on_duty',
  updated_at   timestamptz default now()
);

-- GPS trail (every ping)
create table public.gps_trail (
  id           uuid primary key default uuid_generate_v4(),
  officer_id   uuid not null references profiles on delete cascade,
  lat          double precision not null,
  lng          double precision not null,
  accuracy     double precision,
  patrol_id    uuid references patrols,
  recorded_at  timestamptz default now()
);
create index idx_gps_trail_officer on gps_trail(officer_id, recorded_at desc);

-- ── CHECKPOINTS ──
create table public.checkpoints (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  officer_id   uuid not null references profiles,
  station_id   uuid references stations,
  location     text,
  lat          double precision,
  lng          double precision,
  start_time   timestamptz default now(),
  end_time     timestamptz,
  checks_count int default 0,
  citations_count int default 0,
  arrests_count   int default 0,
  status       text default 'active' check (status in ('active','completed','cancelled')),
  created_at   timestamptz default now()
);

-- ── ROADBLOCKS (Vizuizi) ──
create table public.roadblocks (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  location      text,
  lat           double precision,
  lng           double precision,
  officer_id    uuid not null references profiles,
  station_id    uuid references stations,
  authorized_by uuid references profiles,
  start_time    timestamptz not null,
  end_time      timestamptz,
  checks_count  int default 0,
  arrests_count int default 0,
  status        text default 'active' check (status in ('active','completed','cancelled')),
  created_at    timestamptz default now()
);

-- ── INTELLIGENCE FILES (Faili za Ujasusi) ──
create table public.intelligence_files (
  id              uuid primary key default uuid_generate_v4(),
  intel_no        text unique not null,
  title           text not null,
  classification  text not null default 'confidential'
                  check (classification in ('restricted','confidential','secret','top_secret')),
  threat_level    text default 'medium' check (threat_level in ('low','medium','high','critical')),
  content         text,
  summary         text,
  region          text,
  source          text,
  related_persons jsonb default '[]',
  attachments     jsonb default '[]',
  created_by      uuid not null references profiles,
  approved_by     uuid references profiles,
  status          text default 'active' check (status in ('active','investigating','archived')),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Intelligence access log (every view is logged)
create table public.intel_access_log (
  id           uuid primary key default uuid_generate_v4(),
  intel_id     uuid not null references intelligence_files on delete cascade,
  officer_id   uuid not null references profiles,
  action       text default 'view' check (action in ('view','download','print')),
  device_id    text,
  ip_address   text,
  accessed_at  timestamptz default now()
);

create index idx_intel_class   on intelligence_files(classification);
create index idx_intel_region  on intelligence_files(region);
create index idx_intel_status  on intelligence_files(status);

-- ── ALERTS & NOTIFICATIONS ──
create table public.alerts (
  id            uuid primary key default uuid_generate_v4(),
  type          text not null check (type in ('critical','urgent','info','reminder')),
  title         text not null,
  message       text,
  vehicle_plate text,   -- for vehicle alerts
  region        text,
  district      text,
  target_role   text,   -- which role should see this
  target_station uuid references stations,
  created_by    uuid references profiles,
  expires_at    timestamptz,
  read_by       jsonb default '[]',  -- [officer_id, ...]
  status        text default 'active' check (status in ('active','resolved','expired')),
  created_at    timestamptz default now()
);

create index idx_alerts_type   on alerts(type);
create index idx_alerts_status on alerts(status);

-- ── MESSAGES (Ujumbe kati ya Maafisa) ──
create table public.messages (
  id         uuid primary key default uuid_generate_v4(),
  from_id    uuid not null references profiles on delete cascade,
  to_id      uuid references profiles on delete set null,
  group_id   text,        -- for group messages
  content    text not null,
  priority   text default 'normal' check (priority in ('normal','urgent','classified')),
  read_at    timestamptz,
  created_at timestamptz default now()
);

create index idx_messages_to   on messages(to_id, created_at desc);
create index idx_messages_from on messages(from_id, created_at desc);

-- ── ESCALATIONS ──
create table public.escalations (
  id          uuid primary key default uuid_generate_v4(),
  from_id     uuid not null references profiles,
  to_id       uuid not null references profiles,
  record_type text,  -- 'citation','arrest','case','incident'
  record_id   uuid,
  reason      text,
  priority    text default 'high',
  status      text default 'pending' check (status in ('pending','acknowledged','resolved')),
  created_at  timestamptz default now()
);
