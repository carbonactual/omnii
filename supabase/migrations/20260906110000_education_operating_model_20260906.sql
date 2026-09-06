begin;

create table if not exists public.omnii_education_institutions (
  id text primary key,
  name text not null,
  institution_type text not null default 'institution',
  authority_refs jsonb not null default '[]'::jsonb,
  location_ref text,
  metadata jsonb not null default '{}'::jsonb,
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_programmes (
  id text primary key,
  institution_ref text not null references public.omnii_education_institutions(id) on delete restrict,
  title text not null,
  competency_refs jsonb not null default '[]'::jsonb,
  credential_path_refs jsonb not null default '[]'::jsonb,
  status text not null default 'active',
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_curricula (
  id text primary key,
  programme_ref text not null references public.omnii_education_programmes(id) on delete restrict,
  version text not null,
  course_refs jsonb not null default '[]'::jsonb,
  competency_refs jsonb not null default '[]'::jsonb,
  standards_refs jsonb not null default '[]'::jsonb,
  effective_from date,
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_courses (
  id text primary key,
  curriculum_ref text not null references public.omnii_education_curricula(id) on delete restrict,
  title text not null,
  subject_refs jsonb not null default '[]'::jsonb,
  competency_refs jsonb not null default '[]'::jsonb,
  credit_value numeric,
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_cohorts (
  id text primary key,
  programme_ref text not null references public.omnii_education_programmes(id) on delete restrict,
  academic_session_ref text not null,
  learner_refs jsonb not null default '[]'::jsonb,
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_enrollments (
  id text primary key,
  learner_ref text not null,
  programme_ref text not null references public.omnii_education_programmes(id) on delete restrict,
  admission_ref text not null,
  cohort_ref text,
  io_ref text,
  admission_status text not null check (admission_status = 'admitted'),
  status text not null default 'active',
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_assessment_results (
  id text primary key,
  assessment_ref text not null,
  learner_ref text not null,
  outcome text not null,
  evidence_refs jsonb not null default '[]'::jsonb,
  credential_ref text,
  io_ref text,
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_placements (
  id text primary key,
  learner_ref text not null,
  opportunity_ref text not null,
  host_ref text not null,
  evidence_refs jsonb not null default '[]'::jsonb,
  io_ref text,
  owns_opportunity boolean not null default false,
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_credential_references (
  id text primary key,
  holder_ref text not null,
  issuer_ref text not null,
  issuer_type text not null,
  authority_class text not null check (authority_class in ('external_authority', 'ecosystem_native', 'unresolved')),
  source_ref text not null,
  credential_type text not null default 'credential',
  status text not null default 'active',
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_education_ai_capability_assessments (
  id text primary key,
  ai_ref text not null,
  capability_refs jsonb not null default '[]'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  supervision text not null default 'recommended',
  human_professional_authorization boolean not null default false check (human_professional_authorization = false),
  schema_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists omnii_education_programmes_institution_idx on public.omnii_education_programmes(institution_ref);
create index if not exists omnii_education_curricula_programme_idx on public.omnii_education_curricula(programme_ref);
create index if not exists omnii_education_courses_curriculum_idx on public.omnii_education_courses(curriculum_ref);
create index if not exists omnii_education_enrollments_learner_idx on public.omnii_education_enrollments(learner_ref);
create index if not exists omnii_education_assessment_results_learner_idx on public.omnii_education_assessment_results(learner_ref);
create index if not exists omnii_education_placements_learner_idx on public.omnii_education_placements(learner_ref);
create index if not exists omnii_education_ai_assessments_ai_idx on public.omnii_education_ai_capability_assessments(ai_ref);

alter table public.omnii_education_institutions enable row level security;
alter table public.omnii_education_programmes enable row level security;
alter table public.omnii_education_curricula enable row level security;
alter table public.omnii_education_courses enable row level security;
alter table public.omnii_education_cohorts enable row level security;
alter table public.omnii_education_enrollments enable row level security;
alter table public.omnii_education_assessment_results enable row level security;
alter table public.omnii_education_placements enable row level security;
alter table public.omnii_education_credential_references enable row level security;
alter table public.omnii_education_ai_capability_assessments enable row level security;

create policy education_institutions_authenticated_select on public.omnii_education_institutions for select to authenticated using (true);
create policy education_programmes_authenticated_select on public.omnii_education_programmes for select to authenticated using (true);
create policy education_curricula_authenticated_select on public.omnii_education_curricula for select to authenticated using (true);
create policy education_courses_authenticated_select on public.omnii_education_courses for select to authenticated using (true);
create policy education_cohorts_authenticated_select on public.omnii_education_cohorts for select to authenticated using (true);
create policy education_enrollments_authenticated_select on public.omnii_education_enrollments for select to authenticated using (true);
create policy education_assessment_results_authenticated_select on public.omnii_education_assessment_results for select to authenticated using (true);
create policy education_placements_authenticated_select on public.omnii_education_placements for select to authenticated using (true);
create policy education_credentials_authenticated_select on public.omnii_education_credential_references for select to authenticated using (true);
create policy education_ai_assessments_authenticated_select on public.omnii_education_ai_capability_assessments for select to authenticated using (true);

commit;
