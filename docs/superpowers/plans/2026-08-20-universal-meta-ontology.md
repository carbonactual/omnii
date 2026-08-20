# Universal Meta-Ontology Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make OMNII permanently open to new entity classes, relationships, resources, capabilities, events, value dimensions, namespaces, technologies, phenomena, species and economic instruments without requiring a constitutional rewrite.

**Architecture:** Add a constitutional meta-layer above the current kernels. The meta-layer defines how new types are declared, constrained, versioned, related, tested, adopted, deprecated and mapped while preserving historical records. Unknown things remain first-class provisional objects until evidence and governance justify classification.

**Tech Stack:** Markdown constitutional contracts, TypeScript runtime contracts/tests, PostgreSQL/Supabase persistence, Git history for versioned implementation.

**Spec:** `docs/constitution/UNIVERSAL_META_ONTOLOGY.md`

## Global Constraints

- Products compose kernels rather than redefining them.
- Unknown is a valid state of knowledge.
- A record is not the reality it represents.
- Capability never implies authority.
- Existing value is preserved through reuse, migration, compatibility or provenance.
- Ontology evolution must not rewrite historical reality.
- New types must be introduced through governed declarations, not ad-hoc product tables.

---

### Task 1: Constitutional meta-ontology contract

**Files:**
- Create: `docs/constitution/UNIVERSAL_META_ONTOLOGY.md`

- [ ] Define universal type declaration, instance, relation, constraint, capability, event and value-dimension extension rules.
- [ ] Define provisional/unknown objects and promotion to canonical status.
- [ ] Define schema/semantic versioning, aliases, mappings, supersession and deprecation.
- [ ] Define evidence, provenance, confidence and governance requirements for promotion.
- [ ] Define anti-patterns: forced classification, silent mutation, ontology leakage into products, and treating implementation standards as constitutional truth.

### Task 2: Kernel index integration

**Files:**
- Modify: `docs/constitution/KERNEL_INDEX.md`

- [ ] Add META-ONTOLOGY as the constitutional extension layer.
- [ ] State that it governs extension of every existing kernel without becoming a replacement kernel.

### Task 3: Runtime contract

**Files:**
- Create: `packages/omnii-runtime/src/meta-ontology-runtime.ts`
- Create: `packages/omnii-runtime/src/meta-ontology-runtime.test.ts`

- [ ] Define typed declarations for new object, relation, resource, capability, event and value-dimension types.
- [ ] Define provisional registration and canonical promotion.
- [ ] Define compatibility/mapping and supersession behavior.
- [ ] Test unknown registration, promotion, versioning, deprecation and historical preservation.

### Task 4: Persistence

**Files:**
- Create: `supabase/migrations/2026082022_meta_ontology.sql`

- [ ] Persist ontology declarations, versions, mappings, constraints, evidence references and lifecycle events.
- [ ] Enable RLS and authenticated access policies consistent with existing OMNII conventions.
- [ ] Add uniqueness/idempotency protections for type identifiers and versions.

### Task 5: Cross-kernel scenarios

**Files:**
- Create: `docs/constitution/META_ONTOLOGY_SCENARIOS.md`

- [ ] Cover new species, new intelligence, new physical phenomenon, new economic instrument, new namespace, new capability, new resource and new relationship.
- [ ] Cover conflicting classifications, failed promotion, ontology fork, merge, rollback, deprecation and external-standard mapping.
- [ ] Cover unknown-to-known and known-to-unknown transitions without rewriting historical records.

### Task 6: Verification

- [ ] Run focused runtime tests.
- [ ] Apply migration to Supabase and verify schema/RLS.
- [ ] Run a synthetic end-to-end scenario: unknown entity → provisional type → evidence → canonical promotion → capability → value dimension → event → supersession.
- [ ] Commit each independently testable unit and final integration commit.
