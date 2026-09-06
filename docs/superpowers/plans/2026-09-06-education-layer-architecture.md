# Education Layer Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce the approved Education Layer architecture across canonical documentation, product metadata, InstituteGPT contracts and tests without changing OMNII constitutional semantics.

**Architecture:** Treat Education as a domain composition above shared OMNII primitives. Keep InstituteGPT as the canonical Education Layer product; keep learning, skills, labs, credentials, badges, CPD, Learning Wallet and Skills Passport as native InstituteGPT capabilities; keep OpenEd Bot, Notebook and Exams as sibling products; represent GitHub Education and other providers through replaceable adapters. Cross-layer services such as HAPI, Root, Actual, Evidence, Pulse, Atlas and Opportunities remain shared OMNII architecture and are never made subordinate to InstituteGPT.

**Tech Stack:** Markdown canonical architecture, ECMAScript `.mjs` contracts/tests, existing Node 22 CI, GitHub repository contents API.

**Spec:** `docs/superpowers/specs/2026-09-06-education-layer-architecture-design.md`

## Global Constraints

- `Education Layer → InstituteGPT` is the canonical primary product relationship.
- There is no separate `Advance` product.
- Learning, certification, badges, CPD and lifelong advancement remain native InstituteGPT services.
- OpenEd Bot, Notebook and Exams are sibling Education Layer products/compositions.
- NOUN Bot remains an institution-specific OpenEd Bot deployment.
- Provider integrations are replaceable adapters/profiles and must not become constitutional dependencies.
- HAPI, Root, Index, Vault, Terminal, Actual, Atlas, IO, Evidence, Pulse and Opportunities remain shared OMNII architecture.
- New education semantics must compose existing OMNII primitives and universal composition contracts rather than introduce competing foundations.
- Credential recognition and regulated authorization remain attributable to legitimate issuers/regulators.
- Sandbox, simulation and future/unknown states must not silently become Actual.
- Application/onboarding learner context is governed, explainable, adaptive and reversible; child data requires age-appropriate safeguarding and does not silently become an adult employment profile.
- The architecture remains modular, interoperable, localizable and vendor-neutral.

---

### Task 1: Establish the approved architecture design artifact

**Files:**
- Create: `docs/superpowers/specs/2026-09-06-education-layer-architecture-design.md`

**Interfaces:**
- Consumes: approved Education Layer architecture and existing OMNII constitutional rules.
- Produces: normative architecture reference used by subsequent canonical documents and implementation tasks.

- [x] **Step 1: Write the approved design**

The design must state the exact hierarchy, product boundaries, native capabilities, provider adapter model, credential authority boundary, cross-layer relationships, Education Floor, AI learners, and architectural invariants.

- [x] **Step 2: Verify the design has no competing foundation**

Check that the document explicitly prohibits an alternate graph, identity model, authority model, runtime, or constitutional kernel inside Education.

- [x] **Step 3: Commit the design artifact**

The file was committed as `a507b6a57a99744a9663dd610b9beb1e8ae8e248` with message `docs: add approved Education Layer architecture design`.

---

### Task 2: Harden the main InstituteGPT canonical architecture

**Files:**
- Modify: `docs/canonical/INSTITUTEGPT_CANONICAL_ARCHITECTURE.md`

**Interfaces:**
- Consumes: OMNII canonical architecture and approved Education Layer design.
- Produces: a single canonical statement of Education Layer position, InstituteGPT boundary, sibling products, shared services, Floor and authority model.

- [x] **Step 1: Fetch the current file and preserve its current blob SHA before editing**

Use `GitHub.fetch_file` on `docs/canonical/INSTITUTEGPT_CANONICAL_ARCHITECTURE.md` and use the returned SHA for the update.

- [ ] **Step 2: Replace ambiguous cross-layer ownership language**

Replace any wording that implies InstituteGPT owns HAPI/Root or other shared OMNII foundations with explicit consumption/integration language. Use:

```text
HAPI/Root ↔ Education Layer ↔ InstituteGPT
```

and identify Actual, Evidence, Pulse, Atlas and Opportunities as shared ecosystem services consumed by education.

- [ ] **Step 3: Add the strict Education Layer hierarchy**

Use:

```text
Education Layer
├─ InstituteGPT
├─ OpenEd Bot
├─ Notebook
└─ Exams
```

State that institutional deployments such as NOUN Bot are deployments/configurations rather than new universal education ontologies.

- [ ] **Step 4: Separate products, capabilities and providers**

Explicitly classify native InstituteGPT capabilities separately from sibling products and external-provider adapters. Preserve the rule that a capability becomes a first-class product only after an independently meaningful boundary emerges.

- [ ] **Step 5: Add credential authority and evidence boundary**

State the progression:

```text
learning → evidence/demonstration → recognition/credential → professional/legal authorization
```

and prohibit automatic elevation from one stage to another.

- [ ] **Step 6: Run canonical semantic checks**

Search the modified document for `Advance`, HAPI ownership, Root ownership, provider-as-foundation language and the exact four Education Layer products. The expected result is: no `Advance` product; shared HAPI/Root; explicit four-product hierarchy.

