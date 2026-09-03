-- OMNII governed process-task queue hardening.
-- Adds durable concurrency/lease/retry fields and service-role atomic queue operations.

alter table public.omnii_process_tasks
  add column if not exists version text not null default '1',
  add column if not exists attempt_count integer not null default 0,
  add column if not exists max_attempts integer not null default 0,
  add column if not exists next_attempt_at timestamptz,
  add column if not exists claimed_by text,
  add column if not exists claimed_at timestamptz,
  add column if not exists lease_expires_at timestamptz,
  add column if not exists last_error text,
  add column if not exists completed_at timestamptz,
  add column if not exists escalation_level integer not null default 0,
  add column if not exists escalation_reason text,
  add column if not exists escalation_at timestamptz,
  add column if not exists idempotency_key text;

create index if not exists omnii_process_tasks_queue_idx
  on public.omnii_process_tasks (status, due_at, next_attempt_at, lease_expires_at, created_at);

create unique index if not exists omnii_process_tasks_idempotency_uidx
  on public.omnii_process_tasks (idempotency_key)
  where idempotency_key is not null;

drop function if exists public.omnii_claim_process_task(text,integer);
create function public.omnii_claim_process_task(
  p_worker_id text,
  p_lease_seconds integer default 300
)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_task public.omnii_process_tasks%rowtype;
begin
  if coalesce(trim(p_worker_id), '') = '' then
    raise exception 'OMNII worker identity is required';
  end if;
  if p_lease_seconds < 1 then
    raise exception 'OMNII lease must be at least one second';
  end if;

  select * into v_task
  from public.omnii_process_tasks
  where status in ('pending','ready')
    and (due_at is null or due_at <= now())
    and (next_attempt_at is null or next_attempt_at <= now())
    and (lease_expires_at is null or lease_expires_at <= now())
    and (assignee_id is null or assignee_id = p_worker_id)
  order by due_at nulls first, created_at
  for update skip locked
  limit 1;

  if not found then
    return jsonb_build_object('claimed', false);
  end if;

  update public.omnii_process_tasks
  set status = 'in_progress',
      assignee_id = coalesce(assignee_id, p_worker_id),
      claimed_by = p_worker_id,
      claimed_at = now(),
      lease_expires_at = now() + make_interval(secs => p_lease_seconds),
      attempt_count = attempt_count + 1,
      version = (version::integer + 1)::text,
      updated_at = now()
  where id = v_task.id;

  select * into v_task from public.omnii_process_tasks where id = v_task.id;

  insert into public.omnii_events(
    id, version, lifecycle, authority, provenance, payload,
    correlation_id, created_at, updated_at, idempotency_key, operating_context_id
  ) values (
    'process-task-claim:' || v_task.id || ':' || v_task.version,
    '1', 'active', '{}'::jsonb,
    jsonb_build_object('process_id', v_task.process_id, 'stage', v_task.stage),
    jsonb_build_object('worker_id', p_worker_id, 'lease_expires_at', v_task.lease_expires_at),
    null, now(), now(),
    'process-task:claim:' || v_task.id || ':' || v_task.version,
    null
  ) on conflict (idempotency_key) do nothing;

  return jsonb_build_object('claimed', true, 'task', to_jsonb(v_task));
end;
$$;

drop function if exists public.omnii_transition_process_task(text,text,text,text,jsonb,jsonb,text);
create function public.omnii_transition_process_task(
  p_task_id text,
  p_expected_version text,
  p_status text,
  p_actor_id text,
  p_outcome jsonb default '{}'::jsonb,
  p_evidence jsonb default '[]'::jsonb,
  p_error text default null
)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_task public.omnii_process_tasks%rowtype;
  v_now timestamptz := now();
begin
  if p_status not in ('ready','in_progress','blocked','completed','rejected','skipped') then
    raise exception 'Invalid OMNII process-task status: %', p_status;
  end if;

  update public.omnii_process_tasks
  set status = p_status,
      outcome = coalesce(p_outcome, '{}'::jsonb),
      evidence = case when jsonb_typeof(coalesce(p_evidence,'[]'::jsonb)) = 'array' then coalesce(p_evidence,'[]'::jsonb) else evidence end,
      last_error = p_error,
      lease_expires_at = case when p_status in ('completed','rejected','skipped','blocked','ready') then null else lease_expires_at end,
      completed_at = case when p_status in ('completed','rejected','skipped') then v_now else completed_at end,
      version = (version::integer + 1)::text,
      updated_at = v_now
  where id = p_task_id and version = p_expected_version
    and (claimed_by is null or claimed_by = p_actor_id);

  if not found then
    raise exception 'OMNII process-task version/ownership conflict: % expected version %', p_task_id, p_expected_version;
  end if;

  select * into v_task from public.omnii_process_tasks where id = p_task_id;

  insert into public.omnii_events(
    id, version, lifecycle, authority, provenance, payload,
    correlation_id, created_at, updated_at, idempotency_key, operating_context_id
  ) values (
    'process-task-transition:' || v_task.id || ':' || v_task.version,
    '1', 'active', '{}'::jsonb,
    jsonb_build_object('process_id', v_task.process_id, 'stage', v_task.stage, 'actor_id', p_actor_id),
    jsonb_build_object('status', p_status, 'outcome', coalesce(p_outcome,'{}'::jsonb), 'error', p_error),
    null, v_now, v_now,
    'process-task:transition:' || v_task.id || ':' || v_task.version,
    null
  ) on conflict (idempotency_key) do nothing;

  return jsonb_build_object('task', to_jsonb(v_task));
