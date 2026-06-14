-- =========================================================
-- Migration 00009: Audit Logs & Auto-Numbering Sequences
-- =========================================================

-- ── AUDIT LOGS (Rekodi ya Ukaguzi) ──
-- Every action by every officer is logged here. IMMUTABLE.
create table public.audit_logs (
  id          uuid primary key default uuid_generate_v4(),
  officer_id  uuid references profiles on delete set null,
  badge       text,             -- denormalized (officer may be deleted)
  rank        text,
  full_name   text,
  station_id  uuid references stations on delete set null,
  station_name text,            -- denormalized
  action      text not null,    -- CREATE_CITATION, MAKE_ARREST, LOGIN, etc.
  table_name  text,
  record_id   uuid,
  record_no   text,             -- human-readable (CIT-2024-00001)
  old_data    jsonb,            -- before update
  new_data    jsonb,            -- after update / created data
  lat         double precision,
  lng         double precision,
  device_id   text,
  ip_address  text,
  user_agent  text,
  session_id  text,
  created_at  timestamptz default now()
);
comment on table audit_logs is 'Immutable audit trail – every officer action. Never deleted.';

-- Indexes for audit queries
create index idx_audit_officer  on audit_logs(officer_id, created_at desc);
create index idx_audit_action   on audit_logs(action);
create index idx_audit_table    on audit_logs(table_name);
create index idx_audit_date     on audit_logs(created_at desc);
create index idx_audit_station  on audit_logs(station_id, created_at desc);

-- Prevent deletion of audit records
create rule no_delete_audit_logs as on delete to audit_logs do instead nothing;

-- ── AUTO-NUMBERING SEQUENCES ──
-- Each table has its own sequence for human-readable IDs

create sequence citation_seq   start 1 increment 1;
create sequence arrest_seq     start 1 increment 1;
create sequence detention_seq  start 1 increment 1;
create sequence incident_seq   start 1 increment 1;
create sequence accident_seq   start 1 increment 1;
create sequence case_seq       start 1 increment 1;
create sequence evidence_seq   start 1 increment 1;
create sequence warrant_seq    start 1 increment 1;
create sequence patrol_seq     start 1 increment 1;
create sequence pf3_seq        start 1 increment 1;
create sequence intel_seq      start 1 increment 1;
create sequence prisoner_seq   start 1 increment 1;
create sequence forensic_seq   start 1 increment 1;

-- Functions to generate IDs with prefix + year + zero-padded number
create or replace function gen_citation_no()  returns text language sql as $$ select 'CIT-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('citation_seq')::text,  5,'0') $$;
create or replace function gen_arrest_no()    returns text language sql as $$ select 'AR-'   || to_char(now(),'YYYY') || '-' || lpad(nextval('arrest_seq')::text,    5,'0') $$;
create or replace function gen_detention_no() returns text language sql as $$ select 'DET-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('detention_seq')::text,  5,'0') $$;
create or replace function gen_incident_no()  returns text language sql as $$ select 'INC-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('incident_seq')::text,   5,'0') $$;
create or replace function gen_accident_no()  returns text language sql as $$ select 'ACC-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('accident_seq')::text,   5,'0') $$;
create or replace function gen_case_no()      returns text language sql as $$ select 'CASE-' || to_char(now(),'YYYY') || '-' || lpad(nextval('case_seq')::text,       5,'0') $$;
create or replace function gen_evidence_no()  returns text language sql as $$ select 'EVD-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('evidence_seq')::text,   5,'0') $$;
create or replace function gen_warrant_no()   returns text language sql as $$ select 'WRT-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('warrant_seq')::text,    5,'0') $$;
create or replace function gen_pf3_no()       returns text language sql as $$ select 'PF3-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('pf3_seq')::text,        5,'0') $$;
create or replace function gen_intel_no()     returns text language sql as $$ select 'INT-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('intel_seq')::text,      5,'0') $$;
create or replace function gen_prisoner_no()  returns text language sql as $$ select 'PRN-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('prisoner_seq')::text,   5,'0') $$;
create or replace function gen_forensic_no()  returns text language sql as $$ select 'FOR-'  || to_char(now(),'YYYY') || '-' || lpad(nextval('forensic_seq')::text,   5,'0') $$;

-- Auto-assign IDs via triggers
create or replace function set_citation_no()  returns trigger language plpgsql as $$ begin if new.citation_no is null then new.citation_no := gen_citation_no(); end if; return new; end $$;
create or replace function set_arrest_no()    returns trigger language plpgsql as $$ begin if new.arrest_no   is null then new.arrest_no   := gen_arrest_no();   end if; return new; end $$;
create or replace function set_detention_no() returns trigger language plpgsql as $$ begin if new.detention_no is null then new.detention_no:= gen_detention_no();end if; return new; end $$;
create or replace function set_incident_no()  returns trigger language plpgsql as $$ begin if new.report_no is null then new.report_no := gen_incident_no(); end if; return new; end $$;
create or replace function set_accident_no()  returns trigger language plpgsql as $$ begin if new.report_no is null then new.report_no := gen_accident_no(); end if; return new; end $$;
create or replace function set_case_no()      returns trigger language plpgsql as $$ begin if new.case_no   is null then new.case_no   := gen_case_no();   end if; return new; end $$;
create or replace function set_evidence_no()  returns trigger language plpgsql as $$ begin if new.evidence_no is null then new.evidence_no:= gen_evidence_no();end if; return new; end $$;
create or replace function set_warrant_no()   returns trigger language plpgsql as $$ begin if new.warrant_no is null then new.warrant_no := gen_warrant_no(); end if; return new; end $$;
create or replace function set_intel_no()     returns trigger language plpgsql as $$ begin if new.intel_no   is null then new.intel_no   := gen_intel_no();   end if; return new; end $$;
create or replace function set_prisoner_no()  returns trigger language plpgsql as $$ begin if new.prisoner_no is null then new.prisoner_no:= gen_prisoner_no();end if; return new; end $$;

create trigger trg_citation_no  before insert on citations          for each row execute function set_citation_no();
create trigger trg_arrest_no    before insert on arrests            for each row execute function set_arrest_no();
create trigger trg_detention_no before insert on detentions         for each row execute function set_detention_no();
create trigger trg_incident_no  before insert on incident_reports   for each row execute function set_incident_no();
create trigger trg_accident_no  before insert on accident_reports   for each row execute function set_accident_no();
create trigger trg_case_no      before insert on cases              for each row execute function set_case_no();
create trigger trg_evidence_no  before insert on evidence           for each row execute function set_evidence_no();
create trigger trg_warrant_no   before insert on warrants           for each row execute function set_warrant_no();
create trigger trg_intel_no     before insert on intelligence_files for each row execute function set_intel_no();
create trigger trg_prisoner_no  before insert on prisoners          for each row execute function set_prisoner_no();
