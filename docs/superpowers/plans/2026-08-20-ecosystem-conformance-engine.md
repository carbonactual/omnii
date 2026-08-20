# Ecosystem Conformance Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every OMNII action a composable, conforming, idempotent, evidence-producing and recoverable ecosystem workflow while allowing existing products to act as reusable ingredients.

**Architecture:** Add one shared runtime over the existing OMNII persistence primitives. It registers reusable ecosystem ingredients, composes them into capabilities, conforms state-changing actions against the composition, executes idempotently, records exceptions, and supports explicit recovery/reconciliation. Existing Charter, Pilgrim and NAB remain domain ingredients rather than parallel foundations.

**Tech Stack:** TypeScript, Node.js test runner, existing `PersistencePort` and `MemoryPersistenceAdapter`.

**Spec:** `docs/architecture/OMNII_ECOSYSTEM_COMPOSITION.md`

## Global Constraints

- Existing constitutional grammar remains canonical.
- Existing products remain composable ingredients and must not create parallel foundational primitives.
- Unknown and exceptional states remain explicit.
- State-changing actions require identity, authority, capability and idempotency.
- Failed execution must remain recoverable and auditable.

---

### Task 1: Register and compose ecosystem ingredients

**Files:**
- Create: `packages/omnii-runtime/src/ecosystem-conformance-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/tests/ecosystem-conformance-runtime.test.ts`

**Interfaces:**
- Consumes: `PersistencePort`, existing canonical product/runtime concepts.
- Produces: `EcosystemConformanceRuntime.registerIngredient()`, `.compose()`, `.conform()`, `.execute()`, `.recover()`, `.reconcile()`.

- [x] Register ingredients with typed kind and capability metadata.
- [x] Compose multiple products/capabilities into one explicit composition with provenance.
- [x] Reject unknown ingredients rather than inventing them.

### Task 2: Conformance and no-loss execution

**Files:**
- Modify: `packages/omnii-runtime/src/ecosystem-conformance-runtime.ts`
- Test: `packages/omnii-runtime/tests/ecosystem-conformance-runtime.test.ts`

- [x] Require actor, authority, capability and idempotency key.
- [x] Reject capabilities not supplied by the composition.
- [x] Reject ingredients not included in the composition.
- [x] Return the same action for duplicate idempotency keys.
- [x] Persist execution before running work.
- [x] Preserve failed execution as an explicit recoverable exception.
- [x] Support explicit recovery and final reconciliation with evidence.

### Task 3: Constitutional documentation and exports

**Files:**
- Create/modify: `docs/architecture/OMNII_ECOSYSTEM_COMPOSITION.md`
- Create: `docs/superpowers/plans/2026-08-20-ecosystem-conformance-engine.md`
- Modify: `packages/omnii-runtime/src/index.ts`

- [x] Lock the shelf/composition model.
- [x] Lock the conformance/no-loss/automation/continuity rules.
- [x] Export the runtime as part of the canonical runtime package.
