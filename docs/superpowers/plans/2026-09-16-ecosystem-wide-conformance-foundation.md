# Ecosystem-Wide Conformance Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Carbon Actual products and reusable capabilities machine-verifiably composable through one common capability fabric, one interaction/handoff grammar, explicit product manifests, provider adapters, and reusable-by-default maturity semantics.

**Architecture:** Extend existing OMNII common-layer and capability infrastructure rather than creating a parallel registry or orchestration kernel. First reconcile semantic boundaries and repository identities, then publish machine-readable capability/product manifests, then enforce cross-product conformance in CI, while preserving provider replaceability, provenance, authority and product-specific experience.

**Tech Stack:** Existing OMNII Markdown architecture, JSON/YAML manifests, PostgreSQL/Supabase common registry, JavaScript/Node validation scripts, GitHub Actions, existing canonical runtime/conformance tooling.

**Spec:** `docs/superpowers/specs/2026-09-16-ecosystem-wide-common-capability-conformance-design.md`; `docs/canonical/OMNII_REUSABILITY_AND_CAPABILITY_MATURITY_AMENDMENT.md`

## Global Constraints

- Use `public.omnii_common_primitives` as the single authoritative common registry.
- Do not create a second constitution, ontology, identity system, authority system, ledger, registry, or ABBA.
- Everything newly implemented is reusable-by-default; current product placement is a maturity/context state, not permanent non-reusability.
- Preserve historical identifiers and provenance until migration is proven safe.
- Do not rename, merge, archive, delete or retire repositories merely for cleanliness; repository-estate decisions require evidence and explicit governance.
- Products consume capability contracts; providers are replaceable implementations behind adapters.
- External protocols remain transport/adapter mechanisms, not canonical semantics.
- Consequential workflows require authority, evidence/provenance and recoverable state.
- User/entity canonical records must survive product exit or replacement.
- SPOTIST remains universal SEEK; OMNI/DESK boundary remains unresolved until repository reconciliation is complete.

---

### Task 1: Freeze the reusable-by-default semantic amendment

**Files:**
- Existing: `docs/canonical/OMNII_REUSABILITY_AND_CAPABILITY_MATURITY_AMENDMENT.md`
- Verify: `docs/superpowers/specs/2026-09-16-ecosystem-wide-common-capability-conformance-design.md`

**Interfaces:**
- Consumes: Universal Capability Ontology, Common Layer, Universal Capability Registry, Universal Composition Engine.
- Produces: authoritative reusable-by-default interpretation for product/domain capability maturity.

- [ ] **Step 1: Verify amendment content**

Confirm that it defines local-use, reusable-candidate, shared, canonical, experimental and deprecated maturity states and states that first-use product context does not create permanent ownership.

- [ ] **Step 2: Check higher-authority compatibility**

Confirm the amendment does not redefine frozen constitutional concepts and only clarifies capability maturity/composition semantics.

- [ ] **Step 3: Record the amendment in canonical navigation**

Add a reference to the amendment from the relevant OMNII architecture/conformance index if one exists and verify the reference resolves.

- [ ] **Step 4: Commit**

```bash
git add docs/canonical/OMNII_REUSABILITY_AND_CAPABILITY_MATURITY_AMENDMENT.md
# add the selected canonical index reference when implemented
git commit -m "docs: establish reusable-by-default capability maturity"
```

---

### Task 2: Reconcile OMNI, DESK and repository identity

**Files:**
- Create/update: canonical OMNI/DESK reconciliation under `docs/architecture/`
- Inspect: `carbonactual/desk/README.md`, `carbonactual/omni/README.md`
- Inspect: product manifests and capability maps referencing OMNI/DESK

**Interfaces:**
- Consumes: existing OMNI economic-platform definition, existing OMNI operating-surface definition, historical compatibility identifiers.
- Produces: one canonical semantic topology plus explicit repository compatibility mappings.

- [ ] **Step 1: Inventory both repositories**

Record purpose, current runtime responsibilities, capability dependencies, APIs, identifiers, external integrations and user-facing terminology for `carbonactual/desk` and `carbonactual/omni`.

- [ ] **Step 2: Build the overlap matrix**

For every overlapping capability, classify it as shared capability, OMNI economic domain, operating/integration surface, DESK workspace presentation, historical compatibility identifier or unresolved collision.

- [ ] **Step 3: Define one public topology**

Choose an explicit semantic arrangement without deleting either repository. Preserve compatibility identifiers until migration tests prove a rename safe.

- [ ] **Step 4: Add conformance rules**

Make it impossible for new docs/manifests to simultaneously claim two incompatible OMNI meanings.

- [ ] **Step 5: Validate downstream references**

Search ABBA, HAPI World, OMNII and Carbon-Actual product manifests for OMNI/DESK references and classify each reference as current, historical, compatibility or contradiction.

