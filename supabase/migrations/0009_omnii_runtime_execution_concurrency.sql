-- OMNII durable execution/audit optimistic-concurrency hardening.
-- Preserve the existing atomic boundary while preventing stale execution finalization.

drop function if exists public.omnii_atomic_execution_audit(text,text,text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb);

create function public.omnii_atomic_execution_audit(
  p_execution_id text,
  p_expected_version text,
  p_execution_version text,
  p_execution_lifecycle text,
  p_execution_authority jsonb,
  p_execution_provenance jsonb,
  p_execution_payload jsonb,
  p_execution_idempotency_key text,
  p_audit_id text,
  p_audit_authority jsonb,
  p_audit_provenance jsonb,
  p_audit_payload jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_execution jsonb;
  v_audit jsonb;
begin
  if p_execution_version::integer <> p_expected_version::integer + 1 then
    raise exception 'OMNII execution version must advance exactly one version: expected %, requested %', p_expected_version, p_execution_version;
  end if;

  update public.omnii_executions
  set version = p_execution_version,
      lifecycle = p_execution_lifecycle,
      authority = p_execution_authority,
      provenance = p_execution_provenance,
      payload = p_execution_payload,
      idempotency_key = p_execution_idempotency_key,
      updated_at = now()
  where id = p_execution_id
    and version = p_expected_version;

  if not found then
    raise exception 'OMNII execution version conflict: % expected version %', p_execution_id, p_expected_version;
  end if;

  insert into public.omnii_audit(id,version,lifecycle,authority,provenance,payload)
  values(p_audit_id,'1','active',p_audit_authority,p_audit_provenance,p_audit_payload)
  returning jsonb_build_object('id', id, 'version', version, 'lifecycle', lifecycle, 'authority', authority, 'provenance', provenance, 'payload', payload) into v_audit;

  select to_jsonb(e) into v_execution from public.omnii_executions e where e.id = p_execution_id;
  return jsonb_build_object('execution', v_execution, 'audit', v_audit, 'idempotent', false);
end;
$$;

revoke execute on function public.omnii_atomic_execution_audit(text,text,text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.omnii_atomic_execution_audit(text,text,text,text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) to service_role;
