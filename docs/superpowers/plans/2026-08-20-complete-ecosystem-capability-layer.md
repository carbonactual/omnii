# Complete Ecosystem Capability Layer Implementation Plan

> **For agentic workers:** Extend the canonical OMNII ecosystem rather than creating product-specific silos.

**Goal:** Make reusable capabilities, completeness, workflows, artifacts, standards, evidence and Pulse available as shared ecosystem primitives so any new idea can be composed and returned as a complete governed outcome.

**Architecture:** Add one ecosystem capability runtime above the existing persistence substrate. It registers reusable capabilities and requirements, composes workflows, governs artifacts and standards, computes completeness gaps, and records/reconciles Pulse.

**Tech Stack:** TypeScript, Node test runner, existing OMNII runtime persistence abstractions.

**Spec:** `docs/architecture/OMNII_ECOSYSTEM_CAPABILITY_COMPLETENESS.md`

## Global Constraints

- Products remain reusable ingredients; do not create parallel product-specific workflow engines.
- Missing requirements remain explicit; never infer completion from artifact generation alone.
- Standards are versioned requirements/assessment objects; certification is evidence-backed and distinct from naming a standard.
- Value and money remain separate concepts.
- New capabilities and artifact types remain registrable without changing foundational grammar.

### Task 1: Capability Shelf and Workflow Composition

**Files:**
- Create: `packages/omnii-runtime/src/ecosystem-capability-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/tests/ecosystem-capability-runtime.test.ts`

- [x] Add reusable capability definitions and the canonical starter shelf.
- [x] Add workflow recipe registration and dynamic composition from registered capabilities.
- [x] Validate that workflow recipes only reference registered capabilities.
- [x] Export the runtime from the package entrypoint.

### Task 2: Completeness, Artifacts and Standards

**Files:**
- Modify: `packages/omnii-runtime/src/ecosystem-capability-runtime.ts`
- Test: `packages/omnii-runtime/tests/ecosystem-capability-runtime.test.ts`
- Create: `docs/architecture/OMNII_ECOSYSTEM_CAPABILITY_COMPLETENESS.md`

- [x] Register requirements with required capabilities, artifacts, evidence and standards.
- [x] Compute completeness score and explicit missing-component lists.
- [x] Govern recognized artifact classes with version, status and evidence references.
- [x] Represent standards separately from certification outcomes.

### Task 3: Pulse and Reconciliation

**Files:**
- Modify: `packages/omnii-runtime/src/ecosystem-capability-runtime.ts`
- Test: `packages/omnii-runtime/tests/ecosystem-capability-runtime.test.ts`

- [x] Record value dimensions and money independently.
- [x] Reconcile Pulse totals by subject.
- [x] Keep Pulse on the existing ledger/persistence substrate.

### Verification

- [ ] `npm run typecheck`
- [ ] `npm run test:runtime`
- [ ] `npx tsc -p packages/omnii-runtime/tsconfig.json`
- [ ] Production build status reported separately if the repository root remains a documentation/runtime repository without a Next.js app directory.
