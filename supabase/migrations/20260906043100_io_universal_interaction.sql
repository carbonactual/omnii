-- IO is the universal interaction/occurrence connective layer.
-- It records material actions and interactions without granting authority or replacing
-- domain-specific event, evidence, value, settlement or ledger semantics.

create table if not exists public.omnii_io_records (
  id uuid primary key default gen_random_uuid(),
  schema_version integer not null default 1 check (schema_version >= 1),
  occurred_at timestamptz not null default now(),
  completed_at timestamptz,
  kind text not null,
  action text not null,
  status text not null,
  actor jsonb not null,
  subject jsonb,
  source_system text not null,
  product jsonb,
  capability jsonb,
  correlation_id text,
  causation jsonb not null default '{}'::jsonb,
  idempotency_key text,
  intent jsonb,
  context jsonb,
  authority jsonb,
  authorization jsonb,
  inputs jsonb not null default '[]'::jsonb,
  outputs jsonb not null default '[]'::jsonb,
  value jsonb not null default '{}'::jsonb,
  state jsonb not null default '{}'::jsonb,
  evidence jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint omnii_io_kind_nonempty check (length(trim(kind)) > 0),
  constraint omnii_io_action_nonempty check (length(trim(action)) > 0),
  constraint omnii_io_status_nonempty check (length(trim(status)) > 0),
  constraint omnii_io_source_nonempty check (length(trim(source_system)) > 0),
  constraint omnii_io_actor_object check (jsonb_typeof(actor) = 'object'),
  constraint omnii_io_causation_object check (jsonb_typeof(causation) = 'object'),
  constraint omnii_io_inputs_array check (jsonb_typeof(inputs) = 'array'),
  constraint omnii_io_outputs_array check (jsonb_typeof(outputs) = 'array'),
  constraint omnii_io_value_object check (jsonb_typeof(value) = 'object'),
  constraint omnii_io_state_object check (jsonb_typeof(state) = 'object'),
  constraint omnii_io_evidence_array check (jsonb_typeof(evidence) = 'array'),
  constraint omnii_io_provenance_object check (jsonb_typeof(provenance) = 'object'),
  constraint omnii_io_metadata_object check (jsonb_typeof(metadata) = 'object'),
  constraint omnii_io_completion_after_occurrence check (completed_at is null or completed_at >= occurred_at)
);

create unique index if not exists omnii_io_idempotency_uidx
  on public.omnii_io_records(source_system, idempotency_key)
  where idempotency_key is not null;

create index if not exists omnii_io_occurred_idx on public.omnii_io_records(occurred_at desc);
create index if not exists omnii_io_kind_status_idx on public.omnii_io_records(kind, status, occurred_at desc);
create index if not exists omnii_io_source_product_idx on public.omnii_io_records(source_system, product);
create index if not exists omnii_io_correlation_idx on public.omnii_io_records(correlation_id, occurred_at desc);
create index if not exists omnii_io_actor_gin_idx on public.omnii_io_records using gin(actor);
create index if not exists omnii_io_subject_gin_idx on public.omnii_io_records using gin(subject);

alter table public.omnii_io_records enable row level security;

comment on table public.omnii_io_records is
  'Canonical IO interaction/occurrence record. Every material ecosystem action can be represented here; IO does not itself grant authority, prove ownership, or replace domain ledgers.';
comment on column public.omnii_io_records.authority is
  'Reference/context for applicable authority. Presence of this field never creates authority.';
comment on column public.omnii_io_records.authorization is
  'Reference/context for the authorization decision. Presence of this field never creates authorization.';
comment on column public.omnii_io_records.value is
  'Optional value/economic composition linked to the interaction; this column is not a ledger.';
