-- Scheduler regression checks. Run against a disposable/local Supabase database.
-- The assertions intentionally avoid requiring live business data.

do $$
declare
  v_job record;
  v_acl text;
begin
  if not exists (select 1 from pg_proc where proname = 'omnii_worker_tick') then
    raise exception 'omnii_worker_tick function missing';
  end if;

  if not exists (select 1 from cron.job where jobname = 'omnii-continuous-worker') then
    raise exception 'omnii-continuous-worker cron job missing';
  end if;

  select * into v_job from cron.job where jobname = 'omnii-continuous-worker';

  if v_job.active is not true then
    raise exception 'omnii-continuous-worker is not active';
  end if;

  if v_job.schedule <> '30 seconds' then
    raise exception 'unexpected scheduler cadence: %', v_job.schedule;
  end if;

  select array_to_string(array_agg(privilege_type order by privilege_type), ',')
  into v_acl
  from information_schema.routine_privileges
  where routine_schema = 'public'
    and routine_name = 'omnii_worker_tick'
    and grantee = 'authenticated';

  if v_acl is not null then
    raise exception 'authenticated users must not execute omnii_worker_tick: %', v_acl;
  end if;
end $$;
