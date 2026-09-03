# OMNII Runtime Activation Layer — Design

**Status:** Approved for implementation
**Date:** 2026-09-03

## Goal

Turn the existing OMNII canonical foundation into a continuously operating execution loop that can accept real-world signals, resolve governed context and authority, dispatch deterministic/agentic work, persist evidence and state changes, reconcile expected versus observed outcomes, and emit value/feedback signals.

## Relationship to Existing Canonical Architecture

This is an activation layer, not a replacement architecture. The canonical institutional operating loop is already defined as:

`INTENT/REQUEST → OUTCOME → REQUIREMENTS/CONSTRAINTS → IDENTITY/AUTHORITY → REGISTRY → FORM/INTAKE → VALIDATION → CASE/WORKFLOW → TASK/QUEUE/SLA → POLICY/AUTOMATION → RESOURCE SELECTION → EXECUTION → STATE CHANGE → EVENT/EVIDENCE → RECONCILIATION → PULSE/VALUE → LEDGER/SETTLEMENT → REPORTING → FEEDBACK → CURATION → IMPROVEMENT`

The runtime implementation should make the loop executable while preserving the constitutional boundaries already established by OMNII.

## Core Principles

1. A command is a request to act; it is never proof that the action occurred.
2. Identity, authentication, authorization, consent and institutional/legal authority remain distinct.
3. AI may recommend or execute only within explicit capability, scope, authority, budget and safety boundaries.
4. Every consequential action must be traceable to actor, authority, purpose, scope, inputs, capability/version, outcome and evidence.
5. Expected and observed states are reconciled; discrepancies become explicit control findings/cases.
6. Runtime components are reusable modules; institutional deployments compose them instead of forking them.
7. Historical truth is append-only/versioned where appropriate; corrections are explicit rather than silent overwrites.
8. Failure, retry, timeout, compensation, escalation and disable/kill controls are first-class runtime states.

## Runtime Boundaries

### A. Intake Gateway

Normalizes web/mobile/API/webhook/message/file/device/field inputs into a canonical `RuntimeSignal`.

Minimum envelope:

- signal id
- received_at
- source
- actor/reference
- institution/domain
- intent/event type
- payload reference
- location/operating context
- correlation/idempotency key
- sensitivity classification
- provenance

### B. Context + Authority Resolver

Resolves the operating context, relevant registries, actor identity, represented principal, authority/delegation and applicable policy before execution.

Required decision record:

`WHO → ACTING FOR WHOM → UNDER WHAT AUTHORITY → FOR WHAT PURPOSE → WITH WHAT SCOPE → FOR HOW LONG`

No resolver result means no consequential execution.

### C. Workflow Dispatcher

Maps the signal to a versioned workflow/process or deterministic handler. Creates durable process/task state using the existing workflow/process tables rather than embedding state only in application memory.

Supports:

- deterministic rules
- event-driven triggers
- scheduled triggers
- threshold triggers
- policy/SLA triggers
- agent steps
- human approvals
- physical/operator tasks

### D. Execution Controller

Creates governed execution records and dispatches work to human, agent, software/service, machine or hybrid executors.

Every execution includes:

`trigger + scope + authority + preconditions + inputs + action + outputs + idempotency key + timeout + retry + compensation + escalation + evidence + audit + disable control`

High-consequence actions must cross an explicit approval boundary when required.

### E. Evidence + State Projector

Persists outcome evidence and projects authoritative state changes only after execution results meet the applicable completion conditions. It must distinguish:

`command → execution → outcome → evidence → state change`

### F. Reconciliation Engine

Compares expected state, execution result and observed/external state. Emits discrepancy records and routes unresolved mismatches into control findings/cases.

Initial reconciliation classes:

- form/application vs decision
- scheduled work vs completion
- expected payment vs received payment
- registry state vs authoritative external source
- dispatch vs proof of delivery
- expected inventory vs observed inventory

### G. Feedback / Value Publisher

Publishes Pulse/value observations without collapsing Pulse into money. Where configured, downstream economic/token/ledger modules can consume the observation.

### H. Runtime Observability

Every signal, execution and reconciliation result must be queryable through correlation ids, with health, latency, failure, retry, escalation and audit visibility.

## Data Contract

The implementation should prefer existing canonical tables and contracts. Add only the minimal missing runtime persistence required for the loop. Existing relevant structures include:

- `omnii_operating_contexts`
- `omnii_form_submissions`
- `omnii_process_instances`
- `omnii_process_tasks`
- `omnii_institutional_workflows`
- `omnii_institutional_automations`
- `omnii_execution_controls`
- `omnii_events`
- `omnii_executions`
- `omnii_audit`
- `omnii_reconciliations`
- `omnii_control_findings`
- `omnii_economic_events`
- `omnii_economic_vectors`
- `omnii_activity_ledger_events`
- `omnii_agent_runs`

Where a new table is necessary, it must be additive, RLS-protected and linked to canonical object/context identifiers.

## First End-to-End Slice

The first production slice will implement one complete generic path:

`signal → context/authority → route → execution → evidence → state/event → reconciliation → feedback`

The slice must be domain-neutral and demonstrable with a test signal. Domain applications such as NASC, transport, culture and media will then bind to the same contracts.

## Security and Resilience

- RLS remains enabled for application-facing tables.
- Service-role execution is limited to server-side/Edge Function boundaries.
- Idempotency keys prevent duplicate execution.
- Retries are bounded and observable.
- Failed executions cannot silently mutate authoritative state.
- Disable/kill controls must prevent further dispatch for disabled capabilities.
- Sensitive evidence references must respect authorization and retention policy.
- Adapters must carry provenance and health state.

## Success Criteria

A test event can be submitted and the system can prove, via persisted records, all of the following:

1. what arrived and from where;
2. which context and authority were resolved;
3. which workflow/automation was selected and which version ran;
4. what execution was attempted and by whom/what;
5. whether it succeeded, failed, retried or escalated;
6. what evidence was produced;
7. what state/event changed as a consequence;
8. whether expected and observed outcomes reconciled;
9. what feedback/value observation was generated;
10. that the entire chain is auditable by correlation id.

## Non-Goals for This Build

This phase does not replace the existing applications, redesign constitutional semantics, create a new wallet/chain, or require a single universal UI. It establishes the reusable runtime contracts beneath those products.
