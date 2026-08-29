# NASC Institutional Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instantiate NASC as a portable institutional composition on top of OMNII reusable infrastructure, with working registries, forms, workflows, controls, evidence, reporting and handoff documentation.

**Architecture:** Reuse existing canonical OMNII registries, institutional bindings, forms, workflows, process/task, audit, authority, evidence/quality, reconciliation and deployment-package primitives. Add a NASC domain/configuration layer that declares seed-sector entities, service journeys, forms and transition rules without introducing a parallel ontology.

**Tech Stack:** GitHub-managed Markdown/SQL/migration artifacts; Supabase PostgreSQL 17; Supabase Auth/RLS; existing OMNII public schema/runtime; deployable Edge Functions only where a server-side boundary is required.

**Spec:** `docs/superpowers/specs/2026-08-30-nasc-institutional-deployment-design.md`

## Global Constraints

- NASC is a downstream institutional composition and must consume reusable OMNII capability contracts.
- Institution-specific rules, authority, data and policy remain at the NASC configuration/domain boundary.
- Consequential actions resolve through actor → authority → intent → policy → workflow/case → task → execution → state → event → evidence → audit.
- AI/agents do not receive independent institutional authority; consequential execution remains policy/workflow governed.
- Every deployable shared component is versioned and the NASC deployment remains exportable and handoff-ready.
- No destructive schema changes to existing canonical OMNII objects.

---

### Task 1: Inventory and conformance map

**Files:**
- Read: `docs/architecture/OMNII_INSTITUTIONAL_COMPOSITION_INDEX.md`
- Read: `docs/architecture/OMNII_INSTITUTIONAL_OPPORTUNITY_MAP_2026.md`
- Read: relevant `docs/products/` and `docs/architecture/` NASC/registry/form/workflow documents
- Create: `docs/products/NASC_CONFORMANCE_MAP.md`

**Interfaces:**
- Consumes: existing OMNII registry, form, workflow, control and deployment package contracts.
- Produces: a gap matrix mapping every NASC requirement to an existing reusable object or a named NASC configuration object.

- [ ] **Step 1: Search the repository for NASC, registry, forms, workflows, licensing, inspection, certification, traceability and deployment-package references.**
- [ ] **Step 2: Classify each requirement as reuse, configuration, or genuinely new reusable capability.**
- [ ] **Step 3: Write `NASC_CONFORMANCE_MAP.md` with an explicit coverage matrix and unresolved implementation items.**
- [ ] **Step 4: Verify the matrix contains every acceptance-criterion area in the spec.**
- [ ] **Step 5: Commit with `docs: map NASC composition to reusable OMNII capabilities`.**

### Task 2: NASC domain catalog and registry definitions

**Files:**
- Create: `docs/products/NASC_DOMAIN_PACK.md`
- Create: `config/nasc/registries.json`
- Create: `config/nasc/reference_data.json`

**Interfaces:**
- Consumes: conformance map from Task 1 and canonical registry catalog.
- Produces: versioned NASC domain metadata that identifies registries, relationships, validation constraints and reference statuses.

- [ ] **Step 1: Define the registry catalog for actors, organizations, crops, varieties, seed lots/batches, facilities, licences, permits, certifications, accreditations, inspectors, laboratories, inspections, tests/evidence, incidents, complaints and public verification projections.**
- [ ] **Step 2: Define relationship edges between actors, organizations, varieties, lots, facilities, licences, inspections, evidence and certificates.**
- [ ] **Step 3: Define non-sensitive reference statuses and lifecycle enumerations used by NASC workflows.**
- [ ] **Step 4: Document which structures are logical projections of canonical OMNII registries rather than parallel storage models.**
- [ ] **Step 5: Validate JSON syntax and commit.**

### Task 3: NASC institutional binding and database instantiation

**Files:**
- Create: `supabase/migrations/<timestamp>_nasc_institutional_composition.sql`
- Create: `config/nasc/permissions.json`
- Create: `config/nasc/integrations.json`

**Interfaces:**
- Consumes: `omnii_institutional_bindings`, `omnii_registries`, canonical objects, authority and audit tables.
- Produces: a versioned NASC binding/domain registration and access-control/integration metadata.

- [ ] **Step 1: Add a migration that registers NASC as an institutional composition using existing canonical tables/relationships where available.**
- [ ] **Step 2: Add NASC domain metadata only where the canonical schema has a clean configuration boundary; do not duplicate universal registries.**
- [ ] **Step 3: Define institutional roles and permission boundaries for public, applicant/operator, inspector, laboratory, reviewer, approver, administrator, auditor and integration identities.**
- [ ] **Step 4: Define integration placeholders/contracts for identity, payments, notifications, laboratory systems and public verification without embedding secrets.**
- [ ] **Step 5: Apply the migration in a safe environment and verify counts/relationships with SQL checks.**
- [ ] **Step 6: Commit the migration and configuration.**

