create table if not exists public.omnii_management (
  id text primary key,
  type text not null,
  mandate_id text null,
  subject_id text null,
  state text null,
  version text not null default '1',
  authority jsonb not null default '{}'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists omnii_management_mandate_idx on public.omnii_management (mandate_id);
create index if not exists omnii_management_subject_idx on public.omnii_management (subject_id);
create index if not exists omnii_management_type_idx on public.omnii_management (type);

alter table public.omnii_management enable row level security;

create policy if not exists "omnii_management_service_role_all"
  on public.omnii_management
  for all
  to service_role
  using (true)
  with check (true);

comment on table public.omnii_management is 'Shared ecosystem Management runtime records: mandates, baselines, plans, decisions, work and observations.';
