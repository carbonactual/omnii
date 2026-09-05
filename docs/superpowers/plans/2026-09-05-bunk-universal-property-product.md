# BUNK Universal Property Product Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden BUNK into OMNII's universal property product, covering historical, current, emerging, futuristic, extraterrestrial and unknown property domains while routing shared infrastructure and economics through OMNII and TIP.

**Architecture:** BUNK is a downstream product composition over OMNII's universal objects, identity, authority, graph, evidence, persistence, events, agents and governance. TIP is BUNK's canonical economic foundation for trade, investment, financing, collateral, markets, tokenization and settlement; BUNK must not recreate those primitives.

**Tech Stack:** TypeScript, Node test runner, existing `packages/omnii-runtime`, existing shared contracts, existing Supabase materialization, Markdown canonical product documentation.

**Spec:** `docs/superpowers/specs/2026-09-05-bunk-product-extraction-design.md`

## Global Constraints

- BUNK is a product, not a foundation subsystem.
- TIP is OMNII's economic foundation tool; BUNK consumes TIP and does not duplicate its economic semantics.
- One universal OMNII identity, authority, graph, persistence and ledger boundary.
- Property records are distinct from listings; evidence is distinct from verification; verification is distinct from disclosure.
- Unknown/futuristic/alien classifications are epistemic/property-candidate states, never automatic ownership, personhood, sovereignty or market eligibility.
- Regulated financial, property-transfer and tokenization capabilities remain jurisdiction/policy controlled.
- Existing BUNK schemas, routes and migrations are preserved by provenance and extended only where necessary.

---

### Task 1: Canonical BUNK Product Contract

**Files:**
- Create: `docs/canonical/BUNK_PRODUCT_UNIVERSE.md`
- Modify: `docs/PRODUCT.md`
- Modify: `builds/BUNK/BUILD_MANIFEST.md`

**Interfaces:**
- Consumes: approved BUNK extraction design and existing BUNK materialization map.
- Produces: one discoverable canonical BUNK product contract defining scope, boundaries, capabilities, lifecycle, dependencies, maturity, provenance and evidence status.

- [ ] **Step 1: Write the failing conformance expectation**

Document the required product identity and boundary as testable statements: BUNK product; OMNII substrate; TIP economic dependency; no duplicated universal primitives.

- [ ] **Step 2: Implement the canonical product contract**

Create `docs/canonical/BUNK_PRODUCT_UNIVERSE.md` with sections for product identity, scope, property ontology, roles, lifecycle, markets, intelligence, operations, value chain, historical/current/frontier domains, prohibited assumptions, OMNII dependencies, TIP dependencies, security/governance and evidence status.

- [ ] **Step 3: Align existing product documentation**

Update `docs/PRODUCT.md` so the existing BUNK definition points to the universal property product contract and no longer implies that BUNK is limited to ordinary residential/commercial property.

- [ ] **Step 4: Update build manifest**

Record the universal property contract as the canonical BUNK product source and explicitly distinguish product-owned materialization from OMNII/TIP substrate.

- [ ] **Step 5: Verify documentation consistency**

Search repository BUNK product definitions and ensure they identify BUNK as downstream of OMNII and TIP, with no conflicting “standalone architecture” definition.

- [ ] **Step 6: Commit**

```bash
git add docs/canonical/BUNK_PRODUCT_UNIVERSE.md docs/PRODUCT.md builds/BUNK/BUILD_MANIFEST.md
git commit -m "docs: define BUNK universal property product"
```

---

### Task 2: Universal Property Ontology and Frontier Coverage

