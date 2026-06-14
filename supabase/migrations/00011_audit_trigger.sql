-- =========================================================
-- Migration 00011: Automatic Audit Trigger
-- Every INSERT/UPDATE/DELETE on key tables is logged
-- =========================================================

create or replace function log_audit()
returns trigger language plpgsql security definer as $$
declare
  v_officer_id  uuid;
  v_badge       text;
  v_rank        text;
  v_full_name   text;
  v_station_id  uuid;
  v_station_name text;
  v_action      text;
  v_record_id   uuid;
begin
  -- Get current officer info
  select p.id, p.badge, p.rank, p.full_name, p.station_id, s.name
    into v_officer_id, v_badge, v_rank, v_full_name, v_station_id, v_station_name
  from profiles p
  left join stations s on s.id = p.station_id
  where p.id = auth.uid();

  -- Determine action
  v_action := TG_OP || '_' || upper(TG_TABLE_NAME);

  -- Get record id
  if TG_OP = 'DELETE' then
    v_record_id := OLD.id;
  else
    v_record_id := NEW.id;
  end if;

  insert into audit_logs (
    officer_id, badge, rank, full_name,
    station_id, station_name,
    action, table_name, record_id,
    old_data, new_data
  ) values (
    v_officer_id, v_badge, v_rank, v_full_name,
    v_station_id, v_station_name,
    v_action, TG_TABLE_NAME, v_record_id,
    case when TG_OP != 'INSERT' then to_jsonb(OLD) else null end,
    case when TG_OP != 'DELETE' then to_jsonb(NEW) else null end
  );

  if TG_OP = 'DELETE' then return OLD; else return NEW; end if;
end;
$$;

-- Attach trigger to all key tables
create trigger audit_citations    after insert or update or delete on citations          for each row execute function log_audit();
create trigger audit_arrests      after insert or update or delete on arrests            for each row execute function log_audit();
create trigger audit_cases        after insert or update or delete on cases              for each row execute function log_audit();
create trigger audit_evidence     after insert or update or delete on evidence           for each row execute function log_audit();
create trigger audit_warrants     after insert or update or delete on warrants           for each row execute function log_audit();
create trigger audit_intelligence after insert or update or delete on intelligence_files for each row execute function log_audit();
create trigger audit_prisoners    after insert or update or delete on prisoners          for each row execute function log_audit();
create trigger audit_profiles     after update                      on profiles          for each row execute function log_audit();
