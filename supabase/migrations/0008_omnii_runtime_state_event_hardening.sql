-- OMNII durable state/event boundary hardening.
-- Preserve the existing atomic boundary while enforcing optimistic concurrency and event authority provenance.

-- Replace the original signature so callers must provide the expected state version.
drop function if exists public.omnii_atomic_state_event(text,text,text,jsonb,jsonb,jsonb,text,text,text,text,text,text,jsonb,jsonb);

create function public.omnii_atomic_state_event(
  p_state_id text,
  p_expected_version text,
  p_state_version text,
  p_state_lifecycle text,
  p_state_authority jsonb,
  p_state_provenance jsonb,
  p_state_payload jsonb,
  p_event_id text,
  p_event_type text,
  p_event_actor text,
  p_event_subject text,
  p_event_correlation_id text,
  p_event_idempotency_key text,
  p_event_provenance jsonb,
  p_event_payload jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_event jsonb;
  v_state jsonb;
begin
  if p_event_idempotency_key is not null then
    select to_jsonb(e) into v_event
    from public.omnii_events e
    where e.idempotency_key = p_event_idempotency_key;
    if v_event is not null then
      select to_jsonb(s) into v_state from public.omnii_state s where s.id = p_state_id;
      if v_state is null then
        raise exception 'OMNII state record not found: %', p_state_id;
      end if;
      return jsonb_build_object('state', v_state, 'event', v_event, 'idempotent', true);
    end if;
  end if;

  if p_state_version::integer <> p_expected_version::integer + 1 then
    raise exception 'OMNII state version must advance exactly one version: expected %, requested %', p_expected_version, p_state_version;
  end if;

  update public.omnii_state
  set version = p_state_version,
      lifecycle = p_state_lifecycle,
      authority = p_state_authority,
      provenance = p_state_provenance,
      payload = p_state_payload,
      updated_at = now()
  where id = p_state_id
    and version = p_expected_version;

  if not found then
    raise exception 'OMNII state version conflict: % expected version %', p_state_id, p_expected_version;
  end if;

  insert into public.omnii_events(
    id, version, lifecycle, authority, provenance, payload, correlation_id, idempotency_key
  ) values (
    p_event_id,
    '1',
    'active',
    p_state_authority,
    p_event_provenance,
    jsonb_build_object('type', p_event_type, 'actor', p_event_actor, 'subject', p_event_subject, 'payload', p_event_payload),
    p_event_correlation_id,
    p_event_idempotency_key
  )
  returning jsonb_build_object(
    'id', id,
    'correlation_id', correlation_id,
    'idempotency_key', idempotency_key,
    'payload', payload
  ) into v_event;

  select to_jsonb(s) into v_state from public.omnii_state s where s.id = p_state_id;
  return jsonb_build_object('state', v_state, 'event', v_event, 'idempotent', false);
end;
$$;

revoke execute on function public.omnii_atomic_state_event(text,text,text,jsonb,jsonb,jsonb,text,text,text,text,text,text,jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.omnii_atomic_state_event(text,text,text,text,jsonb,jsonb,jsonb,text,text,text,text,text,text,jsonb,jsonb) to service_role;
