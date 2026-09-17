# Ecosystem Gap Closure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the approved OMNII control-plane doctrine into continuously verified cross-ecosystem runtime, security, conformance and evidence controls.

**Architecture:** Preserve OMNII as the canonical authority/control layer and treat ABBA, HAPi World, NAIRE, NGIN, RITES, IO, Value System, BUNK and OMNI as bounded participants. Add machine-checkable contracts, runtime reliability controls, Supabase security hardening and evidence reporting without creating competing primitives.

**Tech Stack:** TypeScript/Node.js, existing OMNII packages, GitHub Actions, PostgreSQL 17/Supabase, existing canonical registries/contracts, existing runtime/event abstractions.

**Spec:** `docs/superpowers/specs/2026-09-15-ecosystem-gap-closure-design.md`

## Global Constraints

- Constitution, Human Authority and Governance remain above the Control Plane.
- ABBA routes/composes capabilities but cannot create authority.
- BUNK remains downstream of OMNII; no BUNK → OMNII constitutional dependency.
- OMNI remains separate from OMNII.
- No Phase 41 implementation.
- No new competing canonical primitive.
- Unknown evidence remains `UNVERIFIED`, never silently promoted to success.
- Provider implementations remain replaceable and do not redefine semantics.
- Security changes remain restrictive where authoritative identity semantics are insufficient.

---

### Task 1: Baseline and control-plane inventory

**Files:**
- Read: `docs/architecture/OMNII_CONTROL_PLANE_CANONICAL.md`
- Read: `data/canonical/omnii-control-plane-registry.json`
- Read: `docs/architecture/OMNII_IMPLEMENTATION_GAP_REGISTER.md`
- Read: `docs/architecture/OMNII_RUNTIME_IMPLEMENTATION_STATUS.md`
- Inspect: `packages/omnii-runtime/**`
- Test: existing runtime/control-plane tests discovered during implementation.

**Interfaces:**
- Consumes: existing canonical control registry and runtime contracts.
- Produces: an implementation inventory used by Tasks 2–6; no new public interface.

- [ ] **Step 1: Enumerate existing control records, promotion states, runtime entry points and test suites.**
- [ ] **Step 2: Map every current P0/P1/P2/P3 gap to an existing file, package or external boundary.**
- [ ] **Step 3: Confirm whether Phase 27 has implementation evidence or a canonical non-required decision.**
- [ ] **Step 4: Record exact evidence commands and current limitations in the gap register.**
- [ ] **Step 5: Commit the inventory/gap-register update.**

---

### Task 2: Executable control-plane validation and drift detection

**Files:**
- Create: `packages/omnii-runtime/src/control/control-plane-validator.ts`
- Create: `packages/omnii-runtime/src/control/control-plane-drift.ts`
- Create: `packages/omnii-runtime/src/control/control-plane-types.ts`
- Test: `packages/omnii-runtime/src/control/__tests__/control-plane-validator.test.ts`
- Test: `packages/omnii-runtime/src/control/__tests__/control-plane-drift.test.ts`
- Modify: existing package export barrel discovered in Task 1.

**Interfaces:**
- `validateControlRecord(record): ValidationResult`
- `classifyPromotionTransition(previous, next): PromotionDecision`
- `detectControlPlaneDrift(snapshot): DriftFinding[]`

- [ ] **Step 1: Write failing tests for missing owner, authority class, lifecycle, implementation evidence and invalid promotion transitions.**
- [ ] **Step 2: Run the focused tests and confirm failure.**
- [ ] **Step 3: Implement strict record validation against the existing canonical field set.**
- [ ] **Step 4: Add promotion-ladder transition validation so documentation cannot imply production.**
- [ ] **Step 5: Write failing drift tests for missing implementation refs, stale evidence, dependency mismatch and boundary mismatch.**
- [ ] **Step 6: Implement deterministic drift classification without mutating source truth.**
- [ ] **Step 7: Run focused tests and existing runtime tests.**
- [ ] **Step 8: Commit the control-plane validator and drift detector.**

---

### Task 3: Runtime reliability and evidence enforcement

