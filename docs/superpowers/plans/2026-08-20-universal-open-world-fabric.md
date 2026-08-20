# Universal Open-World Fabric Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make OMNII capable of introducing, resolving, composing, governing, valuing and evolving previously unknown entities, relationships, capabilities, resources, phenomena and economic primitives without changing the constitutional kernel.

**Architecture:** Build five independently testable subsystems over the existing constitutional/runtime contracts: open-world meta-ontology; universal naming and resolution; participant/species/intelligence representation; evidence/epistemic provenance; and extensible economic/value composition. Each subsystem emits canonical events and references rather than owning global authority. The aggregate layer connects them through identity, causality, scenario, governance, execution, continuity and Pulse.

**Tech Stack:** TypeScript, existing OMNII runtime contracts, Vitest, PostgreSQL/Supabase, GitHub canonical repository.

**Spec:** `docs/constitution/UNIVERSAL_META_ONTOLOGY.md`, `docs/constitution/META_ONTOLOGY_SCENARIOS.md`, `docs/constitution/UNIVERSAL_NAMING_RESOLUTION.md`, `docs/constitution/MULTI_SPECIES_OPEN_WORLD.md`, `docs/constitution/ECONOMIC_COMPOSITION_SCOPE.md`.

## Global Constraints

- Unknown things MUST be representable without forced classification.
- Identity, name, authority, ownership, custody, representation and tokenization MUST remain distinct.
- Products are compositions/capabilities, not constitutional authorities.
- Evidence and claims MUST remain distinguishable from truth.
- New ontology extensions MUST preserve historical identity and support supersession.
- Multi-species and non-biological participants MUST use the same participant substrate without assuming human defaults.
- Value MUST remain multidimensional and extensible.
- Blockchain MUST remain an optional infrastructure/settlement mechanism.
- Economic issuance MUST NOT imply value creation.
- No silent loss: consequential state changes require provenance and reconciliation.

---

### Task 1: Harden the meta-ontology registry

**Files:**
- Modify: `packages/omnii-runtime/src/meta-ontology-runtime.ts`
- Modify: `packages/omnii-runtime/src/meta-ontology-runtime.test.ts`
- Create: `packages/omnii-runtime/src/meta-ontology-types.ts` if shared types need isolation

**Interfaces:**
- Produces stable extension registration, lifecycle transition, schema evolution, conflict/fork/merge and supersession primitives.

- [ ] Write failing tests for duplicate identity, illegal lifecycle transitions, fork/merge and supersession.
- [ ] Run the focused Vitest suite and confirm failures.
- [ ] Implement the smallest lifecycle/state-machine contract.
- [ ] Run focused tests and confirm pass.
- [ ] Commit `feat(meta-ontology): harden extension lifecycle`.

### Task 2: Add universal relationship and emergence primitives

**Files:**
- Create: `packages/omnii-runtime/src/open-world-relationships.ts`
- Create: `packages/omnii-runtime/src/open-world-relationships.test.ts`

**Interfaces:**
- `RelationshipType`, `RelationshipInstance`, `EmergenceRecord`, temporal validity, confidence, provenance and reversibility metadata.

- [ ] Test unknown relationship creation, inversion, temporal validity and emergence.
- [ ] Implement relationship primitives without a closed taxonomy.
- [ ] Test contradiction and supersession handling.
- [ ] Commit `feat(open-world): add emergent relationship primitives`.

### Task 3: Implement universal naming/resolution adapters

**Files:**
- Modify/create: `packages/omnii-runtime/src/naming-resolution-runtime.ts`
- Create: `packages/omnii-runtime/src/naming-resolution-runtime.test.ts`

**Interfaces:**
- Namespace registration, name binding, resolution result, reverse resolution, resolver provenance, conflict state, expiry and revocation.
- Adapters for ENS, HNS and DID-like identifiers remain providers; OMNII identity remains independent.

- [ ] Test multiple names resolving to one identity and one name resolving ambiguously.
- [ ] Test stale, revoked and conflicting resolution.
- [ ] Implement provider-neutral resolution contract.
- [ ] Add provider capability metadata without hard-coding a single namespace.
- [ ] Commit `feat(identity): harden universal naming resolution`.

### Task 4: Implement open-world participant/species/intelligence model

**Files:**
- Modify/create: `packages/omnii-runtime/src/multi-species-runtime.ts`
- Create: `packages/omnii-runtime/src/multi-species-runtime.test.ts`

**Interfaces:**
- Participant class, embodiment, cognition/sensorium, communication modalities, habitat, representation/delegation, rights/obligations references and unknown status.

- [ ] Test human, animal, machine, AI, collective and unknown participant registration.
- [ ] Test species/classification uncertainty and reclassification without identity replacement.
- [ ] Test representative/delegate relationships and emergency authority boundaries.
- [ ] Implement species-neutral participant primitives.
- [ ] Commit `feat(participants): add open-world multi-species model`.