### Task 4: NASC forms and submission contracts

**Files:**
- Create: `config/nasc/forms.json`
- Create: `docs/products/NASC_FORMS_CATALOG.md`

**Interfaces:**
- Consumes: canonical form template/submission/review structures.
- Produces: machine-readable NASC form definitions and human-readable field/purpose documentation.

- [ ] **Step 1: Define actor/organization registration, licence/permit application, renewal, variety submission, inspection request, laboratory submission, certification request, complaint, incident/enforcement, appeal/review, fee/payment and public-verification query forms.**
- [ ] **Step 2: Define validation rules, required evidence, role eligibility and submission destinations for every form.**
- [ ] **Step 3: Map every form to the workflow that consumes it.**
- [ ] **Step 4: Define review states and rejection/deficiency/resubmission behavior.**
- [ ] **Step 5: Validate schema and commit.**

### Task 5: NASC workflow and process definitions

**Files:**
- Create: `config/nasc/workflows.json`
- Create: `docs/products/NASC_WORKFLOW_CATALOG.md`

**Interfaces:**
- Consumes: canonical workflow/process/task contracts and form IDs from Task 4.
- Produces: versioned workflow definitions for the core lifecycle and exception paths.

- [ ] **Step 1: Define producer/operator registration workflow.**
- [ ] **Step 2: Define licence/permit lifecycle including renewal, deficiency, suspension and cancellation.**
- [ ] **Step 3: Define variety/seed submission through evidence, inspection, testing, review and decision.**
- [ ] **Step 4: Define certification and lot traceability workflows.**
- [ ] **Step 5: Define complaint, incident, enforcement and appeal workflows.**
- [ ] **Step 6: Define SLAs, responsible roles, required evidence and audit events for every transition.**
- [ ] **Step 7: Validate that each consequential transition has explicit authority and policy gates.**
- [ ] **Step 8: Commit.**

### Task 6: Seed-sector evidence and traceability rules

**Files:**
- Create: `config/nasc/evidence_rules.json`
- Create: `docs/products/NASC_EVIDENCE_AND_TRACEABILITY.md`

**Interfaces:**
- Consumes: canonical evidence, quality, registry-edge and audit structures.
- Produces: domain-specific evidence requirements, provenance rules and lot/batch traceability assertions.

- [ ] **Step 1: Define evidence classes for identity, ownership/authorization, facility, inspection, test/laboratory, certification and incident records.**
- [ ] **Step 2: Define source/provenance, status, expiry and supersession behavior.**
- [ ] **Step 3: Define lot/batch lineage and relationship rules across producer → facility → variety → lot → inspection → test → certificate → distribution/verification.**
- [ ] **Step 4: Define public-verification output as a projection that excludes protected information.**
- [ ] **Step 5: Commit.**

### Task 7: Controls, audit, reconciliation and public verification

**Files:**
- Create: `config/nasc/controls.json`
- Create: `docs/products/NASC_CONTROL_AND_AUDIT_MODEL.md`
- Create: `docs/products/NASC_PUBLIC_VERIFICATION.md`

**Interfaces:**
- Consumes: canonical controls, audit, reconciliation, state/event and public-facing projection capabilities.
- Produces: NASC control rules and operational/public verification contract.

- [ ] **Step 1: Define duplicate identity, missing evidence, expired authority, skipped workflow, unauthorized approval, stale case and certificate/licence expiry findings.**
- [ ] **Step 2: Define payment/fee reconciliation requirements and exception routing.**
- [ ] **Step 3: Define public verification for licence/certificate/lot status and provenance while protecting restricted data.**
- [ ] **Step 4: Define incident escalation and suspension/cancellation triggers.**
- [ ] **Step 5: Commit.**

### Task 8: Reporting, KPI/Pulse and operational dashboards

**Files:**
- Create: `config/nasc/metrics.json`
- Create: `docs/products/NASC_OPERATING_METRICS.md`

**Interfaces:**
- Consumes: canonical events, executions, states, reconciliations and Pulse/value mechanisms.
- Produces: NASC operational and institutional measurement definitions.

- [ ] **Step 1: Define application volume, cycle time, backlog, inspection throughput, test turnaround, approval rates, renewals, incidents, compliance findings and public verification metrics.**
- [ ] **Step 2: Define fee/reconciliation measures and exception aging.**
- [ ] **Step 3: Define Pulse/value measures for service quality, timeliness, resource use and stakeholder feedback.**
- [ ] **Step 4: Commit.**

