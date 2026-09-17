# Installable Products and Purpose-Directed Funding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make actual ecosystem products app-like/installable and make Open Bank purpose-direct financial capacity for creator production, subscriptions, and similar governed activities while preserving existing OMNII semantics.

**Architecture:** Add cross-cutting conformance to OMNII rather than a new constitutional primitive. Product surfaces use standard web/PWA mechanisms as replaceable adapters. Open Bank composes existing identity, authority, intent, capability, policy, state, event, evidence, settlement, liability, and lifecycle semantics for bounded funding and recurring obligations.

**Tech Stack:** Markdown architecture contracts, JSON conformance schema, Node.js validation, GitHub Actions CI, existing Open Bank TypeScript/runtime stack, standard PWA/Web APIs as adapters.

**Spec:** `docs/superpowers/specs/2026-09-17-installable-products-and-purpose-directed-funding-design.md`

## Global Constraints

- Contracts/constitution/source-of-truth infrastructure are not required to be installable apps.
- Products use one canonical product body across web, mobile, desktop, installed mode, and future wrappers.
- PWA/Web APIs, browser permissions, service workers, WebAuthn, OAuth, payment rails, and providers remain adapters.
- Identity is not Authority; Authorization is not Approval; Approval is not Execution.
- Balance is not Capacity; Credit is not Cash; Allocation is not Settlement.
- Recurring authority is bounded by amount, frequency, scope, merchant/service, time, and policy.
- Consequential financial execution remains jurisdiction-gated and provider-backed.
- Every consequential operation leaves replayable evidence and preserves residual/recovery state.

---

### Task 1: Canonical product-surface contract

**Files:**
- Create: `docs/canonical/OMNII_INSTALLABLE_PRODUCT_SURFACE_LAW.md`
- Create: `schemas/omnii-product-surface.schema.json`
- Create: `docs/architecture/OMNII_PRODUCT_SURFACE_CONFORMANCE_MATRIX.md`

- [ ] Define product/contract boundary and required product lifecycle.
- [ ] Define canonical manifest fields without turning the manifest into a constitutional primitive.
- [ ] Define responsive, installability, deep-link, update, continuity, permission, offline, exit, and accessibility requirements.
- [ ] Define conformance levels for documentation-only, installable web product, and production product.

### Task 2: Product-surface validation

**Files:**
- Create: `scripts/validate-product-surface.mjs`
- Create: `tests/product-surface.invariants.test.mjs`

- [ ] Validate the product-surface schema and required law vocabulary.
- [ ] Reject product manifests that omit identity, canonical URL, version, launch target, or lifecycle fields.
- [ ] Reject claims of installability without the required web-app metadata where the product declares web installation.
- [ ] Verify the validator preserves extension/provider fields.
- [ ] Add validator invocation to canonical architecture CI.

### Task 3: Open Bank purpose-directed funding

**Files:**
- Create: `docs/OPEN_BANK_PURPOSE_DIRECTED_FUNDING.md`
- Create: `docs/OPEN_BANK_PRODUCT_SURFACE_CONFORMANCE.md`
- Modify: `README.md`
- Create: `config/open-bank-product.json`

- [ ] Define bounded creator production allocations, direct-to-supplier settlement, controlled reimbursement, escrow, and milestone release.
- [ ] Define recurring subscription authorization with bounded merchant, scope, amount, cadence, duration/review and material-change revalidation.
- [ ] Define credit/capacity vs cash/balance distinctions and prevent authority laundering through ABBA.
- [ ] Declare Open Bank's product identity, canonical launch route, installability requirements, and exit behavior.

### Task 4: I/O and OMNI product inheritance

**Files:**
- Create: `carbonactual/io/docs/PRODUCT_SURFACE_INHERITANCE.md`
- Modify: `carbonactual/io/README.md`
- Create: `carbonactual/desk/docs/OMNI_PRODUCT_SURFACE_CONFORMANCE.md`

- [ ] State that I/O inherits installable product-surface law while remaining movement/crossing infrastructure.
- [ ] State that OMNI, as an actual economic participation product, inherits app-like product behavior.
- [ ] Preserve Open Bank as the financial execution boundary and I/O as movement/crossing semantics.

### Task 5: Ecosystem rollout pattern

**Files:**
- Create: `docs/architecture/PRODUCT_SURFACE_ROLLOUT.md`

- [ ] Define the conformance checklist applied to every subsequent product repository.
- [ ] Define minimum install/open/deep-link/update/recovery tests for mobile and desktop.
- [ ] Define a shared product-shell pattern so products are not rebuilt as separate native apps.
- [ ] Identify product classes exempt from installability: constitutional contracts, schemas, registries, source-only governance artifacts, and CI/control-plane repositories.

## Verification

- [ ] Run the new OMNII validator and invariants tests in CI.
- [ ] Validate Open Bank product manifest against the shared schema.
- [ ] Confirm no new canonical money primitive or competing constitutional object is introduced.
- [ ] Confirm README boundaries remain consistent across Open Bank and I/O.
- [ ] Confirm all changes are additive and do not delete/archive/merge unrelated repositories.
