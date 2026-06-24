create extension if not exists pgcrypto;
create extension if not exists postgis;

create type verification_state as enum ('unsubmitted','submitted','pending','partially_verified','verified','expired','rejected','disputed','suspended','archived');
create type seal_decision_kind as enum ('approved','rejected','amended','revoked');
create type listing_status as enum ('draft','awaiting_information','awaiting_verification','awaiting_human_approval','published','paused','reserved','closed','rejected','suspended','archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  public_reference text unique not null,
  display_name text not null,
  phone text,
  country_code char(2) not null default 'NG',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  organization_type text not null,
  country_code char(2) not null default 'NG',
  metadata jsonb not null default '{}',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_key text not null,
  status text not null default 'active',
  primary key (organization_id, profile_id, role_key)
);

create table public.root_records (
  id uuid primary key default gen_random_uuid(),
  subject_type text not null,
  subject_id uuid not null,
  source_type text not null,
  source_id text,
  created_by uuid references public.profiles(id),
  lineage jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  slug text unique not null,
  name text not null,
  property_type text not null,
  description text not null,
  country_code char(2) not null default 'NG',
  state text not null,
  lga text,
  city text not null,
  district text,
  neighbourhood text,
  address_text text,
  location geography(point,4326),
  geolocation_confidence numeric(5,2),
  land_size_sqm numeric,
  building_size_sqm numeric,
  bedrooms int,
  bathrooms int,
  toilets int,
  parking int,
  floors int,
  furnishing text,
  condition text,
  amenities jsonb not null default '[]',
  utilities jsonb not null default '[]',
  accessibility jsonb not null default '[]',
  verification_state verification_state not null default 'unsubmitted',
  occupancy_state text not null default 'vacant',
  risk_state text not null default 'unknown',
  public_visibility boolean not null default false,
  organization_id uuid references public.organizations(id),
  created_by uuid not null references public.profiles(id),
  managed_by uuid references public.profiles(id),
  root_reference uuid not null references public.root_records(id),
  metadata jsonb not null default '{}',
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index properties_location_gix on public.properties using gist(location);
create index properties_search_idx on public.properties using gin(to_tsvector('english', coalesce(name,'') || ' ' || coalesce(description,'') || ' ' || coalesce(city,'') || ' ' || coalesce(district,'')));

create table public.units (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  property_id uuid not null references public.properties(id) on delete cascade,
  unit_code text not null,
  unit_type text not null,
  floor text,
  bedrooms int,
  bathrooms int,
  size_sqm numeric,
  amenities jsonb not null default '[]',
  furnishing text,
  condition text,
  availability_date date,
  occupancy_state text not null default 'vacant',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(property_id, unit_code)
);

create table public.proof_records (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  subject_type text not null,
  subject_id uuid not null,
  claim text not null,
  evidence_type text not null,
  evidence_location text,
  submitter_id uuid references public.profiles(id),
  verifier_id uuid references public.profiles(id),
  verification_method text,
  status text not null default 'claimed',
  confidence numeric(5,2),
  evidence_hash text,
  visibility text not null default 'private',
  seal_decision_id uuid,
  notes text,
  disputed boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.seal_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  requester_id uuid not null references public.profiles(id),
  authority_holder_id uuid not null references public.profiles(id),
  action_type text not null,
  subject_type text not null,
  subject_id uuid not null,
  requested_scope jsonb not null,
  evidence_ids uuid[] not null default '{}',
  status text not null default 'pending',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.seal_decisions (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.seal_requests(id),
  human_decision_maker_id uuid not null references public.profiles(id),
  decision seal_decision_kind not null,
  approved_scope jsonb not null default '{}',
  reason text not null,
  evidence_reviewed uuid[] not null default '{}',
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_at timestamptz not null default now()
);
alter table public.proof_records add constraint proof_seal_fk foreign key (seal_decision_id) references public.seal_decisions(id);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  property_id uuid not null references public.properties(id),
  unit_id uuid references public.units(id),
  listing_type text not null,
  headline text not null,
  public_description text not null,
  price_minor bigint not null check (price_minor >= 0),
  currency char(3) not null default 'NGN',
  billing_frequency text,
  negotiable boolean not null default false,
  fees jsonb not null default '{}',
  terms jsonb not null default '{}',
  restrictions jsonb not null default '[]',
  status listing_status not null default 'draft',
  verification_state verification_state not null default 'unsubmitted',
  authority_proof_id uuid references public.proof_records(id),
  publication_seal_id uuid references public.seal_decisions(id),
  listed_by uuid not null references public.profiles(id),
  organization_id uuid references public.organizations(id),
  available_from date,
  expires_at timestamptz,
  view_count bigint not null default 0,
  save_count bigint not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint published_requires_seal check (status <> 'published' or publication_seal_id is not null)
);

create table public.wanted_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  requester_id uuid not null references public.profiles(id),
  criteria jsonb not null,
  privacy_level text not null default 'private',
  match_consent boolean not null default false,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inspections (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  listing_id uuid not null references public.listings(id),
  requester_id uuid not null references public.profiles(id),
  assigned_to uuid references public.profiles(id),
  inspection_type text not null,
  scheduled_at timestamptz not null,
  status text not null default 'booked',
  meeting_point text,
  access_instructions_vault_ref uuid,
  check_in_at timestamptz,
  check_out_at timestamptz,
  proof_id uuid references public.proof_records(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  listing_id uuid not null references public.listings(id),
  offered_by uuid not null references public.profiles(id),
  amount_minor bigint not null check (amount_minor >= 0),
  currency char(3) not null default 'NGN',
  terms jsonb not null default '{}',
  status text not null default 'pending',
  accepted_seal_id uuid references public.seal_decisions(id),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint accepted_offer_requires_seal check (status <> 'accepted' or accepted_seal_id is not null)
);

create table public.pulse_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_version int not null default 1,
  occurred_at timestamptz not null default now(),
  actor_type text not null,
  actor_id uuid,
  subject_type text not null,
  subject_id uuid not null,
  organization_id uuid references public.organizations(id),
  property_id uuid references public.properties(id),
  seal_reference uuid references public.seal_decisions(id),
  proof_reference uuid references public.proof_records(id),
  root_reference uuid references public.root_records(id),
  payload jsonb not null default '{}',
  metadata jsonb not null default '{}'
);
create index pulse_subject_idx on public.pulse_events(subject_type, subject_id, occurred_at desc);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  subject_type text not null,
  subject_id uuid,
  before_state jsonb,
  after_state jsonb,
  correlation_id uuid,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.properties enable row level security;
alter table public.units enable row level security;
alter table public.listings enable row level security;
alter table public.proof_records enable row level security;
alter table public.seal_requests enable row level security;
alter table public.seal_decisions enable row level security;
alter table public.wanted_requests enable row level security;
alter table public.inspections enable row level security;
alter table public.offers enable row level security;

create policy profiles_self on public.profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy properties_public_read on public.properties for select using (public_visibility = true and deleted_at is null);
create policy properties_owner_manage on public.properties for all using (created_by = auth.uid()) with check (created_by = auth.uid());
create policy listings_public_read on public.listings for select using (status = 'published' and deleted_at is null);
create policy listings_owner_manage on public.listings for all using (listed_by = auth.uid()) with check (listed_by = auth.uid());
create policy wanted_owner on public.wanted_requests for all using (requester_id = auth.uid()) with check (requester_id = auth.uid());
create policy inspections_party on public.inspections for select using (requester_id = auth.uid() or assigned_to = auth.uid());
create policy seal_human_queue on public.seal_requests for select using (requester_id = auth.uid() or authority_holder_id = auth.uid());
create policy seal_human_decide on public.seal_decisions for insert with check (human_decision_maker_id = auth.uid());
