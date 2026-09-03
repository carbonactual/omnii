-- OMNII Continuous Worker Scheduler
-- Runs only governed, deterministic queue work. Authority-dependent work remains blocked.

create or replace function public.omnii_worker_tick(p_limit integer default 10)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $worker$
declare
  v_limit integer := greatest(1, least(coalesce(p_limit, 10), 50));
  v_claimed integer := 0;
  v_completed integer := 0;
  v_blocked integer := 0;
  v_failed integer := 0;
  v_task record;
  v_claim jsonb;
  v_handler record;
  v_evidence jsonb;
  v_outcome jsonb;
begin
  if not pg_try_advisory_xact_lock(hashtextextended('omnii:continuous-worker-tick', 0)) then
    return jsonb_build_object('status','skipped','reason','tick_already_running','claimed',0,'completed',0,'blocked',0,'failed',0);
  end if;

  for v_task in
    select t.id, t.process_instance_id
    from public.omnii_process_tasks t
    where t.status in ('pending', 'ready')
      and (t.available_at is null or t.available_at <= now())
    order by coalesce(t.priority, 0) desc, t.created_at asc, t.id asc
    for update skip locked
    limit v_limit
  loop
    begin
      select public.omnii_claim_process_task(v_task.id) into v_claim;
      if coalesce((v_claim->>'claimed')::boolean, false) is not true then
        continue;
      end if;
      v_claimed := v_claimed + 1;

      select h.id, h.task_type, h.handler_key, h.execution_mode,
             h.outcome_event, h.evidence_template, h.authority_requirements, h.lifecycle
      into v_handler
      from public.omnii_process_task_handlers h
      join public.omnii_process_tasks t on t.id = v_task.id
      where h.id = t.handler_id
        and h.task_type = t.task_type
        and h.lifecycle = 'active'
      limit 1;

      if not found then
        update public.omnii_process_tasks
        set status='blocked', error_code='HANDLER_NOT_REGISTERED',
            error_message='No active exact task handler binding exists for this task.', updated_at=now()
        where id=v_task.id;
        v_blocked := v_blocked + 1;
        continue;
      end if;

      if v_handler.execution_mode <> 'deterministic' then
        update public.omnii_process_tasks
        set status='blocked', error_code='EXECUTION_MODE_NOT_AUTONOMOUS',
            error_message='Continuous worker will not execute non-deterministic handlers.', updated_at=now()
        where id=v_task.id;
        v_blocked := v_blocked + 1;
        continue;
      end if;

      if coalesce(jsonb_array_length(coalesce(v_handler.authority_requirements, '[]'::jsonb)), 0) > 0 then
        update public.omnii_process_tasks
        set status='blocked', error_code='AUTHORITY_REQUIRED',
            error_message='Human or delegated authority is required before this task can execute.', updated_at=now()
        where id=v_task.id;
        v_blocked := v_blocked + 1;
        continue;
      end if;

      if v_handler.handler_key <> 'workflow_stage' then
        update public.omnii_process_tasks
        set status='blocked', error_code='HANDLER_NOT_ALLOWLISTED',
            error_message='Handler is registered but not allowlisted for autonomous execution.', updated_at=now()
        where id=v_task.id;
        v_blocked := v_blocked + 1;
        continue;
      end if;

      v_evidence := coalesce(v_handler.evidence_template, '{}'::jsonb) ||
        jsonb_build_object('scheduler','omnii_worker_tick','handler_key',v_handler.handler_key,'executed_at',now());
      v_outcome := jsonb_build_object('status','completed','outcome_event',v_handler.outcome_event,'handler_key',v_handler.handler_key);

      update public.omnii_process_tasks
      set status='completed', completed_at=now(), evidence=v_evidence, outcome=v_outcome, updated_at=now()
      where id=v_task.id;

      perform public.omnii_progress_process(v_task.process_instance_id, v_handler.outcome_event, v_outcome);
      v_completed := v_completed + 1;
    exception when others then
      update public.omnii_process_tasks
      set status='blocked', error_code='WORKER_TICK_EXCEPTION', error_message=left(sqlerrm,1000), updated_at=now()
      where id=v_task.id;
      v_failed := v_failed + 1;
    end;
  end loop;

  return jsonb_build_object('status','ok','claimed',v_claimed,'completed',v_completed,'blocked',v_blocked,'failed',v_failed,'ran_at',now());
end;
$worker$;

revoke all on function public.omnii_worker_tick(integer) from public;
revoke all on function public.omnii_worker_tick(integer) from anon;
revoke all on function public.omnii_worker_tick(integer) from authenticated;
grant execute on function public.omnii_worker_tick(integer) to service_role;

do $cron$
begin
  if exists (select 1 from cron.job where jobname = 'omnii-continuous-worker') then
    perform cron.unschedule('omnii-continuous-worker');
  end if;
  perform cron.schedule(
    'omnii-continuous-worker',
    '30 seconds',
    'select public.omnii_worker_tick(10);'
  );
exception when undefined_table or undefined_function then
  raise exception 'pg_cron is required before enabling omnii-continuous-worker';
end;
$cron$;
