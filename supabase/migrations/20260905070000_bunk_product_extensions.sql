-- BUNK downstream product extensions.
-- Depends on 0001_bunk_marketplace_core.sql and 0002_bunk_auth_roles_permissions.sql.
-- Canonical semantics remain in OMNII; economic execution remains in TIP.

create table if not exists bunk_property_rights (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  unit_id uuid references units(id) on delete cascade,
  right_type text not null,
  holder_profile_id uuid references profiles(id),
  holder_organization_id uuid references organizations(id),
  status text not null default 'claimed',
  scope jsonb not null default '{}',
  effective_from timestamptz,
  effective_until timestamptz,
  evidence_refs jsonb not null default '[]',
  authority_refs jsonb not null default '[]',
  provenance_refs jsonb not null default '[]',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bunk_wanted_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  requester_id uuid references profiles(id),
  organization_id uuid references organizations(id),
  request_type text not null,
  property_categories text[] not null default '{}',
  locations jsonb not null default '[]',
  criteria jsonb not null default '{}',
  budget_minor bigint check (budget_minor >= 0),
  currency char(3) default 'NGN',
  financing_required boolean not null default false,
  status text not null default 'open',
  expires_at timestamptz,
  authority jsonb not null default '{}',
  provenance jsonb not null default '{}',
  evidence jsonb not null default '{}',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bunk_offers (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  listing_id uuid not null references listings(id) on delete cascade,
  offered_by uuid references profiles(id),
  amount_minor bigint not null check (amount_minor >= 0),
  currency char(3) not null default 'NGN',
  terms jsonb not null default '{}',
  status text not null default 'draft',
  expires_at timestamptz,
  authority jsonb not null default '{}',
  provenance jsonb not null default '{}',
  evidence jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bunk_agreements (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  property_id uuid not null references properties(id) on delete cascade,
  unit_id uuid references units(id) on delete set null,
  listing_id uuid references listings(id) on delete set null,
  agreement_type text not null,
  parties jsonb not null default '[]',
  terms jsonb not null default '{}',
  status text not null default 'draft',
  effective_from timestamptz,
  effective_until timestamptz,
  authority jsonb not null default '{}',
  provenance jsonb not null default '{}',
  evidence jsonb not null default '{}',
  tip_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bunk_maintenance_work_orders (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  property_id uuid not null references properties(id) on delete cascade,
  unit_id uuid references units(id) on delete set null,
  requested_by uuid references profiles(id),
  assigned_to uuid references profiles(id),
  vendor_organization_id uuid references organizations(id),
  category text not null,
  priority text not null default 'normal',
  description text not null,
  status text not null default 'open',
  estimated_cost_minor bigint check (estimated_cost_minor >= 0),
  actual_cost_minor bigint check (actual_cost_minor >= 0),
  currency char(3) not null default 'NGN',
  scheduled_for timestamptz,
  completed_at timestamptz,
  evidence_refs jsonb not null default '[]',
  authority jsonb not null default '{}',
  pulse_payload jsonb not null default '{}',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bunk_property_intelligence (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  dimension text not null,
  claim text not null,
  source_reference text not null,
  observed_at timestamptz not null,
  confidence numeric not null check (confidence between 0 and 1),
  authority_reference text,
  valid_until timestamptz,
  methodology text,
  value jsonb not null default '{}',
  provenance jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists bunk_property_participants (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  profile_id uuid references profiles(id),
  organization_id uuid references organizations(id),
  role text not null,
  status text not null default 'active',
  scope jsonb not null default '{}',
  authority jsonb not null default '{}',
  provenance jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (profile_id is not null or organization_id is not null)
);

create table if not exists bunk_development_projects (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  property_id uuid not null references properties(id) on delete cascade,
  project_type text not null,
  stage text not null default 'concept',
  scope jsonb not null default '{}',
  feasibility jsonb not null default '{}',
  planning jsonb not null default '{}',
  financing jsonb not null default '{}',
  procurement jsonb not null default '{}',
  construction jsonb not null default '{}',
  certification jsonb not null default '{}',
  authority jsonb not null default '{}',
  evidence jsonb not null default '{}',
  provenance jsonb not null default '{}',
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bunk_property_payments (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  property_id uuid not null references properties(id) on delete cascade,
  unit_id uuid references units(id) on delete set null,
  listing_id uuid references listings(id) on delete set null,
  agreement_id uuid references bunk_agreements(id) on delete set null,
  payer_id uuid references profiles(id),
  payee_id uuid references profiles(id),
  amount_minor bigint not null check (amount_minor >= 0),
  currency char(3) not null default 'NGN',
  purpose text not null,
  status text not null default 'pending',
  tip_reference text,
  external_reference text,
  authority jsonb not null default '{}',
  provenance jsonb not null default '{}',
  evidence jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bunk_property_rights_property_idx on bunk_property_rights(property_id,status);
create index if not exists bunk_wanted_requests_status_idx on bunk_wanted_requests(status,request_type);
create index if not exists bunk_offers_listing_idx on bunk_offers(listing_id,status);
create index if not exists bunk_agreements_property_idx on bunk_agreements(property_id,status);
create index if not exists bunk_work_orders_property_idx on bunk_maintenance_work_orders(property_id,status,priority);
create index if not exists bunk_property_intelligence_idx on bunk_property_intelligence(property_id,dimension,observed_at desc);
create index if not exists bunk_property_participants_idx on bunk_property_participants(property_id,role,status);
create index if not exists bunk_development_projects_idx on bunk_development_projects(property_id,stage);
create index if not exists bunk_property_payments_idx on bunk_property_payments(property_id,status,created_at desc);

alter table bunk_property_rights enable row level security;
alter table bunk_wanted_requests enable row level security;
alter table bunk_offers enable row level security;
alter table bunk_agreements enable row level security;
alter table bunk_maintenance_work_orders enable row level security;
alter table bunk_property_intelligence enable row level security;
alter table bunk_property_participants enable row level security;
alter table bunk_development_projects enable row level security;
alter table bunk_property_payments enable row level security;

insert into omnii_registries(id,version,lifecycle,authority,provenance,payload) values
('BUNK:PROPERTY','1.0','active','{"authorityClass":"product"}','{"root":"OMNII","source":"BUNK"}','{"name":"BUNK Property Registry","product":"BUNK","ecosystem":"OMNII"}'),
('BUNK:RIGHTS','1.0','active','{"authorityClass":"product"}','{"root":"OMNII","source":"BUNK"}','{"name":"BUNK Property Rights Registry","product":"BUNK","ecosystem":"OMNII"}'),
('BUNK:PARTICIPANTS','1.0','active','{"authorityClass":"product"}','{"root":"OMNII","source":"BUNK"}','{"name":"BUNK Property Participants Registry","product":"BUNK","ecosystem":"OMNII"}'),
('BUNK:LISTINGS','1.0','active','{"authorityClass":"product"}','{"root":"OMNII","source":"BUNK"}','{"name":"BUNK Property Listings Registry","product":"BUNK","ecosystem":"OMNII"}')
on conflict(id) do update set version=excluded.version,lifecycle=excluded.lifecycle,authority=excluded.authority,provenance=excluded.provenance,payload=excluded.payload,updated_at=now();

insert into omnii_registry_nodes(id,registry_id,name,node_type,metadata) values
('BUNK:PROPERTY:LAND','BUNK:PROPERTY','Land','PROPERTY_CATEGORY','{"category":"LAND"}'),('BUNK:PROPERTY:BUILDING','BUNK:PROPERTY','Building','PROPERTY_CATEGORY','{"category":"BUILDING"}'),('BUNK:PROPERTY:UNIT','BUNK:PROPERTY','Unit','PROPERTY_CATEGORY','{"category":"UNIT"}'),('BUNK:PROPERTY:INFRASTRUCTURE','BUNK:PROPERTY','Infrastructure','PROPERTY_CATEGORY','{"category":"INFRASTRUCTURE"}'),('BUNK:PROPERTY:NATURAL','BUNK:PROPERTY','Natural / Ecological','PROPERTY_CATEGORY','{"category":"NATURAL_ASSET"}'),('BUNK:PROPERTY:CULTURAL','BUNK:PROPERTY','Cultural / Heritage','PROPERTY_CATEGORY','{"category":"CULTURAL_PROPERTY"}'),('BUNK:PROPERTY:CEMETERY','BUNK:PROPERTY','Cemetery / Memorial','PROPERTY_CATEGORY','{"category":"CEMETERY_PROPERTY"}'),('BUNK:PROPERTY:BIOLOGICAL','BUNK:PROPERTY','Biological Resource','PROPERTY_CATEGORY','{"category":"BIOLOGICAL_RESOURCE"}'),('BUNK:PROPERTY:DIGITAL','BUNK:PROPERTY','Digital / Intangible','PROPERTY_CATEGORY','{"category":"DIGITAL_PROPERTY"}'),('BUNK:PROPERTY:FINANCIAL','BUNK:PROPERTY','Financial Property Interest','PROPERTY_CATEGORY','{"category":"FINANCIAL_PROPERTY_INTEREST"}'),('BUNK:PROPERTY:DEVELOPMENT','BUNK:PROPERTY','Development Interest','PROPERTY_CATEGORY','{"category":"DEVELOPMENT_INTEREST"}'),('BUNK:PROPERTY:CAPACITY','BUNK:PROPERTY','Capacity / Usage Interest','PROPERTY_CATEGORY','{"category":"CAPACITY_INTEREST"}'),('BUNK:PROPERTY:SPACE','BUNK:PROPERTY','Space / Frontier','PROPERTY_CATEGORY','{"category":"SPACE_ASSET"}'),('BUNK:PROPERTY:EXTRATERRESTRIAL','BUNK:PROPERTY','Extraterrestrial Resource Candidate','PROPERTY_CATEGORY','{"category":"EXTRATERRESTRIAL_RESOURCE"}'),('BUNK:PROPERTY:UNKNOWN','BUNK:PROPERTY','Unknown Candidate','PROPERTY_CATEGORY','{"category":"UNKNOWN_PROPERTY_CANDIDATE"}'),
('BUNK:RIGHTS:OWNERSHIP','BUNK:RIGHTS','Ownership','PROPERTY_RIGHT','{"rightType":"OWNERSHIP"}'),('BUNK:RIGHTS:BENEFICIAL','BUNK:RIGHTS','Beneficial Interest','PROPERTY_RIGHT','{"rightType":"BENEFICIAL_INTEREST"}'),('BUNK:RIGHTS:LEASEHOLD','BUNK:RIGHTS','Leasehold','PROPERTY_RIGHT','{"rightType":"LEASEHOLD"}'),('BUNK:RIGHTS:TENANCY','BUNK:RIGHTS','Tenancy / Occupancy','PROPERTY_RIGHT','{"rightType":"TENANCY"}'),('BUNK:RIGHTS:LICENSE','BUNK:RIGHTS','License','PROPERTY_RIGHT','{"rightType":"LICENSE"}'),('BUNK:RIGHTS:CONCESSION','BUNK:RIGHTS','Concession','PROPERTY_RIGHT','{"rightType":"CONCESSION"}'),('BUNK:RIGHTS:USUFRUCT','BUNK:RIGHTS','Usufruct','PROPERTY_RIGHT','{"rightType":"USUFRUCT"}'),('BUNK:RIGHTS:EASEMENT','BUNK:RIGHTS','Easement / Access','PROPERTY_RIGHT','{"rightType":"EASEMENT"}'),('BUNK:RIGHTS:LIEN','BUNK:RIGHTS','Lien','PROPERTY_RIGHT','{"rightType":"LIEN"}'),('BUNK:RIGHTS:MORTGAGE','BUNK:RIGHTS','Mortgage / Security Interest','PROPERTY_RIGHT','{"rightType":"MORTGAGE"}'),('BUNK:RIGHTS:OPTION','BUNK:RIGHTS','Option / ROFR','PROPERTY_RIGHT','{"rightType":"OPTION_OR_ROFR"}'),('BUNK:RIGHTS:DEVELOPMENT','BUNK:RIGHTS','Development Right','PROPERTY_RIGHT','{"rightType":"DEVELOPMENT"}'),('BUNK:RIGHTS:EXTRACTION','BUNK:RIGHTS','Extraction Right','PROPERTY_RIGHT','{"rightType":"EXTRACTION"}'),('BUNK:RIGHTS:REVENUE','BUNK:RIGHTS','Revenue Interest','PROPERTY_RIGHT','{"rightType":"REVENUE"}'),('BUNK:RIGHTS:BURIAL','BUNK:RIGHTS','Burial / Memorial','PROPERTY_RIGHT','{"rightType":"BURIAL_RIGHT"}'),
('BUNK:LISTINGS:SALE','BUNK:LISTINGS','Sale','LISTING_TYPE','{"listingType":"sale"}'),('BUNK:LISTINGS:RENT','BUNK:LISTINGS','Rent','LISTING_TYPE','{"listingType":"rent"}'),('BUNK:LISTINGS:LEASE','BUNK:LISTINGS','Lease / Sublease','LISTING_TYPE','{"listingType":"lease"}'),('BUNK:LISTINGS:SHORT_STAY','BUNK:LISTINGS','Short Stay','LISTING_TYPE','{"listingType":"short_stay"}'),('BUNK:LISTINGS:DEVELOPMENT','BUNK:LISTINGS','Development Opportunity','LISTING_TYPE','{"listingType":"development_opportunity"}'),('BUNK:LISTINGS:OFF_PLAN','BUNK:LISTINGS','Off-Plan / New Build','LISTING_TYPE','{"listingType":"off_plan"}'),('BUNK:LISTINGS:DISTRESSED','BUNK:LISTINGS','Distressed / Repossessed','LISTING_TYPE','{"listingType":"distressed"}'),('BUNK:LISTINGS:AUCTION','BUNK:LISTINGS','Auction / Tender','LISTING_TYPE','{"listingType":"auction"}'),('BUNK:LISTINGS:FRACTIONAL','BUNK:LISTINGS','Fractional / Pooled','LISTING_TYPE','{"listingType":"fractional"}'),('BUNK:LISTINGS:FINANCING','BUNK:LISTINGS','Property-Backed Financing','LISTING_TYPE','{"listingType":"property_backed_financing"}'),('BUNK:LISTINGS:MAINTENANCE','BUNK:LISTINGS','Maintenance / Artisan Job','LISTING_TYPE','{"listingType":"maintenance_job"}'),('BUNK:LISTINGS:FACILITY','BUNK:LISTINGS','Facility Service','LISTING_TYPE','{"listingType":"facility_service"}'),
('BUNK:PARTICIPANTS:OWNER','BUNK:PARTICIPANTS','Owner / Rights Holder','PROPERTY_ROLE','{"role":"owner"}'),('BUNK:PARTICIPANTS:AGENT','BUNK:PARTICIPANTS','Agent / Broker','PROPERTY_ROLE','{"role":"agent"}'),('BUNK:PARTICIPANTS:PROFESSIONAL','BUNK:PARTICIPANTS','Property Professional','PROPERTY_ROLE','{"role":"professional"}'),('BUNK:PARTICIPANTS:VALUER','BUNK:PARTICIPANTS','Surveyor / Valuer','PROPERTY_ROLE','{"role":"valuer"}'),('BUNK:PARTICIPANTS:LAWYER','BUNK:PARTICIPANTS','Legal / Conveyancing','PROPERTY_ROLE','{"role":"lawyer"}'),('BUNK:PARTICIPANTS:PLANNER','BUNK:PARTICIPANTS','Planner / Approvals','PROPERTY_ROLE','{"role":"planner"}'),('BUNK:PARTICIPANTS:ARCHITECT','BUNK:PARTICIPANTS','Architect / Engineer','PROPERTY_ROLE','{"role":"architect_engineer"}'),('BUNK:PARTICIPANTS:CONTRACTOR','BUNK:PARTICIPANTS','Contractor / Builder','PROPERTY_ROLE','{"role":"contractor_builder"}'),('BUNK:PARTICIPANTS:ARTISAN','BUNK:PARTICIPANTS','Artisan / Vendor','PROPERTY_ROLE','{"role":"artisan_vendor"}'),('BUNK:PARTICIPANTS:INSURER','BUNK:PARTICIPANTS','Insurer / Risk Provider','PROPERTY_ROLE','{"role":"insurer"}'),('BUNK:PARTICIPANTS:FM','BUNK:PARTICIPANTS','Facility / Property Manager','PROPERTY_ROLE','{"role":"facility_manager"}')
on conflict(id) do update set registry_id=excluded.registry_id,name=excluded.name,node_type=excluded.node_type,metadata=excluded.metadata;

with e(source_node,target_node,relationship_type) as (values
('BUNK:PROPERTY:LAND','BUNK:PROPERTY:BUILDING','may_contain'),('BUNK:PROPERTY:BUILDING','BUNK:PROPERTY:UNIT','may_contain'),('BUNK:PROPERTY:LAND','BUNK:RIGHTS:OWNERSHIP','may_have_right'),('BUNK:PROPERTY:LAND','BUNK:RIGHTS:EASEMENT','may_have_right'),('BUNK:PROPERTY:LAND','BUNK:RIGHTS:DEVELOPMENT','may_have_right'),('BUNK:PROPERTY:LAND','BUNK:RIGHTS:EXTRACTION','may_have_right'),('BUNK:PROPERTY:BUILDING','BUNK:RIGHTS:TENANCY','may_have_right'),('BUNK:PROPERTY:CEMETERY','BUNK:RIGHTS:BURIAL','may_have_right'),('BUNK:PROPERTY:LAND','BUNK:LISTINGS:SALE','may_be_represented_by'),('BUNK:PROPERTY:BUILDING','BUNK:LISTINGS:RENT','may_be_represented_by'),('BUNK:PROPERTY:BUILDING','BUNK:LISTINGS:LEASE','may_be_represented_by'),('BUNK:PROPERTY:BUILDING','BUNK:LISTINGS:SHORT_STAY','may_be_represented_by'),('BUNK:PROPERTY:DEVELOPMENT','BUNK:LISTINGS:DEVELOPMENT','may_be_represented_by'),('BUNK:PROPERTY:BUILDING','BUNK:LISTINGS:MAINTENANCE','may_be_represented_by'))
insert into omnii_registry_edges(id,source_node,target_node,relationship_type,metadata)
select gen_random_uuid(),e.source_node,e.target_node,e.relationship_type,'{}'::jsonb from e
where not exists (select 1 from omnii_registry_edges x where x.source_node=e.source_node and x.target_node=e.target_node and x.relationship_type=e.relationship_type);

insert into omnii_form_templates(id,version,lifecycle,form_type,name,description,subject_kind,schema,rules,workflow,authority,timing,cost_model,privacy,provenance)
select id,'1','active','product',name,description,subject_kind,schema,rules,workflow,authority,timing,cost_model,privacy,'{"root":"OMNII","product":"BUNK"}'::jsonb
from (values
('BUNK:PROPERTY_INTAKE','Property Intake','Register a property or candidate','property','{"fields":[{"id":"name","type":"text","required":true},{"id":"property_type","type":"text","required":true},{"id":"state","type":"text","required":true},{"id":"city","type":"text","required":true},{"id":"description","type":"textarea","required":true}]}'),
('BUNK:LISTING_CREATE','Listing Creation','Create a property or unit listing','listing','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"listing_type","type":"select","required":true},{"id":"headline","type":"text","required":true},{"id":"price","type":"money","required":true}]}'),
('BUNK:WANTED_REQUEST','Wanted Request','Request a property, space, service or opportunity','wanted_request','{"fields":[{"id":"request_type","type":"text","required":true},{"id":"locations","type":"array","required":true},{"id":"criteria","type":"json","required":true}]}'),
('BUNK:PROPERTY_INSPECTION','Property Inspection','Schedule and record inspection','inspection','{"fields":[{"id":"listing_id","type":"uuid","required":true},{"id":"inspection_type","type":"select","required":true},{"id":"scheduled_for","type":"datetime","required":true},{"id":"evidence_refs","type":"array","required":true}]}'),
('BUNK:PROPERTY_OFFER','Property Offer','Submit an offer','offer','{"fields":[{"id":"listing_id","type":"uuid","required":true},{"id":"amount_minor","type":"money","required":true},{"id":"currency","type":"currency","required":true},{"id":"terms","type":"json","required":true}]}'),
('BUNK:AGREEMENT_TENANCY','Agreement / Tenancy','Create or submit agreement package','agreement','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"agreement_type","type":"select","required":true},{"id":"parties","type":"array","required":true},{"id":"terms","type":"json","required":true}]}'),
('BUNK:MAINTENANCE_WORK_ORDER','Maintenance Work Order','Report, assign and close maintenance','maintenance','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"category","type":"text","required":true},{"id":"priority","type":"select","required":true},{"id":"description","type":"textarea","required":true}]}'),
('BUNK:PROPERTY_VALUATION','Valuation / Feasibility','Capture valuation or feasibility','valuation','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"method","type":"text","required":true},{"id":"assumptions","type":"json","required":true},{"id":"evidence_refs","type":"array","required":true}]}'),
('BUNK:DEVELOPMENT_PROJECT','Development Project','Start and govern development','development','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"project_type","type":"text","required":true},{"id":"scope","type":"json","required":true}]}'),
('BUNK:PROPERTY_VERIFICATION','Property Verification','Submit or review verification evidence','verification','{"fields":[{"id":"subject_type","type":"select","required":true},{"id":"subject_id","type":"uuid","required":true},{"id":"claim","type":"text","required":true},{"id":"evidence_refs","type":"array","required":true}]}'),
('BUNK:PROPERTY_PARTICIPANT_ONBOARDING','Participant Onboarding','Onboard property professionals and operators','participant','{"fields":[{"id":"role","type":"select","required":true},{"id":"credentials","type":"array"}]}'),
('BUNK:PROPERTY_TRANSFER_CLOSURE','Transfer / Closure','Transfer, retire, preserve or archive','lifecycle','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"action","type":"select","required":true},{"id":"reason","type":"textarea","required":true},{"id":"evidence_refs","type":"array","required":true}]}'),
('BUNK:LAND_RIGHTS_EVIDENCE','Land / Rights Evidence','Capture tenure and rights evidence','property_right','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"right_type","type":"select","required":true},{"id":"evidence_refs","type":"array","required":true}]}'),
('BUNK:DUE_DILIGENCE','Due Diligence','Property, title, market and risk due diligence','due_diligence','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"scope","type":"json","required":true},{"id":"findings","type":"json","required":true},{"id":"evidence_refs","type":"array","required":true}]}'),
('BUNK:PROPERTY_MATCH_REQUEST','Property Match Request','Explainable property matching','matching','{"fields":[{"id":"wanted_request_id","type":"uuid","required":true},{"id":"candidate_filters","type":"json","required":true}]}'),
('BUNK:FINANCING_REQUEST','Property Financing Request','Request acquisition, development or renovation finance','financing','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"purpose","type":"select","required":true},{"id":"amount_minor","type":"money","required":true},{"id":"evidence_refs","type":"array","required":true}]}'),
('BUNK:INSURANCE_RISK','Insurance / Risk','Capture property risk and coverage workflow','insurance','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"risk_profile","type":"json","required":true},{"id":"coverage_request","type":"json","required":true}]}'),
('BUNK:PROPERTY_SERVICE_JOB','Property Service Job','Create a property service opportunity','service_job','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"service_type","type":"text","required":true},{"id":"scope","type":"json","required":true}]}'),
('BUNK:ARTISAN_VENDOR_ONBOARDING','Artisan / Vendor Onboarding','Onboard property service providers','participant','{"fields":[{"id":"role","type":"select","required":true},{"id":"credentials","type":"array","required":true},{"id":"service_areas","type":"array","required":true}]}'),
('BUNK:PROPERTY_PORTFOLIO','Property Portfolio','Govern a portfolio of property interests','portfolio','{"fields":[{"id":"name","type":"text","required":true},{"id":"property_refs","type":"array","required":true},{"id":"strategy","type":"json","required":true}]}'),
('BUNK:REDEVELOPMENT_ADAPTATION','Redevelopment / Adaptation','Govern conversion and adaptive reuse','redevelopment','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"proposal","type":"json","required":true},{"id":"planning","type":"json","required":true}]}'),
('BUNK:RECOVERY_REUSE','Recovery / Reuse','Recover, recycle, preserve or repurpose value','recovery','{"fields":[{"id":"property_id","type":"uuid","required":true},{"id":"action","type":"select","required":true},{"id":"evidence_refs","type":"array","required":true}]}')
) as f(id,name,description,subject_kind,schema)
left join lateral (select '{}'::jsonb as rules,'{}'::jsonb as workflow,'{"humanApproval":true}'::jsonb as authority,'{}'::jsonb as timing,'{"model":"value+money"}'::jsonb as cost_model,'{"classification":"controlled"}'::jsonb as privacy) x on true
on conflict(id) do update set version=excluded.version,lifecycle=excluded.lifecycle,form_type=excluded.form_type,name=excluded.name,description=excluded.description,subject_kind=excluded.subject_kind,schema=excluded.schema,rules=excluded.rules,workflow=excluded.workflow,authority=excluded.authority,timing=excluded.timing,cost_model=excluded.cost_model,privacy=excluded.privacy,provenance=excluded.provenance,updated_at=now();

insert into omnii_institutional_bindings(id,institution_ref,lifecycle,version,form_refs,workflow_refs,registry_refs,capability_refs,automation_refs,authority,metadata,policy,provenance)
values('BUNK:INSTITUTIONAL_BINDING','BUNK','active','1.0','["BUNK:PROPERTY_INTAKE","BUNK:LISTING_CREATE","BUNK:WANTED_REQUEST","BUNK:PROPERTY_INSPECTION","BUNK:PROPERTY_OFFER","BUNK:AGREEMENT_TENANCY","BUNK:MAINTENANCE_WORK_ORDER","BUNK:PROPERTY_VALUATION","BUNK:DEVELOPMENT_PROJECT","BUNK:PROPERTY_VERIFICATION","BUNK:PROPERTY_PARTICIPANT_ONBOARDING","BUNK:PROPERTY_TRANSFER_CLOSURE","BUNK:LAND_RIGHTS_EVIDENCE","BUNK:DUE_DILIGENCE","BUNK:PROPERTY_MATCH_REQUEST","BUNK:FINANCING_REQUEST","BUNK:INSURANCE_RISK","BUNK:PROPERTY_SERVICE_JOB","BUNK:ARTISAN_VENDOR_ONBOARDING","BUNK:PROPERTY_PORTFOLIO","BUNK:REDEVELOPMENT_ADAPTATION","BUNK:RECOVERY_REUSE"]','[]','["BUNK:PROPERTY","BUNK:RIGHTS","BUNK:PARTICIPANTS","BUNK:LISTINGS"]','["property-discovery","property-listings","property-matching","inspection","property-intelligence","maintenance","property-lifecycle","TIP:TRADE","TIP:INVESTMENT","TIP:FINANCING","TIP:SETTLEMENT"]','[]','{"humanAuthority":true,"aiCannotGrantSeal":true}','{"product":"BUNK","ecosystem":"OMNII","economicFoundation":"TIP"}','{"publicProjection":"Atlas-controlled","privateData":"Vault-controlled","economicExecution":"TIP-controlled"}','{"root":"OMNII","source":"BUNK","canonicalProduct":true}')
on conflict(id) do update set lifecycle=excluded.lifecycle,version=excluded.version,form_refs=excluded.form_refs,workflow_refs=excluded.workflow_refs,registry_refs=excluded.registry_refs,capability_refs=excluded.capability_refs,automation_refs=excluded.automation_refs,authority=excluded.authority,metadata=excluded.metadata,policy=excluded.policy,provenance=excluded.provenance,updated_at=now();

insert into permissions(permission_key,description) values ('bunk.form.submit','Submit BUNK product forms'),('bunk.form.review','Review BUNK product forms') on conflict(permission_key) do nothing;
insert into role_permissions(role_key,permission_key) values ('property_seeker','bunk.form.submit'),('property_owner','bunk.form.submit'),('agent','bunk.form.submit'),('verification_officer','bunk.form.review'),('seal_approver','bunk.form.review'),('operations_manager','bunk.form.review'),('finance_officer','bunk.form.review'),('product_owner','bunk.form.review') on conflict do nothing;
