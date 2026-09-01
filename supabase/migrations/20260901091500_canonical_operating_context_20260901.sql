create table if not exists public.omnii_operating_contexts (
  id text primary key,
  subject_id text not null,
  fleet_id text,
  mode text not null,
  operating_capacity text not null,
  service_id text,
  journey_id text,
  jurisdiction text not null,
  authority_ref text,
  location_ref text,
  valid_from timestamptz not null,
  valid_until timestamptz,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint omnii_operating_contexts_valid_window_chk check (valid_until is null or valid_until > valid_from),
  constraint omnii_operating_contexts_status_chk check (status in ('active','expired','revoked','superseded','disputed'))
);

create index if not exists idx_operating_context_subject_time on public.omnii_operating_contexts(subject_id, valid_from, valid_until);
create index if not exists idx_operating_context_fleet on public.omnii_operating_contexts(fleet_id) where fleet_id is not null;
create index if not exists idx_operating_context_service on public.omnii_operating_contexts(service_id) where service_id is not null;
create index if not exists idx_operating_context_journey on public.omnii_operating_contexts(journey_id) where journey_id is not null;
create index if not exists idx_operating_context_mode_capacity on public.omnii_operating_contexts(mode, operating_capacity);

alter table public.omnii_operating_contexts enable row level security;

drop policy if exists operating_context_authenticated_read on public.omnii_operating_contexts;
create policy operating_context_authenticated_read on public.omnii_operating_contexts for select to authenticated using (true);

drop policy if exists operating_context_owner_insert on public.omnii_operating_contexts;
create policy operating_context_owner_insert on public.omnii_operating_contexts for insert to authenticated with check (subject_id = (auth.uid())::text);
