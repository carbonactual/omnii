create table if not exists public.omnii_product_conformance (
  product_key text primary key,
  name text not null,
  repository text,
  architectural_class text not null,
  status text not null default 'conforming',
  specialization jsonb not null default '{}'::jsonb,
  common_primitives jsonb not null default '[]'::jsonb,
  foundation_dependencies jsonb not null default '[]'::jsonb,
  authority_boundary jsonb not null default '{"abba_can_issue_authority":false,"human_authority_preserved":true}'::jsonb,
  interoperability jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.omnii_product_conformance enable row level security;
revoke all on table public.omnii_product_conformance from anon, authenticated;
grant select, insert, update, delete on table public.omnii_product_conformance to service_role;

drop policy if exists product_conformance_service_only on public.omnii_product_conformance;
create policy product_conformance_service_only on public.omnii_product_conformance for all to service_role using (true) with check (true);

insert into public.omnii_product_conformance (product_key,name,repository,architectural_class,status,specialization,common_primitives,foundation_dependencies,interoperability,notes)
values
('ABBA','ABBA Master Intelligence','carbonactual/abba','product','conforming','{"role":"master intelligence and orchestration"}','["identity","relationship","intent","capability","discovery","matching","context","authority","authorization","workflow","execution","evidence","outcome","value","pulse","interoperability"]','["OMNII","ABBA control plane","SEAL","universal runtime","Atlas"]','["API","MCP","provider adapters","webhooks"]','Master intelligence; never authority issuer.'),
('ABBA_MAS','ABBA MAS','carbonactual/abba-mas','reusable capability / orchestration product','conforming','{"role":"command routing proof and execution coordination"}','["identity","intent","capability","authority","authorization","workflow","execution","evidence","audit","interoperability"]','["OMNII","ABBA","SEAL","universal runtime"]','["GitHub","Actions","APIs","providers"]','Coordination surface over canonical runtime.'),
('OMNI','OMNI Operating Environment','carbonactual/omni','product / runtime client','conforming','{"role":"user-facing operating environment"}','["identity","relationship","intent","capability","discovery","matching","context","resource","authority","workflow","execution","value","interoperability"]','["OMNII","ABBA","Atlas"]','["API","MCP","provider adapters"]','Client/runtime manifestation; no competing canonical graph.'),
('HAPI_WORLD','HAPI World','carbonactual/hapi-world','ecosystem composition','conforming','{"role":"human and AI ecosystem composition"}','["identity","relationship","intent","capability","discovery","matching","context","availability","trust","value","management","evidence","interoperability"]','["OMNII","HAPI","ABBA"]','["API","connectors","protocols"]','Reference ecosystem composition.'),
('HAPI_WORLD_NEXUS','HAPI World Nexus','carbonactual/hapi-world-nexus','presentation / ecosystem client','conforming','{"role":"ecosystem presentation and routing surface"}','["identity","relationship","discovery","context","location_time","intent","capability","evidence","value"]','["OMNII","Atlas","HAPI"]','["API","webhooks"]','Presentation must not become canonical authority.'),
('NASC','NASC Institutional Service Centre','carbonactual/abba-automation-ecosystem','institutional configuration + product','conforming','{"role":"institutional registries services forms workflows automations and agents"}','["identity","relationship","intent","capability","discovery","matching","context","availability","authority","authorization","workflow","management","evidence","compliance_risk","communication","interoperability"]','["OMNII","ABBA","SEAL","universal workflow runtime"]','["API","webhooks","provider adapters","automation"]','Institutional deployment; domain rules stay downstream.'),
('DIRECT_BANK_APP','Direct Bank App','carbonactual/direct-bank-app','financial product','conforming','{"role":"customer-facing banking and controlled payment workflow"}','["identity","relationship","intent","authority","authorization","workflow","value","transaction","settlement","evidence","risk","audit","interoperability"]','["OMNII","I/O","Value","Settlement","Ledger"]','["payment APIs","bank adapters","CSV import"]','Money movement requires explicit authority and reconciliation.'),
('OPEN_BALLOT','Open Ballot','carbonactual/open-ballot','civic simulator / domain product','conforming','{"role":"civic transparency training and simulation"}','["identity","relationship","intent","capability","context","location_time","workflow","evidence","trust","audit","interoperability"]','["OMNII","Atlas","Evidence","HAPI"]','["API","SMS","USSD","IVR","offline adapters"]','Simulation boundary preserved; no official-election authority.'),
('RITES','RITES','carbonactual/RITES','domain product','conforming','{"role":"human continuity identity relationships wishes transitions archives and legacy"}','["identity","relationship","intent","context","lifecycle","resource","rights","authority","document_evidence","workflow","communication","continuity","interoperability"]','["OMNII","HAPI","SEAL","Continuity"]','["API","provider adapters","notifications"]','Human consent remains explicit.'),
('NIGERIAN_CULTURAL_ATLAS','Nigerian Cultural Atlas','carbonactual/nigerian-cultural-atlas','cultural knowledge product','conforming','{"role":"cultural knowledge discovery and Atlas presentation"}','["identity","relationship","knowledge","intent","discovery","context","location_time","evidence","trust","communication","lifecycle","resource","value"]','["OMNII","Atlas","Knowledge","Evidence"]','["API","imports","media adapters"]','Claims require provenance and evidence.'),
('BKLIT_UI','BKLIT UI','carbonactual/bklit-ui','presentation/UI','conforming','{"role":"presentation surface"}','["identity","intent","discovery","matching","context","availability","property","value","workflow","evidence"]','["OMNII","Atlas"]','["API"]','No local canonical semantics.'),
('BUNK','BUNK','carbonactual/omnii','domain product','conforming','{"role":"property infrastructure and built-environment product"}','["identity","relationship","intent","capability","discovery","matching","context","availability","resource","property","rights","value","exchange","workflow","evidence","risk","interoperability"]','["OMNII","TIP","Atlas","Value","I/O"]','["API","property data adapters","payment adapters"]','Downstream property composition; economics route through shared trade/value contracts.'),
('NOUN_STUDENT_BOT','NOUN Student Bot','carbonactual/noun-student-bot','education domain product','conforming','{"role":"student support onboarding and academic assistance"}','["identity","relationship","intent","capability","context","workflow","availability","communication","document_evidence","management","interoperability"]','["OMNII","HAPI","ABBA","Evidence"]','["WhatsApp","Zapier","API","email"]','AI support cannot impersonate institution or take consequential academic actions.')
on conflict (product_key) do update set name=excluded.name, repository=excluded.repository, architectural_class=excluded.architectural_class, status=excluded.status, specialization=excluded.specialization, common_primitives=excluded.common_primitives, foundation_dependencies=excluded.foundation_dependencies, interoperability=excluded.interoperability, notes=excluded.notes, updated_at=now();

create index if not exists idx_omnii_product_conformance_class on public.omnii_product_conformance(architectural_class);
create index if not exists idx_omnii_product_conformance_status on public.omnii_product_conformance(status);
