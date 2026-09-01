create table if not exists public.omnii_transport_compliance_cases (
  id text primary key,
  subject_type text not null check (subject_type in ('person','vehicle','operator','fleet','journey','service')),
  subject_id text not null,
  case_type text not null check (case_type in ('traffic_offence','licence_status','permit','inspection','safety','incident','compliance','appeal','other')),
  status text not null check (status in ('pending','under_review','approved','rejected','paid','contested','appealed','suspended','cleared','expired','closed')) default 'pending',
  offence_code text,
  description text not null,
  points numeric not null default 0 check (points >= 0),
  penalty_amount numeric check (penalty_amount is null or penalty_amount >= 0),
  currency text,
  occurred_at timestamptz not null,
  due_at timestamptz,
  decided_at timestamptz,
  resolved_at timestamptz,
  authority text not null,
  authority_ref text,
  evidence jsonb not null default '{}'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  appeal_route jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_transport_credentials (
  id text primary key,
  subject_type text not null check (subject_type in ('person','vehicle','operator','fleet','technician','service')),
  subject_id text not null,
  credential_type text not null,
  status text not null check (status in ('pending','active','expired','suspended','revoked','rejected')) default 'pending',
  issuer text not null,
  credential_ref text,
  valid_from timestamptz,
  valid_until timestamptz,
  evidence jsonb not null default '{}'::jsonb,
  approval_ref text,
  verification jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_transport_compliance_subject on public.omnii_transport_compliance_cases(subject_type, subject_id, status);
create index if not exists idx_transport_compliance_offence on public.omnii_transport_compliance_cases(offence_code, occurred_at);
create index if not exists idx_transport_compliance_due on public.omnii_transport_compliance_cases(status, due_at);
create index if not exists idx_transport_credentials_subject on public.omnii_transport_credentials(subject_type, subject_id, status);
create index if not exists idx_transport_credentials_expiry on public.omnii_transport_credentials(status, valid_until);

alter table public.omnii_transport_compliance_cases enable row level security;
alter table public.omnii_transport_credentials enable row level security;

create policy transport_compliance_owner_read on public.omnii_transport_compliance_cases
for select to authenticated
using (subject_id = (select auth.uid())::text);

create policy transport_credentials_owner_read on public.omnii_transport_credentials
for select to authenticated
using (subject_id = (select auth.uid())::text);

create policy transport_compliance_reviewer_write on public.omnii_transport_compliance_cases
for all to authenticated
using (authority_ref = (select auth.uid())::text)
with check (authority_ref = (select auth.uid())::text);

create policy transport_credentials_issuer_write on public.omnii_transport_credentials
for all to authenticated
using (issuer = (select auth.uid())::text)
with check (issuer = (select auth.uid())::text);
