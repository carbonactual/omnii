# OMNII Open-World Constitutional Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden OMNII so arbitrary present/future scenarios are representable through reality/representation boundaries, epistemic state, typed causality, multi-time state transitions, scenario branching, quality/completeness, no-silent-loss reconciliation, privacy/authority and ontology evolution.

**Architecture:** Add small constitutional runtimes for knowledge, causality, scenarios, quality and continuity semantics, backed by normalized Supabase tables. Preserve existing capability, execution, workflow, relationship and audit runtimes; the new layer composes with them instead of replacing them.

**Tech Stack:** TypeScript, existing `packages/omnii-runtime`, PostgreSQL/Supabase migrations, existing runtime test conventions.

**Spec:** `docs/architecture/OMNII_OPEN_WORLD_CONSTITUTIONAL_HARDENING.md`

## Global Constraints

- Reality must remain distinct from its digital representation.
- Capability never implies authority.
- Unknown/unclassified objects remain representable without forced classification.
- No-silent-loss is the target; do not claim impossible prevention of physical loss.
- Historical records are append-preserving and schema/version aware.
- Plans, simulations, decisions, executions and outcomes remain distinct.

---

### Task 1: Epistemic and time model

**Files:**
- Create: `packages/omnii-runtime/src/epistemic-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/epistemic-runtime.test.ts`

**Interfaces:**
- Consumes: canonical object/relationship types and JSON objects.
- Produces: `KnowledgeAssertion`, `KnowledgeAssertionInput`, `createKnowledgeAssertion`, `isKnowledgeAssertionCurrent`.

- [ ] **Step 1: Write the failing test** covering observation vs claim vs inference, confidence, provenance and distinct occurrence/observed/recorded/effective times.
- [ ] **Step 2: Run the focused test and verify failure.**
- [ ] **Step 3: Implement immutable assertion creation and currentness/supersession helpers.**
- [ ] **Step 4: Run the focused test and verify pass.**
- [ ] **Step 5: Commit:** `feat: add epistemic and multi-time runtime`

### Task 2: Typed causality and scenario graph

**Files:**
- Create: `packages/omnii-runtime/src/causality-runtime.ts`
- Create: `packages/omnii-runtime/src/scenario-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/causality-scenario-runtime.test.ts`

**Interfaces:**
- Consumes: events, assertions and relationship IDs.
- Produces: `CausalRelation`, `ScenarioNode`, `ScenarioEdge`, `createCausalRelation`, `createScenarioBranch`, `validateScenarioPath`.

- [ ] **Step 1: Write failing tests for typed causal relations, branches, merges, hypothetical/simulated paths and counterfactual markers.**
- [ ] **Step 2: Run the focused test and verify failure.**
- [ ] **Step 3: Implement typed causality and scenario graph validation without assuming causation from sequence.**
- [ ] **Step 4: Run the focused test and verify pass.**
- [ ] **Step 5: Commit:** `feat: add typed causality and open-world scenario graph`

### Task 3: Quality, completeness and no-silent-loss contracts

**Files:**
- Create: `packages/omnii-runtime/src/quality-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/src/quality-runtime.test.ts`

**Interfaces:**
- Consumes: completeness requirements, evidence references, outcomes and reconciliation records.
- Produces: `QualityAssessment`, `CompletenessGap`, `ReconciliationRecord`, `assessCompleteness`, `recordReconciliation`.

- [ ] **Step 1: Write failing tests for multidimensional completeness and no-silent-loss reconciliation.**
- [ ] **Step 2: Run the focused test and verify failure.**
- [ ] **Step 3: Implement dimensioned quality/completeness and explicit expected-vs-actual reconciliation.**
- [ ] **Step 4: Run the focused test and verify pass.**
- [ ] **Step 5: Commit:** `feat: add quality completeness and reconciliation runtime`

### Task 4: Supabase persistence and constitutional seed vocabulary

**Files:**
- Create: `supabase/migrations/20260820_open_world_constitutional_hardening.sql`
- Create: `docs/schema/OMNII_OPEN_WORLD_SCHEMA.md`

**Interfaces:**
- Consumes: runtime contracts from Tasks 1-3.
- Produces: tables for assertions, causal relations, scenario nodes/edges, quality assessments, completeness gaps and reconciliation records; indexes and constraints for provenance, status and timestamps.

- [ ] **Step 1: Write the migration with additive tables and check constraints for typed states.
- [ ] **Step 2: Apply the migration to the Supabase project.
- [ ] **Step 3: Query table existence, indexes and key constraints.
- [ ] **Step 4: Seed only vocabulary/contract metadata; never seed invented real-world facts.
- [ ] **Step 5: Commit:** `feat: add open-world constitutional persistence`

### Task 5: Constitutional registry and documentation alignment

**Files:**
- Modify: `docs/constitution/KERNEL_INDEX.md`
- Modify: `docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md`
- Modify: `docs/schema/OMNII_SCHEMA_REGISTRY.md`

**Interfaces:**
- Consumes: canonical hardening spec and implemented runtime contracts.
- Produces: registry entries and boundaries that make the new primitives discoverable without making products constitutional.

- [ ] **Step 1: Add epistemic, causality, scenario, quality and reconciliation objects to the kernel index.
- [ ] **Step 2: Add explicit reality/representation and plan/execution boundaries to canonical architecture.
- [ ] **Step 3: Register schema mappings and versioning semantics.
- [ ] **Step 4: Review for contradiction with existing capability/execution contracts.
- [ ] **Step 5: Commit:** `docs: register open-world constitutional hardening`

### Task 6: Final integration verification

**Files:**
- Modify only where verification exposes a concrete defect.

- [ ] **Step 1: Run the existing runtime test suite.
- [ ] **Step 2: Run typecheck/build commands defined by the repository.
- [ ] **Step 3: Run Supabase security/performance advisors after DDL changes.
- [ ] **Step 4: Verify a synthetic end-to-end scenario: unknown object → observation → hypothesis → branch → action → outcome → reconciliation → completeness gaps.
- [ ] **Step 5: Commit any concrete fixes separately.
