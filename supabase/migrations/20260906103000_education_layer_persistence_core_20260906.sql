-- Education Layer persistence core
-- Domain records only: universal OMNII objects, identity, authority, evidence and runtime remain shared.
-- Learning Wallet and Skills Passport are derived compositions and intentionally do not receive duplicate tables here.

create table if not exists public.education_onboarding_profiles (
  id uuid primary key default gen_random_uuid(),
  learner_profile_id uuid references public.profiles(id),
  subject_ref text not null,
  status text not null default 'active' check (status in ('draft','active','superseded','withdrawn')),
  education_stage text,
  interests jsonb not null default '[]'::jsonb,
  goals jsonb not null default '[]'::jsonb,
  learner_context jsonb not null default '{}'::jsonb,
  curation_preferences jsonb not null default '{}'::jsonb,
  safeguarding jsonb not null default '{}'::jsonb,
  privacy jsonb not null default '{}'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_learning_records (
  id uuid primary key default gen_random_uuid(),
  subject_ref text not null,
  learner_profile_id uuid references public.profiles(id),
  learning_type text not null,
  learning_ref text,
  provider_ref text,
  status text not null default 'active' check (status in ('planned','enrolled','active','completed','paused','withdrawn','expired','superseded')),
  progress numeric check (progress is null or (progress >= 0 and progress <= 1)),
  reality_state text not null default 'OBSERVED' check (reality_state in ('ACTUAL','OBSERVED','PLANNED','COMMITTED','SIMULATED','POSSIBLE','PROBABLE','UNKNOWN')),
  started_at timestamptz,
  completed_at timestamptz,
  evidence_refs jsonb not null default '[]'::jsonb,
  competency_refs jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_skill_records (
  id uuid primary key default gen_random_uuid(),
  subject_ref text not null,
  skill_key text not null,
  framework_ref text,
  state text not null check (state in ('self_declared','learning','practiced','assessed','demonstrated','externally_verified','expired','superseded')),
  level numeric check (level is null or (level >= 0 and level <= 1)),
  evidence_refs jsonb not null default '[]'::jsonb,
  provider_refs jsonb not null default '[]'::jsonb,
  assessment_refs jsonb not null default '[]'::jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  provenance jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_credential_records (
  id uuid primary key default gen_random_uuid(),
  subject_ref text not null,
  credential_type text not null,
  credential_ref text,
  issuer_ref text not null,
  authority_kind text not null check (authority_kind in ('ecosystem_native','institution','provider','professional_body','regulator','government','employer','other')),
  status text not null default 'referenced' check (status in ('proposed','issued','referenced','verified','disputed','revoked','expired','superseded')),
  verification jsonb not null default '{}'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  framework_refs jsonb not null default '[]'::jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  provenance jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_cpd_activities (
  id uuid primary key default gen_random_uuid(),
  subject_ref text not null,
  activity_type text not null,
  activity_ref text,
  provider_ref text,
  professional_body_ref text,
  status text not null default 'recorded' check (status in ('planned','recorded','completed','verified','expired','superseded')),
  hours numeric check (hours is null or hours >= 0),
  points numeric check (points is null or points >= 0),
  evidence_refs jsonb not null default '[]'::jsonb,
  credential_refs jsonb not null default '[]'::jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  provenance jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_provider_records (
  id uuid primary key default gen_random_uuid(),
  provider_key text not null unique,
  name text not null,
  provider_type text not null,
  integration_mode text not null default 'adapter' check (integration_mode = 'adapter'),
  status text not null default 'active' check (status in ('draft','active','suspended','retired')),
  supported_capabilities jsonb not null default '[]'::jsonb,
  standards jsonb not null default '[]'::jsonb,
  source_lineage jsonb not null default '{}'::jsonb,
  external_reference text,
  provenance jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_labs (
  id uuid primary key default gen_random_uuid(),
  lab_key text not null unique,
  name text not null,
  lab_type text not null,
  environment_type text not null,
  provider_ref text,
  status text not null default 'active' check (status in ('draft','active','suspended','retired')),
  capability_refs jsonb not null default '[]'::jsonb,
  safety_rules jsonb not null default '{}'::jsonb,
  access_rules jsonb not null default '{}'::jsonb,
  resource_requirements jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_lab_runs (
  id uuid primary key default gen_random_uuid(),
  lab_id uuid not null references public.education_labs(id),
  subject_ref text not null,
  actor_ref text,
  status text not null default 'started' check (status in ('planned','started','completed','failed','cancelled')),
  reality_state text not null default 'OBSERVED' check (reality_state in ('ACTUAL','OBSERVED','PLANNED','COMMITTED','SIMULATED','POSSIBLE','PROBABLE','UNKNOWN')),
  simulation_or_sandbox boolean not null default false,
  output_refs jsonb not null default '[]'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  assessment_refs jsonb not null default '[]'::jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  provenance jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint education_lab_runs_sandbox_boundary check (
    not simulation_or_sandbox or reality_state = 'SIMULATED'
  )
);

create index if not exists education_onboarding_profiles_subject_idx on public.education_onboarding_profiles(subject_ref);
create index if not exists education_learning_records_subject_idx on public.education_learning_records(subject_ref);
create index if not exists education_learning_records_provider_idx on public.education_learning_records(provider_ref);
create index if not exists education_skill_records_subject_idx on public.education_skill_records(subject_ref);
create index if not exists education_skill_records_framework_idx on public.education_skill_records(framework_ref);
create index if not exists education_credential_records_subject_idx on public.education_credential_records(subject_ref);
create index if not exists education_credential_records_issuer_idx on public.education_credential_records(issuer_ref);
create index if not exists education_cpd_activities_subject_idx on public.education_cpd_activities(subject_ref);
create index if not exists education_labs_provider_idx on public.education_labs(provider_ref);
create index if not exists education_lab_runs_subject_idx on public.education_lab_runs(subject_ref);
create index if not exists education_lab_runs_lab_idx on public.education_lab_runs(lab_id);

alter table public.education_onboarding_profiles enable row level security;
alter table public.education_learning_records enable row level security;
alter table public.education_skill_records enable row level security;
alter table public.education_credential_records enable row level security;
alter table public.education_cpd_activities enable row level security;
alter table public.education_provider_records enable row level security;
alter table public.education_labs enable row level security;
alter table public.education_lab_runs enable row level security;

revoke all on table public.education_onboarding_profiles from anon, authenticated;
revoke all on table public.education_learning_records from anon, authenticated;
revoke all on table public.education_skill_records from anon, authenticated;
revoke all on table public.education_credential_records from anon, authenticated;
revoke all on table public.education_cpd_activities from anon, authenticated;
revoke all on table public.education_provider_records from anon, authenticated;
revoke all on table public.education_labs from anon, authenticated;
revoke all on table public.education_lab_runs from anon, authenticated;

comment on table public.education_onboarding_profiles is 'Education Layer learner context and curation record; does not replace Root/HAPI identity or authority.';
comment on table public.education_learning_records is 'Durable education learning/progression record using universal subject/evidence references.';
comment on table public.education_skill_records is 'Education Layer skill/competency state with provenance and evidence references.';
comment on table public.education_credential_records is 'Credential/achievement reference; issuer or regulator remains authoritative.';
comment on table public.education_cpd_activities is 'Continuing professional development activity and evidence record.';
comment on table public.education_provider_records is 'Replaceable education provider/adapter metadata; no provider is constitutionally indispensable.';
comment on table public.education_labs is 'InstituteGPT lab definition and governed practice environment.';
comment on table public.education_lab_runs is 'Lab execution/evidence record; simulation or sandbox runs cannot be recorded as ACTUAL.';
