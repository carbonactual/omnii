# Universal Digital Common Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the existing OMNII canonical object/common-capability substrate so the ecosystem operates from a provider-neutral model of identity, authority, relationship, capability, intent, policy, state, event, evidence, provenance, dependency, continuity, portability, settlement, liability and lifecycle, while remaining interoperable with ordinary internet protocols and providers.

**Architecture:** Strengthen existing canonical objects and capability contracts rather than creating parallel primitives. Add the universal internet-facing semantics as constitutional law, materialize them in JSON schemas and conformance checks, then make Desk consume those contracts without becoming their owner. Existing protocols/providers remain adapters and replaceable implementations.

**Tech Stack:** Markdown constitutional contracts; JSON Schema 2020-12; existing Node.js/JavaScript conformance scripts; GitHub branches/PRs; existing OMNII common packages and runtime validation.

**Spec:** `docs/architecture/UNIVERSAL_DIGITAL_COMMON_LAYER_CANON.md` plus the existing `docs/superpowers/specs/2026-09-16-ecosystem-wide-common-capability-conformance-design.md`.

## Global Constraints

- Preserve the OMNII/HAPi World Canon as supreme authority.
- Do not create a competing identity, authority, ontology, ledger, registry or orchestration kernel.
- Existing internet protocols remain valid implementation/adapter mechanisms.
- Canonical objects survive product/provider replacement and exit.
- Authentication, authorization, ownership, authority, capability and delegation remain distinct concepts.
- Unknown fields and unknown states are preserved rather than silently discarded.
- Consequential actions are attributable, evidence-bearing and reconstructable.
- Human authority remains constitutional; AI/agents act only under explicit delegated authority.
- Desk consumes universal/common capabilities and does not own their universal semantics.

---

### Task 1: Constitutionalize the Internet Common Layer

**Files:**
- Modify: `CANON.md`
- Create: `docs/canonical/OMNII_UNIVERSAL_DIGITAL_COMMON_LAYER_LAW.md`
- Create: `docs/architecture/OMNII_EXTERNAL_INTERNET_INTEGRATION_LAW.md`

**Interfaces:**
- Produces the constitutional law referenced by schema, runtime and product conformance.

- [ ] **Step 1: Add the new constitutional law to the supreme Canon**
Append the Universal Digital Common Layer principles: identity/authority separation, canonical-object continuity, provider neutrality, portable semantics, explicit state, attributable event/evidence requirements, dependency awareness, authority-preserving delegation, liability chains, and provider-adapter boundaries.

- [ ] **Step 2: Add the standalone canonical law document**
Define the full primitive set and loophole closures without introducing a competing kernel.

- [ ] **Step 3: Add the external-internet integration law**
Define DNS, DNSSEC, DID/VC, ENS, OAuth/WebAuthn, PKI, APIs, MCP, A2A, payment rails, cloud, repositories, messaging and other external systems as adapters/protocols whose semantics are mapped into canonical objects.

- [ ] **Step 4: Commit**
Commit as `feat: constitutionalize universal digital common layer`.

---

### Task 2: Extend the Canonical Object Contract

**Files:**
- Modify: `schemas/omnii-canonical-object.schema.json`
- Create: `schemas/omnii-universal-event.schema.json`
- Create: `docs/schema/OMNII_UNIVERSAL_OBJECT_CONTRACT.md`
- Create: `docs/schema/OMNII_UNIVERSAL_EVENT_EVIDENCE_CONTRACT.md`

**Interfaces:**
- `CanonicalObject` gains explicit intent/policy/trust/settlement/liability/continuity/portability/lifecycle surfaces.
- `UniversalEvent` becomes the shared envelope for material state transitions and evidence references.

- [ ] **Step 1: Define failing schema fixtures**
Create valid and invalid examples covering authority, delegation, state, provenance, evidence, dependencies, continuity and portability.

