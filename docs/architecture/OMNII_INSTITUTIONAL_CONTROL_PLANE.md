# OMNII Institutional Control Plane

**Status: CANONICAL REUSABLE CONTROL-PLANE SPECIFICATION**

The control plane connects reusable institutional machinery without turning client-specific needs into constitutional primitives.

## Primary objects

`InstitutionalBinding`

Binds an institution to reusable registries, forms, workflows, automations, capabilities, policies and authority scopes.

`ExecutionControl`

Defines how a capability may execute: actor types, authority, approval gates, preconditions, idempotency, timeout, retry, compensation, evidence, audit and kill-switch requirements.

`DeploymentPackage`

Defines the exact portable composition installed for an institution and the information required to operate, migrate, recover or hand it off.

`ControlFinding`

Normalizes gaps across security, compliance, data quality, reconciliation, workflow, finance, digital infrastructure and continuity.

## Cross-system links

```text
Institution
 ├─ Mandate / Jurisdiction
 ├─ People / Roles / Authority
 ├─ Registries
 ├─ Forms / Submissions
 ├─ Cases / Workflows
 ├─ Tasks / SLAs
 ├─ Rules / Automations
 ├─ Resources / Capabilities
 ├─ Executions
 ├─ Events / Evidence / Logs
 ├─ Decisions / Approvals
 ├─ Contracts / Finance / Payments
 ├─ Compliance / Audit / Risk
 ├─ Digital Assets / Deployments
 └─ Continuity / Handoff
```

## Control invariants

- Authority must be explicit.
- Least privilege is the default.
- Separation of duties is supported for high-risk operations.
- Every consequential action has provenance and auditable execution state.
- Automation is bounded by authority and policy.
- Financial movements can be reconciled against expected obligations and evidence.
- External providers are adapters, not constitutional dependencies.
- Sensitive data is not made broadly readable merely to simplify product composition.
- Failures are represented as first-class states.

## Composition lifecycle

```text
REGISTER CAPABILITY
→ DEFINE CONTROL
→ COMPOSE INSTITUTION
→ VALIDATE CONFIGURATION
→ DEPLOY
→ OBSERVE
→ RECONCILE
→ DETECT FINDINGS
→ REMEDIATE
→ VERIFY
→ VERSION
→ HANDOFF / UPGRADE / MIGRATE
```

## Governance boundary

The platform provides reusable technical and operational infrastructure. It does not manufacture governmental, judicial, policing, military, electoral, financial or other legal authority. Those powers remain defined by the deploying institution and applicable law.
