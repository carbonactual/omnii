create table if not exists public.io_lifecycle_transitions (
  id uuid primary key default gen_random_uuid(),
  subject_ref text not null,
  action text not null check (action in ('correction','supersession','revocation','cancellation','reversal','restatement','recovery','retirement','transformation')),
  prior_transition_ref text,
  actor_ref text,
  principal_ref text,
  authority_ref text,
  reason text not null,
  evidence_refs jsonb not null default '[]'::jsonb,
  resulting_state jsonb,
  effective_at timestamptz,
  status text not null check (status in ('corrected','superseded','revoked','cancelled','reversed','restated','recovered','retired','transformed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists io_lifecycle_subject_idx
  on public.io_lifecycle_transitions(subject_ref, created_at desc);

create table if not exists public.io_agent_authorities (
  id uuid primary key default gen_random_uuid(),
  agent_ref text not null,
  principal_ref text not null,
  authority_ref text,
  scope jsonb not null default '[]'::jsonb,
  capabilities jsonb not null default '[]'::jsonb,
  resource_limits jsonb not null default '{}'::jsonb,
  tool_permissions jsonb not null default '[]'::jsonb,
  data_permissions jsonb not null default '[]'::jsonb,
  escalation_required_for jsonb not null default '[]'::jsonb,
  status text not null default 'active' check (status in ('active','revoked')),
  revoked_at timestamptz,
  revocation_reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists io_agent_authority_agent_idx
  on public.io_agent_authorities(agent_ref, status);

create table if not exists public.io_agent_action_decisions (
  id uuid primary key default gen_random_uuid(),
  authority_id uuid not null references public.io_agent_authorities(id),
  action text not null,
  capability text,
  tool text,
  resource_cost numeric,
  decision text not null check (decision in ('allow','deny','escalate')),
  principal_ref text not null,
  agent_ref text not null,
  transition_ref text,
  created_at timestamptz not null default now()
);

create index if not exists io_agent_decision_transition_idx
  on public.io_agent_action_decisions(transition_ref, created_at desc);

alter table public.io_lifecycle_transitions enable row level security;
alter table public.io_agent_authorities enable row level security;
alter table public.io_agent_action_decisions enable row level security;

create policy io_lifecycle_read_authenticated
  on public.io_lifecycle_transitions for select
  to authenticated using (true);

create policy io_agent_authorities_read_authenticated
  on public.io_agent_authorities for select
  to authenticated using (true);

create policy io_agent_action_decisions_read_authenticated
  on public.io_agent_action_decisions for select
  to authenticated using (true);

revoke update, delete on public.io_lifecycle_transitions from authenticated, anon;
revoke update, delete on public.io_agent_action_decisions from authenticated, anon;
