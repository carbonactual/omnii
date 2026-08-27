# OMNII Institutional Automation Atlas

**Status: CANONICAL REUSABLE AUTOMATION CATALOG**

Automation executes only inside declared authority and policy. It must remain observable, reversible where practical, idempotent where needed, and interruptible by authorized operators.

## Automation classes

- event-driven: act on defined events/state transitions
- scheduled: recurring calendar/time execution
- time-window: execute only within approved windows
- threshold: execute when a measurement crosses a configured boundary
- data-change: react to approved record changes
- queue-driven: route and execute queued work
- SLA-driven: remind, escalate or reassign on timers
- workflow-driven: execute deterministic workflow steps
- integration-driven: synchronize or reconcile with external systems
- rule/policy-driven: execute only when conditions and authority are satisfied
- predictive/recommendation: forecast or recommend without silently authorizing consequential action
- agentic: authorized AI agent plans and executes bounded steps
- physical-triggered: sensor/device/location/field event initiates a governed process

## Reusable automations

- new submission → acknowledgement + validation + case creation
- missing evidence → applicant notification + task/escalation
- approval → issuance + registry update + notification
- expiry approaching → reminder + renewal workflow
- SLA at risk → warning → escalation → supervisor assignment
- failed integration → retry → quarantine → reconciliation case
- payment received → receipt → ledger/settlement update → reconciliation
- invoice overdue → reminder → collection workflow → escalation
- subscription renewal → billing → success/failure handling → state update
- stock below threshold → replenishment request
- asset due for maintenance → work order
- credential near expiry → renewal notice
- training completed → credential eligibility/issuance workflow
- promotion eligibility reached → evidence request/review workflow
- deployment end approaching → relief/return workflow
- inspection finding → corrective-action case → due-date reminders
- incident detected → severity classification → response routing
- suspicious digital asset change → security finding → containment workflow
- registry mismatch → reconciliation case
- duplicate submission → merge/review workflow
- abandoned case → reminder → escalation
- policy change → affected workflows/controls flagged for review
- failed job → retry/backoff → compensation or manual takeover
- partial completion → exception state + recovery plan
- external source changed → sync → provenance update → conflict review

## Automation safety contract

`trigger + authority + scope + preconditions + input snapshot + action + idempotency key + timeout + retry policy + compensation + escalation + evidence + audit + notification + kill/disable control`

High-consequence automation requires explicit human/legal approval boundaries where applicable.

## Operational guarantees

Automations should support idempotent replay, duplicate prevention, timeout handling, retries with bounded backoff, dead-letter/quarantine paths, manual takeover, rollback/compensation, dry-run/simulation, versioning and observable execution logs.

Unknown or ambiguous conditions must route to exception handling instead of silently guessing.

## Reuse rule

Institution-specific triggers and policies are configuration. Deterministic execution mechanics belong to the reusable automation fabric.