# Ecosystem Experience & Natural Habitat Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make natural habitat, place, living-system interaction, meaningful motion, accessibility, performance, and world-class design quality inherited ecosystem requirements rather than optional product decoration.

**Architecture:** OMNII owns the canonical design contract. Product and domain repositories inherit the contract through concise boundary documents, while retaining their own visual identity. The design contract governs meaning and quality; it does not require one UI framework or one visual theme.

**Tech Stack:** Markdown constitutional contracts, JSON registries where applicable, existing web frameworks such as Framer Motion where already present or appropriate, accessible browser standards, no mandatory paid design dependency.

**Spec:** `docs/canonical/ECOSYSTEM_EXPERIENCE_NATURAL_HABITAT_DESIGN_DOCTRINE_V1.md`

## Global Constraints

- Treat natural habitat and place as first-class context where relevant.
- Audubon is an inspiration/reference for natural-history and ecological storytelling, not a claim over proprietary Audubon assets or trademarks.
- Use meaningful motion, animation, and transitions to express state; never use motion to fabricate activity.
- Prefer Framer Motion or equivalent free/open implementation paths when technically appropriate.
- Preserve accessibility, reduced-motion support, performance, and graceful degradation.
- Do not build basic, generic, template-like experiences as the default design target.
- Preserve OMNII semantic boundaries: HAPI, ABBA, IO, PULSE, TERMINAL, TOKENIZE, INDEX, ROOT, ACTUAL, BECOMING, ASH.
- Do not introduce paid dependencies as mandatory core infrastructure.
- Keep changes on existing feature branches; do not merge into default branches.

---

### Task 1: Canonical doctrine

**Files:**
- Create: `docs/canonical/ECOSYSTEM_EXPERIENCE_NATURAL_HABITAT_DESIGN_DOCTRINE_V1.md`

**Interfaces:**
- Produces the canonical design and natural-habitat contract inherited by products.

- [ ] **Step 1: Record the semantic model**

Include the habitat/place/people/activity/value/ecosystem relationship and the stable meaning of all core ecosystem layers.

- [ ] **Step 2: Record motion, accessibility, performance, and quality-floor rules**

Include Framer Motion/equivalent guidance, truthful state expression, reduced motion, semantic accessibility, responsive performance, and the prohibition on generic/template-first experiences.

- [ ] **Step 3: Commit the doctrine**

```bash
git add docs/canonical/ECOSYSTEM_EXPERIENCE_NATURAL_HABITAT_DESIGN_DOCTRINE_V1.md
git commit -m "docs: add ecosystem experience and natural habitat design doctrine"
```

---

### Task 2: OMNII boundary inheritance

**Files:**
- Modify: `docs/ARCHITECTURE_BOUNDARY_V1.md`

**Interfaces:**
- Consumes the canonical doctrine from Task 1.
- Produces a constitutional statement that product implementations inherit the experience contract without moving product UI into OMNII.

- [ ] **Step 1: Add inherited-design boundary**

State that OMNII owns the design-quality semantics and products own concrete presentation implementations.

- [ ] **Step 2: Verify no product-specific UI ownership is introduced**

Confirm the boundary remains constitutional and provider/framework neutral.

- [ ] **Step 3: Commit**

```bash
git add docs/ARCHITECTURE_BOUNDARY_V1.md
git commit -m "docs: bind ecosystem experience doctrine to OMNII boundary"
```

---

### Task 3: ABBA Master AI inheritance

**Files:**
- Modify: the active ABBA ecosystem/design boundary document on `B3C0M1NG/ABBA` branch `feat/master-ai-ecosystem-activation-v1`

**Interfaces:**
- ABBA consumes OMNII design semantics when routing or generating experiences.
- Produces recommendations and compositions that preserve truthful state, habitat/place context, meaningful motion, accessibility, and performance.

- [ ] **Step 1: Add ABBA design responsibility**

ABBA may select or compose presentation capabilities but may not redefine the canonical experience semantics.

- [ ] **Step 2: Add non-fabricated motion rule**

ABBA-generated experiences must derive motion from actual system state.

- [ ] **Step 3: Commit**

```bash
git add <active-ABBA-boundary-file>
git commit -m "docs: inherit ecosystem experience doctrine in ABBA"
```

---

### Task 4: HAPI World family inheritance

**Files:**
- Modify/add concise boundary docs on:
  - `B3C0M1NG/HAPI` branch `feat/hapi-world-family-integration-v1`
  - `carbonactual/hapi-world` branch `feat/hapi-world-family-integration-v1`
  - `carbonactual/hapi-world-nexus` branch `feat/hapi-world-family-integration-v1`

**Interfaces:**
- HAPI World family inherits the same experience contract while remaining one domain family.

- [ ] **Step 1: Add human/place/habitat context rule**

Where relevant, HAPI-facing experiences should preserve place, environment, relationship, and continuity context.

- [ ] **Step 2: Add accessibility/motion rule**

Motion-rich experiences must support reduced motion and must not hide system state behind animation.

- [ ] **Step 3: Commit each repository separately**

```bash
git add <files>
git commit -m "docs: inherit ecosystem experience doctrine in HAPI World"
```

---

### Task 5: Product-family inheritance

**Files:**
- Add or modify compact design-boundary docs on active product branches for OMNI and other currently governed product families where an existing boundary document is available.

**Interfaces:**
- Product runtimes consume the canonical design contract without duplicating constitutional semantics.

- [ ] **Step 1: Add a product design inheritance statement**

Products retain their own identity but inherit living-system interaction, contextual visualization, quality floor, accessibility, and performance constraints.

- [ ] **Step 2: Ensure BUNK remains outside OMNII ownership**

BUNK inherits the experience doctrine after extraction, but its UI implementation remains BUNK-owned.

- [ ] **Step 3: Commit product-family changes**

```bash
git add <files>
git commit -m "docs: inherit ecosystem experience doctrine across products"
```

---

### Task 6: Final verification

**Files:**
- All files touched in Tasks 1–5.

**Interfaces:**
- Verifies canonical consistency and absence of contradictory statements.

- [ ] **Step 1: Search all active boundary documents**

Search for contradictory phrases implying animation is decorative, that tokenization/minting are equivalent, or that generic UI is acceptable as the design floor.

- [ ] **Step 2: Inspect resulting diffs**

Confirm only additive/inheritance changes were made and no source/product extraction boundaries were altered.

- [ ] **Step 3: Verify branch states**

Confirm feature branches remain open and default branches are untouched.

- [ ] **Step 4: Record verification evidence**

Report exact commit SHAs and any CI state. Do not claim full test success unless a completed workflow reports success.
