alter table if exists public.omnii_process_instances
  add column if not exists version text not null default '1',
  add column if not exists workflow_id text,
  add column if not exists workflow_version text;

create index if not exists omnii_process_instances_workflow_idx
  on public.omnii_process_instances (workflow_id, workflow_version, status, current_stage);

create or replace function public.omnii_progress_process(
  p_process_id text,
  p_expected_version text,
  p_process_patch jsonb,
  p_tasks jsonb,
  p_event jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_process public.omnii_process_instances%rowtype;
  v_existing_event public.omnii_events%rowtype;
  v_task jsonb;
  v_task_ids text[] := array[]::text[];
  v_next_version text;
  v_event_id text;
  v_event_idempotency text;
begin
  v_event_id := nullif(p_event->>'id', '');
  v_event_idempotency := nullif(p_event->>'idempotency_key', '');

  if v_event_idempotency is not null then
    select * into v_existing_event
      from public.omnii_events
     where idempotency_key = v_event_idempotency
     limit 1;
    if found then
      select * into v_process
        from public.omnii_process_instances
       where id = p_process_id;
      select coalesce(array_agg(id order by id), array[]::text[]) into v_task_ids
        from public.omnii_process_tasks
       where id in (select value->>'id' from jsonb_array_elements(coalesce(p_tasks, '[]'::jsonb)));
      return jsonb_build_object(
        'process', to_jsonb(v_process),
        'tasks', coalesce((select jsonb_agg(to_jsonb(t)) from public.omnii_process_tasks t where t.id = any(v_task_ids)), '[]'::jsonb),
        'event', to_jsonb(v_existing_event),
        'idempotent', true
      );
    end if;
  end if;

  select * into v_process
    from public.omnii_process_instances
   where id = p_process_id
   for update;
  if not found then
    raise exception 'Process instance not found: %', p_process_id;
  end if;
  if coalesce(v_process.version, '1') <> p_expected_version then
    raise exception 'Persistence version conflict: process_instances/%', p_process_id;
  end if;

  v_next_version := coalesce(p_process_patch->>'version', (coalesce(v_process.version, '1')::integer + 1)::text);

  update public.omnii_process_instances
     set status = coalesce(p_process_patch->>'status', status),
         current_stage = coalesce(p_process_patch->>'current_stage', current_stage),
         state = coalesce(p_process_patch->'state', state),
         completed_at = case when p_process_patch ? 'completed_at' then (p_process_patch->>'completed_at')::timestamptz else completed_at end,
         version = v_next_version,
         updated_at = now()
   where id = p_process_id;

  for v_task in select * from jsonb_array_elements(coalesce(p_tasks, '[]'::jsonb)) loop
    insert into public.omnii_process_tasks (
      id, process_id, stage, task_type, assignee_id, status, due_at, payload, requirements,
      outcome, evidence, created_at, updated_at, version, idempotency_key
    ) values (
      v_task->>'id',
      v_task->>'process_id',
      v_task->>'stage',
      v_task->>'task_type',
      v_task->>'assignee_id',
      v_task->>'status',
      nullif(v_task->>'due_at', '')::timestamptz,
      coalesce(v_task->'payload', '{}'::jsonb),
      coalesce(v_task->'requirements', '{}'::jsonb),
      coalesce(v_task->'outcome', '{}'::jsonb),
      coalesce(v_task->'evidence', '[]'::jsonb),
      coalesce((v_task->>'created_at')::timestamptz, now()),
      coalesce((v_task->>'updated_at')::timestamptz, now()),
      coalesce(v_task->>'version', '1'),
      v_task->>'id'
    ) on conflict (id) do nothing;
  end loop;

  insert into public.omnii_events (
    id, version, lifecycle, authority, provenance, payload, correlation_id, created_at, updated_at, idempotency_key, operating_context_id
  ) values (
    coalesce(v_event_id, gen_random_uuid()::text),
    '1',
    'active',
    coalesce(p_event->'authority', '{}'::jsonb),
    coalesce(p_event->'provenance', '{}'::jsonb),
    coalesce(p_event->'payload', '{}'::jsonb) || jsonb_build_object('type', p_event->>'type', 'actor', p_event->>'actor', 'outcome', p_event->>'outcome'),
    nullif(p_event->>'correlation_id', ''),
    coalesce((p_event->>'occurred_at')::timestamptz, now()),
    now(),
    v_event_idempotency,
    nullif(p_event->>'operating_context_id', '')
  ) returning * into v_existing_event;

  select * into v_process from public.omnii_process_instances where id = p_process_id;
  select coalesce(array_agg(id order by id), array[]::text[]) into v_task_ids
    from public.omnii_process_tasks
   where id in (select value->>'id' from jsonb_array_elements(coalesce(p_tasks, '[]'::jsonb)));

  return jsonb_build_object(
    'process', to_jsonb(v_process),
    'tasks', coalesce((select jsonb_agg(to_jsonb(t)) from public.omnii_process_tasks t where t.id = any(v_task_ids)), '[]'::jsonb),
    'event', to_jsonb(v_existing_event),
    'idempotent', false
  );
end;
$$;

revoke all on function public.omnii_progress_process(text, text, jsonb, jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.omnii_progress_process(text, text, jsonb, jsonb, jsonb) to service_role;
