-- Governed atomic append boundary for canonical events.
-- Retries are safe by idempotency key; materially different retries fail closed.
create extension if not exists pgcrypto;

create or replace function public.omnii_event_semantic_hash(
  p_event_type text, p_event_version text, p_schema_version text, p_lifecycle text, p_status text,
  p_occurred_at timestamptz, p_actor_ref text, p_subject_ref text, p_institution_ref text,
  p_operating_context_id text, p_correlation_id text, p_causation_id text, p_parent_event_id text,
  p_reality_state text, p_authority_ref text, p_source text, p_provenance jsonb,
  p_evidence_refs jsonb, p_metadata jsonb, p_payload jsonb, p_idempotency_key text
)
returns text language sql immutable set search_path = public, pg_temp as $$
select encode(extensions.digest(convert_to(jsonb_build_object(
  'event_type',p_event_type,'event_version',p_event_version,'schema_version',p_schema_version,'lifecycle',p_lifecycle,'status',p_status,
  'occurred_at',to_char(p_occurred_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
  'actor_ref',p_actor_ref,'subject_ref',p_subject_ref,'institution_ref',p_institution_ref,'operating_context_id',p_operating_context_id,
  'correlation_id',p_correlation_id,'causation_id',p_causation_id,'parent_event_id',p_parent_event_id,'reality_state',p_reality_state,
  'authority_ref',p_authority_ref,'source',p_source,'provenance',p_provenance,'evidence_refs',p_evidence_refs,'metadata',p_metadata,
  'payload',p_payload,'idempotency_key',p_idempotency_key
)::text,'UTF8'),'sha256'),'hex')
$$;

update public.omnii_events
set event_hash=public.omnii_event_semantic_hash(event_type,event_version,schema_version,lifecycle,status,occurred_at,actor_ref,subject_ref,institution_ref,operating_context_id,correlation_id,causation_id,parent_event_id,reality_state,authority_ref,source,provenance,evidence_refs,metadata,payload,idempotency_key)
where event_hash is null;

create or replace function public.omnii_append_event(
  p_id text, p_event_type text, p_event_version text, p_schema_version text, p_lifecycle text, p_status text,
  p_occurred_at timestamptz, p_recorded_at timestamptz, p_actor_ref text, p_subject_ref text, p_institution_ref text,
  p_operating_context_id text, p_correlation_id text, p_causation_id text, p_parent_event_id text, p_reality_state text,
  p_authority_ref text, p_source text, p_provenance jsonb, p_evidence_refs jsonb, p_metadata jsonb, p_payload jsonb, p_idempotency_key text
)
returns public.omnii_events language plpgsql security invoker set search_path = public, pg_temp as $$
declare
  v_existing public.omnii_events; v_hash text; v_reality_state text := coalesce(p_reality_state,'unknown');
  v_event_version text := coalesce(p_event_version,'1'); v_schema_version text := coalesce(p_schema_version,'1');
  v_lifecycle text := coalesce(p_lifecycle,'active'); v_status text := coalesce(p_status,'accepted');
  v_occurred_at timestamptz := coalesce(p_occurred_at,now()); v_recorded_at timestamptz := coalesce(p_recorded_at,now());
  v_payload jsonb := coalesce(p_payload,'{}'::jsonb); v_provenance jsonb := coalesce(p_provenance,'{}'::jsonb);
  v_evidence_refs jsonb := coalesce(p_evidence_refs,'[]'::jsonb); v_metadata jsonb := coalesce(p_metadata,'{}'::jsonb);
begin
  if p_idempotency_key is null or btrim(p_idempotency_key)='' then raise exception 'omnii_event_idempotency_key_required'; end if;
  if p_event_type is null or btrim(p_event_type)='' then raise exception 'omnii_event_type_required'; end if;
  if p_source is null or btrim(p_source)='' then raise exception 'omnii_event_source_required'; end if;
  if p_correlation_id is null or btrim(p_correlation_id)='' then raise exception 'omnii_event_correlation_id_required'; end if;
  if v_payload->>'type' is not null and v_payload->>'type'<>p_event_type then raise exception 'omnii_event_payload_type_mismatch'; end if;
  if v_payload->>'type' is null then v_payload:=jsonb_set(v_payload,'{type}',to_jsonb(p_event_type),true); end if;
  if v_reality_state not in ('actual','observed','planned','committed','simulated','estimated','unknown') then raise exception 'omnii_event_invalid_reality_state'; end if;
  v_hash:=public.omnii_event_semantic_hash(p_event_type,v_event_version,v_schema_version,v_lifecycle,v_status,v_occurred_at,p_actor_ref,p_subject_ref,p_institution_ref,p_operating_context_id,p_correlation_id,p_causation_id,p_parent_event_id,v_reality_state,p_authority_ref,p_source,v_provenance,v_evidence_refs,v_metadata,v_payload,p_idempotency_key);
  select * into v_existing from public.omnii_events where idempotency_key=p_idempotency_key limit 1;
  if found then if v_existing.event_hash=v_hash then return v_existing; end if; raise exception 'omnii_event_idempotency_conflict'; end if;
  begin
    insert into public.omnii_events(
      id,version,lifecycle,authority,provenance,payload,correlation_id,idempotency_key,event_type,event_version,schema_version,
      occurred_at,recorded_at,actor_ref,subject_ref,institution_ref,operating_context_id,causation_id,parent_event_id,reality_state,
      authority_ref,source,evidence_refs,metadata,status,event_hash
    ) values (
      coalesce(nullif(p_id,''),gen_random_uuid()::text),v_event_version,v_lifecycle,coalesce(v_provenance->'authority','{}'::jsonb),v_provenance,v_payload,p_correlation_id,p_idempotency_key,
      p_event_type,v_event_version,v_schema_version,v_occurred_at,v_recorded_at,p_actor_ref,p_subject_ref,p_institution_ref,p_operating_context_id,
      p_causation_id,p_parent_event_id,v_reality_state,p_authority_ref,p_source,v_evidence_refs,v_metadata,v_status,v_hash
    ) returning * into v_existing;
  exception when unique_violation then
    select * into v_existing from public.omnii_events where idempotency_key=p_idempotency_key limit 1;
    if not found then raise; end if;
    if v_existing.event_hash=v_hash then return v_existing; end if;
    raise exception 'omnii_event_idempotency_conflict';
  end;
  return v_existing;
end;
$$;

revoke all on function public.omnii_event_semantic_hash(text,text,text,text,text,timestamptz,text,text,text,text,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,text) from public,anon,authenticated;
revoke all on function public.omnii_append_event(text,text,text,text,text,text,timestamptz,timestamptz,text,text,text,text,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,text) from public,anon,authenticated;
grant select,insert on public.omnii_events to service_role;
grant execute on function public.omnii_append_event(text,text,text,text,text,text,timestamptz,timestamptz,text,text,text,text,text,text,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,text) to service_role;
