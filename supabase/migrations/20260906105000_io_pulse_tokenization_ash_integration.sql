-- OMNII IO + Pulse + mint + tokenization + rights + ASH integration substrate.
-- Provider-neutral value records; blockchain and external settlement remain adapters.

create table if not exists public.io_mints (
  id uuid primary key default gen_random_uuid(),
  object_ref text not null,
  issuer_ref text not null,
  authority_ref text,
  source_refs jsonb not null default '[]'::jsonb,
  pulse_ref text,
  feedback_ref text,
  valuation_ref text,
  classification text not null default 'unknown',
  rights_refs jsonb not null default '[]'::jsonb,
  provenance_refs jsonb not null default '[]'::jsonb,
  anti_duplication_ref text,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists io_mints_object_idx on public.io_mints(object_ref);
create index if not exists io_mints_pulse_idx on public.io_mints(pulse_ref);

create table if not exists public.io_token_representations (
  id uuid primary key default gen_random_uuid(),
  mint_id uuid not null references public.io_mints(id),
  underlying_ref text not null,
  representation text not null,
  token_class text not null,
  quantity numeric not null check (quantity > 0),
  decimals int not null default 0 check (decimals >= 0),
  transferable boolean not null default true,
  creates_ownership boolean not null default false,
  creates_authority boolean not null default false,
  rights_refs jsonb not null default '[]'::jsonb,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists io_tokens_mint_idx on public.io_token_representations(mint_id);
create index if not exists io_tokens_underlying_idx on public.io_token_representations(underlying_ref);

create table if not exists public.io_rights (
  id uuid primary key default gen_random_uuid(),
  subject_ref text not null,
  right_kind text not null,
  holder_ref text,
  issuer_ref text,
  source_ref text,
  scope jsonb not null default '{}'::jsonb,
  restrictions jsonb not null default '{}'::jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create index if not exists io_rights_subject_idx on public.io_rights(subject_ref);
create index if not exists io_rights_holder_idx on public.io_rights(holder_ref);

create table if not exists public.io_transitions (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  actor_ref text,
  principal_ref text,
  subject_ref text,
  purpose text,
  context jsonb not null default '{}'::jsonb,
  input_refs jsonb not null default '[]'::jsonb,
  output_refs jsonb not null default '[]'::jsonb,
  pulse_ref text,
  feedback_ref text,
  value_ref text,
  mint_ref text,
  representation_ref text,
  rights_refs jsonb not null default '[]'::jsonb,
  provenance_refs jsonb not null default '[]'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  ledger_ref text,
  settlement_ref text,
  policy_ref text,
  previous_state jsonb,
  resulting_state jsonb,
  temporal_validity jsonb,
  status text not null default 'pending',
  security_state text,
  ash_assurance_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists io_transitions_subject_idx on public.io_transitions(subject_ref, created_at desc);
create index if not exists io_transitions_principal_idx on public.io_transitions(principal_ref, created_at desc);
create index if not exists io_transitions_status_idx on public.io_transitions(status);

create table if not exists public.ash_assurance_events (
  id uuid primary key default gen_random_uuid(),
  transition_id uuid references public.io_transitions(id) on delete set null,
  actor_ref text,
  principal_ref text,
  authority_ref text,
  decision text not null check (decision in ('allow','deny','challenge','hold','quarantine','escalate')),
  identity_assured boolean not null default false,
  actor_authenticated boolean not null default false,
  authority_proven boolean not null default false,
  policy_applicable boolean not null default false,
  credentials_valid boolean not null default false,
  provenance_intact boolean not null default false,
  evidence_intact boolean not null default false,
  anti_duplication_clear boolean not null default false,
  risk_state text not null default 'unknown',
  privacy_satisfied boolean not null default false,
  revoked boolean not null default false,
  evidence_refs jsonb not null default '[]'::jsonb,
  provenance_refs jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ash_assurance_transition_idx on public.ash_assurance_events(transition_id, created_at desc);
create index if not exists ash_assurance_decision_idx on public.ash_assurance_events(decision, created_at desc);

alter table public.io_mints enable row level security;
alter table public.io_token_representations enable row level security;
alter table public.io_rights enable row level security;
alter table public.io_transitions enable row level security;
alter table public.ash_assurance_events enable row level security;

-- Deliberately no broad client-facing policies are created here. These protected
-- tables require explicit RPC/service policies appropriate to the deployment.
-- This keeps security semantics from being weakened by an accidental public grant.

create or replace function public.prevent_io_history_update() returns trigger
language plpgsql
as $$
begin
  raise exception 'historical IO/ASH records are append-only; use correction, revocation, reversal or supersession records';
end;
$$;

drop trigger if exists io_transitions_no_update on public.io_transitions;
create trigger io_transitions_no_update before update or delete on public.io_transitions
for each row execute function public.prevent_io_history_update();

drop trigger if exists ash_assurance_no_update on public.ash_assurance_events;
create trigger ash_assurance_no_update before update or delete on public.ash_assurance_events
for each row execute function public.prevent_io_history_update();
