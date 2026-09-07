begin;

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
       set status = 'failed',
           finished_at = now(),
           failed = 1,
           error = left(sqlerrm, 1000)
     where id = v_run_id;

    return jsonb_build_object(
      'status', 'failed',
      'run_id', v_run_id,
      'error', left(sqlerrm, 1000)
    );
  end;
end;
$cycle$;

revoke all on function public.omnii_worker_cycle(integer) from public, anon, authenticated;
grant execute on function public.omnii_worker_cycle(integer) to service_role;

do $cron$
begin
  if exists (select 1 from cron.job where jobname = 'omnii-continuous-worker') then
    perform cron.unschedule('omnii-continuous-worker');
  end if;
  perform cron.schedule('omnii-continuous-worker', '30 seconds', 'select public.omnii_worker_cycle(10);');
end;
$cron$;

commit;
