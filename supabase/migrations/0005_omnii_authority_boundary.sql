-- OMNII canonical authority persistence boundary.
-- Authority semantics remain in the runtime contract; PostgreSQL provides durable storage and atomic mutation only.

create table if not exists omnii_authorities (
  id text primary key,
  version text not null default '1',
  status text not null default 'active' check (status in ('active','suspended','revoked','expired')),
  subject text not null,
  issuer text,
  scope jsonb not null default '[]'::jsonb,
  capabilities jsonb not null default '[]'::jsonb,
  constraints jsonb not null default '{}'::jsonb,
  context jsonb not null default '{}'::jsonb,
  issued_at timestamptz not null,
  expires_at timestamptz,
  revocable boolean not null default true,
  revoked_at timestamptz,
  parent_authority_id text references omnii_authorities(id),
  provenance jsonb not null default '{}'::jsonb,
  idempotency_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (revoked_at is null or status = 'revoked'),
  check (expires_at is null or expires_at > issued_at)
);

create unique index if not exists omnii_authorities_idempotency_idx on omnii_authorities(idempotency_key) where idempotency_key is not null;
create index if not exists omnii_authorities_subject_idx on omnii_authorities(subject);
create index if not exists omnii_authorities_parent_idx on omnii_authorities(parent_authority_id);
create index if not exists omnii_authorities_status_idx on omnii_authorities(status);
create index if not exists omnii_authorities_expiry_idx on omnii_authorities(expires_at);

alter table omnii_authorities enable row level security;

drop trigger if exists omnii_authorities_touch_updated_at on omnii_authorities;
create trigger omnii_authorities_touch_updated_at before update on omnii_authorities for each row execute function omnii_touch_updated_at();

create or replace function omnii_authority_issue(
  p_id text,
  p_subject text,
  p_issuer text,
  p_scope jsonb,
  p_capabilities jsonb,
  p_constraints jsonb,
  p_context jsonb,
  p_issued_at timestamptz,
  p_expires_at timestamptz,
  p_revocable boolean,
  p_parent_authority_id text,
  p_provenance jsonb,
  p_idempotency_key text
) returns jsonb language plpgsql security invoker as $$
declare v_record jsonb;
begin
  if p_idempotency_key is not null then
    select to_jsonb(a) into v_record from omnii_authorities a where a.idempotency_key = p_idempotency_key;
    if v_record is not null then return v_record; end if;
  end if;
  insert into omnii_authorities(id,version,status,subject,issuer,scope,capabilities,constraints,context,issued_at,expires_at,revocable,parent_authority_id,provenance,idempotency_key)
  values(p_id,'1','active',p_subject,p_issuer,p_scope,p_capabilities,p_constraints,p_context,p_issued_at,p_expires_at,p_revocable,p_parent_authority_id,p_provenance,p_idempotency_key)
  returning to_jsonb(omnii_authorities.*) into v_record;
  return v_record;
end; $$;

create or replace function omnii_authority_revoke(p_id text,p_expected_version text,p_revoked_at timestamptz)
returns jsonb language plpgsql security invoker as $$
declare v_record jsonb;
begin
  update omnii_authorities set status='revoked',revoked_at=p_revoked_at,version=cast(cast(version as integer)+1 as text),updated_at=now()
  where id=p_id and version=p_expected_version and revocable=true and revoked_at is null;
  if not found then raise exception 'OMNII authority revoke version or lifecycle conflict: %',p_id; end if;
  select to_jsonb(a) into v_record from omnii_authorities a where a.id=p_id;
  return v_record;
end; $$;

create or replace function omnii_authority_suspend(p_id text,p_expected_version text)
returns jsonb language plpgsql security invoker as $$
declare v_record jsonb;
begin
  update omnii_authorities set status='suspended',version=cast(cast(version as integer)+1 as text),updated_at=now()
  where id=p_id and version=p_expected_version and status='active';
  if not found then raise exception 'OMNII authority suspend version or lifecycle conflict: %',p_id; end if;
  select to_jsonb(a) into v_record from omnii_authorities a where a.id=p_id;
  return v_record;
end; $$;