- [ ] **Step 6: Commit**

```bash
git add docs/architecture/
git commit -m "docs: reconcile OMNI and DESK product boundaries"
```

---

### Task 3: Establish machine-readable product and capability manifests

**Files:**
- Create/update canonical manifest schemas under `config/` or existing manifest location.
- Add representative manifests for OMNI, DESK, SPOTIST, ABBA, HAPI, RITES, NGIN, NAIRE and selected current products.
- Update existing Carbon Actual product manifests where already present.

**Interfaces:**
- Consumes: universal capability registry and product blueprint.
- Produces: machine-readable product composition and capability ownership records.

- [ ] **Step 1: Define capability manifest schema**

Require stable ID, version, maturity, owner, family, purpose, parent, inputs, outputs, authority, data classes, events, dependencies, providers/adapters, provenance, health and replacement information.

- [ ] **Step 2: Define product manifest schema**

Require purpose, entities, domain capabilities, consumed capabilities, provided capabilities, workflows, interfaces, providers/adapters, authority/data/evidence/economic/Pulse/continuity models, exit handoff and compatibility identifiers.

- [ ] **Step 3: Map existing capabilities**

Use the existing Universal Capability Registry rather than inventing names where canonical entries exist.

- [ ] **Step 4: Map products**

Create minimal truthful manifests for the selected products without claiming unimplemented capabilities.

- [ ] **Step 5: Validate schema**

Add deterministic validation for required fields, stable IDs, valid maturity states and canonical capability references.

- [ ] **Step 6: Commit**

```bash
git add config/ docs/
git commit -m "feat: add machine-readable product and capability manifests"
```

---

### Task 4: Build ecosystem composition conformance checks

**Files:**
- Create/update canonical validation scripts under `scripts/`.
- Update existing canonical runtime/conformance tests.
- Add test fixtures under existing test locations.

**Interfaces:**
- Consumes: product manifests, capability registry, authority registry, provider/adapter declarations.
- Produces: deterministic conformance failures for semantic duplication, missing ownership, invalid specialization and broken handoffs.

- [ ] **Step 1: Write failing tests for registry references**

Test that every manifest-referenced capability exists and that each capability has valid maturity/owner metadata.

- [ ] **Step 2: Write failing tests for specialization**

Require every specialization to declare its parent contract and prohibit semantic redefinition markers that contradict the parent.

- [ ] **Step 3: Write failing tests for boundary ownership**

Reject manifests claiming constitutional ownership, duplicate identity semantics, duplicate authority systems, duplicate ledgers or duplicate universal registries.

- [ ] **Step 4: Write failing tests for provider adapters**

Require provider-specific capabilities to declare an adapter/capability boundary or an explicit justified exception.

- [ ] **Step 5: Write failing tests for interaction/handoff**

Require cross-product workflows to reference canonical interaction/handoff contracts and retain authority/evidence/provenance paths where consequential.

- [ ] **Step 6: Write failing tests for reusability maturity**

Allow local-use capabilities while ensuring they are declared reusable-by-default and retain a path to promotion without being marked permanently non-reusable.

- [ ] **Step 7: Implement the minimal validators**

Reuse existing canonical runtime scripts where possible; do not create a parallel validation framework.

- [ ] **Step 8: Run the focused conformance suite**

Verify expected failures occur before implementation and expected passes occur after implementation.

- [ ] **Step 9: Commit**

```bash
git add scripts/ tests/ config/
git commit -m "test: enforce ecosystem capability conformance"
```

---

### Task 5: Connect the interaction, handoff and provider fabric

**Files:**
- Extend existing interaction/handoff schemas and manifests.
- Add reusable handoff fixtures.
- Extend provider adapter conformance tests.

**Interfaces:**
- Consumes: `OMNII_ECOSYSTEM_INTERACTION_HANDOFF_PROTOCOL.md`, `OMNII_CAPABILITY_ADAPTER_CONTRACT.md`.
- Produces: portable handoff records that survive product boundaries and provider replacement.

- [ ] **Step 1: Define canonical handoff payload requirements**

Represent sender, receiver, responsibility, context, authority scope, state, evidence, dependencies, obligations, acceptance and next owner.

- [ ] **Step 2: Add transfer states**

Support sent, delivered, acknowledged, accepted, rejected, partially accepted, escalated, completed and expired where applicable.

- [ ] **Step 3: Add replacement-provider fixtures**

Demonstrate two provider implementations satisfying the same capability contract without changing product domain semantics.

- [ ] **Step 4: Add idempotency/error fixtures**

Verify duplicate events, retries, stale state and failed non-idempotent operations remain attributable and recoverable.

- [ ] **Step 5: Commit**

```bash
git add docs/ config/ scripts/ tests/
git commit -m "feat: harden cross-product handoff and provider interoperability"
```

