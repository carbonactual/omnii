# NASC Institutional Deployment Design

**Status:** APPROVED FOR IMPLEMENTATION
**Date:** 2026-08-30

## Goal

Compose a production-oriented National Agricultural Seeds Council (NASC) institutional platform from existing OMNII/Carbon Actual reusable infrastructure, with NASC-specific registries, forms, governed workflows, evidence, licensing, inspection, certification, traceability, public verification, reporting, controls, integrations and a portable handoff package.

## Architectural Principle

NASC is a downstream institutional composition. It must consume reusable OMNII capabilities and add only NASC-specific domain configuration, schemas, rules, content and integrations. Recurring capabilities discovered during implementation must be extracted back into reusable OMNII machinery rather than becoming NASC-only custom logic.

## Scope

### Institutional foundation
- institution identity, departments, units, roles and authority
- actor/participant identity and organization relationships
- policies, delegated authority, approvals and auditability

### Seed-sector registries
- producers and seed companies
- crops and varieties
- seed lots/batches
- facilities/sites
- licences and permits
- certifications/accreditations
- inspectors and laboratories
- inspection/test/certification evidence
- incidents, complaints and enforcement cases
- market and distribution intelligence

### Core service journeys
1. actor registration
2. licence/permit application and renewal
3. variety/seed submission
4. inspection request and field inspection
5. laboratory/testing evidence
6. certification decision
7. seed-lot traceability and verification
8. complaint/incident/enforcement
9. public verification

### Reusable institutional machinery
- forms and submissions
- workflow/process instances and tasks
- SLA/deadline management
- notifications
- documents/evidence
- payments/fees and reconciliation adapters
- dashboards, KPI and Pulse/value reporting
- compliance, audit and control findings
- API/interoperability contracts
- institutional knowledge and continuity

### Handoff
The deployment must have a portable package containing configuration, schema/domain metadata, forms, workflows, automations, permissions/authority model, integration contracts, environment requirements, seed/reference data where permitted, test/UAT evidence, operations runbook, administrator/user guidance, security/continuity controls and an explicit exit/handoff manifest.

## Non-goals

- Replacing lawful NASC procurement or statutory decision-making with software.
- Hard-coding individual office holders as permanent architecture dependencies.
- Creating a second universal ontology outside OMNII.
- Treating AI/agents as autonomous authorities; consequential actions remain governed by explicit authority, policy and workflow controls.

## Reference lifecycle

`application → identity/organization verification → evidence → inspection → testing → review → approval → licence/certificate → public verification → renewal`

Exception paths include deficiency, rejection, resubmission, appeal/review, suspension, cancellation, incident and enforcement.

## Traceability invariant

Every consequential action resolves to:

`actor → authority → intent → policy → workflow/case → task → execution → resulting state → event → evidence → audit`

Where value is involved:

`execution → obligation → invoice/claim → authorization → payment/settlement → reconciliation → ledger → audit`

## Security and integrity

- least-privilege roles
- row-level/data access boundaries appropriate to tenant/institution context
- immutable/auditable consequential events
- evidence provenance and lifecycle
- authority expiry/delegation checks
- duplicate/orphan/missing-link detection
- controlled privileged operations
- recovery and backup evidence
- exportability and handoff controls

## Acceptance criteria

A NASC deployment is release-ready only when:

1. The NASC composition is represented as a versioned deployment package.
2. Required registries, forms and workflows are instantiated in the canonical Supabase project.
3. The core producer/operator lifecycle can be demonstrated end-to-end, including an exception path.
4. Evidence, authority, audit and traceability relationships are preserved.
5. Security/performance advisors are checked and material findings addressed or documented.
6. Automated tests cover critical validation and transition rules.
7. UAT scenarios and expected outcomes are documented.
8. Operations/handoff documentation allows a receiving institutional team to administer, operate and export the deployment.
9. Institution-specific configuration is cleanly separated from reusable OMNII capability modules.
10. The package can be handed off without requiring reconstruction of hidden model context.

## Deployment composition

`OMNII CORE + shared capabilities + NASC domain pack + NASC configuration + data/registries + forms + workflows + automations + integrations + teams/resources + governance/security + value/reporting + UI/branding`

## Future reuse rule

Any capability needed by NASC that is also useful for another institution must enter the reusable capability shelf with a stable contract, tests, documentation and versioning boundary.