**Files:**
- Inspect/modify: existing universal execution/runtime package identified in Task 1.
- Create or modify: execution reliability adapter at the existing runtime boundary.
- Test: focused execution reliability tests in the existing runtime test location.

**Interfaces:**
- `executeGoverned(request): Promise<ExecutionOutcome>`
- `ExecutionOutcome` must distinguish `attempted`, `acknowledged`, `verified`, `failed`, `compensated`, and `dead_lettered` outcomes using existing canonical event/state semantics.

- [ ] **Step 1: Write failing tests for duplicate/replay, expired authority, timeout, lease expiry and missing external verification.**
- [ ] **Step 2: Run focused tests and confirm failure.**
- [ ] **Step 3: Implement idempotency/replay protection using the existing idempotency key contract.**
- [ ] **Step 4: Implement bounded retry and timeout behavior.**
- [ ] **Step 5: Implement lease/heartbeat and dead-letter transitions where the existing runtime model supports them.**
- [ ] **Step 6: Ensure failed/unknown external execution never produces a successful verified state.**
- [ ] **Step 7: Add compensation/reversal and escalation hooks through existing interfaces rather than inventing a second workflow model.**
- [ ] **Step 8: Run focused reliability tests plus the complete runtime suite.**
- [ ] **Step 9: Commit the runtime reliability closure.**

---

### Task 4: Cross-ecosystem conformance manifests

**Files:**
- Create: `data/conformance/ecosystem-repositories.json`
- Create: `packages/omnii-runtime/src/conformance/ecosystem-conformance.ts`
- Test: `packages/omnii-runtime/src/conformance/__tests__/ecosystem-conformance.test.ts`
- Modify: `.github/workflows/*` canonical conformance workflow discovered in Task 1.

**Interfaces:**
- `loadEcosystemManifest(): EcosystemManifest`
- `checkRepositoryConformance(manifest, evidence): ConformanceFinding[]`

- [ ] **Step 1: Define manifest records for OMNII, ABBA, HAPi World, HAPi World Nexus, NAIRE, NGIN, RITES, IO, Value System, BUNK and OMNI using existing canonical boundary terminology.**
- [ ] **Step 2: Write failing tests for missing boundary contract, wrong ownership, missing implementation evidence and missing lifecycle evidence.**
- [ ] **Step 3: Implement manifest validation and conformance findings.**
- [ ] **Step 4: Add CI invocation against repository metadata/contracts available to the connected GitHub environment.**
- [ ] **Step 5: Ensure failed/unavailable evidence is reported as `UNVERIFIED`, not inferred as failure or success.**
- [ ] **Step 6: Run the conformance tests and current CI checks.**
- [ ] **Step 7: Commit the cross-ecosystem conformance layer.**

---

### Task 5: Supabase security hardening

**Files:**
- Inspect: `supabase/migrations/**`
- Create: next sequential migration(s) under `supabase/migrations/`.
- Create/modify: live database security verification tests at the existing database test location.
- Modify: gap register/security posture docs with exact evidence.

**Interfaces:**
- Database behavior only; no new application authorization primitive.

- [ ] **Step 1: Inspect the live advisor findings and identify the exact migration/table/function definitions responsible for each finding.**
- [ ] **Step 2: Write failing database verification checks for unintended public function execution, unrestricted public spatial tables and missing policy coverage on exposed application tables.**
- [ ] **Step 3: Revoke inappropriate `anon`/`authenticated` execution from SECURITY DEFINER functions where execution is not an intentional public contract.**
- [ ] **Step 4: Keep required mutating RPCs restricted to their intended service role and preserve `SECURITY INVOKER` behavior where already canonical.**
- [ ] **Step 5: Address `spatial_ref_sys` exposure and PostGIS schema placement only through a safe migration compatible with live geometry behavior; do not break spatial functionality for the sake of a lint count.**
- [ ] **Step 6: Add narrow RLS policies only where the existing canonical identity-to-authority contract proves the predicate; otherwise preserve restrictive denial and register the remaining gap.**
- [ ] **Step 7: Run live Supabase advisors and explicit grant/RLS verification queries.**
- [ ] **Step 8: Run existing database/runtime contract tests.**
- [ ] **Step 9: Commit the security hardening migration and evidence updates.**