end;
$$;

drop function if exists public.omnii_retry_process_task(text,text,text,integer);
create function public.omnii_retry_process_task(
  p_task_id text,
  p_expected_version text,
  p_actor_id text,
  p_max_attempts integer
)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_task public.omnii_process_tasks%rowtype;
  v_attempt integer;
  v_delay integer;
begin
  if p_max_attempts < 1 then raise exception 'max attempts must be at least one'; end if;
  select * into v_task from public.omnii_process_tasks where id = p_task_id for update;
  if not found then raise exception 'OMNII process task not found: %', p_task_id; end if;
  if v_task.version <> p_expected_version then raise exception 'OMNII process-task version conflict: %', p_task_id; end if;
  if v_task.claimed_by is not null and v_task.claimed_by <> p_actor_id then raise exception 'OMNII task owned by another worker'; end if;
  v_attempt := coalesce(v_task.attempt_count,0);
  if v_attempt >= p_max_attempts then raise exception 'OMNII task retry limit exhausted: %', p_task_id; end if;
  v_delay := least(86400, greatest(1, (2 ^ greatest(v_attempt - 1, 0))));

  update public.omnii_process_tasks
  set status='ready',
      max_attempts=p_max_attempts,
      next_attempt_at=now() + make_interval(secs => v_delay),
      claimed_by=null,
      claimed_at=null,
      lease_expires_at=null,
      version=(version::integer+1)::text,
      updated_at=now()
  where id=p_task_id and version=p_expected_version;

  select * into v_task from public.omnii_process_tasks where id=p_task_id;
  return jsonb_build_object('task',to_jsonb(v_task),'delay_seconds',v_delay);
end;
$$;

drop function if exists public.omnii_escalate_process_task(text,text,text,text,text);
create function public.omnii_escalate_process_task(
  p_task_id text,
  p_expected_version text,
  p_actor_id text,
  p_reason text,
  p_target_assignee text default null
)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_task public.omnii_process_tasks%rowtype;
begin
  select * into v_task from public.omnii_process_tasks where id=p_task_id for update;
  if not found then raise exception 'OMNII process task not found: %', p_task_id; end if;
  if v_task.version <> p_expected_version then raise exception 'OMNII process-task version conflict: %', p_task_id; end if;
  if v_task.status in ('completed','rejected','skipped') then raise exception 'Terminal OMNII task cannot escalate'; end if;

  update public.omnii_process_tasks
  set status='blocked',
      assignee_id=coalesce(p_target_assignee, assignee_id),
      escalation_level=coalesce(escalation_level,0)+1,
      escalation_reason=p_reason,
      escalation_at=now(),
      claimed_by=null,
      lease_expires_at=null,
      version=(version::integer+1)::text,
      updated_at=now()
  where id=p_task_id and version=p_expected_version;

  select * into v_task from public.omnii_process_tasks where id=p_task_id;
  insert into public.omnii_events(
    id,version,lifecycle,authority,provenance,payload,created_at,updated_at,idempotency_key
  ) values (
    'process-task-escalate:'||v_task.id||':'||v_task.version,
    '1','active','{}','{}',
    jsonb_build_object('actor_id',p_actor_id,'reason',p_reason,'target_assignee',p_target_assignee,'level',v_task.escalation_level),
    now(),now(),'process-task:escalate:'||v_task.id||':'||v_task.version
  ) on conflict (idempotency_key) do nothing;

  return jsonb_build_object('task',to_jsonb(v_task));
end;
$$;

revoke execute on function public.omnii_claim_process_task(text,integer) from public, anon, authenticated;
revoke execute on function public.omnii_transition_process_task(text,text,text,text,jsonb,jsonb,text) from public, anon, authenticated;
revoke execute on function public.omnii_retry_process_task(text,text,text,integer) from public, anon, authenticated;
revoke execute on function public.omnii_escalate_process_task(text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.omnii_claim_process_task(text,integer) to service_role;
grant execute on function public.omnii_transition_process_task(text,text,text,text,jsonb,jsonb,text) to service_role;
grant execute on function public.omnii_retry_process_task(text,text,text,integer) to service_role;
grant execute on function public.omnii_escalate_process_task(text,text,text,text,text) to service_role;
