# InstituteGPT Advance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement InstituteGPT Advance as the first-class universal learning, skills, labs, CPD, badges, certificates and advancement service while keeping the broader education capabilities composable inside InstituteGPT.

**Architecture:** Add a focused Advance product module for reusable learning-path, learning-experience, lab, skills-passport, learning-wallet, CPD and provider-adapter contracts. Keep Labs, Wallet, Skills Passport, Pathway Builder and Marketplace as capabilities of Advance, not separate products, while preserving OpenEd, Notebook and Exams as sibling first-class products.

**Tech Stack:** ECMAScript modules (`.mjs`), Node test runner, existing InstituteGPT exports, OMNII product catalog, Markdown canonical/spec documentation, existing GitHub Actions CI and existing Supabase conventions only where persistence is already part of the InstituteGPT layer.

**Spec:** `docs/superpowers/specs/2026-09-06-institutegpt-advance-design.md`

## Global Constraints

- Advance is a first-class InstituteGPT service for learning, skills, learning paths, labs, CPD, professional learning, badges, certificates and advancement.
- Labs, Learning Wallet, Skills Passport, Pathway Builder and Education Marketplace are capabilities inside Advance, not new top-level products at this stage.
- Provider, framework and standards integrations are replaceable adapters; no vendor is constitutionally indispensable.
- Credential issuer authority remains separate from course completion, assessment and professional authorization.
- The same semantic substrate must support children, students, adults, professionals, institutions, government and AI/agent learners, with age-appropriate governance for children.
- Existing OpenEd Bot, Notebook and Exams contracts must remain compatible.
- Consequential transitions use existing IO/audit semantics and sensitive learner records use least privilege/RLS.
- Tests must cover product hierarchy, learning-path progression, learning experiences, labs, skills/competency state separation, credential boundaries, provider neutrality, child-safe flags, AI learner separation and CPD.

---

### Task 1: Advance contracts

**Files:**
- Create: `packages/institutegpt/src/advance-product.mjs`
- Create: `packages/institutegpt/src/advance-product.test.mjs`
- Modify: `packages/institutegpt/src/index.mjs`

**Interfaces:**
- Produces `ADVANCE_PRODUCT`, `ADVANCE_LEARNING_STAGES`, `ADVANCE_LEARNING_FORMATS`, `ADVANCE_PROVIDER_TYPES`, `ADVANCE_LEARNER_TYPES`, `ADVANCE_CREDENTIAL_TYPES`, `ADVANCE_SKILL_STATES`, `ADVANCE_CAPABILITY_GROUPS`, `createLearningExperience`, `createLearningPath`, `createLabDefinition`, `createSkillsPassport`, `createLearningWallet`, `createCpdActivity`, `createProviderAdapterProfile`.
- Every creator returns a frozen canonical object and rejects missing required identifiers.

- [ ] **Step 1: Write the failing tests** for product identity, stage/format/learner/credential vocabularies, path creation, lab creation, wallet/passport creation, CPD creation and provider adapter creation.

- [ ] **Step 2: Run the focused test before implementation.**

Run: `node --test packages/institutegpt/src/advance-product.test.mjs`
Expected: FAIL because the Advance module does not yet exist.

- [ ] **Step 3: Implement the minimal module.** Define immutable vocabularies and creators. Keep validation structural and provider-neutral. Model issuer/authority references rather than granting external authority.

```js
export const ADVANCE_PRODUCT = Object.freeze({
  productKey: 'INSTITUTEGPT_ADVANCE',
  parentProduct: 'INSTITUTEGPT',
  role: 'universal_learning_skills_and_advancement',
  firstClass: true,
});

export const ADVANCE_CAPABILITY_GROUPS = Object.freeze([
  'learning', 'courses_programmes', 'learning_paths', 'skills_competencies',
  'labs_practice_projects', 'cpd_professional_learning',
  'badges_certificates_credentials', 'learning_wallet', 'skills_passport',
  'pathway_builder', 'education_marketplace', 'provider_integrations',
]);
```

- [ ] **Step 4: Run the focused tests after implementation.**

Run: `node --test packages/institutegpt/src/advance-product.test.mjs`
Expected: PASS with all Advance contract tests passing.

- [ ] **Step 5: Export Advance contracts from `index.mjs`** and run the existing InstituteGPT tests.

Run: `node --test packages/institutegpt/src/*.test.mjs`
Expected: PASS, including existing Exams/OpenEd tests.

- [ ] **Step 6: Commit.**

```bash
git add packages/institutegpt/src/advance-product.mjs packages/institutegpt/src/advance-product.test.mjs packages/institutegpt/src/index.mjs
git commit -m "feat: add InstituteGPT Advance contracts"
```

### Task 2: Education capability expansion

**Files:**
- Modify: `packages/institutegpt/src/education-capability-map.mjs`
- Modify: `packages/institutegpt/src/education-capability-map.test.mjs` if present; otherwise create it as the focused capability test file

**Interfaces:**
- Keeps `EDUCATION_CAPABILITY_DOMAINS`, `EDUCATION_PROGRESSION_STAGES`, `findEducationCapabilities`, and `getEducationDomain` unchanged.
- Adds explicit coverage for Advance capability groups and emerging integrations without duplicating product semantics.

- [ ] **Step 1: Add failing assertions** that capability lookup resolves labs, learning wallet, skills passport, pathway builder, education marketplace, provider adapter, stackable credentials, verifiable badges, skill evidence, project evidence, AI learning, child-safe controls, employer learning, and national learning programmes.

- [ ] **Step 2: Run the focused capability test and observe the missing capability failures.**

