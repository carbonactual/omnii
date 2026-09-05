begin;

create table if not exists public.omnii_worker_runs (
  id text primary key,
  worker_id text not null,
  run_kind text not null,
  status text not null default 'running',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  processed integer not null default 0,
  completed integer not null default 0,
  blocked integer not null default 0,
  failed integer not null default 0,
  recovered integer not null default 0,
  escalated integer not null default 0,
  result jsonb not null default '{}'::jsonb,
  error text,
  created_at timestamptz not null default now(),
  check (run_kind in ('worker_tick','lease_recovery')),
  check (status in ('running','succeeded','failed'))
);

create index if not exists omnii_worker_runs_started_idx
  on public.omnii_worker_runs (started_at desc, run_kind, status);

alter table public.omnii_worker_runs enable row level security;
revoke all on public.omnii_worker_runs from public, anon, authenticated;
grant select, insert, update on public.omnii_worker_runs to service_role;

create or replace function public.omnii_recover_expired_process_tasks(p_limit integer default 50)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $recover$
declare
  v_limit integer := greatest(1, least(coalesce(p_limit, 50), 200));
  v_run_id text := 'lease-recovery:' || gen_random_uuid()::text;
  v_worker_id constant text := 'cron:omnii-lease-recovery';
  v_recovered integer := 0;
  v_escalated integer := 0;
  v_failed integer := 0;
  v_task record;
  v_max_attempts integer;
  v_delay_seconds integer;
begin
  if not pg_try_advisory_xact_lock(hashtextextended('omnii:lease-recovery', 0)) then
    return jsonb_build_object('status','skipped','reason','recovery_already_running','recovered',0,'escalated',0,'failed',0);
  end if;

  insert into public.omnii_worker_runs (id, worker_id, run_kind, status)
  values (v_run_id, v_worker_id, 'lease_recovery', 'running');

  for v_task in
    select t.*
      from public.omnii_process_tasks t
     where t.status = 'in_progress'
       and t.lease_expires_at is not null
       and t.lease_expires_at <= now()
     order by t.lease_expires_at asc, t.created_at asc
     for update skip locked
     limit v_limit
  loop
    begin
      v_max_attempts := coalesce(v_task.max_attempts, 0);
      if v_max_attempts > 0 and coalesce(v_task.attempt_count, 0) >= v_max_attempts then
        perform public.omnii_escalate_process_task(
          v_task.id,
          v_task.version,
          v_worker_id,
          'Worker lease expired and retry limit was exhausted.',
          v_task.assignee_id
        );
        v_escalated := v_escalated + 1;
      else
        v_delay_seconds := least(3600, greatest(5, power(2, greatest(coalesce(v_task.attempt_count,1) - 1, 0))::integer));
        update public.omnii_process_tasks
           set status = 'ready',
               claimed_by = null,
               claimed_at = null,
               lease_expires_at = null,
               next_attempt_at = now() + make_interval(secs => v_delay_seconds),
               last_error = 'Worker lease expired; task returned to governed queue for retry.',
               version = (version::integer + 1)::text,
               updated_at = now()
         where id = v_task.id and version = v_task.version;
        if found then v_recovered := v_recovered + 1; end if;
      end if;
    exception when others then
      v_failed := v_failed + 1;
      update public.omnii_process_tasks
         set status = 'blocked',
             error_code = 'LEASE_RECOVERY_EXCEPTION',
             error_message = left(sqlerrm, 1000),
             claimed_by = null,
             claimed_at = null,
             lease_expires_at = null,
             version = (version::integer + 1)::text,
             updated_at = now()
       where id = v_task.id;
    end;
  end loop;

  update public.omnii_worker_runs
     set status = case when v_failed > 0 then 'failed' else 'succeeded' end,
         finished_at = now(),
         recovered = v_recovered,
         escalated = v_escalated,
         failed = v_failed,
         result = jsonb_build_object('recovered',v_recovered,'escalated',v_escalated,'failed',v_failed)
   where id = v_run_id;

  return jsonb_build_object(
    'status', case when v_failed > 0 then 'failed' else 'ok' end,
    'worker_id', v_worker_id,
    'recovered', v_recovered,
    'escalated', v_escalated,
    'failed', v_failed,
    'run_id', v_run_id,
    'ran_at', now()
  );
end;
$recover$;

revoke all on function public.omnii_recover_expired_process_tasks(integer) from public, anon, authenticated;
grant execute on function public.omnii_recover_expired_process_tasks(integer) to service_role;

after recovery;

drop view if exists public.omnii_worker_health;
create view public.omnii_worker_health as
select
  count(*) filter (where status in ('pending','ready')) as queued,
  count(*) filter (where status = 'in_progress') as in_progress,
  count(*) filter (where status = 'blocked') as blocked,
  count(*) filter (where status in ('completed','rejected','skipped')) as terminal,
  count(*) filter (where status = 'in_progress' and lease_expires_at <= now()) as expired_leases,
  count(*) filter (where due_at is not null and due_at < now() and status not in ('completed','rejected','skipped')) as overdue,
  coalesce(sum(attempt_count),0) as total_attempts
from public.omnii_process_tasks;

revoke all on public.omnii_worker_health from public, anon, authenticated;
grant select on public.omnii_worker_health to service_role;

create or replace function public.omnii_worker_cycle(p_limit integer default 10)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $cycle$
declare
  v_run_id text := 'worker-tick:' || gen_random_uuid()::text;
  v_result jsonb;
  v_status text;
begin
  insert into public.omnii_worker_runs (id, worker_id, run_kind, status)
  values (v_run_id, 'cron:omnii-continuous-worker', 'worker_tick', 'running');
  begin
    v_result := public.omnii_worker_tick(p_limit);
    v_status := coalesce(v_result->>'status', 'ok');
    update public.omnii_worker_runs
       set status = case when v_status = 'failed' then 'failed' else 'succeeded' end,
           finished_at = now(),
           processed = coalesce((v_result->>'processed')::integer, 0),
           completed = coalesce((v_result->>'completed')::integer, 0),
           blocked = coalesce((v_result->>'blocked')::integer, 0),
           failed = coalesce((v_result->>'failed')::integer, 0),
           result = coalesce(v_result, '{}'::jsonb)
     where id = v_run_id;
    return coalesce(v_result, '{}'::jsonb) || jsonb_build_object('run_id', v_run_id);
  exception when others then
    update public.omnii_worker_runs
       set status = 'failed', finished_at = now(), failed = 1, error = left(sqlerrm, 1000)
     where id = v_run_id;
    return jsonb_build_object('status','failed','run_id',v_run_id,'error',left(sqlerrm,1000));
  end;
end;
$cycle$;

revoke all on function public.omnii_worker_cycle(integer) from public, anon, authenticated;
grant execute on function public.omnii_worker_cycle(integer) to service_role;

do $cron$
begin
  if exists (select 1 from cron.job where jobname='omnii-continuous-worker') then
    perform cron.unschedule('omnii-continuous-worker');
  end if;
  perform cron.schedule('omnii-continuous-worker','30 seconds','select public.omnii_worker_cycle(10);');

  if exists (select 1 from cron.job where jobname='omnii-lease-recovery') then
    perform cron.unschedule('omnii-lease-recovery');
  end if;
  perform cron.schedule('omnii-lease-recovery','60 seconds','select public.omnii_recover_expired_process_tasks(50);');
end;
$cron$;

commit;
