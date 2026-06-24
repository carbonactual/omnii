create extension if not exists pgcrypto;
create extension if not exists postgis;

create type bunk_verification_state as enum (
  'unsubmitted','submitted','pending','partially_verified','verified','expired','rejected','disputed','suspended','archived'
);

create type bunk_occupancy_state as enum (
  'vacant','reserved','inspection_pending','offer_pending','occupied','notice_issued','renewal_pending','maintenance_hold','off_market'
);

create type bunk_listing_status as enum (
  'draft','awaiting_information','awaiting_verification','awaiting_human_approval','published','paused','reserved','closed','rejected','suspended','archived'
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  public_reference text not null unique,
  display_name text,
  phone text,
  active_role text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  name text not null,
  organization_type text not null,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  role text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (organization_id, profile_id, role)
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  slug text not null unique,
  name text not null,
  property_type text not null,
  description text not null,
  country_code char(2) not null default 'NG',
  state text not null,
  city text not null,
  district text,
  neighbourhood text,
  location geography(point, 4326),
  geolocation_confidence numeric check (geolocation_confidence between 0 and 1),
  verification_state bunk_verification_state not null default 'unsubmitted',
  occupancy_state bunk_occupancy_state not null default 'vacant',
  risk_state text not null default 'unknown',
  public_visibility boolean not null default false,
  root_reference uuid not null default gen_random_uuid(),
  organization_id uuid references organizations(id),
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  metadata jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists properties_location_gix on properties using gist(location);
create index if not exists properties_discovery_idx on properties(city, district, property_type, verification_state, occupancy_state) where deleted_at is null;

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  property_id uuid not null references properties(id) on delete cascade,
  unit_code text not null,
  unit_type text not null,
  floor text,
  bedrooms integer check (bedrooms >= 0),
  bathrooms integer check (bathrooms >= 0),
  size_sqm numeric check (size_sqm >= 0),
  furnishing text,
  condition text,
  occupancy_state bunk_occupancy_state not null default 'vacant',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique(property_id, unit_code)
);

create table if not exists proof_records (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  subject_type text not null,
  subject_id uuid not null,
  claim text not null,
  evidence_type text not null,
  status text not null check (status in ('claimed','submitted','machine_checked','third_party_checked','human_reviewed','officially_verified','disputed','expired')),
  confidence numeric check (confidence between 0 and 1),
  evidence_location text,
  issuer text,
  submitter_id uuid references profiles(id),
  verifier_id uuid references profiles(id),
  verification_method text,
  evidence_hash text,
  visibility text not null default 'private',
  seal_reference uuid,
  notes text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists seal_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  requested_by uuid references profiles(id),
  authority_required text not null,
  action_type text not null,
  subject_type text not null,
  subject_id uuid not null,
  scope jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists seal_decisions (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references seal_requests(id) on delete cascade,
  human_decision_maker_id uuid not null references profiles(id),
  decision text not null check (decision in ('approved','rejected','amended','revoked')),
  reason text not null,
  evidence_reviewed uuid[] not null default '{}',
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  property_id uuid not null references properties(id) on delete cascade,
  unit_id uuid references units(id) on delete set null,
  listing_type text not null,
  headline text not null,
  description text not null,
  price_minor bigint not null check (price_minor >= 0),
  currency char(3) not null default 'NGN',
  billing_frequency text,
  negotiable boolean not null default false,
  status bunk_listing_status not null default 'draft',
  verification_state bunk_verification_state not null default 'unsubmitted',
  authority_proof_id uuid references proof_records(id),
  seal_decision_id uuid references seal_decisions(id),
  listed_by uuid references profiles(id),
  published_at timestamptz,
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  check (status <> 'published' or (authority_proof_id is not null and seal_decision_id is not null))
);

create index if not exists listings_public_idx on listings(status, listing_type, verification_state, price_minor) where deleted_at is null;

create table if not exists listing_saves (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(listing_id, profile_id)
);

create table if not exists inspections (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  listing_id uuid not null references listings(id) on delete cascade,
  requested_by uuid references profiles(id),
  inspection_type text not null check (inspection_type in ('physical','live_video','recorded_tour','agent_led','independent','group','site_visit')),
  scheduled_for timestamptz not null,
  status text not null default 'booked',
  meeting_point text,
  access_instructions_vault_ref uuid,
  fee_minor bigint not null default 0,
  currency char(3) not null default 'NGN',
  assigned_to uuid references profiles(id),
  checked_in_at timestamptz,
  completed_at timestamptz,
  proof_reference uuid references proof_records(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pulse_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_version integer not null default 1,
  occurred_at timestamptz not null default now(),
  actor_type text not null,
  actor_id uuid,
  subject_type text not null,
  subject_id uuid not null,
  organization_id uuid references organizations(id),
  property_id uuid references properties(id),
  seal_reference uuid references seal_decisions(id),
  proof_reference uuid references proof_records(id),
  root_reference uuid,
  payload jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb
);

alter table profiles enable row level security;
alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table properties enable row level security;
alter table units enable row level security;
alter table proof_records enable row level security;
alter table seal_requests enable row level security;
alter table seal_decisions enable row level security;
alter table listings enable row level security;
alter table listing_saves enable row level security;
alter table inspections enable row level security;
alter table pulse_events enable row level security;
