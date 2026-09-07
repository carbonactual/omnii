# Event Engine Foundation Specification

**Status:** Approved / Implementation target
**Date:** 2026-09-07

## Goal
Make events the canonical, durable, replayable observation/action fabric of OMNII without creating a second event store beside `public.omnii_events`.

## Architectural position
The Event Engine sits between reality-producing actors/systems and every downstream engine. It records facts/signals with enough identity, time, causality, authority, provenance and evidence to permit deterministic consumption and replay.

The existing `public.omnii_events` table remains the persistence boundary. Existing payload-based callers remain valid; new contracts become first-class columns where doing so improves queryability and invariants.

## Canonical envelope
Each event has:
- identity: `id`, `event_type`, `event_version`, `schema_version`
- time: `occurred_at`, `recorded_at`
- actors/subjects: `actor_ref`, `subject_ref`, optional institution/context
- graph linkage: `correlation_id`, `causation_id`, optional `parent_event_id`
- reality: `reality_state` (`actual`, `observed`, `planned`, `committed`, `simulated`, `estimated`, `unknown`)
- control: `authority_ref`, `lifecycle`, `status`
- evidence/provenance: `evidence_refs`, `provenance`, `source`
- payload: immutable JSON data
- deduplication: `idempotency_key`

`payload.type` is preserved for backward compatibility and must mirror `event_type` on new writes.

## Invariants
1. An event is append-only through the Event Engine; no engine may mutate or delete an event after acceptance.
2. `idempotency_key` is globally unique where present; replaying it returns the original event identity.
3. `correlation_id` groups a process/transaction; `causation_id` identifies the event that caused this event.
4. `occurred_at` describes reality time; `recorded_at` describes intake time.
5. `reality_state` never claims stronger certainty than its evidence/provenance supports; `unknown` is valid.
6. Authority/provenance/evidence are carried forward, never silently discarded.
7. Existing payload-only events remain readable and are normalized at the runtime boundary.
8. Batch append is all-or-nothing at the repository abstraction when the backend supports atomic transactions.
9. Replay is ordered by `occurred_at`, then `recorded_at`, then `id` for deterministic ordering.
10. Unknown event types are preserved; the Event Engine is open-world and does not require downstream schemas to exist before an event can be stored.

## Runtime API
`EventEngine` exposes:
- `append(input)`
- `appendMany(inputs)`
- `get(id)`
- `findByIdempotencyKey(key)`
- `query(filter, options)`
- `replay(subject/correlation/filter, handler)`

The engine is persistence-port based so in-memory tests and Supabase production persistence share the same semantics.

## Downstream contract
Later engines consume events rather than writing engine-specific shadow event stores:
- Registry consumes entity/registration lifecycle events.
- Identity consumes identity/authority events.
- IO consumes input/output/transfer/use events.
- Pulse consumes observations and outcome events.
- Liability consumes obligation/risk/waste events.
- Trust consumes verified behavior/evidence events.
- Governance consumes decisions/policy/approval events.
- Tokenization/Exchange/Settlement consume value, allocation, trade and settlement events.

## Security
`omnii_events` remains server-side by default with RLS enabled and least-privilege grants. Client applications call governed server-side pathways; they do not receive unrestricted table mutation rights.

## Compatibility
No existing product or runtime should need to rewrite its event payload immediately. The migration backfills first-class columns from existing payload fields where possible, while leaving the original payload intact.
