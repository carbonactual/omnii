# OMNII Runtime Persistence Architecture

## Boundary

```text
Canonical Runtime
      ↓
PersistencePort
      ↓
MemoryPersistenceAdapter OR SupabasePersistenceAdapter
      ↓
PostgreSQL / Supabase
```

The constitutional model remains authoritative. Persistence is implementation infrastructure and does not redefine OMNII objects, relationships, authority, events, or lifecycle semantics.

## Canonical persisted state

The persistence boundary covers:

- objects
- relationships
- dependencies
- registries
- events
- state
- executions
- workflows
- agents
- audit
- ledger

Runtime classes do not own canonical persistent Maps or Arrays. The memory adapter owns storage only as an implementation adapter for deterministic execution and tests.

## Durable atomic boundaries

Supabase/PostgREST does not provide an application-side transaction primitive. Consequently the durable adapter exposes narrowly scoped PostgreSQL RPC boundaries for:

1. state transition + event
2. execution + audit
3. ledger entry + audit

The adapter intentionally refuses to expose a false generic transaction abstraction over PostgREST.

## Graph

GraphRuntime is a projection over persisted canonical objects and relationships. Phase 40 civilization views remain adapters over canonical graph records and are not a second source of truth.

## Security boundary

Persistence does not grant authority. Authorization is validated by the runtime before consequential execution. Database functions are security-invoker functions and preserve the hosting application's authorization boundary.
