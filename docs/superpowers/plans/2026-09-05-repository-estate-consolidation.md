# OMNII Repository Estate Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Absorb valuable code, functions, data models, product logic, HAPI World capabilities, and design intelligence from the Carbon Actual repository estate into one canonical OMNII ecosystem without flattening product boundaries or corrupting provenance.

**Architecture:** OMNII remains the constitutional substrate and canonical state/runtime. HAPI World becomes the reusable human/AI participation environment/common denominator above that substrate. Products become bounded compositions; source implementations are harvested into shared packages/contracts where repetition exists, while provider/framework forks remain adapters or references.

**Tech Stack:** TypeScript/Next.js, Node 22, Supabase/Postgres, JSON Schema, Edge Functions, GitHub Actions, existing OMNII runtime/ABBA/registry/economic/knowledge infrastructure.

**Spec:** `docs/superpowers/specs/2026-09-05-repository-estate-consolidation-design.md`

## Global Constraints

- Reuse before invention.
- Preserve source provenance for every harvested artifact.
- `CAPABILITY != AUTHORITY`.
- `ABBA != AUTHORITY ISSUER`.
- `MATCH != AUTHORIZATION`.
- `PLAN != EXECUTION`.
- `EVIDENCE != AUTHORITY`.
- `TOKENIZATION != PROOF OF OWNERSHIP`.
- `ATLAS != OPERATIONAL SOURCE OF TRUTH`.
- HAPI World is a common participation/environment layer; OMNII remains the constitutional substrate.
- Provider/framework repositories remain adapters or references unless a specific owned capability is extracted.
- No silent data loss, overwrite, or promotion of unverified source content to canonical truth.
- ECC is not required as a canonical dependency.

---

### Task 1: Build the complete source-estate manifest

**Files:**
- Create: `docs/architecture/OMNII_REPOSITORY_SOURCE_ESTATE_MANIFEST.md`
- Modify: `docs/architecture/OMNII_CULMINATION_INDEX.md`

**Interfaces:**
- Consumes: GitHub repository inventory, product registry, current culmination/audit docs.
- Produces: one canonical manifest mapping repository → artifact classes → disposition → target OMNII/HAPI World location.

- [ ] **Step 1: Write the manifest structure**

Use these columns: `repository`, `ownership`, `artifact_kind`, `source_paths`, `semantic_area`, `target_layer`, `disposition`, `provenance_required`, `contradiction_check`, `implementation_status`.

- [ ] **Step 2: Register first-party product repositories**

Include Carbon-Actual-, ABBA, ABBA MAS, OMNI, HAPI World, HAPI World Nexus, NASC, Direct Bank App, Open Ballot, RITES, NOUN Student Bot, Nigerian Cultural Atlas, BKLIT UI, Shadow, Chatbot, Eve variants and the known product branches.

- [ ] **Step 3: Register tooling/provider repositories**

Include OpenClaw, Caveman, ECC, Botpress, Baserow, CrewAI, universal-mcp, skills-from-google, thunderbolt, mcp-remote, PraisonAI, Grok-Api, mergekit, agent-skills, workflow, ai, command-code, claude-code-action, engram and related accessible repositories.

- [ ] **Step 4: Commit**

```bash
git add docs/architecture/OMNII_REPOSITORY_SOURCE_ESTATE_MANIFEST.md docs/architecture/OMNII_CULMINATION_INDEX.md
git commit -m "docs: map complete repository source estate"
```

---

### Task 2: Consolidate HAPI World as the common denominator

**Files:**
- Create: `docs/architecture/HAPI_WORLD_COMMON_DENOMINATOR.md`
- Create: `schemas/hapi-world-participation.schema.json`
- Modify: `docs/architecture/OMNII_PRODUCT_CONFORMANCE_MATRIX.md`
- Modify: `docs/architecture/NAIRE_NGIN_OPERATING_ENVIRONMENT_COMPOSITION.md`

**Interfaces:**
- Consumes: HAPI World/Nexus source material, existing HAPI foundation rules, product conformance doctrine.
- Produces: reusable participation contract for human/AI entry, identity linkage, relationships, learning, skills, work, interaction, progression and world-facing representation.

- [ ] **Step 1: Define the HAPI World participation envelope**

Require: participant identity, HAPI/# linkage where applicable, subject class, relationship context, world/space, intent, capabilities, evidence, progression state, visibility, authority context and provenance.

- [ ] **Step 2: Define crossings**

Represent products and institutions as bounded contexts crossed by governed relationships; a product does not create a second human identity.

- [ ] **Step 3: Define HAPI World boundaries**

Explicitly state that HAPI World is not constitutional authority, is not an accounting ledger, does not override institutional/legal authority, and does not turn humans into an artificial-world entity class.

- [ ] **Step 4: Commit**

