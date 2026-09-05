# Common Layer — Canonical Fabric Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the OMNII Common Layer as a reusable semantic fabric over the existing constitutional kernels and runtime, with canonical discovery/matching and no duplicate authority, graph, or ledger systems.

**Architecture:** Add a registry that names and maps common primitives to existing canonical backing contracts, then add a universal intent-to-capability matching record with context, availability, provenance and authority references. Keep authorization and execution behind the existing ABBA/authority gates.

**Tech Stack:** PostgreSQL/Supabase migrations, existing OMNII canonical tables, GitHub-managed SQL/documentation.

**Spec:** `docs/superpowers/specs/2026-09-05-common-layer-canonical-fabric-design.md`

## Global Constraints

- Do not create a second constitutional kernel, graph, authority system, or ledger.
- Preserve `Interpretation ≠ Authority` and `Match ≠ Authorization`.
- Use existing canonical backing tables whenever semantics already exist.
- Consequential actions must remain behind identity, authority, policy, capability and execution gates.
- Unknown/alien subjects remain provisional and cannot gain inferred authority or trust.
- External protocols remain adapters, not constitutional dependencies.

### Task 1: Common Primitive Registry

**Files:**
- Create: `supabase/migrations/2026090508xxxx_common_layer_registry_20260905.sql`
- Test: live SQL catalog checks

**Interfaces:**
- Produces `public.omnii_common_primitives` with stable keys, classification, canonical backing contracts, lifecycle and descriptions.

- [ ] Create table, uniqueness constraints and service-role write policy.
- [ ] Seed all canonical common primitives from the approved design.
- [ ] Verify count, uniqueness and backing-contract coverage.

### Task 2: Intent/Capability Matching Fabric

**Files:**
- Modify: same migration from Task 1
- Test: live SQL insert/constraint checks

**Interfaces:**
- Produces `public.omnii_intent_capability_matches` linking intent, capability, candidate, context, availability, authority lineage, provenance and evidence.

- [ ] Create the match table and indexes.
- [ ] Enforce match status/lifecycle and score constraints.
- [ ] Keep authority optional for discovery/matching but required by downstream execution gates.
- [ ] Verify invalid scores/statuses are rejected.

### Task 3: Architecture Documentation

**Files:**
- Modify: `docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md`
- Create: `docs/architecture/OMNII_COMMON_LAYER.md`

- [ ] Document the Common Layer as fabric, not a new kernel.
- [ ] Document the canonical interaction lifecycle and product composition rule.
- [ ] Document interoperability adapter boundaries.

### Task 4: Verification

**Files:**
- Test: live Supabase SQL checks

- [ ] Confirm registry rows and no duplicates.
- [ ] Confirm RLS/privileges are service-role restricted for sensitive operational records.
- [ ] Confirm the new matching layer does not grant authority.
- [ ] Confirm migration is recorded in Supabase.
- [ ] Commit all repository changes.
