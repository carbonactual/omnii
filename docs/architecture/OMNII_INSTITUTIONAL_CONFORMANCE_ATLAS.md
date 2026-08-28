# OMNII Institutional Conformance Atlas

**Status: CANONICAL REUSABLE CONTROL ATLAS**

## Purpose

Detect missing links, loopholes, orphaned records, inconsistent state and incomplete institutional execution across registries, forms, workflows, automations, finance, execution, audit and continuity.

## Mandatory traceability

Every consequential action should be able to resolve:

`actor → authority → intent/request → applicable policy → workflow/case → task → execution → resulting state → event → evidence → audit`

Where money or measurable value is involved:

`execution → obligation → invoice/claim → authorization → payment/settlement → reconciliation → ledger → audit`

## Gap classes

### Identity

Duplicate identity; conflicting identifiers; unverified actor; stale identity; orphaned account; missing recovery; mismatched institutional membership.

### Authority

Expired delegation; missing approval; unauthorized signer; self-approval; incompatible duties; excessive scope; privilege escalation; undocumented override; authority used outside jurisdiction/time.

### Workflow

Skipped step; impossible state transition; stuck case; unassigned task; SLA breach; duplicate execution; missing compensation path; missing escalation; incomplete closure.

### Evidence

Missing proof; unverifiable attachment; claim without support; missing provenance; broken chain-of-custody; evidence not linked to decision; retention violation.

### Finance

Orphan transaction; duplicate payment; unmatched invoice; unreconciled settlement; budget overrun; stale commitment; unexplained adjustment; payment without valid obligation; obligation without source authorization.

### Asset/resource

Unowned asset; duplicate asset; inventory mismatch; unavailable resource assigned to task; expired certification; maintenance overdue; resource consumed without recorded release.

### Digital integrity

Unowned domain/subdomain; unexplained content change; unauthorized deployment; stale certificate; privileged access without owner; unknown vendor; missing backup; failed restore test; unresolved vulnerability.

### Continuity

Missing migration path; no backup; no handoff owner; unsupported module version; non-exportable configuration; orphaned integration; no replacement provider; no recovery procedure.

## Conformance states

`unknown → detected → triaged → assigned → remediating → verified → accepted-risk → closed`

Unknown is preserved as unknown until evidence permits classification.

## Institutional handoff

A deployment is complete only when the receiving institution can operate, administer, audit, export, recover, migrate and replace the deployed system according to its authority and data ownership arrangements.

## Cross-system principle

The conformance engine checks the links between logical registries rather than treating each registry as an isolated database. A finding becomes a case/work item with owner, priority, evidence, remediation, verification and closure.
