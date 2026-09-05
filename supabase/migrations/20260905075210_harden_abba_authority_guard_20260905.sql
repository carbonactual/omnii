create or replace function public.omnii_abba_guard_action(p_session_id text, p_capability_ref text, p_authority_ref text, p_requires_human boolean default false)
returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  auth_record public.omnii_authorities%rowtype;
  capability_allowed boolean := false;
begin
  if p_session_id is null or p_session_id = '' or p_capability_ref is null or p_capability_ref = '' then
    raise exception 'abba_action_invalid_context';
  end if;
  if p_authority_ref is null or p_authority_ref = '' then
    raise exception 'abba_action_missing_authority';
  end if;
  select * into auth_record from public.omnii_authorities where id = p_authority_ref and status = 'active' and (expires_at is null or expires_at > now()) and revoked_at is null;
  if not found then raise exception 'abba_authority_invalid'; end if;
  if jsonb_typeof(coalesce(auth_record.capabilities, '{}'::jsonb)) = 'array' then
    select exists(select 1 from jsonb_array_elements_text(auth_record.capabilities) c(value) where c.value = p_capability_ref) into capability_allowed;
  elsif jsonb_typeof(coalesce(auth_record.capabilities, '{}'::jsonb)) = 'object' then
    capability_allowed := (auth_record.capabilities ? p_capability_ref) or coalesce((auth_record.capabilities ->> p_capability_ref)::boolean, false);
  end if;
  if not capability_allowed then raise exception 'abba_capability_not_authorized'; end if;
  if p_requires_human and not exists (select 1 from public.seal_decisions sd join public.seal_requests sr on sr.id = sd.request_id where sd.id::text = p_authority_ref and sd.decision = 'approved' and (sd.valid_until is null or sd.valid_until > now())) then
    raise exception 'abba_human_approval_required';
  end if;
  return jsonb_build_object('allowed', true, 'authority_ref', p_authority_ref, 'capability_ref', p_capability_ref, 'session_id', p_session_id, 'checked_at', now());
end;
$$;
revoke execute on function public.omnii_abba_guard_action(text,text,text,boolean) from public, anon, authenticated;
grant execute on function public.omnii_abba_guard_action(text,text,text,boolean) to service_role;
