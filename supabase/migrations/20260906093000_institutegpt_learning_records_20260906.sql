-- InstituteGPT canonical learning records.
-- These tables store educational state; they do not replace external credential authorities.

begin;

create table if not exists public.omnii_education_learning_intents (
  id text primary key,
  subject_ref text not null,
  mode text not null,
  context jsonb not null default '{}'::jsonb,
  source_ref text,
  lifecycle text not null default 'active' check (lifecycle in ('active','completed','cancelled','superseded')),
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists omnii_education_learning_intents_subject_idx
  on public.omnii_education_learning_intents(subject_ref, lifecycle);

create index if not exists omnii_education_learning_intents_mode_idx
  on public.omnii_education_learning_intents(mode, lifecycle);

create table if not exists public.omnii_education_learning_records (
  id text primary key,
  subject_ref text not null,
  learning_ref text not null,
  status text not null default 'active' check (status in ('active','completed','paused','withdrawn','superseded')),
  version text not null default '1',
  competency_refs jsonb not null default '[]'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  credential_refs jsonb not null default '[]'::jsonb,
  result_refs jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_until is null or valid_until > valid_from)
);

create index if not exists omnii_education_learning_records_subject_idx
  on public.omnii_education_learning_records(subject_ref, status);

create index if not exists omnii_education_learning_records_learning_idx
  on public.omnii_education_learning_records(learning_ref, status);

create table if not exists public.omnii_education_ai_learning_records (
  id text primary key,
  subject_ref text not null,
  ai_ref text not null,
  supervision text not null default 'recommended' check (supervision in ('none','recommended','human_required')),
  version text not null default '1',
  knowledge_package_refs jsonb not null default '[]'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  assessment_refs jsonb not null default '[]'::jsonb,
  capability_refs jsonb not null default '[]'::jsonb,
  authorization_refs jsonb not null default '[]'::jsonb,
  human_professional_authorization boolean not null default false,
  provenance jsonb not null default '{}'::jsonb,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_until is null or valid_until > valid_from)
);

create index if not exists omnii_education_ai_learning_records_subject_idx
  on public.omnii_education_ai_learning_records(subject_ref);

create index if not exists omnii_education_ai_learning_records_ai_idx
  on public.omnii_education_ai_learning_records(ai_ref, version);

alter table public.omnii_education_learning_intents enable row level security;
alter table public.omnii_education_learning_records enable row level security;
alter table public.omnii_education_ai_learning_records enable row level security;

revoke all on table public.omnii_education_learning_intents from anon, authenticated;
revoke all on table public.omnii_education_learning_records from anon, authenticated;
revoke all on table public.omnii_education_ai_learning_records from anon, authenticated;

grant select, insert, update, delete on table public.omnii_education_learning_intents to service_role;
grant select, insert, update, delete on table public.omnii_education_learning_records to service_role;
grant select, insert, update, delete on table public.omnii_education_ai_learning_records to service_role;

grant select on table public.omnii_education_learning_intents to authenticated;
grant select on table public.omnii_education_learning_records to authenticated;
grant select on table public.omnii_education_ai_learning_records to authenticated;

drop trigger if exists omnii_education_learning_intents_updated_at on public.omnii_education_learning_intents;
create or replace function public.omnii_touch_education_learning_intent_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin new.updated_at = now(); return new; end; $$;
create trigger omnii_education_learning_intents_updated_at
before update on public.omnii_education_learning_intents
for each row execute function public.omnii_touch_education_learning_intent_updated_at();

drop trigger if exists omnii_education_learning_records_updated_at on public.omnii_education_learning_records;
create or replace function public.omnii_touch_education_learning_record_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin new.updated_at = now(); return new; end; $$;
create trigger omnii_education_learning_records_updated_at
before update on public.omnii_education_learning_records
for each row execute function public.omnii_touch_education_learning_record_updated_at();

drop trigger if exists omnii_education_ai_learning_records_updated_at on public.omnii_education_ai_learning_records;
create or replace function public.omnii_touch_education_ai_learning_record_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin new.updated_at = now(); return new; end; $$;
create trigger omnii_education_ai_learning_records_updated_at
before update on public.omnii_education_ai_learning_records
for each row execute function public.omnii_touch_education_ai_learning_record_updated_at();

comment on table public.omnii_education_learning_intents is 'InstituteGPT learning requests originating from any ecosystem product or channel.';
comment on table public.omnii_education_learning_records is 'Human learning state, evidence and credential references. External authorities remain authoritative issuers.';
comment on table public.omnii_education_ai_learning_records is 'AI/agent learning and capability state. Human professional authorization is never inferred from AI learning.';
comment on column public.omnii_education_ai_learning_records.human_professional_authorization is 'Always false unless an explicit governed contract later defines otherwise; AI learning does not grant human professional authorization.';

commit;
