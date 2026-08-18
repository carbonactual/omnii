# OMNII Runtime Consistency Model

**Status:** canonical runtime implementation contract.

## Transaction boundaries

The following operations require atomic semantics whenever durable state is used:

1. authorization decision + execution authorization record;
2. state transition + corresponding event record;
3. execution result + audit record;
4. ledger append + audit record;
5. relationship mutation + provenance record.

The runtime must not claim an operation is atomic merely because two calls occur sequentially.

## Persistence ports

Runtime semantics depend on `PersistencePort`, not on PostgreSQL/Supabase. `MemoryPersistenceAdapter` is the deterministic reference adapter. `SupabasePersistenceAdapter` is the durable adapter.

## Durable transaction rule

The Supabase/PostgREST adapter deliberately does **not** implement fake client-side transactions. Multi-record atomicity must be provided by an explicit PostgreSQL RPC/stored procedure and invoked as one database operation. Until such RPCs exist, the affected operations remain `PARTIAL`, not production-ready.

## Idempotency

- Create operations use stable canonical IDs and reject duplicates.
- External retries must reuse the same operation/correlation identifier where the caller can provide one.
- Events are immutable records; consumers must treat duplicate delivery as possible once transport is introduced.

## Version conflicts

Every durable record carries a version. Updates must not silently overwrite a newer version once optimistic concurrency is introduced. The current adapter exposes versioning but does not yet implement compare-and-swap semantics; this is a P2 production gap.

## Event ordering

Events carry timestamps and correlation identifiers. Ordering across independent transactions is not assumed. A future durable event transport must preserve per-aggregate ordering where required.

## Failure recovery

Memory transactions restore their snapshot on failure. Durable recovery must rely on database atomicity/RPC boundaries, idempotent commands, and immutable event records rather than application-level rollback guesses.

## Audit guarantees

Every consequential durable operation must retain actor/authority/provenance context. Audit records must not be deleted by ordinary runtime mutation paths.

## Constitutional boundary

Persistence is implementation infrastructure. It cannot redefine identity, authority, relationship, event, state, value, or other constitutional semantics.
