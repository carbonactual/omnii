-- ABBA operational intelligence control plane
-- Canonical boundary: master interpretive/orchestration intelligence; never authority issuer.

create table if not exists public.omnii_abba_profiles (
  id text primary key,
  version text not null default '1',
  lifecycle text not null default 'active' check (lifecycle in ('draft','active','suspended','retired')),
  intelligence_role text not null default 'master_interpretive_orchestrator',
  autonomy_policy jsonb not null default '{}'::jsonb,
  model_policy jsonb not null default '{}'::jsonb,
  authority_boundary jsonb not null default '{"can_issue_authority":false,"can_change_constitution":false}'::jsonb,
  capability_refs jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_abba_sessions (
  id text primary key,
  version text not null default '1',
  lifecycle text not null default 'active' check (lifecycle in ('draft','active','paused','completed','terminated')),
  subject_ref text,
  operating_context_id text,
  authority_ref text,
  objective jsonb not null default '{}'::jsonb,
  constraints jsonb not null default '{}'::jsonb,
  memory_scope jsonb not null default '{}'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_abba_plans (
  id text primary key,
  session_id text not null references public.omnii_abba_sessions(id),
  version text not null default '1',
  status text not null default 'proposed' check (status in ('proposed','authorized','executing','completed','failed','cancelled','superseded')),
  intent jsonb not null default '{}'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  required_capabilities jsonb not null default '[]'::jsonb,
  required_resources jsonb not null default '[]'::jsonb,
  policy_checks jsonb not null default '[]'::jsonb,
  authority_checks jsonb not null default '[]'::jsonb,
  evidence_requirements jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_abba_decisions (
  id text primary key,
  session_id text references public.omnii_abba_sessions(id),
  plan_id text references public.omnii_abba_plans(id),
  decision_type text not null,
  decision_state text not null check (decision_state in ('proposed','accepted','rejected','deferred','escalated')),
  rationale jsonb not null default '{}'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  authority_ref text,
  human_approval_required boolean not null default false,
  human_approval_ref text,
  confidence numeric not null default 0 check (confidence >= 0 and confidence <= 1),
  created_at timestamptz not null default now()
);

create table if not exists public.omnii_abba_tool_calls (
  id text primary key,
  session_id text references public.omnii_abba_sessions(id),
  plan_id text references public.omnii_abba_plans(id),
  tool_ref text not null,
  capability_ref text,
  authority_ref text,
  request jsonb not null default '{}'::jsonb,
  response jsonb not null default '{}'::jsonb,
  status text not null default 'proposed' check (status in ('proposed','authorized','executing','succeeded','failed','blocked','cancelled')),
  idempotency_key text,
  provenance jsonb not null default '{}'::jsonb,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.omnii_abba_memory_records (
  id text primary key,
  session_id text references public.omnii_abba_sessions(id),
  memory_type text not null check (memory_type in ('fact','observation','preference','decision','plan','outcome','lesson','relationship','policy_context','unknown')),
  subject_ref text,
  content jsonb not null default '{}'::jsonb,
  confidence numeric not null default 0 check (confidence >= 0 and confidence <= 1),
  provenance jsonb not null default '{}'::jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  supersedes_id text references public.omnii_abba_memory_records(id),
  lifecycle text not null default 'active' check (lifecycle in ('active','superseded','retracted','expired')),
  created_at timestamptz not null default now()
);

create index if not exists omnii_abba_sessions_subject_idx on public.omnii_abba_sessions(subject_ref);
create index if not exists omnii_abba_plans_session_idx on public.omnii_abba_plans(session_id);
create index if not exists omnii_abba_decisions_session_idx on public.omnii_abba_decisions(session_id);
create index if not exists omnii_abba_tool_calls_session_idx on public.omnii_abba_tool_calls(session_id);
create unique index if not exists omnii_abba_tool_calls_idempotency_idx on public.omnii_abba_tool_calls(idempotency_key) where idempotency_key is not null;
create index if not exists omnii_abba_memory_subject_idx on public.omnii_abba_memory_records(subject_ref);

alter table public.omnii_abba_profiles enable row level security;
alter table public.omnii_abba_sessions enable row level security;
alter table public.omnii_abba_plans enable row level security;
alter table public.omnii_abba_decisions enable row level security;
alter table public.omnii_abba_tool_calls enable row level security;
alter table public.omnii_abba_memory_records enable row level security;

revoke all on public.omnii_abba_profiles, public.omnii_abba_sessions, public.omnii_abba_plans, public.omnii_abba_decisions, public.omnii_abba_tool_calls, public.omnii_abba_memory_records from public, anon, authenticated;
grant all on public.omnii_abba_profiles, public.omnii_abba_sessions, public.omnii_abba_plans, public.omnii_abba_decisions, public.omnii_abba_tool_calls, public.omnii_abba_memory_records to service_role;

create policy omnii_abba_profiles_service_all on public.omnii_abba_profiles for all to service_role using (true) with check (true);
create policy omnii_abba_sessions_service_all on public.omnii_abba_sessions for all to service_role using (true) with check (true);
create policy omnii_abba_plans_service_all on public.omnii_abba_plans for all to service_role using (true) with check (true);
create policy omnii_abba_decisions_service_all on public.omnii_abba_decisions for all to service_role using (true) with check (true);
create policy omnii_abba_tool_calls_service_all on public.omnii_abba_tool_calls for all to service_role using (true) with check (true);
create policy omnii_abba_memory_service_all on public.omnii_abba_memory_records for all to service_role using (true) with check (true);

insert into public.omnii_abba_profiles (id, intelligence_role, authority_boundary, autonomy_policy, provenance)
values (
  'abba:master',
  'master_interpretive_orchestrator',
  '{"can_issue_authority":false,"can_change_constitution":false,"can_override_human_authority":false}'::jsonb,
  '{"requires_authority_for_consequential_actions":true,"requires_audit":true,"requires_evidence":true,"escalate_on_unknown":true}'::jsonb,
  '{"source":"OMNII constitutional ABBA boundary","status":"canonical"}'::jsonb
)
on conflict (id) do update set
  updated_at=now(),
  authority_boundary=excluded.authority_boundary,
  autonomy_policy=excluded.autonomy_policy,
  provenance=excluded.provenance;

create or replace function public.omnii_abba_guard_action(
  p_session_id text,
  p_capability_ref text,
  p_authority_ref text,
  p_requires_human boolean default false
) returns jsonb
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
begin
  if p_session_id is null or p_capability_ref is null then
    raise exception 'abba_action_invalid_context';
  end if;
  if p_authority_ref is null or p_authority_ref = '' then
    raise exception 'abba_action_missing_authority';
  end if;
  if p_requires_human and not exists (
    select 1 from public.seal_decisions sd
    join public.seal_requests sr on sr.id=sd.request_id
    where sd.id::text=p_authority_ref
      and sd.decision='approved'
      and (sd.valid_until is null or sd.valid_until>now())
  ) then
    raise exception 'abba_human_approval_required';
  end if;
  return jsonb_build_object(
    'allowed',true,
    'authority_ref',p_authority_ref,
    'capability_ref',p_capability_ref,
    'session_id',p_session_id,
    'checked_at',now()
  );
end;
$$;

revoke execute on function public.omnii_abba_guard_action(text,text,text,boolean) from public, anon, authenticated;
grant execute on function public.omnii_abba_guard_action(text,text,text,boolean) to service_role;
