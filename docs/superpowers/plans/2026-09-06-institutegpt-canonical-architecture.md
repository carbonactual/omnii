# InstituteGPT Canonical Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make InstituteGPT the canonical learning and AI-education composition layer while reusing OMNII universal application, scheduling, assessment, evidence, credential, opportunity and service capabilities.

**Architecture:** InstituteGPT owns learning meaning and educational progression; the Common Layer supplies reusable mechanics; HAPI/HAPI World supplies human/AI participation; Root, Actual and Atlas preserve canonical identity/state/projection; IO records consequential transitions. External institutions, professional bodies and regulators retain their own credential and authorization authority.

**Tech Stack:** Existing OMNII runtime contracts, PostgreSQL/Supabase, TypeScript packages, canonical Markdown architecture, GitHub Actions CI.

**Spec:** `docs/canonical/INSTITUTEGPT_CANONICAL_ARCHITECTURE.md`

## Global Constraints

- All learning/instruction/training/study/practice/competency development/CPD/AI education belongs to InstituteGPT.
- Reuse existing universal capabilities before creating new education-specific primitives.
- Preserve external authority for external certificates, qualifications, registrations and licences.
- Keep human and AI learning records linked but distinct.
- A human professional credential does not automatically become an AI professional licence.
- A simulation/result does not become Actual without governed real-world evidence.
- HAPI is Human API; HAPI World is AI-side participation associated with the ecosystem identity hashtag.
- Root is durable identity-linked verified/tokenized state; Actual is current operational reality; Atlas is governed projection; IO records consequential transitions.
- Physical, online, hybrid, workplace, field and self-directed education are all first-class modes.
- No proprietary education, proctoring, interview or content provider is constitutional.

---

### Task 1: Map the existing repository to InstituteGPT boundaries

**Files:**
- Inspect: `packages/*`
- Inspect: `docs/architecture/*`
- Inspect: `docs/canonical/*`

**Interfaces:**
- Consumes: current OMNII object, relationship, common capability, HAPI, IO and authority contracts.
- Produces: implementation map showing which existing contracts InstituteGPT should compose and which gaps remain.

- [ ] **Step 1: Locate existing learning/education/AI-related modules**

Search for education, institute, learning, certification, competency, course, assessment, credential, AI/agent, CPD and training contracts.

- [ ] **Step 2: Locate existing application, workflow, assessment, evidence and authorization contracts**

Confirm their canonical package/table owners before adding education-specific data structures.

- [ ] **Step 3: Record gaps**

Classify each gap as `existing universal capability`, `InstituteGPT domain capability`, `institutional configuration`, `integration adapter` or `new shared capability`.

---

### Task 2: Define InstituteGPT domain contracts

**Files:**
- Create: appropriate focused TypeScript contracts under the existing education/runtime package location identified in Task 1.
- Test: focused unit tests beside the contracts.

**Interfaces:**
- Consumes: canonical universal capability types.
- Produces: stable contracts for `learning_intent`, `learning_object`, `programme`, `curriculum`, `competency`, `learning_activity`, `learning_experience`, `learning_record`, `ai_learning_record`, `assessment_blueprint`, `credential_pathway` and `cpd_plan`.

- [ ] **Step 1: Write failing tests for the domain contract invariants**

Cover identity linkage, provenance, authority context, lifecycle, version, prerequisites and external-authority references.

- [ ] **Step 2: Implement minimal domain contracts**

Keep education semantics in InstituteGPT and universal mechanics in Common Layer contracts.

- [ ] **Step 3: Run focused tests**

Expected: all contract invariants pass.

- [ ] **Step 4: Commit**

`feat: define InstituteGPT domain contracts`

---

### Task 3: Define the human and AI learning-record boundary

**Files:**
- Create/modify: InstituteGPT record contracts and persistence mapping files identified in Task 1.
- Test: focused learning-record tests.

**Interfaces:**
- Consumes: Root/HAPI identity, InstituteGPT learning contracts and universal Evidence/Result/Credential semantics.
- Produces: separate but linked `human_learning_record` and `ai_learning_record` representations.

- [ ] **Step 1: Write tests**

Verify that a human credential can be referenced by an AI knowledge/capability context without being copied as AI licensure.

Verify AI updates carry provenance, version, source, assessment and authorization context.

- [ ] **Step 2: Implement records**

Persist identity reference, learning events, evidence references, results, credential references, capability changes, version history and supervision constraints.

