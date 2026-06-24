create table if not exists roles (
  role_key text primary key,
  label text not null,
  privileged boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists permissions (
  permission_key text primary key,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists role_permissions (
  role_key text not null references roles(role_key) on delete cascade,
  permission_key text not null references permissions(permission_key) on delete cascade,
  primary key (role_key, permission_key)
);

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  role_key text not null references roles(role_key),
  organization_id uuid references organizations(id) on delete cascade,
  granted_by uuid references profiles(id),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique(profile_id, role_key, organization_id)
);

create table if not exists consent_records (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  consent_type text not null,
  version text not null,
  granted boolean not null,
  scope jsonb not null default '{}'::jsonb,
  granted_at timestamptz,
  withdrawn_at timestamptz,
  source text not null default 'web',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists devices (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  device_name text,
  device_fingerprint_hash text not null,
  trusted boolean not null default false,
  last_seen_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  unique(profile_id, device_fingerprint_hash)
);

create table if not exists login_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  event_type text not null,
  success boolean not null,
  ip_hash text,
  user_agent_hash text,
  correlation_id uuid,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists sensitive_action_challenges (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  action_type text not null,
  status text not null default 'pending',
  expires_at timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

insert into roles(role_key, label, privileged) values
('property_seeker','Property seeker',false),('tenant','Tenant',false),('buyer','Buyer',false),('seller','Seller',false),
('landlord','Landlord',false),('property_owner','Property owner',false),('agent','Agent',false),('agency_owner','Agency owner',false),
('affiliate','Affiliate',false),('property_manager','Property manager',false),('developer','Developer',false),('investor','Investor',false),
('inspector','Inspector',false),('legal_reviewer','Legal reviewer',true),('verification_officer','Verification officer',true),
('compliance_officer','Compliance officer',true),('finance_officer','Finance officer',true),('operations_manager','Operations manager',true),
('seal_approver','SEAL approver',true),('super_admin','Super administrator',true),('product_owner','Product owner',true),('auditor','Auditor',true)
on conflict (role_key) do nothing;

insert into permissions(permission_key, description) values
('property.read','Read property records'),('property.create','Create property records'),('property.update','Update property records'),
('listing.create','Create listings'),('listing.submit','Submit listings'),('listing.publish','Publish listings'),('listing.suspend','Suspend listings'),
('proof.submit','Submit evidence'),('proof.review','Review evidence'),('seal.decide','Make authorized SEAL decisions'),
('inspection.book','Book inspections'),('inspection.manage','Manage inspections'),('admin.access','Access administrative routes'),
('audit.read','Read audit records'),('finance.read','Read finance records'),('finance.reconcile','Run reconciliation')
on conflict (permission_key) do nothing;

insert into role_permissions(role_key, permission_key) values
('property_seeker','property.read'),('property_seeker','inspection.book'),('tenant','property.read'),('buyer','property.read'),
('property_owner','property.create'),('property_owner','property.update'),('property_owner','listing.create'),('property_owner','listing.submit'),('property_owner','proof.submit'),
('agent','property.create'),('agent','listing.create'),('agent','listing.submit'),('agent','inspection.manage'),('agent','proof.submit'),
('verification_officer','proof.review'),('verification_officer','admin.access'),('seal_approver','seal.decide'),('seal_approver','admin.access'),
('operations_manager','admin.access'),('operations_manager','listing.publish'),('operations_manager','listing.suspend'),
('finance_officer','finance.read'),('finance_officer','finance.reconcile'),('finance_officer','admin.access'),
('auditor','audit.read'),('auditor','admin.access'),('super_admin','admin.access')
on conflict do nothing;

create or replace function public.handle_new_bunk_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare initial_role text;
begin
  initial_role := coalesce(new.raw_user_meta_data->>'initial_role', 'property_seeker');
  insert into public.profiles(id, public_reference, display_name, phone, active_role)
  values(new.id, 'BUNK-HAPI-' || upper(substr(replace(new.id::text,'-',''),1,12)), new.raw_user_meta_data->>'display_name', new.phone, initial_role)
  on conflict (id) do nothing;
  insert into public.user_roles(profile_id, role_key)
  values(new.id, initial_role)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_bunk on auth.users;
create trigger on_auth_user_created_bunk after insert on auth.users for each row execute function public.handle_new_bunk_user();

alter table roles enable row level security;
alter table permissions enable row level security;
alter table role_permissions enable row level security;
alter table user_roles enable row level security;
alter table consent_records enable row level security;
alter table devices enable row level security;
alter table login_events enable row level security;
alter table sensitive_action_challenges enable row level security;

create policy "profiles_read_self" on profiles for select using (auth.uid() = id);
create policy "profiles_update_self" on profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "user_roles_read_self" on user_roles for select using (auth.uid() = profile_id);
create policy "consent_manage_self" on consent_records for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "devices_manage_self" on devices for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "login_events_read_self" on login_events for select using (auth.uid() = profile_id);
