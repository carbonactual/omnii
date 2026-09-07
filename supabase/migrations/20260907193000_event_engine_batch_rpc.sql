-- Atomic batch append for durable Event Engine batching.
-- PostgreSQL rolls back the whole function transaction if any event cannot be accepted.

create or replace function public.omnii_append_events(p_events jsonb)
returns setof public.omnii_events
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_item jsonb;
  v_event public.omnii_events;
begin
  if jsonb_typeof(p_events) <> 'array' then
    raise exception 'omnii_event_batch_must_be_array';
  end if;

  for v_item in select value from jsonb_array_elements(p_events) loop
    select * into v_event
    from public.omnii_append_event(
      nullif(v_item->>'id',''),
      v_item->>'event_type',
      v_item->>'event_version',
      v_item->>'schema_version',
      v_item->>'lifecycle',
      v_item->>'status',
      (v_item->>'occurred_at')::timestamptz,
      (v_item->>'recorded_at')::timestamptz,
      v_item->>'actor_ref',
      v_item->>'subject_ref',
      v_item->>'institution_ref',
      v_item->>'operating_context_id',
      v_item->>'correlation_id',
      v_item->>'causation_id',
      v_item->>'parent_event_id',
      v_item->>'reality_state',
      v_item->>'authority_ref',
      v_item->>'source',
      coalesce(v_item->'provenance','{}'::jsonb),
      coalesce(v_item->'evidence_refs','[]'::jsonb),
      coalesce(v_item->'metadata','{}'::jsonb),
      coalesce(v_item->'payload','{}'::jsonb),
      v_item->>'idempotency_key'
    );
    return next v_event;
  end loop;

  return;
end;
$$;

do $$
declare
  v_proc regprocedure;
begin
  select p.oid::regprocedure into v_proc
  from pg_proc p join pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public' and p.proname='omnii_append_events' and p.pronargs=1;
  if v_proc is null then raise exception 'omnii_append_events_not_created'; end if;
  execute format('revoke all on function %s from public, anon, authenticated', v_proc);
  execute format('grant execute on function %s to service_role', v_proc);
end $$;