**Files:**
- Create: `docs/canonical/BUNK_PROPERTY_ONTOLOGY.md`
- Create: `packages/omnii-runtime/src/bunk-property-ontology.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Create: `packages/omnii-runtime/tests/bunk-property-ontology.test.ts`

**Interfaces:**
- Consumes: OMNII object/type primitives and BUNK product contract.
- Produces: reusable, typed BUNK property-domain classification vocabulary and validation helpers.

- [ ] **Step 1: Write failing tests for category coverage and boundaries**

Test representative classifications for land, buildings, infrastructure, cemetery/burial rights, natural/ecological property, biological material, digital property, temporal/spatial rights, financial interests, orbital/space objects and unknown-origin objects. Test that unknown status never implies ownership or tradeability.

- [ ] **Step 2: Define typed property categories**

Implement a focused immutable vocabulary containing: `LAND`, `BUILDING`, `UNIT`, `INFRASTRUCTURE`, `FIXTURE`, `PERSONAL_PROPERTY`, `PROPERTY_RIGHT`, `TENURE`, `ACCESS_RIGHT`, `TEMPORAL_RIGHT`, `SPATIAL_RIGHT`, `BURIAL_RIGHT`, `NATURAL_ASSET`, `ECOLOGICAL_INTEREST`, `BIOLOGICAL_RESOURCE`, `CULTURAL_PROPERTY`, `INTANGIBLE_PROPERTY`, `DIGITAL_PROPERTY`, `FINANCIAL_PROPERTY_INTEREST`, `DEVELOPMENT_INTEREST`, `CAPACITY_INTEREST`, `SPACE_ASSET`, `EXTRATERRESTRIAL_RESOURCE`, `UNKNOWN_PROPERTY_CANDIDATE`.

- [ ] **Step 3: Define status dimensions separately**

Implement types/validators that keep `maturity`, `legalStatus`, `authorityStatus`, `evidenceStatus`, `eligibilityStatus` and `marketStatus` independent. The validator must reject a model that derives ownership or market eligibility solely from `UNKNOWN_PROPERTY_CANDIDATE` or frontier classification.

- [ ] **Step 4: Add ontology documentation**

Document historical, current, emerging and frontier examples without hard-coding jurisdiction-specific ownership claims.

- [ ] **Step 5: Run focused tests**

Run the BUNK ontology test and the existing runtime test suite.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/bunk-property-ontology.ts packages/omnii-runtime/src/index.ts packages/omnii-runtime/tests/bunk-property-ontology.test.ts docs/canonical/BUNK_PROPERTY_ONTOLOGY.md
git commit -m "feat: add universal BUNK property ontology"
```

---

### Task 3: Property Value-Chain and Product Capability Contract

**Files:**
- Create: `packages/omnii-runtime/src/bunk-property-lifecycle.ts`
- Create: `packages/omnii-runtime/tests/bunk-property-lifecycle.test.ts`
- Create: `docs/canonical/BUNK_PROPERTY_VALUE_CHAIN.md`

**Interfaces:**
- Consumes: BUNK property ontology, OMNII event/transition primitives, existing BUNK workflows.
- Produces: canonical lifecycle stages and capability families usable by product workflows without becoming a duplicate marketplace/accounting engine.

- [ ] **Step 1: Write failing lifecycle tests**

Cover: discovery → identification → tenure/rights → evidence/due diligence → valuation/feasibility → planning → acquisition/assembly → finance → design → construction → certification → listing/offer → transaction/contract → occupancy/use → operations → maintenance → insurance/tax/compliance → refinancing/reinvestment → transfer/inheritance → redevelopment/adaptation → recovery/reuse/retirement.

- [ ] **Step 2: Implement lifecycle vocabulary**

Add typed lifecycle stages and capability family constants for land, development, transaction, finance, investment, operations, professionals, intelligence, environmental, public/institutional and recovery flows.

- [ ] **Step 3: Add transition guards**

Implement a pure validator that prevents terminal/retired states from silently re-entering active operation and ensures high-impact state changes require explicit authority/evidence references rather than AI-only inference.

- [ ] **Step 4: Document the complete value chain**

Document agents, brokers, surveyors, lawyers, valuers, architects, engineers, planners, contractors, artisans, vendors, facility managers, financiers, insurers, investors, regulators, public institutions and communities as participant/capability roles.

- [ ] **Step 5: Run focused and full runtime tests**

Run lifecycle tests and the existing `packages/omnii-runtime/tests` suite.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/bunk-property-lifecycle.ts packages/omnii-runtime/tests/bunk-property-lifecycle.test.ts docs/canonical/BUNK_PROPERTY_VALUE_CHAIN.md
git commit -m "feat: add BUNK property lifecycle and value chain"
```

---

### Task 4: BUNK Economic Boundary to TIP

**Files:**
- Create: `docs/canonical/BUNK_TIP_ECONOMIC_BOUNDARY.md`
- Create: `packages/omnii-runtime/src/bunk-economic-boundary.ts`
- Create: `packages/omnii-runtime/tests/bunk-economic-boundary.test.ts`

**Interfaces:**
- Consumes: TIP market/investment concepts already canonicalized in OMNII documentation.
- Produces: a BUNK-to-TIP routing contract proving that BUNK owns property context while TIP owns canonical economic semantics.

- [ ] **Step 1: Write failing boundary tests**

Test that BUNK can request property trade, lease, financing, pooled investment, fractional/decimalized exposure, collateral, insurance/risk market and tokenization through a TIP reference; test that BUNK cannot create a second economic ledger, market mechanism or settlement semantic.

- [ ] **Step 2: Implement the boundary type**

Create a pure adapter contract with property context, economic intent, TIP capability reference, authority context, jurisdiction/policy context and audit/provenance references.

- [ ] **Step 3: Encode compliance gates**

Require jurisdiction/policy eligibility for regulated routes and keep tokenization/fractionalization as representation/market mechanisms rather than ownership semantics.

- [ ] **Step 4: Document property-economic compositions**

Cover direct sale, leasing, rent, mortgage/development finance, pooled investment, syndication, REIT/fund exposure, fractionalized participation, property-backed lending, secondary markets, capacity/usage markets and property services.

- [ ] **Step 5: Run focused tests**

Run the economic-boundary tests and inspect existing TIP canonical documents for naming/relationship consistency.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/bunk-economic-boundary.ts packages/omnii-runtime/tests/bunk-economic-boundary.test.ts docs/canonical/BUNK_TIP_ECONOMIC_BOUNDARY.md
git commit -m "feat: harden BUNK to TIP economic boundary"
```

