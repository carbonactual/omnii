# Ecosystem Runtime Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the remaining control-plane/runtime integration gaps and move the Carbon Actual ecosystem from architectural readiness toward evidence-backed runtime conformance without introducing competing primitives.

**Architecture:** Reuse the existing OMNII control plane, Common Layer capability registry, AuthorityRuntime, RuntimeActivation and product-conformance machinery. Strengthen seams, registries, tests and verification rather than building parallel orchestration or authority systems.

**Tech Stack:** TypeScript/Node runtime, existing OMNII packages, Supabase/PostgreSQL persistence, GitHub Actions, existing canonical docs/registries.

**Spec:** `docs/superpowers/specs/2026-09-14-ecosystem-runtime-integration-design.md`

## Global Constraints

- Constitution and Human Authority remain supreme; code cannot create authority.
- No second universal object graph, capability registry, authority model or constitutional kernel.
- ABBA is orchestration/intelligence, not an authority issuer.
- Mission readiness never equals authorization.
- Runtime success requires verified evidence; external failure cannot become success by assumption.
- Products consume common capabilities and may not redefine universal semantics.
- Historical contradictions remain provenance-bearing and are resolved by authority, not deletion.
- BUNK remains a downstream product boundary and is not a constitutional dependency.
- No destructive repository consolidation, deletion or archive operation is required by this plan.

---

### Task 1: Synchronize control-plane registry with the runtime estate

**Files:**
- Modify: `data/canonical/omnii-control-plane-registry.json`
- Create: `docs/architecture/OMNII_ECOSYSTEM_RUNTIME_MATURITY.md`

**Interfaces:**
- Consumes: existing Control Plane contracts and runtime evidence matrix.
- Produces: explicit control records for estate classification, runtime integration, verification evidence and human-only blockers.

- [ ] **Step 1: Add canonical control records for the already-existing seams.**

Add records for:

`omnii.control.repository-estate`,
`omnii.control.runtime-integration`,
`omnii.control.verification-evidence`,
`omnii.control.human-boundary`.

Keep the same required fields and authority precedence as the current control registry.

- [ ] **Step 2: Record maturity without overclaiming.**

Set controls to `implemented` only when current source evidence exists; use `specified` for controls not yet executed; use `verified` only after current CI/runtime/deployment evidence is captured.

- [ ] **Step 3: Write the maturity matrix.**

The matrix MUST distinguish `coded`, `tested`, `currently_executed`, `live_verified`, `CI_verified`, and `deployed` and must cite the evidence source or explicitly identify the environmental limitation.

- [ ] **Step 4: Commit.**

Commit with:

`docs(control): synchronize ecosystem runtime maturity`

---

### Task 2: Add failing ABBA authorization-boundary tests

**Files:**
- Modify: `packages/omnii-runtime/tests/abba-mission-intelligence.test.ts`
- Create: `packages/omnii-runtime/tests/abba-authority-boundary.test.ts`

**Interfaces:**
- Consumes: `AbbaRuntime`, `AuthorityRuntime`, `AgentRuntime`, `ExecutionRuntime`, `EventStore`, `MemoryPersistenceAdapter`.
- Produces: regression coverage proving ABBA cannot self-authorize and cannot bypass an invalid/revoked delegated authority.

- [ ] **Step 1: Write a test showing revoked authority blocks ABBA delegation.**

Construct an agent, issue a valid authority, revoke it, then invoke the ABBA delegation path with the revoked record. Assert rejection with an authority-revoked error and assert that no successful `ABBA_DELEGATION` event is emitted.

- [ ] **Step 2: Write a test showing mission readiness does not authorize execution.**

Use a mission that returns `READY`, omit a valid runtime authority, and assert that subsequent consequential execution remains blocked by the runtime authority boundary.

- [ ] **Step 3: Run the focused tests.**

Run:

`pnpm --filter @omnii/runtime test -- abba-authority-boundary.test.ts`

