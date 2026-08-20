create table if not exists public.omnii_knowledge_assertions (
  id text primary key,
  kind text not null check (kind in ('observation','claim','inference','hypothesis','simulation')),
  subject_id text not null,
  predicate text not null,
  object_id text,
  confidence numeric(5,4) not null check (confidence between 0 and 1),
  verification text not null check (verification in ('unverified','partially_verified','verified','disputed','superseded')),
  provenance jsonb not null default '{}'::jsonb,
  occurred_at timestamptz,
  observed_at timestamptz,
  recorded_at timestamptz not null default now(),
  effective_at timestamptz,
  superseded_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.omnii_causal_relations (
  id text primary key,
  relation_type text not null check (relation_type in ('causes','contributes_to','enables','prevents','requires','triggers','correlates_with','intended_to','suspected_cause','inferred_cause','disputed_cause','unknown_cause')),
  source_id text not null,
  target_id text not null,
  confidence numeric(5,4) not null check (confidence between 0 and 1),
  provenance jsonb not null default '{}'::jsonb,
  conditions jsonb not null default '{}'::jsonb,
  status text not null check (status in ('proposed','active','disputed','superseded')),
  created_at timestamptz not null default now(),
  check (source_id <> target_id)
);

create table if not exists public.omnii_scenario_nodes (
  id text primary key,
  kind text not null,
  reality text not null check (reality in ('actual','planned','hypothetical','simulated','counterfactual')),
  state text not null check (state in ('proposed','active','completed','failed','superseded')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.omnii_scenario_edges (
  id bigint generated always as identity primary key,
  from_node_id text not null references public.omnii_scenario_nodes(id) on delete restrict,
  to_node_id text not null references public.omnii_scenario_nodes(id) on delete restrict,
  relation text not null check (relation in ('sequence','branch','merge','reversal','dependency','feedback')),
  condition jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.omnii_quality_assessments (
  id bigint generated always as identity primary key,
  subject_id text not null,
  structural numeric(5,4) not null default 0 check (structural between 0 and 1),
  evidence numeric(5,4) not null default 0 check (evidence between 0 and 1),
  logical numeric(5,4) not null default 0 check (logical between 0 and 1),
  operational numeric(5,4) not null default 0 check (operational between 0 and 1),
  regulatory numeric(5,4) not null default 0 check (regulatory between 0 and 1),
  safety numeric(5,4) not null default 0 check (safety between 0 and 1),
  economic numeric(5,4) not null default 0 check (economic between 0 and 1),
  continuity numeric(5,4) not null default 0 check (continuity between 0 and 1),
  assessed_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.omnii_completeness_gaps (
  id text primary key,
  assessment_id bigint references public.omnii_quality_assessments(id) on delete cascade,
  dimension text not null check (dimension in ('structural','evidence','logical','operational','regulatory','safety','economic','continuity')),
  requirement text not null,
  severity text not null check (severity in ('low','medium','high','critical')),
  status text not null check (status in ('open','resolved','accepted')),
  evidence_ids text[] not null default '{}'
);

create table if not exists public.omnii_reconciliations (
  id text primary key,
  subject_id text not null,
  expected jsonb not null,
  actual jsonb not null,
  status text not null check (status in ('matched','mismatched','unknown','recovered')),
  evidence_ids text[] not null default '{}',
  exception text,
  recovery text,
  recorded_at timestamptz not null default now(),
  check (status <> 'mismatched' or exception is not null),
  check (status <> 'recovered' or recovery is not null)
);

create index if not exists idx_omnii_knowledge_subject_time on public.omnii_knowledge_assertions(subject_id, recorded_at desc);
create index if not exists idx_omnii_knowledge_verification on public.omnii_knowledge_assertions(verification, effective_at);
create index if not exists idx_omnii_causal_source on public.omnii_causal_relations(source_id, relation_type);
create index if not exists idx_omnii_causal_target on public.omnii_causal_relations(target_id, relation_type);
create index if not exists idx_omnii_scenario_edges_from on public.omnii_scenario_edges(from_node_id);
create index if not exists idx_omnii_scenario_edges_to on public.omnii_scenario_edges(to_node_id);
create index if not exists idx_omnii_completeness_gaps_assessment on public.omnii_completeness_gaps(assessment_id);
create index if not exists idx_omnii_gaps_open on public.omnii_completeness_gaps(status, severity);
create index if not exists idx_omnii_reconciliation_subject on public.omnii_reconciliations(subject_id, recorded_at desc);

alter table public.omnii_knowledge_assertions enable row level security;
alter table public.omnii_causal_relations enable row level security;
alter table public.omnii_scenario_nodes enable row level security;
alter table public.omnii_scenario_edges enable row level security;
alter table public.omnii_quality_assessments enable row level security;
alter table public.omnii_completeness_gaps enable row level security;
alter table public.omnii_reconciliations enable row level security;

create policy omnii_knowledge_authenticated on public.omnii_knowledge_assertions for all to authenticated using (true) with check (true);
create policy omnii_causal_authenticated on public.omnii_causal_relations for all to authenticated using (true) with check (true);
create policy omnii_scenario_nodes_authenticated on public.omnii_scenario_nodes for all to authenticated using (true) with check (true);
create policy omnii_scenario_edges_authenticated on public.omnii_scenario_edges for all to authenticated using (true) with check (true);
create policy omnii_quality_authenticated on public.omnii_quality_assessments for all to authenticated using (true) with check (true);
create policy omnii_gaps_authenticated on public.omnii_completeness_gaps for all to authenticated using (true) with check (true);
create policy omnii_reconciliation_authenticated on public.omnii_reconciliations for all to authenticated using (true) with check (true);