### Task 9: Automated tests and UAT scenarios

**Files:**
- Create: `tests/nasc/test_nasc_domain_validation.sql`
- Create: `tests/nasc/nasc_uat_scenarios.md`
- Create: `tests/nasc/test_nasc_configuration.py`

**Interfaces:**
- Consumes: NASC configuration and canonical runtime behavior.
- Produces: repeatable validation and a receiving-institution UAT script.

- [ ] **Step 1: Write tests for registry relationships and lifecycle constraints.**
- [ ] **Step 2: Write tests for required evidence and workflow transition guards.**
- [ ] **Step 3: Write tests for duplicate, expiry, authority and reconciliation findings.**
- [ ] **Step 4: Write UAT scenarios covering happy path plus deficiency, rejection, appeal, suspension and renewal.**
- [ ] **Step 5: Run all tests and record expected results.**
- [ ] **Step 6: Commit.**

### Task 10: Deployment package and complete handoff suite

**Files:**
- Create: `deployments/nasc/manifest.json`
- Create: `deployments/nasc/README.md`
- Create: `deployments/nasc/OPERATIONS_RUNBOOK.md`
- Create: `deployments/nasc/ADMIN_GUIDE.md`
- Create: `deployments/nasc/USER_GUIDE.md`
- Create: `deployments/nasc/SECURITY_AND_CONTINUITY.md`
- Create: `deployments/nasc/ACCEPTANCE_AND_UAT.md`
- Create: `deployments/nasc/HANDOFF_AND_EXIT.md`
- Create: `docs/proposals/NASC_PLATFORM_PROPOSAL.md`
- Create: `docs/proposals/NASC_STATEMENT_OF_WORK.md`
- Create: `docs/proposals/NASC_IMPLEMENTATION_ROADMAP.md`

**Interfaces:**
- Consumes: all versioned NASC configuration, test evidence and control metadata from Tasks 1–9.
- Produces: one discoverable, portable deployment package and proposal/document set suitable for institutional review, procurement, implementation and handoff.

- [ ] **Step 1: Create a manifest listing all configuration, migration, documentation and version dependencies.**
- [ ] **Step 2: Document installation/configuration order, environment variables, roles, integrations and recovery procedures.**
- [ ] **Step 3: Produce administrator and operator guidance tied to the actual workflows/forms.**
- [ ] **Step 4: Produce the proposal, SOW and implementation roadmap using the implemented scope rather than aspirational features.**
- [ ] **Step 5: Add acceptance/UAT evidence requirements and sign-off criteria.**
- [ ] **Step 6: Add explicit handoff/exit procedures and portable export expectations.**
- [ ] **Step 7: Commit the complete package.**

### Task 11: Production hardening and final verification

**Files:**
- Modify: `docs/products/NASC_CONFORMANCE_MAP.md`
- Modify: `deployments/nasc/ACCEPTANCE_AND_UAT.md`

**Interfaces:**
- Consumes: deployed Supabase state, tests, security/performance advisories and package manifest.
- Produces: final release-readiness record.

- [ ] **Step 1: Query the live NASC binding/registry/form/workflow/package counts.**
- [ ] **Step 2: Run security and performance advisory checks and remediate material issues.**
- [ ] **Step 3: Verify RLS/role boundaries and consequential audit events.**
- [ ] **Step 4: Verify end-to-end lifecycle plus exception path in the target Supabase environment.**
- [ ] **Step 5: Verify deployment manifest completeness and handoff portability.**
- [ ] **Step 6: Update the conformance map with actual verification evidence.**
- [ ] **Step 7: Commit final readiness documentation.**

---

## Spec Coverage Check

- Institutional authority/governance: Tasks 2, 3, 5, 7.
- Seed-sector registries: Tasks 2, 3.
- Forms: Task 4.
- Workflows/cases/tasks/SLAs: Task 5.
- Evidence/inspection/testing/certification/traceability: Tasks 5, 6.
- Fees/payments/reconciliation: Tasks 7, 8.
- Audit/compliance/security/continuity: Tasks 3, 7, 10, 11.
- Analytics/Pulse/value: Task 8.
- Testing/UAT: Task 9.
- Proposal/SOW/roadmap/handoff: Task 10.
- Production hardening/verification: Task 11.

## Completion Standard

Do not claim NASC is ready for institutional handoff until Tasks 1–11 are complete, critical tests pass, material security/performance issues are addressed or explicitly documented, the deployment manifest is internally consistent, and the live Supabase composition is verified.
