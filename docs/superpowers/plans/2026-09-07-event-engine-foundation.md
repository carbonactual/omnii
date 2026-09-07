# Event Engine Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the existing `omnii_events` substrate into a canonical, append-only, idempotent, replayable Event Engine used by every later OMNII engine.

**Architecture:** Keep `public.omnii_events` as the single durable event store. Add first-class envelope fields and constraints without removing legacy payload fields. Implement a persistence-port EventEngine in TypeScript with deterministic normalization, idempotent append, filtering and replay; preserve the existing `EventStore` API for compatibility.

**Tech Stack:** TypeScript 7, existing `@omnii/runtime` persistence contracts, Vitest/Node test runner, PostgreSQL/Supabase migrations.

**Spec:** `docs/superpowers/specs/2026-09-07-event-engine-foundation.md`

## Global Constraints

- Do not create a competing event table or product-specific event store.
- Do not redefine constitutional semantics in PostgreSQL.
- Preserve existing `omnii_events.payload` data and backward compatibility.
- Event writes are server-side and governed; no unrestricted client mutation.
- Event engine must tolerate unknown event types.
- Idempotency, provenance, authority, evidence and correlation are first-class invariants.

---

### Task 1: Add the canonical database envelope

**Files:**
- Create: `supabase/migrations/20260907190000_event_engine_foundation.sql`

**Interfaces:**
- Consumes: existing `public.omnii_events` rows and payload conventions.
- Produces: first-class columns for `event_type`, `event_version`, `schema_version`, `occurred_at`, `recorded_at`, `actor_ref`, `subject_ref`, `causation_id`, `parent_event_id`, `reality_state`, `authority_ref`, `source`, `evidence_refs`, `metadata`, and `event_hash`.

- [ ] **Step 1: Add columns idempotently**
```sql
alter table public.omnii_events
  add column if not exists event_type text,
  add column if not exists event_version text not null default '1',
  add column if not exists schema_version text not null default '1',
  add column if not exists occurred_at timestamptz,
  add column if not exists recorded_at timestamptz,
  add column if not exists actor_ref text,
  add column if not exists subject_ref text,
  add column if not exists causation_id text,
  add column if not exists parent_event_id text,
  add column if not exists reality_state text not null default 'unknown',
  add column if not exists authority_ref text,
  add column if not exists source text,
  add column if not exists evidence_refs jsonb not null default '[]'::jsonb,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists event_hash text;
```

- [ ] **Step 2: Backfill from legacy payloads**
```sql
update public.omnii_events
set event_type = coalesce(event_type, nullif(payload->>'type',''), 'UNKNOWN'),
    occurred_at = coalesce(occurred_at, created_at),
    recorded_at = coalesce(recorded_at, created_at),
    actor_ref = coalesce(actor_ref, payload->>'actor'),
    subject_ref = coalesce(subject_ref, payload->>'subject'),
    source = coalesce(source, provenance->>'source')
where event_type is null or occurred_at is null or recorded_at is null;
```

- [ ] **Step 3: Add validation constraints and indexes**
```sql
alter table public.omnii_events
  alter column event_type set not null,
  alter column occurred_at set not null,
  alter column recorded_at set not null;

alter table public.omnii_events
  add constraint omnii_events_reality_state_chk
  check (reality_state in ('actual','observed','planned','committed','simulated','estimated','unknown'));

create index if not exists omnii_events_event_type_v2_idx on public.omnii_events(event_type, occurred_at desc);
create index if not exists omnii_events_subject_occurred_idx on public.omnii_events(subject_ref, occurred_at desc);
create index if not exists omnii_events_causation_idx on public.omnii_events(causation_id);
create index if not exists omnii_events_parent_idx on public.omnii_events(parent_event_id);
create index if not exists omnii_events_reality_state_idx on public.omnii_events(reality_state, occurred_at desc);
```

- [ ] **Step 4: Make accepted events immutable at the database boundary**
```sql
create or replace function public.omnii_reject_event_mutation()
returns trigger language plpgsql as $$
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
```

- [ ] **Step 5: Revoke direct client mutation and expose only governed server role**
```sql
revoke insert, update, delete on public.omnii_events from anon, authenticated;
grant select on public.omnii_events to service_role;
```

- [ ] **Step 6: Commit**
```bash
git add supabase/migrations/20260907190000_event_engine_foundation.sql
git commit -m "feat: harden canonical event persistence"
```

### Task 2: Implement canonical event types and normalization

**Files:**
- Create: `packages/omnii-runtime/src/event-engine.ts`
- Modify: `packages/omnii-runtime/src/index.ts`

**Interfaces:**
- Consumes: `PersistencePort`, `JsonObject`, existing `OmniiEvent` semantics.
- Produces: `CanonicalEvent`, `EventAppendInput`, `EventQuery`, `EventReplayOptions`, `EventEngine`.

- [ ] **Step 1: Write the failing runtime tests**
Create `packages/omnii-runtime/src/event-engine.test.ts` and cover required fields, payload.type mirroring, `unknown` reality state, idempotency replay, query ordering and replay.