- [ ] **Step 2: Extend the canonical object schema**
Keep existing fields backward-compatible while adding explicit contracts for `intent`, `policy`, `trust`, `settlement`, `liability`, `continuity`, `portability`, `lifecycle`, `evidence` and `events`.

- [ ] **Step 3: Add the universal event schema**
Require subject, actor, authority context, action, object, timestamp/context, previous/new state, provenance and evidence references for consequential events.

- [ ] **Step 4: Document preservation/forward-compatibility rules**
Unknown fields and provider-specific extensions remain preserved; semantic reinterpretation requires governed versioning.

- [ ] **Step 5: Commit**
Commit as `feat: extend canonical object and event contracts`.

---

### Task 3: Add Runtime Conformance Guards

**Files:**
- Create: `scripts/validate-universal-common-layer.mjs`
- Create: `scripts/universal-common-layer-invariants.test.mjs`
- Modify: `package.json`

**Interfaces:**
- `validate-universal-common-layer.mjs` validates existence, schema shape, required constitutional assertions and forbidden duplicate primitives.
- `universal-common-layer-invariants.test.mjs` executes the focused conformance suite.

- [ ] **Step 1: Write failing invariant tests**
Assert identity/authority separation, delegation preservation, provider neutrality, canonical-object continuity, explicit lifecycle/state, event/evidence requirements and exit/portability invariants.

- [ ] **Step 2: Implement the validator**
Read the Canon, common-layer law, schema files and selected existing capability contracts; fail closed on missing law/schema or duplicate primitive declarations.

- [ ] **Step 3: Wire the validator into `conformance` and `test:canonical`**
Keep the new check additive and deterministic.

- [ ] **Step 4: Commit**
Commit as `test: enforce universal common layer invariants`.

---

### Task 4: Desk Common-Layer Conformance

**Files:**
- Create: `carbonactual/desk/docs/DESK_COMMON_LAYER_CANONICAL_ADDENDUM.md`
- Create: `carbonactual/desk/docs/DESK_UNIVERSAL_OBJECT_CONTRACT_CONFORMANCE.md`
- Create: `carbonactual/desk/docs/DESK_CONTINUITY_PORTABILITY_CONFORMANCE.md`

**Interfaces:**
- Desk consumes the OMNII Universal Object Contract and common capability fabric.
- Desk actions carry authority/context/state/evidence/continuity semantics but do not define new universal primitives.

- [ ] **Step 1: Define Desk conformance addendum**
Bind Desk's participant workspace to the common-layer law.

- [ ] **Step 2: Define transaction/state/event requirements**
Make discovery, intent, eligibility, authority, execution, observation, evidence, settlement and continuity first-class Desk concerns where applicable.

- [ ] **Step 3: Define provider/exit behavior**
Desk must preserve canonical participant/entity records and usable handoff state when a provider, feature or Desk deployment is replaced.

- [ ] **Step 4: Commit**
Commit as `docs: align Desk with universal common layer`.

---

### Task 5: Cross-Repository Integration and Verification

**Files:**
- Modify: existing canonical index/conformance references as required.
- Create: `docs/architecture/UNIVERSAL_DIGITAL_COMMON_LAYER_CONFORMANCE_MATRIX.md`

- [ ] **Step 1: Map each new primitive to an existing OMNII primitive**
Prove there is no duplicate kernel: canonical object, authority/SEAL, capability fabric, relationship registry, event/provenance, value/IOLedger, Atlas, Vault, Terminal, ABBA and provider adapters.

- [ ] **Step 2: Add the cross-layer conformance matrix**
Map constitutional law → schema → runtime check → Desk consumption → external adapter boundary.

- [ ] **Step 3: Verify repository state**
Review branch diffs and ensure no unrelated product consolidation, repository deletion, rename or archival occurs.

- [ ] **Step 4: Run available CI/conformance checks**
Use the existing GitHub Actions/conformance workflow where available; report any environment-only limitation honestly.

- [ ] **Step 5: Open PRs for review**
Keep OMNII and Desk changes separated so the shared substrate can be reviewed independently from the product composition.