- [ ] **Step 3: Run tests**

Expected: all human/AI boundary tests pass.

- [ ] **Step 4: Commit**

`feat: add InstituteGPT human and AI learning records`

---

### Task 4: Implement the universal Learn/How-To routing contract

**Files:**
- Create/modify: InstituteGPT routing/intent contract location identified in Task 1.
- Test: routing tests.

**Interfaces:**
- Consumes: IO intent/context and common Discovery/Matching/Workflow capabilities.
- Produces: normalized InstituteGPT learning intents such as `learn`, `explain`, `how_to`, `practice`, `simulate`, `test`, `prepare`, `qualify`, `continue_learning`.

- [ ] **Step 1: Write failing routing tests**

A learning request originating from a non-education product must resolve to InstituteGPT rather than a product-owned learning flow.

- [ ] **Step 2: Implement routing**

Preserve originating product/domain context while changing capability ownership to InstituteGPT.

- [ ] **Step 3: Run focused tests**

Expected: all learning-intent routing tests pass.

- [ ] **Step 4: Commit**

`feat: route ecosystem learning intents through InstituteGPT`

---

### Task 5: Bind professional learning, CPD, internships and practical experience

**Files:**
- Create/modify: InstituteGPT progression/experience contracts.
- Test: progression tests.

**Interfaces:**
- Consumes: Opportunities, Application, Scheduling, Assignment, Evidence, Assessment and Credential capabilities.
- Produces: composable pathways for `internship`, `SIWES`, `apprenticeship`, `professional_exam`, `promotion_exam`, `CPD`, `recertification` and `practical_competency`.

- [ ] **Step 1: Write failing lifecycle tests**

Test `opportunity → application → matching → assignment → experience → assessment → evidence → result → recognition` and CPD renewal paths.

- [ ] **Step 2: Implement the composition layer**

Do not create duplicate application, opportunity, scheduling, assessment or evidence models.

- [ ] **Step 3: Run focused tests**

Expected: progression and boundary tests pass.

- [ ] **Step 4: Commit**

`feat: compose professional learning and progression in InstituteGPT`

---

### Task 6: Bind external credentials and authority-preserving verification

**Files:**
- Create/modify: credential/verification adapters and mapping contracts.
- Test: credential authority tests.

**Interfaces:**
- Consumes: universal Evidence, Attestation, Verification, Credential, Authority and Registration capabilities.
- Produces: verified external-credential references and ecosystem-native credential issuance rules.

- [ ] **Step 1: Write tests**

Verify issuer identity, credential provenance, framework/scope, validity period, revocation state and authority reference.

Verify that storing/verifying an external credential does not make OMNII its issuer.

- [ ] **Step 2: Implement adapters**

Support machine-readable and manual verification paths without making any one provider constitutional.

- [ ] **Step 3: Run tests**

Expected: authority-preserving credential tests pass.

- [ ] **Step 4: Commit**

`feat: preserve external credential authority in InstituteGPT`

---

### Task 7: Bind physical/online/hybrid learning and integrity providers

**Files:**
- Create/modify: integration adapters discovered in Task 1.
- Test: adapter contract tests.

**Interfaces:**
- Consumes: Scheduling, Location, Resource, Communication, Assessment, Proctoring/invigilation and Interoperability capabilities.
- Produces: provider-neutral education sessions for classroom, online, hybrid, field, lab and workplace learning.

- [ ] **Step 1: Write adapter contract tests**

Verify provider replacement does not change InstituteGPT learning semantics.

- [ ] **Step 2: Implement provider-neutral integration interfaces**

Keep proctoring, interview and invigilation as replaceable integrations.

- [ ] **Step 3: Run tests**

Expected: all adapter contracts pass.

- [ ] **Step 4: Commit**

`feat: add provider-neutral InstituteGPT delivery integrations`

---

### Task 8: Full repository certification

**Files:**
- Modify only files required by verified failures.

**Interfaces:**
- Consumes: completed InstituteGPT contracts and integrations.
- Produces: verified main branch state.

- [ ] **Step 1: Run repository typecheck.**
- [ ] **Step 2: Run full runtime test suite.**
- [ ] **Step 3: Run package typecheck/build.**
- [ ] **Step 4: Run production build.**
- [ ] **Step 5: Verify exact GitHub Actions head SHA and all required gates.**
- [ ] **Step 6: Fix only actual failures, commit focused remediations, and rerun certification.**
