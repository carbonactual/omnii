# OMNII Institutional System Hardening

**Status: CANONICAL HARDENING PROFILE**

## Objective

Strengthen every institutional composition with explicit control-plane objects, security boundaries, execution safeguards, reconciliation, deployment portability and gap detection.

## Control-plane objects

- Institutional Binding — links institution to selected registries, forms, workflows, automations and capabilities.
- Execution Control — defines authority, approval, preconditions, actor boundaries, idempotency, timeout, retry, compensation, evidence, audit and kill-switch requirements.
- Deployment Package — versioned portable deployment manifest containing core, modules, domain packs, registries, forms, workflows, automations, integrations, configuration, security profile and handoff/exit material.
- Control Finding — common finding object for security, integrity, compliance, data quality, reconciliation, workflow, deployment and operational gaps.

## Security posture

Sensitive control-plane tables are deny-by-default through RLS and service-role mediated until a purpose-built authorization policy exists. Public/authenticated catalog access is explicitly separated from operational data.

## Integrity rules

1. Commands are not proof of execution.
2. Execution is not proof of outcome.
3. State is not evidence without provenance.
4. Financial state requires reconciliation where applicable.
5. Authority is explicit and never inferred from application access.
6. Automation cannot create authority.
7. High-consequence actions expose approval boundaries.
8. Duplicate, orphan, expired, inconsistent and unexplained records become findings/cases rather than silent mutation.
9. Every deployment has a version, owner, provenance, rollback/recovery posture and exit path.
10. Provider-specific dependencies remain behind adapters.

## Institutional gap classes

- identity and duplicate identity
- organization and authority mismatch
- stale/expired credentials
- unauthorized privileged access
- unapproved deployment/change
- domain/subdomain/application drift
- suspicious website content or redirect
- workflow bypass or stuck execution
- SLA breach
- missing evidence
- duplicate payment or unmatched payment
- invoice/PO mismatch
- stock/physical mismatch
- orphaned record
- broken integration
- synchronization conflict
- policy/compliance breach
- missing recovery capability
- unsupported configuration drift

## Universal control path

```text
OBJECT
→ AUTHORITY
→ POLICY
→ ACTION
→ EXECUTION
→ EVENT
→ EVIDENCE
→ RECONCILIATION
→ FINDING / OUTCOME
→ AUDIT
→ PULSE
→ IMPROVEMENT
```

## Handoff

An institution can export and operate a deployment independently from the shared substrate by receiving a versioned package containing configuration, data manifests, module versions, integrations, security controls, documentation, tests, backups/recovery instructions and an exit/migration path.