Expected initial result: the new tests fail if the seam allows an invalid authority record through.

- [ ] **Step 4: Commit the failing tests.**

Commit with:

`test(abba): enforce runtime authority boundary`

---

### Task 3: Implement only the minimal runtime seam required by the tests

**Files:**
- Modify: `packages/omnii-runtime/src/abba-runtime.ts`
- Modify only if the failing tests identify a concrete shared-guard gap: `packages/omnii-runtime/src/agent-runtime.ts` or `packages/omnii-runtime/src/authority-runtime.ts`

**Interfaces:**
- Consumes: existing `AuthorityRuntime` semantics and broker contract.
- Produces: ABBA delegation that cannot turn a stale/revoked authority record into an active delegation.

- [ ] **Step 1: Make the failing test pass with the smallest change.**

Prefer composing existing `AuthorityRuntime.validate()` / `authorizeAction()` semantics rather than adding a second authority check implementation.

- [ ] **Step 2: Preserve the existing broker interface.**

Do not force all callers to adopt a new dependency if an adapter can expose the existing broker contract.

- [ ] **Step 3: Verify the focused tests pass.**

Run the same focused test command and then the existing authority and mission suites.

- [ ] **Step 4: Commit.**

Commit with:

`fix(abba): route delegation through canonical authority validation`

---

### Task 4: Harden runtime evidence and reconciliation coverage

**Files:**
- Modify: `packages/omnii-runtime/tests/runtime-activation.test.ts`
- Modify only as required by tests: `packages/omnii-runtime/src/runtime-activation.ts`

**Interfaces:**
- Consumes: existing signal/context/authority/route/execution/evidence/reconciliation/feedback contracts.
- Produces: verified regression coverage for blocked authority, replay/idempotency and discrepancy preservation.

- [ ] **Step 1: Add a failing test for blocked authority.**

Provide an invalid or revoked authority reference and assert `status === "blocked"` with `reason === "authority_invalid"`.

- [ ] **Step 2: Add a failing replay test.**

Run the same signal twice and assert that the second activation replays the completed result rather than executing the handler twice.

- [ ] **Step 3: Add a failing discrepancy test.**

Return an incomplete execution outcome and assert that reconciliation is `matched === false` and that the discrepancy remains represented in the durable event stream.

- [ ] **Step 4: Implement only missing behavior.**

Use the existing idempotency keys and event model; do not create a separate replay store.

- [ ] **Step 5: Run focused runtime tests.**

Run:

`pnpm --filter @omnii/runtime test -- runtime-activation.test.ts`

- [ ] **Step 6: Commit.**

Commit with:

`test(runtime): close activation evidence boundaries`

or, when implementation changes are required,

`fix(runtime): preserve activation evidence boundaries`

---

### Task 5: Register repository-estate control without moving repositories

**Files:**
- Modify: `docs/architecture/REPOSITORY_CONTENT_CONSOLIDATION_AUDIT.md`
- Create: `docs/architecture/OMNII_ECOSYSTEM_REPOSITORY_BINDINGS.md`

**Interfaces:**
- Consumes: the current account audit and current GitHub repository inventory.
- Produces: machine-readable conceptual bindings for canonical, product, environment, provider/reference and historical repositories.

- [ ] **Step 1: Declare current estate classes.**

At minimum classify:

`omnii = canonical architecture/runtime`,
`abba / abba-mas / abba-automation-ecosystem = intelligence/orchestration implementations`,
`hapi-world / hapi-world-nexus = HAPI World surfaces`,
`RITES = specialized operating environment`,
`noun-student-bot = product composition`,
`omni = product`,
`direct-bank-app = financial product`,
`open-ballot = civic product/simulator`,
`nigerian-cultural-atlas = knowledge/Atlas product`,
`bklit-ui / chatbot / eve* = presentation/interaction/agent surfaces`,
`openclaw / crewAI / Botpress / PraisonAI / universal-mcp / mcp-remote / agent-skills / workflow / ai / etc. = provider/reference implementations unless separately canonicalized`.

