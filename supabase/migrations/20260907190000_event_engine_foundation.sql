-- OMNII Event Engine foundation.
-- One canonical event store: public.omnii_events.
-- This migration adds queryable envelope fields while preserving legacy payloads.

alter table public.omnii_events
  add column if not exists event_type text,
  add column if not exists event_version text not null default '1',
  add column if not exists schema_version text not null default '1',
  add column if not exists occurred_at timestamptz,
  add column if not exists recorded_at timestamptz,
  add column if not exists actor_ref text,
  add column if not exists subject_ref text,
  add column if not exists institution_ref text,
  add column if not exists causation_id text,
  add column if not exists parent_event_id text,
  add column if not exists reality_state text not null default 'unknown',
  add column if not exists authority_ref text,
  add column if not exists source text,
  add column if not exists evidence_refs jsonb not null default '[]'::jsonb,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists status text not null default 'accepted',
  add column if not exists event_hash text;

update public.omnii_events
set event_type = coalesce(event_type, nullif(payload->>'type',''), 'UNKNOWN'),
    occurred_at = coalesce(occurred_at, created_at),
    recorded_at = coalesce(recorded_at, created_at),
    actor_ref = coalesce(actor_ref, payload->>'actor'),
    subject_ref = coalesce(subject_ref, payload->>'subject'),
    source = coalesce(source, provenance->>'source')
where event_type is null
   or occurred_at is null
   or recorded_at is null;

alter table public.omnii_events
  alter column event_type set not null,
  alter column occurred_at set not null,
  alter column recorded_at set not null;

alter table public.omnii_events
  drop constraint if exists omnii_events_reality_state_chk;
alter table public.omnii_events
  add constraint omnii_events_reality_state_chk
  check (reality_state in ('actual','observed','planned','committed','simulated','estimated','unknown'));

create index if not exists omnii_events_event_type_v2_idx
  on public.omnii_events(event_type, occurred_at desc);
create index if not exists omnii_events_subject_occurred_idx
  on public.omnii_events(subject_ref, occurred_at desc);
create index if not exists omnii_events_causation_idx
  on public.omnii_events(causation_id);
create index if not exists omnii_events_parent_idx
  on public.omnii_events(parent_event_id);
create index if not exists omnii_events_reality_state_idx
  on public.omnii_events(reality_state, occurred_at desc);
create index if not exists omnii_events_source_idx
  on public.omnii_events(source, occurred_at desc);

-- Events are historical facts/signals. Corrections are new events referencing the prior event;
-- accepted events are never updated or deleted in place.
create or replace function public.omnii_reject_event_mutation()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  raise exception 'omnii_event_immutable';
end;
$$;

drop trigger if exists omnii_events_immutable_update on public.omnii_events;
create trigger omnii_events_immutable_update
before update on public.omnii_events
for each row execute function public.omnii_reject_event_mutation();

drop trigger if exists omnii_events_immutable_delete on public.omnii_events;
create trigger omnii_events_immutable_delete
before delete on public.omnii_events
for each row execute function public.omnii_reject_event_mutation();

-- The public API must not receive unrestricted write privileges over the canonical event store.
revoke insert, update, delete on public.omnii_events from anon, authenticated;
grant select on public.omnii_events to service_role;
revoke all on function public.omnii_reject_event_mutation() from public, anon, authenticated;
grant execute on function public.omnii_reject_event_mutation() to service_role;