### Task 5: Add evidence, claims and epistemic provenance

**Files:**
- Create: `packages/omnii-runtime/src/epistemic-runtime.ts`
- Create: `packages/omnii-runtime/src/epistemic-runtime.test.ts`

**Interfaces:**
- Observation, measurement, source, evidence, claim, inference, confidence, verification, dispute and supersession.

- [ ] Test claim/evidence separation.
- [ ] Test conflicting evidence and confidence changes.
- [ ] Test unknown-to-provisional-to-verified progression.
- [ ] Implement provenance graph.
- [ ] Commit `feat(epistemic): add evidence and claim lifecycle`.

### Task 6: Make value dimensions extensible

**Files:**
- Modify/create: `packages/omnii-runtime/src/economic-composition-runtime.ts`
- Create: `packages/omnii-runtime/src/economic-composition-runtime.test.ts`

**Interfaces:**
- Resource dimension registry, given vector, Pulse vector, valuation method, fraction, decimal resolution, ecosystem aggregation, Floor, Average and Safe Haven.

- [ ] Test a novel value dimension without runtime code changes.
- [ ] Test independent dimension calculations and aggregation.
- [ ] Test inverted asset/liability classification and balanced state.
- [ ] Test ecosystem vector and benchmark derivation.
- [ ] Commit `feat(economics): make value vectors open-world`.

### Task 7: Persist the open-world fabric in Supabase

**Files:**
- Create: `supabase/migrations/<timestamp>_open_world_fabric.sql`
- Create/update: corresponding database schema documentation.

**Interfaces:**
- Tables for ontology extensions, extension transitions, relationships, emergence, namespaces, resolutions, participants, epistemic claims/evidence and extensible value dimensions.

- [ ] Write migration with foreign keys/indexes/check constraints.
- [ ] Add RLS and explicit authenticated/service policies.
- [ ] Add idempotency constraints for externally supplied events.
- [ ] Apply migration to canonical Supabase project.
- [ ] Inspect tables, constraints, indexes and policies.
- [ ] Commit `feat(db): persist universal open-world fabric`.

### Task 8: Add synthetic end-to-end scenario

**Files:**
- Create: `packages/omnii-runtime/src/open-world-integration.test.ts`
- Create/update: `docs/constitution/META_ONTOLOGY_SCENARIOS.md`

**Scenario:**

`unknown entity → observation → provisional classification → evidence → identity/name resolution → new capability → new resource/value dimension → fractional/decimal composition → execution → Pulse → ecosystem benchmark → dispute → supersession → continuity record`.

- [ ] Write the full failing integration scenario.
- [ ] Run and inspect each failure boundary.
- [ ] Wire the subsystems together using references/events, not hidden coupling.
- [ ] Run the integration test.
- [ ] Commit `test(open-world): prove unknown-to-economic lifecycle`.

### Task 9: Harden constitutional documentation and registry links

**Files:**
- Modify: `docs/constitution/UNIVERSAL_META_ONTOLOGY.md`
- Modify: `docs/constitution/ECONOMIC_COMPOSITION.md`
- Modify: `docs/constitution/UNIVERSAL_NAMING_RESOLUTION.md`
- Modify: `docs/constitution/MULTI_SPECIES_OPEN_WORLD.md`
- Modify: canonical index/registry files after fetching current SHAs.

- [ ] Cross-check boundaries and terminology.
- [ ] Add explicit external-standard adapter guidance for ENS/HNS/DID/DLT/token standards.
- [ ] Add multi-species and unknown-world scenario matrix.
- [ ] Update canonical registry only with current file SHAs.
- [ ] Commit `docs(constitution): integrate open-world fabric`.

### Task 10: Verification and hardening

**Files:**
- Existing focused test files plus integration tests.

- [ ] Run typecheck/build.
- [ ] Run focused unit tests.
- [ ] Run full Vitest suite.
- [ ] Inspect Supabase security advisories and RLS coverage for new tables.
- [ ] Run repository diff and search for forbidden conflations (`token = value`, `name = identity`, `blockchain = truth`, etc.).
- [ ] Record actual results; do not claim unexecuted checks.
- [ ] Commit final hardening only after evidence is available.

## Definition of Done

The fabric is complete when an entirely novel participant or phenomenon can enter OMNII as unknown, acquire evidence and provisional structure, receive names from multiple namespaces, participate in relationships and scenarios, introduce a new capability/resource/value dimension, execute a fractional/decimal economic composition, generate Pulse, affect ecosystem benchmarks, become disputed or superseded, and remain historically reconstructable—without modifying the constitutional core or silently granting authority.
