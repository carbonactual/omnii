# OMNII Runtime Idempotency and Concurrency

## Idempotency

An **idempotency key** identifies a retryable consequential request. A **correlation ID** identifies the causal/observability chain. They are distinct and are not interchangeable.

Idempotency is applied to consequential operations where repeated requests could duplicate effects, including execution creation, event recording, workflow attempts, and ledger recording.

The memory adapter enforces idempotency through deterministic lookup. Durable PostgreSQL enforces uniqueness through database indexes where the record carries an idempotency key.

## Optimistic concurrency

Canonical mutable records carry a version. A writer reads version `N` and writes only if the persisted version still equals `N`. A successful update advances the record version. A stale writer is rejected rather than silently overwriting canonical state.

The runtime uses `PersistencePort.updateIfVersion` for canonical object mutation and the same contract is available to other persisted state as required.

## Failure recovery

A durable multi-record operation is atomic only when executed by an explicit PostgreSQL transactional function. Sequential PostgREST calls are not represented as atomic.

Memory persistence emulates rollback semantics through transaction snapshots so contract tests can exercise the same failure model deterministically.

## Event ordering

State changes and consequential events are intended to share the same durable transaction boundary. Historical events are immutable and are never silently rewritten.