```bash
git add docs/architecture/HAPI_WORLD_COMMON_DENOMINATOR.md schemas/hapi-world-participation.schema.json docs/architecture/OMNII_PRODUCT_CONFORMANCE_MATRIX.md docs/architecture/NAIRE_NGIN_OPERATING_ENVIRONMENT_COMPOSITION.md
git commit -m "feat: establish HAPI World common denominator"
```

---

### Task 3: Extract the universal capability fabric from repeated product code

**Files:**
- Create: `packages/omnii-common/src/identity.ts`
- Create: `packages/omnii-common/src/relationship.ts`
- Create: `packages/omnii-common/src/intent.ts`
- Create: `packages/omnii-common/src/capability.ts`
- Create: `packages/omnii-common/src/discovery.ts`
- Create: `packages/omnii-common/src/matching.ts`
- Create: `packages/omnii-common/src/context.ts`
- Create: `packages/omnii-common/src/availability.ts`
- Create: `packages/omnii-common/src/authority.ts`
- Create: `packages/omnii-common/src/evidence.ts`
- Create: `packages/omnii-common/src/value.ts`
- Create: `packages/omnii-common/src/workflow.ts`
- Create: `packages/omnii-common/src/index.ts`

**Interfaces:**
- Consumes: repeated semantics identified in ABBA, NASC, OMNI, banking, cultural, student, RITES and HAPI World implementations.
- Produces: typed common contracts consumed by product adapters.

- [ ] **Step 1: Define common types without introducing alternate constitutional semantics**

Each type must be a data contract, not an authority issuer or hidden side-effect engine.

- [ ] **Step 2: Add the universal operating chain helper**

Expose a pure function:
```ts
export type OperatingChainStage =
  | "identity" | "relationship" | "intent" | "capability" | "discovery"
  | "match" | "context" | "availability" | "authority" | "workflow"
  | "execution" | "evidence" | "outcome" | "settlement" | "pulse";

export function operatingChain(): readonly OperatingChainStage[]
```

- [ ] **Step 3: Add tests before runtime integration**

Tests must verify that capability discovery cannot imply authorization and that evidence cannot be converted into authority.

- [ ] **Step 4: Commit**

```bash
git add packages/omnii-common
git commit -m "feat: extract universal common capability contracts"
```

---

### Task 4: Build source-artifact and provenance harvesting

**Files:**
- Create: `packages/omnii-source/src/manifest.ts`
- Create: `packages/omnii-source/src/provenance.ts`
- Create: `packages/omnii-source/src/disposition.ts`
- Create: `packages/omnii-source/src/index.ts`
- Create: `schemas/omnii-source-artifact.schema.json`

**Interfaces:**
- Consumes: repository manifest records and source artifact metadata.
- Produces: normalized source artifact records suitable for `omnii_source_artifacts` / `omnii_design_genealogies` persistence.

- [ ] **Step 1: Define source artifact record**

Fields: source repository, source ref/commit, path, artifact type, semantic tags, target layer, disposition, license/provenance note, hash, captured_at, reviewer outcome.

- [ ] **Step 2: Define dispositions**

Use `ABSORB`, `COMPOSE`, `ADAPT`, `REFERENCE`, `REJECT_SUPERSEDE`.

- [ ] **Step 3: Add lineage helpers**

A harvested implementation must remain traceable to its source commit/path even after extraction.

- [ ] **Step 4: Commit**

```bash
git add packages/omnii-source schemas/omnii-source-artifact.schema.json
git commit -m "feat: add source artifact provenance fabric"
```

---

### Task 5: Consolidate product implementations into explicit OMNII adapters

**Files:**
- Create: `packages/omnii-products/src/adapter.ts`
- Create: `packages/omnii-products/src/catalog.ts`
- Create: `packages/omnii-products/src/hapi-world-crossing.ts`
- Create: `packages/omnii-products/src/index.ts`
- Modify: `docs/architecture/OMNII_PRODUCT_CONFORMANCE_MATRIX.md`

**Interfaces:**
- Consumes: common capability contracts and product registry.
- Produces: standard adapter surface for product-specific code.

- [ ] **Step 1: Define adapter interface**

```ts
export interface OmniiProductAdapter {
  productKey: string;
  productVersion: string;
  capabilities: readonly string[];
  domains: readonly string[];
  hapiWorldCrossing?: string;
  sourceLineage: readonly string[];
}
```

- [ ] **Step 2: Register all built/conforming products**

Do not mark legacy/specification-only products as implemented merely by catalog presence.

- [ ] **Step 3: Bind the common HAPI World crossing**

Products that involve people or AI participants consume the common participation contract instead of recreating identity/entry semantics.

- [ ] **Step 4: Commit**

```bash
git add packages/omnii-products docs/architecture/OMNII_PRODUCT_CONFORMANCE_MATRIX.md
git commit -m "feat: standardize product adapter boundary"
```