- [ ] **Step 7: Commit the canonical architecture update**

Commit with message `docs: harden Education Layer and InstituteGPT boundaries`.

---

### Task 3: Align the InstituteGPT learning-services doctrine

**Files:**
- Modify: `docs/canonical/INSTITUTEGPT_LEARNING_SERVICES_CANONICAL.md`

**Interfaces:**
- Consumes: the main InstituteGPT canonical architecture and approved design.
- Produces: focused service doctrine that remains inside InstituteGPT without implying new product boundaries.

- [ ] **Step 1: Fetch current file and blob SHA**

Use `GitHub.fetch_file` before updating the file.

- [ ] **Step 2: Preserve native InstituteGPT ownership**

Ensure learning, courses, programmes, skills, competencies, labs, projects, CPD, badges, certificates, credential pathways, Learning Wallet, Skills Passport, pathway builder and provider integrations are expressed as InstituteGPT services/capabilities.

- [ ] **Step 3: Strengthen onboarding curation**

Retain application/onboarding as a governed learner-context stage and explicitly state that curation uses learner interests, goals, stage, prior knowledge, skills, experience, career direction, formats, pace, time, language, accessibility, connectivity, location, budget, provider and credential preferences, professional/CPD requirements and lab/project/assessment preferences.

- [ ] **Step 4: Strengthen children and AI learner boundaries**

State child safeguarding and data-boundary rules and distinguish AI learning/capability state from human qualifications and regulated authority.

- [ ] **Step 5: Strengthen provider adapter and credential semantics**

Keep GitHub Education/Skills, OpenAI Education/Academy, Anthropic Education, Microsoft Learn, AWS Educate, NVIDIA DLI, Google, IBM SkillsBuild, Cisco Networking Academy, Salesforce Trailhead, Coursera, Udemy, Alison, Coursiv, edX, FutureLearn, LinkedIn Learning, Khan Academy, DataCamp, Pluralsight, Codecademy, freeCodeCamp and other provider classes behind replaceable adapters. Never imply undocumented APIs; adapters only expose supported data/capabilities.

- [ ] **Step 6: Commit the learning-services doctrine**

Commit with message `docs: align InstituteGPT learning services with Education Layer`.

---

### Task 4: Enforce product hierarchy in product metadata

**Files:**
- Modify: `packages/omnii-products/src/catalog.mjs`
- Test: `packages/omnii-products/tests/catalog.test.mjs`

**Interfaces:**
- Consumes: Education Layer canonical product hierarchy.
- Produces: machine-checkable product lineage and negative assertion against the former Advance product.

- [ ] **Step 1: Fetch current catalog and test files with current SHAs**

Use `GitHub.fetch_file` for both paths.

- [ ] **Step 2: Add explicit Education Layer metadata**

Keep `INSTITUTEGPT`, `OPEN_ED_BOT`, `INSTITUTEGPT_NOTEBOOK`, `INSTITUTEGPT_EXAMS` in `carbonactual/omnii` and preserve their architectural classes as Education Layer product/compositions. Keep `NOUN_BOT` as institution-specific OpenEd Bot deployment.

- [ ] **Step 3: Add product-lineage assertions**

Tests must assert:

```js
INSTITUTEGPT is present and its repository is carbonactual/omnii
OPEN_ED_BOT is present
INSTITUTEGPT_NOTEBOOK is present
INSTITUTEGPT_EXAMS is present
NOUN_BOT is present and institution-specific
INSTITUTEGPT_ADVANCE is absent
```

- [ ] **Step 4: Run product catalog tests**

Run the existing catalog test command used by the repository, not the broad `npm test` gate unless needed for final verification.

- [ ] **Step 5: Commit metadata/test hardening**

Commit with message `test: enforce Education Layer product hierarchy`.

---

### Task 5: Make the education product composition contract explicit

**Files:**
- Create: `packages/institutegpt/src/education-layer-contract.mjs`
- Create: `packages/institutegpt/src/education-layer-contract.test.mjs`
- Modify: `packages/institutegpt/src/index.mjs`

**Interfaces:**
- Consumes: existing InstituteGPT learning services, provider profiles and product catalog conventions.
- Produces: small reusable machine-readable contract describing Education Layer product roles and conformance rules.

- [ ] **Step 1: Write failing contract tests**

The test must require the canonical product map and boundary rules:

```js
assert.equal(EDUCATION_LAYER.id, 'EDUCATION_LAYER');
assert.equal(EDUCATION_LAYER.canonicalProduct, 'INSTITUTEGPT');
assert.deepEqual(EDUCATION_LAYER.products, [
  'INSTITUTEGPT',
  'OPEN_ED_BOT',
  'INSTITUTEGPT_NOTEBOOK',
  'INSTITUTEGPT_EXAMS'
]);
assert.equal(EDUCATION_LAYER.hasAdvanceProduct, false);
assert.equal(EDUCATION_LAYER.sharedFoundations.HAPI, 'SHARED');
assert.equal(EDUCATION_LAYER.sharedFoundations.ROOT, 'SHARED');
```

Also test a classification helper:

```js
classifyEducationComponent({ kind: 'learning_capability' }).layer === 'INSTITUTEGPT_CAPABILITY'
classifyEducationComponent({ kind: 'provider_adapter' }).layer === 'PROVIDER_ADAPTER'
classifyEducationComponent({ kind: 'institution_deployment' }).layer === 'DEPLOYMENT'
```

- [ ] **Step 2: Run the focused test to confirm failure**

Run: `node --test packages/institutegpt/src/education-layer-contract.test.mjs`

Expected: FAIL because the module does not yet exist.

- [ ] **Step 3: Implement the minimal contract**

Export:

```js
export const EDUCATION_LAYER = Object.freeze({
  id: 'EDUCATION_LAYER',
  canonicalProduct: 'INSTITUTEGPT',
  products: Object.freeze([
    'INSTITUTEGPT',
    'OPEN_ED_BOT',
    'INSTITUTEGPT_NOTEBOOK',
    'INSTITUTEGPT_EXAMS'
  ]),
  hasAdvanceProduct: false,
  sharedFoundations: Object.freeze({
    HAPI: 'SHARED',
    ROOT: 'SHARED',
    ACTUAL: 'SHARED',
    EVIDENCE: 'SHARED',
    PULSE: 'SHARED',
    ATLAS: 'SHARED',
    OPPORTUNITIES: 'SHARED'
  }),
  nativeInstituteGPTCapabilities: Object.freeze([
    'learning',
    'skills',
    'competencies',
    'labs',
    'projects',
    'assessment',
    'badges',
    'certificates',
    'credential_pathways',
    'cpd',
    'learning_wallet',
    'skills_passport',
    'pathway_builder',
    'provider_integrations'
  ])
});

export function classifyEducationComponent({ kind } = {}) {
  const map = Object.freeze({
    learning_capability: 'INSTITUTEGPT_CAPABILITY',
    provider_adapter: 'PROVIDER_ADAPTER',
    institution_deployment: 'DEPLOYMENT',
    sibling_product: 'EDUCATION_PRODUCT'
  });
  return { kind, layer: map[kind] ?? 'UNCLASSIFIED' };
}
```

- [ ] **Step 4: Export the contract from InstituteGPT index**

Add a single explicit export from `packages/institutegpt/src/index.mjs`; do not change existing export names or remove current services.

- [ ] **Step 5: Run the focused test again**

Run: `node --test packages/institutegpt/src/education-layer-contract.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit the machine-readable contract**

Commit with message `feat: add Education Layer conformance contract`.

---

### Task 6: Cross-check documentation, code and negative semantic cases

**Files:**
- Test: `packages/institutegpt/src/education-layer-contract.test.mjs`
- Test: `packages/omnii-products/tests/catalog.test.mjs`

**Interfaces:**
- Consumes: canonical docs and machine-readable product/service contracts.
- Produces: regression protection against future architectural drift.

- [ ] **Step 1: Add negative semantic assertions**

Require no `INSTITUTEGPT_ADVANCE` product and require `EDUCATION_LAYER.hasAdvanceProduct === false`.

- [ ] **Step 2: Add shared-foundation assertions**

Require HAPI, ROOT, ACTUAL, EVIDENCE, PULSE, ATLAS and OPPORTUNITIES to remain marked `SHARED` rather than InstituteGPT-owned.

- [ ] **Step 3: Add provider neutrality assertion**

The education contract must contain provider adapters only as a capability category and must not list an individual vendor as a constitutional foundation.

- [ ] **Step 4: Run the focused education test set**

Run:

```bash
node --test packages/institutegpt/src/education-layer-contract.test.mjs packages/institutegpt/src/institutegpt-learning-services.test.mjs packages/institutegpt/src/institutegpt-providers.test.mjs
```

Expected: PASS for all listed tests.

- [ ] **Step 5: Commit regression protection**

Commit with message `test: protect Education Layer architectural boundaries`.

---

### Task 7: Full repository verification and CI evidence

**Files:**
- No intended source changes; verification only.

**Interfaces:**
- Consumes: all implementation changes from Tasks 2–6.
- Produces: exact commit SHA, local test evidence and GitHub Actions evidence.

- [ ] **Step 1: Verify the current `main` head**

Fetch the repository ref and record the exact commit SHA.

- [ ] **Step 2: Run focused education tests**

Run the exact command from Task 6 and require PASS.

- [ ] **Step 3: Run repository typecheck**

Run the repository's existing typecheck command and require PASS.

- [ ] **Step 4: Run repository runtime/package/build verification**

Use the same commands enforced by `.github/workflows/ci.yml`, without broadening the test gate to unrelated legacy tests.

- [ ] **Step 5: Verify the exact-head GitHub Actions run**

Use GitHub Actions data for the exact current commit. Do not infer success from an older commit or a stale run. Require the exact-head job to be `completed` with `success`.

- [ ] **Step 6: Verify changed-file lineage**

Compare the final commit against its parent and confirm only the intended canonical docs, Education Layer contract, product metadata/tests and plan/spec artifacts changed.

- [ ] **Step 7: Report completion from evidence**

Only claim the architecture has been implemented once the exact-head CI result is successful and the semantic regression tests pass.