---

### Task 5: Property Intelligence, Evidence and Participant Coverage

**Files:**
- Create: `docs/canonical/BUNK_PROPERTY_INTELLIGENCE.md`
- Create: `packages/omnii-runtime/src/bunk-property-intelligence.ts`
- Create: `packages/omnii-runtime/tests/bunk-property-intelligence.test.ts`

**Interfaces:**
- Consumes: canonical property ontology, OMNII evidence/authority/graph primitives.
- Produces: structured property intelligence domains without granting authority to inference.

- [ ] **Step 1: Write failing intelligence tests**

Test location, title/tenure, evidence, physical, development, market, financial, environmental, operational, participant, reputation, risk, maintenance and lifecycle intelligence buckets, plus source/provenance requirements for material claims.

- [ ] **Step 2: Implement intelligence schema**

Represent each intelligence observation with property reference, dimension, value/claim, source/evidence references, observation time, confidence, authority context and lifecycle validity.

- [ ] **Step 3: Enforce evidence/authority separation**

Ensure an intelligence observation can inform a workflow but cannot itself establish ownership, SEAL, title, permission or regulated eligibility.

- [ ] **Step 4: Document participant/capability graph**

Map owners, buyers, tenants, agents, brokers, agencies, managers, inspectors, valuers, lawyers, planners, designers, engineers, contractors, artisans, vendors, suppliers, financiers, insurers, investors, public bodies and communities.

- [ ] **Step 5: Run tests**

Run intelligence tests and existing authority/evidence runtime tests.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-runtime/src/bunk-property-intelligence.ts packages/omnii-runtime/tests/bunk-property-intelligence.test.ts docs/canonical/BUNK_PROPERTY_INTELLIGENCE.md
git commit -m "feat: add BUNK property intelligence contract"
```

---

### Task 6: BUNK Product Manifest, Gap Register and Final Verification

**Files:**
- Create: `docs/canonical/BUNK_PRODUCT_MANIFEST.md`
- Create: `packages/omnii-runtime/tests/bunk-product-conformance.test.ts`
- Modify: `builds/BUNK/BUILD_MANIFEST.md`

**Interfaces:**
- Consumes: Tasks 1–5 contracts and existing BUNK implementation/provenance.
- Produces: final product discoverability, conformance checks and explicit gap/evidence register.

- [ ] **Step 1: Write failing conformance tests**

Test: BUNK identity; required OMNII dependencies; required TIP dependency; prohibited duplicate foundation semantics; frontier status separation; product capability discoverability; lifecycle coverage.

- [ ] **Step 2: Implement product manifest**

Create machine-readable/documented manifest fields for identity, version, maturity, scope, capability families, dependencies, workflows, participants, market routes, intelligence domains, lifecycle, security, evidence, provenance and gaps.

- [ ] **Step 3: Update build evidence map**

Record each canonical source file added by this plan and retain an explicit list of runtime/deployment/integration evidence that remains unverified.

- [ ] **Step 4: Run complete verification**

Run all relevant runtime tests, type-check/build scripts available in the repository, and inspect the final diff against the BUNK specification. Do not mark production deployment/integration as verified unless executable evidence exists.

- [ ] **Step 5: Commit**

```bash
git add docs/canonical/BUNK_PRODUCT_MANIFEST.md packages/omnii-runtime/tests/bunk-product-conformance.test.ts builds/BUNK/BUILD_MANIFEST.md
git commit -m "test: verify BUNK universal property product conformance"
```

- [ ] **Step 6: Final review**

Compare the completed implementation against the approved design and confirm: BUNK is the universal property product; TIP remains the canonical economic foundation; OMNII remains the shared ecosystem substrate; historical, current and frontier property classes are covered; cemetery/burial interests are represented; fractionalization/decimalization/pooling/land banking and the complete professional/service value chain are represented; no unsupported ownership or marketability assumptions were introduced.
