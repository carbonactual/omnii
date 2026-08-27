# OMNII Institutional Workflow Atlas

**Status: CANONICAL REUSABLE WORKFLOW CATALOG**

Workflows are versioned execution contracts. A workflow coordinates humans, agents, services, machines and physical work while preserving authority, evidence, state, exceptions and auditability.

## Reusable workflow families

- intake → validation → routing → acknowledgement
- registration → verification → approval → activation
- application → eligibility → review → decision → issuance
- licensing → inspection → certification → publication/verification
- recruitment → screening → assessment → interview → recommendation → appointment
- promotion → eligibility → evidence → committee/review → approval → effective action
- posting/transfer/deployment → selection → authorization → logistics → execution → return/relief
- admission → review → offer → acceptance → enrollment → onboarding
- procurement → requirement → sourcing → quote/bid → evaluation → approval → award → delivery → acceptance → invoice → settlement
- contract → negotiation → signature → milestone → amendment → renewal/termination
- payment → authorization → processing → confirmation → reconciliation → exception
- subscription → activation → renewal → billing → suspension → cancellation/reactivation
- inspection → finding → corrective action → reinspection → closure
- complaint → triage → assignment → investigation → response → appeal → closure
- incident → classification → response → containment → recovery → review
- investigation → evidence → analysis → findings → decision/referral → disposition
- case → tasks → dependencies → decision → outcome → closure/reopen
- project → planning → execution → milestones → change control → acceptance → closeout
- grant → application → due diligence → approval → disbursement → monitoring → reporting → closeout
- school admission → learner record → class allocation → attendance → assessment → result → certification
- election party/candidate/agent → verification → accreditation → election event → result capture → collation → publication → dispute
- digital asset → ownership → deployment → monitoring → change → incident → recovery → retirement
- asset acquisition → custody → assignment → use → maintenance → audit → transfer/disposal

## Workflow primitives

`trigger | sequence | branch | condition | task | human-task | agent-task | machine-task | approval | delegation | parallel | join | wait | timer | SLA | retry | timeout | escalation | compensation | suspension | resume | cancellation | reopen | closure | migration | audit`

## Mandatory execution metadata

Each workflow declares:

`workflow_id + version + owner + authority + policy + inputs + outputs + preconditions + transitions + roles + resources + evidence + SLA + failure strategy + compensation + audit + security + data classification + retention + migration`

## State integrity

A command is not completion. An execution is not proof. A state transition requires an observable event and evidence where applicable. Existing executions remain associated with their workflow version unless an explicit migration is authorized.

## Reuse rule

Separate universal execution mechanics from institutional policy. A new organization should normally configure roles, forms, thresholds, approvers and rules rather than create a bespoke workflow engine.
