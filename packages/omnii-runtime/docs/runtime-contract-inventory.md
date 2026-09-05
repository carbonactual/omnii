# OMNII Runtime Contract Inventory

**Date:** 2026-09-05
**Scope:** Canonical `packages/omnii-runtime` activation layer

| Concept | Existing Contract | Reuse | New Contract | Persistence |
|---|---|---|---|---|
| Runtime signal | `RuntimeSignal`, `createRuntimeSignal()` | Yes | None | `omnii_events` via intake event/idempotency key |
| Operating context | `OperatingContext`, `OperatingContextRuntime` | Yes | None | Existing context/runtime sources |
| Authority resolution | `AuthorityResolution`, `AuthorityRuntime` | Yes | None | `omnii_authorities` |
| Route/dispatch | `RuntimeRoute`, `DispatchDecision`, `resolveRuntimeSignal()` | Yes | Explicit `requiresAuthority` route flag | Route/workflow registry + events |
| Execution request | `ExecutionRequest` | Yes | None | `omnii_executions` |
| Execution outcome | `ExecutionResult`, `ExecutionRuntime` | Yes | None | `omnii_executions` + `omnii_audit` |
| Evidence | `EvidenceRecord`, `projectOutcome()` | Yes | None | Evidence event/persistence projection |
| State projection | `StateProjection`, `projectOutcome()` | Yes | None | Canonical state/event layer; completion only after proven outcome |
| Reconciliation | `ReconciliationResult`, `reconcileExpectedObserved()` | Yes | None | `omnii_events`; eligible for control-finding persistence |
| Feedback | `FeedbackObservation`, `buildFeedbackObservation()` | Yes | None | `omnii_events`; downstream Pulse/value projection |
| Durable idempotency | `idempotencyKey` on signal/execution/event contracts | Yes | None | `omnii_events` and execution/authority records |
| Audit | `EventStore`, execution/authority audit operations | Yes | None | `omnii_events`, `omnii_audit` |
| HAPI autonomy | Explicit route `requiresAuthority=false` | Yes | Native-world contracts remain domain-owned | HAPI World state; governed crossings return to canonical runtime |

## Boundary rules

1. Authority is resolved only for routes that require authority; no authority record is invented for autonomous routes.
2. A route match is not authorization. Consequential routes still require valid authority and capability authorization.
3. Execution acceptance is not completion. Completion requires the executor outcome to satisfy the configured completion predicate.
4. Evidence records the outcome; evidence does not create authority.
5. Reconciliation compares expected and observed state; discrepancy is preserved rather than silently corrected.
6. Feedback is an observation for Pulse/value learning and is not assumed to be monetary.
7. Correlation and idempotency identifiers remain present through intake, execution, reconciliation and feedback events.
8. HAPI World native autonomy is distinct from human-world governed crossing; autonomy does not imply legal authority or ownership.

## Persistence mapping

The current Supabase adapter already maps runtime-critical durable collections to canonical tables including `omnii_events`, `omnii_executions`, `omnii_authorities`, `omnii_state`, `omnii_audit`, `omnii_workflows`, `omnii_process_instances` and `omnii_process_tasks`. Atomic PostgreSQL RPCs are used for state/event, execution/audit, ledger/audit and authority mutations.

No additional application-facing persistence table is required for this inventory. Reconciliation and feedback can remain durable event projections until a dedicated normalized table is justified by query/retention requirements.

## Implementation status

`packages/omnii-runtime/src/index.ts` exports the signal, resolver, execution controller, evidence projector, reconciliation runtime, feedback runtime and activation layer as reusable canonical runtime contracts.