---

### Task 6: Distributed event and observability adapters

**Files:**
- Inspect: existing event envelope and telemetry adapters.
- Create: implementation-specific transport/telemetry adapters only where absent.
- Test: adapter contract tests in the existing runtime/event test locations.

**Interfaces:**
- Existing event envelope remains authoritative.
- Adapter interfaces may include `publish(event)`, `acknowledge(eventId)`, `observe(trace)` only where existing architecture lacks an implementation.

- [ ] **Step 1: Identify whether a NATS/queue/transport adapter already exists.**
- [ ] **Step 2: Write failing adapter conformance tests for event identity, ordering metadata, correlation/causation and acknowledgement semantics.**
- [ ] **Step 3: Implement the smallest adapter behind the existing event interface.**
- [ ] **Step 4: Add telemetry export without changing canonical event names or payload semantics.**
- [ ] **Step 5: Run adapter tests and runtime tests.**
- [ ] **Step 6: Commit the event/observability closure.**

---

### Task 7: Production evidence and readiness gate

**Files:**
- Modify: `docs/architecture/OMNII_IMPLEMENTATION_GAP_REGISTER.md`
- Modify: `docs/architecture/OMNII_RUNTIME_IMPLEMENTATION_STATUS.md`
- Create: `docs/architecture/OMNII_ECOSYSTEM_CONFORMANCE_STATUS.md`
- Modify: canonical GitHub Actions workflow used for runtime verification.

**Interfaces:**
- Produces: machine-readable and human-readable readiness evidence; it does not change runtime authority.

- [ ] **Step 1: Add checks for repository install, typecheck, unit tests, runtime tests and runtime build.**
- [ ] **Step 2: Record the GitHub Actions run and commit SHA used as evidence.**
- [ ] **Step 3: Record current Supabase health, advisor results and database verification evidence.**
- [ ] **Step 4: Record deployment target and post-deploy evidence when an actual production deployment is available.**
- [ ] **Step 5: Record production ABBA intelligence integration as an external boundary until an authorized provider is actually connected and verified.**
- [ ] **Step 6: Generate the ecosystem conformance status document from the validated evidence set.**
- [ ] **Step 7: Run the full canonical verification suite.**
- [ ] **Step 8: Commit the readiness evidence.**

---

### Task 8: Cross-repository verification and pull request

**Files:**
- Verify: `carbonactual/abba`, `carbonactual/abba-mas`, `carbonactual/hapi-world`, `carbonactual/hapi-world-nexus`, `carbonactual/naire`, `carbonactual/ngin`, `carbonactual/RITES`, `carbonactual/io`, `carbonactual/value-system`, `carbonactual/bunk`, `carbonactual/omni`.
- Update only when a contract is missing and the change belongs in that repository.

- [ ] **Step 1: Run GitHub searches for required canonical contract files/evidence in each bounded repository.**
- [ ] **Step 2: Compare each repository's declared boundary against the current OMNII manifest.**
- [ ] **Step 3: Open focused PRs for genuinely missing contracts, never bulk-copying OMNII internals into product repositories.**
- [ ] **Step 4: Verify each PR's tests/CI and record evidence in OMNII.**
- [ ] **Step 5: Re-run cross-ecosystem conformance after all participating contracts are current.**

---

### Task 9: Final verification and closure

- [ ] **Step 1: Run the complete available test/typecheck/build suite.**
- [ ] **Step 2: Re-run Supabase security/performance advisors.**
- [ ] **Step 3: Run cross-repository conformance checks.**
- [ ] **Step 4: Verify no new constitutional primitive, boundary inversion or BUNK → OMNII dependency was introduced.**
- [ ] **Step 5: Verify the evidence status of every original gap.**
- [ ] **Step 6: Update the final gap register with explicit closed/remaining/unverified states.**
- [ ] **Step 7: Open the implementation pull request from `gap-closure-2026-09-15` to `main`.**
- [ ] **Step 8: Do not merge until CI and review evidence support the closure claims.**
