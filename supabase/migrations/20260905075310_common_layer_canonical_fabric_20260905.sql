-- OMNII Common Layer: canonical reusable semantic fabric
create table if not exists public.omnii_common_primitives (
  key text primary key,
  semantic_class text not null,
  layer_role text not null check (layer_role in ('foundation','common','cross_cutting','integration')),
  canonical_backing text not null,
  lifecycle text not null default 'active',
  description text not null,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists omnii_common_primitives_role_idx
  on public.omnii_common_primitives(layer_role, semantic_class);

alter table public.omnii_common_primitives enable row level security;
revoke all on table public.omnii_common_primitives from anon, authenticated;
grant select on table public.omnii_common_primitives to service_role;
grant insert, update, delete on table public.omnii_common_primitives to service_role;

grant select on table public.omnii_common_primitives to anon, authenticated;

insert into public.omnii_common_primitives
  (key, semantic_class, layer_role, canonical_backing, description, provenance)
values
 ('identity','IDENTITY','foundation','omnii_objects','Canonical who/what identity and governed object envelope.','{"source":"OMNII common layer","horizon":"NOW|FUTURE|EMERGING|OLD|UNKNOWN_ALIEN"}'::jsonb),
 ('relationship','RELATIONSHIP','foundation','omnii_relationships','Typed connection between canonical objects with temporal, authority and provenance semantics.','{"source":"OMNII common layer"}'::jsonb),
 ('intent','INTENT','foundation','omnii_objects / workflow contracts','What an entity wants, needs, requests, offers, commits to or seeks to accomplish.','{"source":"OMNII common layer"}'::jsonb),
 ('capability','CAPABILITY','foundation','capability registries / omnii_objects','What a human, organization, service, AI or agent is able and permitted to perform subject to authority.','{"source":"OMNII common layer"}'::jsonb),
 ('discovery','DISCOVERY','common','registries / atlas / indexed objects','Reveal discoverable entities, capabilities, resources, services and opportunities under visibility rules.','{"source":"OMNII common layer"}'::jsonb),
 ('matching','MATCHING','common','omnii_intent_capability_matches','Match intent to capable candidates under context, availability, evidence and constraints.','{"source":"OMNII common layer"}'::jsonb),
 ('context','CONTEXT','common','operating contexts','Location, time, jurisdiction, identity, relationship, permissions and circumstances governing interpretation.','{"source":"OMNII common layer"}'::jsonb),
 ('availability','AVAILABILITY','common','capacity / reservation contracts','Capacity, schedule, location, constraints and reservability for resources and services.','{"source":"OMNII common layer"}'::jsonb),
 ('lifecycle','LIFECYCLE','common','state/lifecycle fields across canonical objects','Governed progression of an object, interaction, workflow or obligation through domain-valid states.','{"source":"OMNII common layer"}'::jsonb),
 ('trust','TRUST','cross_cutting','verification / provenance / evidence','Trust assessment from identity, verification, history, reputation, provenance and evidence without equating trust to authority.','{"source":"OMNII common layer"}'::jsonb),
 ('authority','AUTHORITY','cross_cutting','omnii_authorities / SEAL','Delegated authority scoped by principal, issuer, capability, constraints, context and time.','{"source":"OMNII common layer"}'::jsonb),
 ('authorization','AUTHORIZATION','cross_cutting','ABBA execution guards / policy contracts','Decision that a proposed consequential action is permitted within explicit authority and policy.','{"source":"OMNII common layer"}'::jsonb),
 ('resource','RESOURCE','common','canonical objects / resource contracts','Generic physical, digital, human, ecological, financial or informational resource.','{"source":"OMNII common layer"}'::jsonb),
 ('property','PROPERTY','domain_capability','BUNK + canonical resource/property contracts','Property specialization layered on generic resources, rights, custody and usage.','{"source":"OMNII common layer"}'::jsonb),
 ('rights','RIGHTS','common','authority / economic rights contracts','Ownership, custody, access, usage, data, AI, carbon, water, energy and other rights.','{"source":"OMNII common layer"}'::jsonb),
 ('value','VALUE','foundation','economic vectors / compositions / valuation','Universal representation of monetary and non-monetary value, cost, benefit, capacity and obligation.','{"source":"OMNII common layer"}'::jsonb),
 ('exchange','EXCHANGE','common','economic transaction / trade contracts','General mechanism for transfer or reciprocal movement of value, rights, resources or service.','{"source":"OMNII common layer"}'::jsonb),
 ('market','MARKET','common','market / order / trade contracts','Context in which offers, needs, price/value, rules, capacity and participants interact.','{"source":"OMNII common layer"}'::jsonb),
 ('offer','OFFER','common','forms / economic offers','Proposed provision of a resource, capability, service, right or value.','{"source":"OMNII common layer"}'::jsonb),
 ('order','ORDER','common','orders / workflow contracts','Structured instruction or request to perform an agreed exchange or service.','{"source":"OMNII common layer"}'::jsonb),
 ('transaction','TRANSACTION','common','economic event / settlement contracts','Governed exchange occurrence producing state changes and evidence.','{"source":"OMNII common layer"}'::jsonb),
 ('io','IO','foundation','movement / transport / runtime IO contracts','Governed input/output and movement of people, goods, data, money/value, rights and obligations.','{"source":"OMNII common layer"}'::jsonb),
 ('settlement','SETTLEMENT','common','settlement / ledger contracts','Finalization or accounting state change following an exchange or obligation.','{"source":"OMNII common layer"}'::jsonb),
 ('management','MANAGEMENT','common','workflow / task / process runtime','Plan, assign, coordinate, monitor, approve, execute, escalate, measure and report.','{"source":"OMNII common layer"}'::jsonb),
 ('communication','COMMUNICATION','common','message / notification / channel adapters','Channel-neutral message, request, response, negotiation, confirmation and escalation.','{"source":"OMNII common layer"}'::jsonb),
 ('document_evidence','DOCUMENT_EVIDENCE','common','documents / evidence / proof contracts','Document, credential, certificate, contract, record, receipt, media or evidence linked to entities and events.','{"source":"OMNII common layer"}'::jsonb),
 ('workflow','WORKFLOW','common','institutional workflows / process runtime','Reusable stateful orchestration of work, approvals, tasks, exceptions and outcomes.','{"source":"OMNII common layer"}'::jsonb),
 ('location_time','LOCATION_TIME','common','operating context / temporal contracts','Universal where/when coordinates for objects, events, availability, journeys and decisions.','{"source":"OMNII common layer"}'::jsonb),
 ('compliance_risk','COMPLIANCE_RISK','cross_cutting','policy / compliance / risk contracts','Evaluate rules, eligibility, restrictions, risk, approval and supporting evidence.','{"source":"OMNII common layer"}'::jsonb),
 ('analytics_learning','ANALYTICS_LEARNING','cross_cutting','events / metrics / Pulse / knowledge','Event measurement, insight, feedback, learning and improvement without redefining source-of-truth semantics.','{"source":"OMNII common layer"}'::jsonb),
 ('interoperability','INTEROPERABILITY','integration','API / connector / protocol adapters','Transport- and provider-neutral connection through API, MCP, A2A, webhook, import/export and future protocols.','{"source":"OMNII common layer"}'::jsonb)
on conflict (key) do update set
  semantic_class = excluded.semantic_class,
  layer_role = excluded.layer_role,
  canonical_backing = excluded.canonical_backing,
  lifecycle = excluded.lifecycle,
  description = excluded.description,
  provenance = excluded.provenance,
  updated_at = now();

create table if not exists public.omnii_intent_capability_matches (
  id text primary key,
  intent_ref text not null,
  capability_ref text not null,
  candidate_ref text,
  subject_ref text,
  operating_context_id text,
  availability_ref text,
  status text not null default 'discovered' check (status in ('discovered','matched','rejected','expired','superseded')),
  match_score numeric(8,6) check (match_score is null or (match_score >= 0 and match_score <= 1)),
  constraint_refs jsonb not null default '{}'::jsonb,
  rationale jsonb not null default '{}'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  authority_ref text,
  provenance jsonb not null default '{}'::jsonb,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_until is null or valid_until > valid_from),
  check (authority_ref is null or length(trim(authority_ref)) > 0)
);