---

### Task 6: Port ABBA/agent and workflow capability without moving authority

**Files:**
- Modify: `packages/omnii-runtime/src/authority-runtime.ts`
- Modify: `packages/omnii-runtime/src/types.ts`
- Create: `packages/omnii-agents/src/planning.ts`
- Create: `packages/omnii-agents/src/coordination.ts`
- Create: `packages/omnii-agents/src/evaluation.ts`
- Create: `packages/omnii-agents/src/lifecycle.ts`
- Create: `packages/omnii-agents/src/index.ts`

**Interfaces:**
- Consumes: ABBA, ABBA MAS, agent-skills, Eve, Caveman and workflow patterns.
- Produces: provider-independent agent planning/coordination/evaluation capabilities under the existing authority guard.

- [ ] **Step 1: Extract planning and coordination as pure contracts**

Planning may produce plans and dependencies but never execute by implication.

- [ ] **Step 2: Integrate evaluation and lifecycle states**

Use register → discover → delegate → execute → observe → evaluate → suspend/revoke.

- [ ] **Step 3: Route consequential actions through existing authority guard**

No new agent-side authority model may bypass `AuthorityRuntime` or SEAL requirements.

- [ ] **Step 4: Commit**

```bash
git add packages/omnii-agents packages/omnii-runtime/src/authority-runtime.ts packages/omnii-runtime/src/types.ts
git commit -m "feat: consolidate governed agent capabilities"
```

---

### Task 7: Consolidate workflow/forms/registry/automation capabilities

**Files:**
- Create: `packages/omnii-workflow/src/forms.ts`
- Create: `packages/omnii-workflow/src/process.ts`
- Create: `packages/omnii-workflow/src/tasks.ts`
- Create: `packages/omnii-workflow/src/workers.ts`
- Create: `packages/omnii-workflow/src/automation.ts`
- Create: `packages/omnii-workflow/src/registry.ts`
- Create: `packages/omnii-workflow/src/index.ts`

**Interfaces:**
- Consumes: NASC forms/workflows/automations, registry patterns, worker execution and related Carbon Actual workflow code.
- Produces: one reusable workflow fabric shared by institutional and product contexts.

- [ ] **Step 1: Normalize form → intent → workflow routing**
- [ ] **Step 2: Normalize process/task/worker lifecycle and evidence**
- [ ] **Step 3: Normalize registry registration and discovery**
- [ ] **Step 4: Commit**

```bash
git add packages/omnii-workflow
git commit -m "feat: consolidate forms workflows registries and automation"
```

---

### Task 8: Consolidate knowledge, memory, Atlas and ecological design intelligence

**Files:**
- Create: `packages/omnii-knowledge/src/memory.ts`
- Create: `packages/omnii-knowledge/src/assertion.ts`
- Create: `packages/omnii-knowledge/src/evidence.ts`
- Create: `packages/omnii-knowledge/src/atlas.ts`
- Create: `packages/omnii-knowledge/src/design-genealogy.ts`
- Create: `packages/omnii-knowledge/src/index.ts`
- Modify: `docs/architecture/AUDUBON_CONTINUUM_ECOLOGICAL_DESIGN_DOCTRINE.md`

**Interfaces:**
- Consumes: Carbon Actual continuum memory, cultural Atlas, HAPI/Nexus, Audubon doctrine, provenance and knowledge assertions.
- Produces: portable durable memory/evidence/Atlas/design genealogy capabilities.

- [ ] **Step 1: Route durable memory through canonical OMNII memory/evidence semantics**
- [ ] **Step 2: Preserve assertion status and source provenance**
- [ ] **Step 3: Model Atlas as public/curated representation, not operational truth**
- [ ] **Step 4: Preserve Audubon ecological intelligence as a reusable design method, not skin**
- [ ] **Step 5: Commit**

```bash
git add packages/omnii-knowledge docs/architecture/AUDUBON_CONTINUUM_ECOLOGICAL_DESIGN_DOCTRINE.md
git commit -m "feat: consolidate knowledge memory atlas and ecological intelligence"
```

---

### Task 9: Consolidate value, tokenization, trade and investment capabilities

**Files:**
- Create: `packages/omnii-economics/src/value.ts`
- Create: `packages/omnii-economics/src/pulse.ts`
- Create: `packages/omnii-economics/src/tokenization.ts`
- Create: `packages/omnii-economics/src/market.ts`
- Create: `packages/omnii-economics/src/settlement.ts`
- Create: `packages/omnii-economics/src/investment.ts`
- Create: `packages/omnii-economics/src/index.ts`

**Interfaces:**
- Consumes: ABBA MAS value/token/economic laws, existing OMNII economic runtime, banking/market/product specifications.
- Produces: reusable economic capability surface with explicit distinction between value, representation, ownership/rights and settlement.