- [ ] **Step 2: Record the BUNK boundary explicitly.**

State that BUNK code currently resident inside the OMNII repository is a downstream composition and not a constitutional dependency; physical extraction is a separate controlled migration task and is not performed by this registry update.

- [ ] **Step 3: Commit.**

Commit with:

`docs(estate): bind repositories to canonical ecosystem roles`

---

### Task 6: Add ecosystem-wide conformance checks to CI

**Files:**
- Inspect and reuse: existing `.github/workflows/*`
- Modify: the existing canonical control-plane/conformance workflow rather than adding a competing workflow.
- Add tests/scripts only if the current workflow has no reusable entry point.

**Interfaces:**
- Consumes: registry files, runtime package tests, architecture boundary documents.
- Produces: machine-verifiable control-plane conformance status on changes.

- [ ] **Step 1: Identify the current control-plane workflow.**

Use the existing canonical workflow from the September 8 hardening work. Do not create a parallel policy pipeline if the existing one can be extended.

- [ ] **Step 2: Add checks for control registry required fields.**

Fail on duplicate canonical IDs, missing lifecycle/version/authority fields, invalid authority precedence, or invalid promotion states.

- [ ] **Step 3: Add checks for repository boundary claims.**

At minimum fail if a product manifest claims constitutional ownership or authority issuance.

- [ ] **Step 4: Keep third-party actions pinned according to the existing control-plane standard.**

- [ ] **Step 5: Commit.**

Commit with:

`ci(control): enforce ecosystem conformance registry`

---

### Task 7: Verify the implementation through repository CI

**Files:**
- No source changes expected unless verification exposes a defect.

**Interfaces:**
- Consumes: all prior task commits.
- Produces: current CI evidence attached to the resulting PR/commit.

- [ ] **Step 1: Open/update the integration pull request.**

Target `main` from `ecosystem-runtime-integration-2026-09-14`.

- [ ] **Step 2: Wait for GitHub Actions to produce current workflow evidence when the platform supports automatic execution.**

- [ ] **Step 3: Inspect the workflow jobs and failures.**

- [ ] **Step 4: Fix only failures attributable to this work, using the TDD/debugging workflow.**

- [ ] **Step 5: Do not call the work production-ready while current CI/runtime/deployment evidence remains unavailable.**

- [ ] **Step 6: Record any remaining environment-only blockers in the maturity document and PR summary.**

---

### Task 8: Continue domain composition closure

**Files:**
- Update the canonical integration/maturity documentation and the relevant product manifests only as evidence warrants.

**Interfaces:**
- Consumes: universal capability registry and repository bindings.
- Produces: product-level composition maps for NAIRE, NGIN, RITES, HAPI World, NOUN Student Bot, banking, civic and cultural surfaces.

- [ ] **Step 1: For each active product, map required universal capabilities before proposing new primitives.**
- [ ] **Step 2: Map authority and human-approval requirements for every consequential capability.**
- [ ] **Step 3: Map evidence, outcome and feedback paths.**
- [ ] **Step 4: Record genuine gaps as bounded domain capabilities rather than universal primitives.**
- [ ] **Step 5: Commit each coherent domain closure separately.**

---

## Verification checklist

After the implementation batches:

- [ ] No new constitutional kernel exists.
- [ ] No competing authority runtime exists.
- [ ] No second universal capability registry exists.
- [ ] ABBA cannot issue authority.
- [ ] Mission readiness cannot authorize execution.
- [ ] Revoked/suspended/expired authority cannot execute consequential actions.
- [ ] Replay is idempotent.
- [ ] Reconciliation discrepancies remain visible.
- [ ] External failures are not represented as internal success without evidence.
- [ ] Repository estate classifications match current evidence.
- [ ] Current CI status is captured.
- [ ] Deployment status is captured where applicable.
- [ ] Human-only blockers are explicitly recorded rather than inferred around.