- [ ] **Step 2: Run the targeted test**
Run: `node --import tsx --test packages/omnii-runtime/src/event-engine.test.ts`
Expected: FAIL because `event-engine.ts` does not yet exist.

- [ ] **Step 3: Implement normalization and validation**
Define `normalizeEventInput()` that rejects empty `event_type`, `correlation_id` or `idempotency_key`, normalizes timestamps, preserves unknown payload data, and derives `payload.type` only when absent.

- [ ] **Step 4: Implement persistence operations**
`EventEngine.append()` first checks idempotency, then creates one event. `appendMany()` processes the input through the same normalization path and returns deterministic results. `get()` and `query()` never mutate returned records.

- [ ] **Step 5: Implement replay**
`replay()` fetches events ordered by `occurred_at`, `recorded_at`, `id`, then invokes an async handler exactly once per returned event in deterministic order.

- [ ] **Step 6: Preserve compatibility**
Export `EventEngine` from `packages/omnii-runtime/src/index.ts`; leave existing `EventStore` intact and usable.

- [ ] **Step 7: Run the targeted tests again**
Expected: PASS.

- [ ] **Step 8: Commit**
```bash
git add packages/omnii-runtime/src/event-engine.ts packages/omnii-runtime/src/event-engine.test.ts packages/omnii-runtime/src/index.ts
git commit -m "feat: add canonical Event Engine runtime"
```

### Task 3: Integrate Event Engine with the runtime signal boundary

**Files:**
- Modify: `packages/omnii-runtime/src/runtime-signal.ts`
- Modify: `packages/omnii-runtime/src/event-engine.ts`
- Test: `packages/omnii-runtime/src/event-engine.test.ts`

**Interfaces:**
- Consumes: `RuntimeSignal`.
- Produces: `appendSignal(signal: RuntimeSignal): Promise<CanonicalEvent>`.

- [ ] **Step 1: Test signal-to-event mapping**
Verify `source`, `eventType`, `correlationId`, `idempotencyKey`, operating context, actor, subject, institution and provenance survive mapping.

- [ ] **Step 2: Implement mapping**
Map a `RuntimeSignal` to `CanonicalEvent` without dropping optional location/domain/context data; store non-envelope signal fields under immutable `metadata`.

- [ ] **Step 3: Test and commit**
Run the targeted Event Engine suite, then commit with message `feat: integrate runtime signals with Event Engine`.

### Task 4: Add database-backed append RPC

**Files:**
- Modify: `supabase/migrations/20260907190000_event_engine_foundation.sql`
- Create: `supabase/migrations/20260907191500_event_engine_append_rpc.sql`

**Interfaces:**
- Consumes: canonical event envelope from the runtime adapter.
- Produces: atomic `public.omnii_append_event(...)` RPC result with replay-safe semantics.

- [ ] **Step 1: Implement idempotent append**
The RPC checks the unique idempotency index, returns the existing event on replay, otherwise inserts the event once, preserving all envelope fields and payload.

- [ ] **Step 2: Protect against mismatched replay**
If the same idempotency key is presented with a materially different event type, actor, subject or payload hash, raise `omnii_event_idempotency_conflict` rather than silently returning the existing event.

- [ ] **Step 3: Restrict function execution**
Revoke EXECUTE from public/anon/authenticated and grant only to `service_role`.

- [ ] **Step 4: Commit**
```bash
git add supabase/migrations/20260907190000_event_engine_foundation.sql supabase/migrations/20260907191500_event_engine_append_rpc.sql
git commit -m "feat: add governed Event Engine append boundary"
```

### Task 5: Add CI coverage for the Event Engine

**Files:**
- Modify: `.github/workflows/runtime-package.yml`

**Interfaces:**
- Consumes: Event Engine source and tests.
- Produces: automated typecheck/test gate on PRs and main pushes.

- [ ] **Step 1: Add Event Engine paths and commands**
Run targeted TypeScript compilation plus `node --import tsx --test packages/omnii-runtime/src/event-engine.test.ts`.

- [ ] **Step 2: Validate workflow syntax by reading the resulting workflow**
Ensure both PR and main triggers include Event Engine paths.

- [ ] **Step 3: Commit**
```bash
git add .github/workflows/runtime-package.yml
git commit -m "ci: verify Event Engine on runtime changes"
```

### Task 6: Final conformance review and PR

**Files:**
- Review: all Event Engine files above
- Optional: `docs/superpowers/specs/2026-09-07-event-engine-foundation.md`

**Interfaces:**
- Consumes: implementation, tests, migration, CI.
- Produces: reviewed PR ready for merge; no claim of passing until Actions results are observed.

- [ ] **Step 1: Compare branch against main**
Confirm only Event Engine foundation changes are present.

- [ ] **Step 2: Inspect changed files and tests**
Check that all ten invariants in the spec are represented in code or migration constraints.

- [ ] **Step 3: Open PR into `main`**
Title: `feat: build Event Engine foundation`

- [ ] **Step 4: Verify GitHub Actions**
Observe targeted runtime checks. If a check fails, fix the actual failure before declaring completion.

- [ ] **Step 5: Stop at the engine boundary**
Do not start Registry Engine implementation until the Event Engine is verified, because Registry will consume this canonical event contract.
