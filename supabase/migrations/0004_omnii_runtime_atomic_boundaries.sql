-- OMNII durable atomic boundaries.
-- PostgreSQL is implementation infrastructure; these functions do not redefine constitutional semantics.

do $$
declare t text;
begin
  foreach t in array array['omnii_events','omnii_executions','omnii_workflows','omnii_ledger'] loop
    execute format('alter table %I add column if not exists idempotency_key text', t);
    execute format('create unique index if not exists %I on %I (idempotency_key) where idempotency_key is not null', t || '_idempotency_idx', t);
  end loop;
end $$;

create or replace function omnii_atomic_state_event(p_state_id text,p_state_version text,p_state_lifecycle text,p_state_authority jsonb,p_state_provenance jsonb,p_state_payload jsonb,p_event_id text,p_event_type text,p_event_actor text,p_event_subject text,p_event_correlation_id text,p_event_idempotency_key text,p_event_provenance jsonb,p_event_payload jsonb)
returns jsonb language plpgsql security invoker as $$
declare v_event jsonb;
begin
  update omnii_state set version=p_state_version,lifecycle=p_state_lifecycle,authority=p_state_authority,provenance=p_state_provenance,payload=p_state_payload,updated_at=now() where id=p_state_id;
  if not found then raise exception 'OMNII state record not found: %',p_state_id; end if;
  insert into omnii_events(id,version,lifecycle,authority,provenance,payload,correlation_id,idempotency_key) values(p_event_id,'1','active',p_event_provenance->'authority',p_event_provenance,jsonb_build_object('type',p_event_type,'actor',p_event_actor,'subject',p_event_subject,'payload',p_event_payload),p_event_correlation_id,p_event_idempotency_key)
  returning jsonb_build_object('id',id,'correlation_id',correlation_id,'idempotency_key',idempotency_key,'payload',payload) into v_event;
  return v_event;
end; $$;

create or replace function omnii_atomic_execution_audit(p_execution_id text,p_execution_version text,p_execution_lifecycle text,p_execution_authority jsonb,p_execution_provenance jsonb,p_execution_payload jsonb,p_execution_idempotency_key text,p_audit_id text,p_audit_authority jsonb,p_audit_provenance jsonb,p_audit_payload jsonb)
returns jsonb language plpgsql security invoker as $$
begin
  update omnii_executions set version=p_execution_version,lifecycle=p_execution_lifecycle,authority=p_execution_authority,provenance=p_execution_provenance,payload=p_execution_payload,idempotency_key=p_execution_idempotency_key,updated_at=now() where id=p_execution_id;
  if not found then raise exception 'OMNII execution record not found: %',p_execution_id; end if;
  insert into omnii_audit(id,version,lifecycle,authority,provenance,payload) values(p_audit_id,'1','active',p_audit_authority,p_audit_provenance,p_audit_payload);
  return jsonb_build_object('execution_id',p_execution_id,'audit_id',p_audit_id);
end; $$;

create or replace function omnii_atomic_ledger_audit(p_ledger_id text,p_ledger_authority jsonb,p_ledger_provenance jsonb,p_ledger_payload jsonb,p_ledger_idempotency_key text,p_audit_id text,p_audit_authority jsonb,p_audit_provenance jsonb,p_audit_payload jsonb)
returns jsonb language plpgsql security invoker as $$
begin
  insert into omnii_ledger(id,version,lifecycle,authority,provenance,payload,idempotency_key) values(p_ledger_id,'1','active',p_ledger_authority,p_ledger_provenance,p_ledger_payload,p_ledger_idempotency_key);
  insert into omnii_audit(id,version,lifecycle,authority,provenance,payload) values(p_audit_id,'1','active',p_audit_authority,p_audit_provenance,p_audit_payload);
  return jsonb_build_object('ledger_id',p_ledger_id,'audit_id',p_audit_id);
end; $$;