- [ ] **Step 1: Normalize value/PULSE vectors**
- [ ] **Step 2: Normalize token classification/mint/entitlement state**
- [ ] **Step 3: Normalize market offer/order/trade/investment primitives**
- [ ] **Step 4: Preserve regulatory/accounting boundaries and do not turn ecosystem token logic into external legal ownership claims**
- [ ] **Step 5: Commit**

```bash
git add packages/omnii-economics
git commit -m "feat: consolidate universal value trade and investment fabric"
```

---

### Task 10: Connect built product source implementations to canonical runtime

**Files:**
- Modify: product-specific source files identified in the manifest.
- Modify: `packages/omnii-products/src/catalog.ts`
- Modify: `packages/omnii-runtime/src/*` only where the canonical route is missing.

**Interfaces:**
- Consumes: adapter, common, HAPI World, agent, workflow, knowledge and economics packages.
- Produces: canonical runtime crossings for real product implementations.

- [ ] **Step 1: OMNI/BUNK local runtime becomes a projection/client of canonical OMNII state**
- [ ] **Step 2: ABBA `/api/agents/abba` routes through the canonical ABBA gateway**
- [ ] **Step 3: NASC forms/workflows/agents/automations route through common workflow/authority/evidence contracts**
- [ ] **Step 4: Direct Bank App and banking compositions route authorization/transaction/settlement/evidence through canonical contracts**
- [ ] **Step 5: Open Ballot remains simulation/training-only while using common evidence/workflow primitives**
- [ ] **Step 6: RITES/NAIRE/NGIN consume shared identity/relationship/continuity primitives**
- [ ] **Step 7: NOUN Student Bot consumes institutional sources, intent/workflow/evidence and advisory ABBA without impersonating the institution**
- [ ] **Step 8: Cultural Atlas/Nexus consume canonical Atlas/knowledge/evidence structures**
- [ ] **Step 9: Commit each independently testable product group**

```bash
git commit -m "feat: wire product estate to canonical OMNII runtime"
```

---

### Task 11: Add automated contradiction/conformance detection

**Files:**
- Create: `tools/omnii-conformance/scan.mjs`
- Create: `tools/omnii-conformance/rules.json`
- Create: `tools/omnii-conformance/report.mjs`
- Create: `tests/conformance/architecture-boundaries.test.mjs`
- Modify: `.github/workflows/*` existing appropriate workflow file.

**Interfaces:**
- Consumes: repository manifest, product adapters, canonical docs/schemas.
- Produces: CI-visible contradiction and conformance report.

- [ ] **Step 1: Add lexical boundary checks**

Flag source patterns that treat ABBA as an authority issuer, capability as authority, match as authorization, evidence as authority, plan as execution, Atlas as source of truth, or tokenization as proof of ownership.

- [ ] **Step 2: Add manifest integrity checks**

Fail when an artifact has no disposition/provenance record.

- [ ] **Step 3: Add product status evidence checks**

A product cannot become `conforming` from documentation alone when implementation evidence is absent.

- [ ] **Step 4: Commit**

```bash
git add tools/omnii-conformance tests/conformance .github/workflows
git commit -m "test: enforce repository estate conformance"
```

---

### Task 12: Final estate verification and canonical index update

**Files:**
- Modify: `docs/architecture/OMNII_REPOSITORY_SOURCE_ESTATE_MANIFEST.md`
- Modify: `docs/architecture/OMNII_CULMINATION_INDEX.md`
- Modify: `docs/architecture/REPOSITORY_CONTENT_CONSOLIDATION_AUDIT.md`

**Interfaces:**
- Consumes: all harvested packages, adapters, manifests and CI reports.
- Produces: verified canonical estate status and explicit unresolved remainder.

- [ ] **Step 1: Re-run repository/source sweep**
- [ ] **Step 2: Verify all source artifacts have a disposition**
- [ ] **Step 3: Verify HAPI World participation is represented across applicable products**
- [ ] **Step 4: Verify provider repositories are not treated as canonical dependencies**
- [ ] **Step 5: Verify product registry and source manifest agree**
- [ ] **Step 6: Record unresolved items as explicit `UNKNOWN/REVIEW_REQUIRED`, never silently omit them**
- [ ] **Step 7: Commit final verification**

```bash
git add docs/architecture
git commit -m "docs: finalize repository estate consolidation audit"
```

---

## Verification Commands

Run after each executable package task:

```bash
npm run typecheck
npm test
```

For the conformance pass:

```bash
node tools/omnii-conformance/scan.mjs
node tools/omnii-conformance/report.mjs
node --test tests/conformance/architecture-boundaries.test.mjs
```

The final claim of completion requires observed GitHub commit(s), successful repository checks where configured, and an explicit list of anything blocked by connector/runtime access or requiring human/legal review.