create index if not exists omnii_matches_intent_idx on public.omnii_intent_capability_matches(intent_ref, status);
create index if not exists omnii_matches_capability_idx on public.omnii_intent_capability_matches(capability_ref, status);
create index if not exists omnii_matches_context_idx on public.omnii_intent_capability_matches(operating_context_id, status);
create index if not exists omnii_matches_candidate_idx on public.omnii_intent_capability_matches(candidate_ref, status);

alter table public.omnii_intent_capability_matches enable row level security;
revoke all on table public.omnii_intent_capability_matches from anon, authenticated;
grant select, insert, update, delete on table public.omnii_intent_capability_matches to service_role;

drop trigger if exists omnii_matches_updated_at on public.omnii_intent_capability_matches;
create or replace function public.omnii_touch_common_match_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin new.updated_at = now(); return new; end; $$;
create trigger omnii_matches_updated_at before update on public.omnii_intent_capability_matches
for each row execute function public.omnii_touch_common_match_updated_at();

comment on table public.omnii_common_primitives is 'Canonical registry of reusable Common Layer semantics; maps to existing OMNII backing contracts without duplicating them.';
comment on table public.omnii_intent_capability_matches is 'Reusable intent-to-capability discovery/matching record. A match is not authorization and cannot grant authority.';