Run: `node --test packages/institutegpt/src/education-capability-map.test.mjs`
Expected: FAIL on newly asserted capabilities.

- [ ] **Step 3: Extend the existing domains** with only reusable education capabilities. Add lab/sandbox/cloud/notebook/remote/hardware-connected practice, wallet/passport/pathway/marketplace capabilities, digital credentials and provider integrations, plus age-safe and ecosystem interoperability entries.

- [ ] **Step 4: Run the focused test again.**

Run: `node --test packages/institutegpt/src/education-capability-map.test.mjs`
Expected: PASS.

- [ ] **Step 5: Run all InstituteGPT tests.**

Run: `node --test packages/institutegpt/src/*.test.mjs`
Expected: PASS.

- [ ] **Step 6: Commit.**

```bash
git add packages/institutegpt/src/education-capability-map.mjs packages/institutegpt/src/education-capability-map.test.mjs
git commit -m "feat: broaden InstituteGPT education capabilities"
```

### Task 3: Product registry and provider ecosystem

**Files:**
- Modify: `packages/omnii-products/src/catalog.mjs`
- Create: `packages/institutegpt/src/advance-providers.mjs`
- Create: `packages/institutegpt/src/advance-providers.test.mjs`
- Modify: `packages/institutegpt/src/index.mjs`

**Interfaces:**
- Produces `ADVANCE_PROVIDER_PROFILES`, `getAdvanceProviderProfile(providerKey)`, `listAdvanceProviders()`.
- Provider profiles expose `providerKey`, `category`, `integrationModes`, `authorityModel`, `ageConstraints`, and supported `capabilities` without claiming live API availability.

- [ ] **Step 1: Write failing tests** that require first-class Advance catalog registration and neutral profiles for GitHub Education, OpenAI education/Academy, Anthropic education, Microsoft Learn, AWS Educate, NVIDIA DLI, Google, IBM SkillsBuild, Cisco Networking Academy, Salesforce Trailhead, Coursera, Udemy, Alison, FutureLearn, DataCamp, Pluralsight and a generic professional-body/employer provider class.

- [ ] **Step 2: Run the provider tests.**

Run: `node --test packages/institutegpt/src/advance-providers.test.mjs`
Expected: FAIL because the module is absent.

- [ ] **Step 3: Implement provider-neutral profiles.** Mark integrations as `catalog`, `deep_link`, `progress`, `achievement`, `credential_reference`, `verification`, or `api` only where the architecture can support the mode. Do not invent undocumented provider APIs.

- [ ] **Step 4: Add `INSTITUTEGPT_ADVANCE` to the built product catalog** with the same `carbonactual/omnii` repository and architectural class `InstituteGPT universal learning, skills and advancement product`.

- [ ] **Step 5: Export provider profiles** from InstituteGPT index and rerun focused tests.

Run: `node --test packages/institutegpt/src/advance-providers.test.mjs packages/institutegpt/src/advance-product.test.mjs`
Expected: PASS.

- [ ] **Step 6: Commit.**

```bash
git add packages/omnii-products/src/catalog.mjs packages/institutegpt/src/advance-providers.mjs packages/institutegpt/src/advance-providers.test.mjs packages/institutegpt/src/index.mjs
git commit -m "feat: register InstituteGPT Advance ecosystem providers"
```

### Task 4: Canonical architecture update

**Files:**
- Modify: `docs/canonical/INSTITUTEGPT_CANONICAL_ARCHITECTURE.md`
- Create: `docs/canonical/INSTITUTEGPT_ADVANCE_CANONICAL_ARCHITECTURE.md`

**Interfaces:**
- Documentation is the canonical architectural expression of Advance and its relationship to OpenEd, Notebook and Exams.

- [ ] **Step 1: Add the Advance sections** to the InstituteGPT canonical document: first-class boundary, learning/skills/credential precedence, labs as capability, child-to-lifelong coverage, AI learning, provider adapters, wallet/passport, pathway builder, marketplace, CPD and value-chain integration.

- [ ] **Step 2: Create the focused Advance canonical document** with the complete current/emerging/future scope and governance boundaries from the approved spec.

- [ ] **Step 3: Validate documentation consistency** against the spec and existing OpenEd/Exams product descriptions. Ensure no statement makes Advance the authority for external credentials or regulated practice.

- [ ] **Step 4: Commit.**

```bash
git add docs/canonical/INSTITUTEGPT_CANONICAL_ARCHITECTURE.md docs/canonical/INSTITUTEGPT_ADVANCE_CANONICAL_ARCHITECTURE.md
git commit -m "docs: define InstituteGPT Advance canonical architecture"
```

### Task 5: Full regression and evidence

**Files:**
- No new source files unless a failing regression test requires a targeted fix.
- Modify existing test/config files only when the failure is caused by the Advance integration.

**Interfaces:**
- Uses existing CI and package test commands; no broad unrelated test gate is introduced.

- [ ] **Step 1: Run the InstituteGPT suite.**

Run: `node --test packages/institutegpt/src/*.test.mjs`
Expected: PASS.

- [ ] **Step 2: Run the root TypeScript check.**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Run the existing runtime test command.**

Run: `npm test`
Expected: PASS with no unrelated legacy test expansion.

- [ ] **Step 4: Run the production build.**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Inspect the final commit history and exact `main` SHA.** Confirm the Advance commits are reachable from `main`.

- [ ] **Step 6: Verify GitHub Actions for the final SHA** and report only the observed status. Do not call the change CI-certified until the exact SHA has a successful run.

- [ ] **Step 7: Commit any necessary targeted regression fixes.**

```bash
git add <only-files-changed-by-the-fix>
git commit -m "fix: harden InstituteGPT Advance integration"
```
