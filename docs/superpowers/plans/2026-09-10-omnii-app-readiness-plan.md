# OMNII App Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the approved canonical-runtime reconciliation so Carbon Actual can begin building products/apps on a verified shared substrate without changing ecosystem-native laws.

**Architecture:** Keep the frozen constitutional architecture authoritative and strengthen only implementation contracts beneath it. The release gate verifies authority, object/runtime invariants, product/repository boundaries, executable common gates, package integrity, and the web application build path. BUNK remains explicitly separation-required until an independent extraction is actually completed.

**Tech Stack:** Node 22.23.2, npm 10.9.8, Next.js 16.3.0, React 19.2.8, TypeScript 7.0.2, existing OMNII ESM/TypeScript packages, GitHub Actions.

**Spec:** `docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md` and the approved canonical runtime reconciliation documents referenced by that architecture.

## Global Constraints

- Constitutional semantics remain frozen; implementation may evolve within the frozen architecture.
- `Interpretation ≠ Authority`.
- `Match ≠ Authorization`.
- Pulse remains feedback/evidence and is not automatic authority or currency.
- Products remain compositions; provider implementations remain adapters.
- No second universal object graph, authority kernel, ledger kernel, or competing constitutional primitive.
- Mixed repository hosting must be explicit; BUNK extraction is not claimed until independently verified.
- No paid/proprietary service becomes a constitutional dependency.
- Human/SEAL approval remains required where the canonical action contract requires it.

---

### Task 1: Correct and harden canonical runtime verification

**Files:**
- Modify: `scripts/validate-canonical-runtime-v2.mjs`
- Test: `scripts/canonical-runtime-invariants.test.mjs`

**Interfaces:**
- Consumes: canonical freeze/runtime documents, authority registry, runtime manifest, product branch registry, object/product schemas.
- Produces: deterministic `canonical-runtime: PASS (...)` or non-zero failure with actionable invariant names.

- [ ] **Step 1: Replace wording-sensitive invariant matching with canonical vocabulary matching**

Accept the exact frozen statement `Architecture is frozen; implementation may evolve within it.` from the repository's canonical architecture corpus, without requiring the non-canonical word `free`.

- [ ] **Step 2: Add negative assertions**

Ensure the verifier fails when the frozen/runtime corpus loses `Interpretation ≠ Authority`, `Match ≠ Authorization`, or the Pulse feedback/evidence rule.

- [ ] **Step 3: Run the focused verifier test**

Run `node scripts/canonical-runtime-invariants.test.mjs` and expect exit code 0.

- [ ] **Step 4: Commit the verifier correction**

```bash
git add scripts/validate-canonical-runtime-v2.mjs scripts/canonical-runtime-invariants.test.mjs
git commit -m "fix: align canonical runtime verifier with frozen vocabulary"
```

### Task 2: Add a single app-readiness conformance gate

**Files:**
- Create: `scripts/validate-app-readiness.mjs`
- Create: `scripts/app-readiness.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: root package manifest, lockfile, web package manifest, canonical runtime validators, product branch registry and required CI workflows.
- Produces: `app-readiness: PASS` only when the shared substrate and app entrypoint prerequisites are present and bounded.

- [ ] **Step 1: Write the failing tests**

Cover these required conditions: root manifest exists; lockfile exists; root `conformance` and `test:canonical` scripts exist; web package exists; web build script exists; canonical runtime and product-branch validators exist; both canonical workflows exist; BUNK is still explicitly `separation-required`.

- [ ] **Step 2: Run the test before implementation**

Run `node scripts/app-readiness.test.mjs` and expect failure because the new validator is absent.

- [ ] **Step 3: Implement the validator**

The validator reads the repository files from `process.cwd()`, checks exact required paths/scripts, imports/parses the product registry, rejects duplicate product IDs, requires the critical product branches, requires BUNK to remain `mixed-legacy-host` + `separation-required`, and reports a stable PASS line.

- [ ] **Step 4: Wire root scripts**

Add `validate-app-readiness` to `conformance` and add the focused unit test to the root `test` and `test:canonical` paths.

- [ ] **Step 5: Run focused tests**

Run `node scripts/app-readiness.test.mjs` and `node scripts/validate-app-readiness.mjs`; both must pass.

- [ ] **Step 6: Commit**

```bash
git add scripts/validate-app-readiness.mjs scripts/app-readiness.test.mjs package.json
git commit -m "feat: add canonical app readiness gate"
```

### Task 3: Add hosted full-stack conformance

**Files:**
- Create: `.github/workflows/app-readiness.yml`

**Interfaces:**
- Consumes: npm lockfile, root tests/conformance, Next web build.
- Produces: a protected CI signal that the canonical substrate and app shell install, test, typecheck, conformance-check, and build together.

- [ ] **Step 1: Pin all third-party GitHub Actions by full commit SHA**

Use the repository's already-approved checkout SHA and setup-node SHA; do not use floating action tags.

- [ ] **Step 2: Install dependencies deterministically**

Run `npm ci` from the repository root.

- [ ] **Step 3: Run canonical conformance**

Run `npm run conformance`.

- [ ] **Step 4: Run test suite**

Run `npm test`.

- [ ] **Step 5: Run typecheck and web build**

Run `npm run typecheck` followed by `npm run build`.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/app-readiness.yml
git commit -m "ci: verify app readiness end to end"
```

### Task 4: Re-run hosted verification and update PR readiness record

**Files:**
- Modify: `docs/architecture/CANONICAL_RUNTIME_RECONCILIATION_STATUS.md`
- Modify: PR #42 metadata

**Interfaces:**
- Consumes: completed GitHub Actions results for the current branch HEAD.
- Produces: an evidence-backed readiness status; no merge claim is made until all required checks are green.

- [ ] **Step 1: Trigger CI through the new branch commit**

Use the push created by the previous commit; do not assert pass from an earlier SHA.

- [ ] **Step 2: Inspect all relevant workflow runs**

Require success for canonical architecture conformance, canonical runtime conformance, and app readiness on the same branch HEAD.

- [ ] **Step 3: Run any failing step-specific correction**

Correct only the failing implementation contract; preserve constitutional boundaries.

- [ ] **Step 4: Update reconciliation status with exact verified HEAD and check results**

Record branch, commit, checks, and remaining non-blocking work. Explicitly state that BUNK extraction remains a separate future repository-boundary action until verified.

- [ ] **Step 5: Update PR #42 body**

Replace the temporary `first verified reconciliation slice` language with the actual current verified scope while keeping the PR draft and unmerged state intact.

- [ ] **Step 6: Commit the evidence update**

```bash
git add docs/architecture/CANONICAL_RUNTIME_RECONCILIATION_STATUS.md
git commit -m "docs: record verified app readiness status"
```

---

## Completion Criteria

The approved reconciliation is ready for app construction when:

1. Canonical authority/runtime validators pass.
2. Product branch boundaries pass, including explicit BUNK separation status.
3. Root tests pass.
4. Typecheck passes.
5. Next web build passes.
6. Hosted checks pass on the exact current branch HEAD.
7. No new constitutional primitive or duplicate universal kernel has been introduced.
8. PR #42 remains unmerged until the user chooses the integration point.
