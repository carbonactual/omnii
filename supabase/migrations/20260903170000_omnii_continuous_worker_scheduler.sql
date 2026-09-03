-- OMNII Continuous Worker Scheduler
-- Database-native continuous execution for governed, deterministic event handlers.
-- External/human work is escalated; no authority is acquired by the scheduler.

create extension if not exists pg_cron;

create or replace function public.omnii_worker_tick(p_limit integer default 10)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $worker$
declare
  v_limit integer := greatest(1, least(coalesce(p_limit, 10), 20));
  v_worker_id constant text := 'cron:omnii-continuous-worker';
  v_processed integer := 0; v_completed integer := 0; v_blocked integer := 0; v_failed integer := 0;
  v_claim jsonb; v_task jsonb; v_handler record; v_process public.omnii_process_instances%rowtype; v_workflow record;
  v_stage_transitions jsonb; v_match jsonb; v_next_tasks jsonb := '[]'::jsonb; v_task_item jsonb;
  v_waiting_approval boolean := false; v_terminal boolean := false; v_next_stage text; v_expected_version text;
  v_outcome jsonb; v_evidence jsonb; v_patch jsonb; v_event jsonb; v_completion jsonb; v_progress jsonb; v_next_idx integer := 0;
begin
  if not pg_try_advisory_xact_lock(hashtextextended('omnii:continuous-worker-tick', 0)) then
    return jsonb_build_object('status','skipped','reason','tick_already_running','processed',0,'completed',0,'blocked',0,'failed',0);
  end if;
  for v_next_idx in 1..v_limit loop
    select public.omnii_claim_process_task('cron:omnii-continuous-worker', 300) into v_claim;
    if coalesce((v_claim->>'claimed')::boolean, false) is not true then exit; end if;
    v_processed := v_processed + 1; v_task := v_claim->'task'; v_expected_version := coalesce(v_task->>'version','1');
    begin
      select h.* into v_handler from public.omnii_process_task_handlers h
       where h.id = coalesce(nullif(v_task->'requirements'->>'handlerId',''), 'system.' || (v_task->>'task_type'))
         and h.task_type=v_task->>'task_type' and h.lifecycle='active' limit 1;
      if not found then
        perform public.omnii_escalate_process_task(v_task->>'id',v_expected_version,'cron:omnii-continuous-worker','No eligible registered handler for task type: '||v_task->>'task_type');
        v_blocked := v_blocked + 1; continue;
      end if;
      if v_handler.execution_mode <> 'event' or coalesce(v_handler.outcome_event,'')='' then
        perform public.omnii_escalate_process_task(v_task->>'id',v_expected_version,'cron:omnii-continuous-worker','Handler '||v_handler.id||' requires an external or human execution boundary');
        v_blocked := v_blocked + 1; continue;
      end if;
      v_evidence := case when jsonb_typeof(coalesce(v_handler.evidence_template,'[]'::jsonb))='array' then coalesce(v_handler.evidence_template,'[]'::jsonb) else '[]'::jsonb end;
      v_outcome := jsonb_build_object('event',v_handler.outcome_event,'result','completed','handler_key',v_handler.handler_key,'worker_id','cron:omnii-continuous-worker');
      select public.omnii_transition_process_task(v_task->>'id',v_expected_version,'completed','cron:omnii-continuous-worker',v_outcome,v_evidence,null) into v_completion;
      select * into v_process from public.omnii_process_instances where id=v_task->>'process_id';
      if found and v_process.workflow_id is not null and v_process.workflow_version is not null then
        select w.* into v_workflow from public.omnii_institutional_workflows w where w.id=v_process.workflow_id and w.version=v_process.workflow_version and w.lifecycle='active' limit 1;
        if found then
          v_stage_transitions := coalesce(v_workflow.transitions->v_process.current_stage,'[]'::jsonb); v_match:=null; v_next_stage:=null;
          for v_task_item in select value from jsonb_array_elements(v_stage_transitions) loop
            if coalesce(v_task_item->>'event','')=v_handler.outcome_event and nullif(v_task_item->>'to','') is not null then
              if v_match is not null then v_match:=null; exit; end if; v_match:=v_task_item;
            end if;
          end loop;
          if v_match is not null then
            v_next_stage:=v_match->>'to'; v_next_tasks:='[]'::jsonb; v_waiting_approval:=false; v_terminal:=coalesce((v_match->>'terminal')::boolean,false);
            for v_task_item in select value from jsonb_array_elements(coalesce(v_workflow.transitions->v_next_stage,'[]'::jsonb)) loop
              v_next_tasks := v_next_tasks || jsonb_build_array(jsonb_build_object(
                'id',v_process.id||':'||v_next_stage||':'||coalesce(v_task_item->>'event','step')||':'||jsonb_array_length(v_next_tasks),
                'version','1','process_id',v_process.id,'stage',v_next_stage,'task_type',coalesce(v_task_item->>'task_type','workflow_stage'),'assignee_id',nullif(v_task_item->>'assignee_id',''),
                'status',case when coalesce((v_task_item->>'approval_required')::boolean,false) then 'blocked' else 'ready' end,'due_at',nullif(v_task_item->>'due_at',''),
                'payload',coalesce(v_task_item->'payload','{}'::jsonb)||jsonb_build_object('source_task_id',v_task->>'id','transition_event',coalesce(v_task_item->>'event','')),
                'requirements',coalesce(v_task_item->'requirements','{}'::jsonb)||case when coalesce((v_task_item->>'approval_required')::boolean,false) then jsonb_build_object('approvalRequired',true) else '{}'::jsonb end,
                'outcome','{}','evidence','[]','created_at',now(),'updated_at',now(),
                'idempotency_key',v_process.id||':'||v_next_stage||':'||coalesce(v_task_item->>'event','step')||':'||jsonb_array_length(v_next_tasks)
              ));
              if coalesce((v_task_item->>'approval_required')::boolean,false) then v_waiting_approval:=true; end if;
            end loop;
            v_patch:=jsonb_build_object('current_stage',v_next_stage,'status',case when v_terminal then 'completed' when v_waiting_approval then 'blocked' else 'active' end,
              'state',coalesce(v_process.state,'{}'::jsonb)||jsonb_build_object('waiting_approval',v_waiting_approval,'last_transition',jsonb_build_object('from',v_process.current_stage,'to',v_next_stage,'event',v_handler.outcome_event,'task_id',v_task->>'id')),
              'completed_at',case when v_terminal then now() else null end,'version',((coalesce(v_process.version,'1'))::integer+1)::text);
            v_event:=jsonb_build_object('id','process-progress:'||v_process.id||':'||v_task->>'id','version','1','lifecycle','active','authority','{}',
              'provenance',jsonb_build_object('workflow_id',v_workflow.id,'workflow_version',v_workflow.version,'task_id',v_task->>'id','worker_id','cron:omnii-continuous-worker'),
              'payload',jsonb_build_object('type','PROCESS_TRANSITION_RESOLVED','actor','cron:omnii-continuous-worker','from',v_process.current_stage,'to',v_next_stage,'event',v_handler.outcome_event),
              'correlation_id',v_process.id,'idempotency_key','process-progress:'||v_process.id||':'||v_task->>'id','occurred_at',now());
            select public.omnii_progress_process(v_process.id,coalesce(v_process.version,'1'),v_patch,v_next_tasks,v_event) into v_progress;
          end if;
        end if;
      end if;
      v_completed:=v_completed+1;
    exception when others then
      begin
        perform public.omnii_escalate_process_task(v_task->>'id',v_expected_version,'cron:omnii-continuous-worker','Continuous worker exception: '||left(sqlerrm,900));
      exception when others then null; end;
      v_failed:=v_failed+1;
    end;
  end loop;
  return jsonb_build_object('status','ok','worker_id','cron:omnii-continuous-worker','processed',v_processed,'completed',v_completed,'blocked',v_blocked,'failed',v_failed,'ran_at',now());
end;
$worker$;

revoke all on function public.omnii_worker_tick(integer) from public, anon, authenticated;
grant execute on function public.omnii_worker_tick(integer) to service_role;

do $cron$
begin
  if exists (select 1 from cron.job where jobname='omnii-continuous-worker') then perform cron.unschedule('omnii-continuous-worker'); end if;
  perform cron.schedule('omnii-continuous-worker','30 seconds','select public.omnii_worker_tick(10);');
end;
$cron$;