---

### Task 6: Map the ecosystem products to reusable capabilities

**Files:**
- Product manifests for OMNI, DESK, SPOTIST, RITES, NGIN, NAIRE, HAPI World, InstituteGPT, NASC, BUNK, Logistico and other current high-value products.
- Cross-product capability map under `docs/architecture/`.

**Interfaces:**
- Consumes: canonical registry and product manifests.
- Produces: ecosystem composition graph showing reuse, gaps, duplicate candidates and missing handoffs.

- [ ] **Step 1: Map each product's domain role**

Record what the product uniquely composes without turning that into permanent capability ownership.

- [ ] **Step 2: Map consumed common capabilities**

Identity, authority, discovery, communication, workflow, evidence, value, movement, scheduling, analytics, continuity and other applicable shared capabilities.

- [ ] **Step 3: Map provided/reusable capabilities**

Record capabilities each product currently implements that may be reusable elsewhere.

- [ ] **Step 4: Identify duplication candidates**

Detect semantically equivalent product-local implementations of common capabilities.

- [ ] **Step 5: Identify orphan capabilities**

Find capabilities implemented but not registered, documented or reachable through canonical composition.

- [ ] **Step 6: Identify missing handoffs**

For important end-to-end workflows, identify where a product currently stops without a canonical receiving capability.

- [ ] **Step 7: Commit**

```bash
git add docs/ config/
git commit -m "docs: map product-to-capability composition across ecosystem"
```

---

### Task 7: Establish reusable improvement back-propagation

**Files:**
- Add a reusable-improvement record/schema.
- Add workflow documentation for promoting validated product improvements.
- Add conformance tests for provenance-preserving promotion.

**Interfaces:**
- Consumes: product observations, Pulse/outcomes, capability maturity.
- Produces: traceable path from product improvement to shared capability update.

- [ ] **Step 1: Define improvement record**

Track originating product, capability, problem, change, evidence, affected consumers, compatibility impact and maturity transition.

- [ ] **Step 2: Define promotion states**

Support local-use → reusable-candidate → shared → canonical without erasing the originating history.

- [ ] **Step 3: Add compatibility checks**

Ensure promotion does not silently break existing product consumers.

- [ ] **Step 4: Add rollback/provenance rules**

A promoted capability must retain prior versions and explain which products consume each version.

- [ ] **Step 5: Commit**

```bash
git add docs/ config/ scripts/ tests/
git commit -m "feat: establish reusable capability promotion lifecycle"
```

---

### Task 8: CI gate and ecosystem regression verification

**Files:**
- Existing canonical GitHub Actions workflows.
- Conformance validator entry point.
- CI documentation.

**Interfaces:**
- Consumes: all prior manifests, registry entries, interaction/handoff contracts and validators.
- Produces: repeatable CI gate preventing architectural drift.

- [ ] **Step 1: Add canonical conformance command**

Expose one command that validates capability registry, manifests, product boundaries, handoffs and providers.

- [ ] **Step 2: Add CI gate**

Run the conformance suite alongside the existing canonical runtime checks rather than creating a competing workflow.

- [ ] **Step 3: Validate unchanged product builds**

Confirm the new architectural checks do not falsely reject valid current products.

- [ ] **Step 4: Validate intentional failure cases**

Include fixtures for duplicate identity, unauthorized ownership, missing capability reference, invalid specialization and broken handoff.

- [ ] **Step 5: Final ecosystem report**

Generate a machine-readable conformance report containing:

- products checked;
- capabilities checked;
- reusable capabilities discovered;
- duplicate candidates;
- unresolved repository collisions;
- missing handoffs;
- provider lock-in exceptions;
- authority/evidence gaps;
- promoted improvements;
- remaining findings.

- [ ] **Step 6: Commit**

```bash
git add .github/ scripts/ docs/
git commit -m "ci: enforce ecosystem-wide composition conformance"
```

---

## Completion Criteria

The foundation is complete when:

1. every current target product has a truthful composition manifest;
2. every referenced capability resolves to the canonical registry or is explicitly classified as a reusable candidate;
3. no product creates a competing universal primitive;
4. every cross-product handoff has canonical semantics;
5. providers are replaceable through declared capability contracts where practical;
6. local-use capabilities remain reusable-by-default;
7. improvements can flow back from products into shared capabilities with provenance;
8. OMNI/DESK repository semantics are reconciled without destroying history;
9. CI prevents new architectural drift;
10. a new product can be composed mainly by selecting and configuring existing capabilities.

## Execution Order

Tasks 1–2 establish semantic truth first. Tasks 3–5 establish machine-readable contracts and runtime conformance. Tasks 6–7 map and strengthen reuse. Task 8 becomes the final gate after the preceding contracts are stable.
