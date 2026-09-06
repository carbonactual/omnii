# Canonical Universal Capability Registry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand OMNII's reusable Common Layer registry with the newly identified universal capabilities while preserving the existing constitutional primitives and canonical ownership boundaries.

**Architecture:** Extend the existing `public.omnii_common_primitives` registry rather than creating a parallel registry. Add reusable capabilities as `common` or `cross_cutting` entries that point to existing backing contracts or explicit semantic composition contracts; do not create duplicate domain-specific systems.

**Tech Stack:** PostgreSQL/Supabase migrations, Markdown architecture/specification, existing OMNII common/runtime contracts, GitHub Actions CI.

**Spec:** `docs/superpowers/specs/2026-09-06-canonical-universal-capability-registry-design.md`

## Global Constraints

- Preserve the existing constitutional kernel and OMNII object/relationship model.
- Reuse existing canonical tables/contracts before adding new backing structures.
- Keep external authority external; a registry entry cannot itself grant legal authority.
- Preserve identity, provenance, authority, lifecycle, relationships and auditability.
- Do not replace the existing Common Primitive Registry; extend it.
- Keep the architecture open-world and extensible; future/emerging capabilities require provenance/versioning.
- Products compose canonical capabilities and may not create competing universal definitions.
- Maintain the existing `build once → strengthen once → compose many times → configure locally → deploy/handoff cleanly` rule.

---

### Task 1: Add the Universal Capability Registry expansion migration

**Files:**
- Create: `supabase/migrations/20260906090000_canonical_universal_capability_registry_20260906.sql`
- Test: existing CI migration/schema checks

**Interfaces:**
- Consumes: `public.omnii_common_primitives`
- Produces: idempotent registration of the expanded reusable capability set.

- [ ] **Step 1: Write the migration with idempotent registrations**

Add the following capabilities with stable keys, semantic classes, appropriate layer roles, canonical backing references, and descriptions:

`identifier, role, profile, representation, membership, delegation, request, inquiry, application, submission, registration, enrollment, nomination, referral, claim, form, questionnaire, declaration, statement, document, evidence, proof, attestation, provenance, search, query, recommendation, scheduling, appointment, booking, reservation, queue, allocation, task, assignment, case, stage, checkpoint, action, execution, fulfillment, delivery, assessment, examination, interview, inspection, audit, evaluation, scoring, ranking, result, finding, recommendation_decision, approval, rejection, selection, adjudication, permission, consent, mandate, license, permit, clearance, policy, rule, control, product, quote, invoice, payment, receipt, refund, return, contract, obligation, ownership, custody, instrument, portfolio, funding, capital, vacancy, investment_position, opportunity, notification, invitation, conversation, collaboration, meeting, feedback, address, territory, movement, trip, shipment, state, status, change, version, progression, milestone, outcome, history, tracking, analytics, scenario, simulation, ai_identity, agent_identity, ai_minting, ai_knowledge_package, ai_training, ai_assessment, ai_deployment, ai_evaluation, ai_monitoring, ai_update, ai_retirement, human_supervision, api, adapter, connector, protocol, schema_mapping, import_export, synchronization`.

Use stable semantic classes rather than inventing new foundation classes for these capabilities.

- [ ] **Step 2: Add semantic invariants**

The migration must not introduce a new constitutional kernel. For authority-related entries, descriptions must explicitly state that the capability represents a governed record/decision/access pattern and does not itself create external legal authority.

For AI entries, descriptions must distinguish technical capability from authorization and human professional qualification.

- [ ] **Step 3: Run migration-focused verification**

Run the repository's established schema/typecheck path in CI. Confirm the migration parses, registry uniqueness is preserved, and existing common-layer rows remain intact.

- [ ] **Step 4: Commit**

Commit message:

`feat: register expanded universal ecosystem capabilities`

---

### Task 2: Add explicit canonical ownership and anti-duplication documentation

**Files:**
- Modify: `docs/architecture/OMNII_COMMON_LAYER_CANONICAL_1_0.md`
- Modify: `docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md`

**Interfaces:**
- Consumes: the new canonical capability registry design.
- Produces: explicit ownership/boundary language for HAPI, HAPI World, InstituteGPT, General Service, General Marketplace, Trade, Investment, Markets, Opportunities, NGIN, NAIRE, Root, Actual, Atlas and IO.

- [ ] **Step 1: Add the ownership table**

Document the canonical owner of each major ecosystem capability and state that domain products compose these capabilities instead of duplicating them.

- [ ] **Step 2: Add the identity/HAPI rule**

Document that a human enters through HAPI, receives an ecosystem-native identity hashtag and associated personal AI, and that external identifiers are linked records rather than replacements for the ecosystem identity.

- [ ] **Step 3: Add the InstituteGPT AI-learning boundary**

Document that all learning/instruction/training/CPD/competency development belongs to InstituteGPT and that personal/entity AI can be educated and evaluated there without inheriting legal professional authority automatically.

- [ ] **Step 4: Add the Root/Actual/Atlas projection rule**

Document `verified/tokenized state → Root → current operational representation → Actual → governed projection → Atlas`, with IO recording meaningful transitions.

- [ ] **Step 5: Add the universal anti-duplication rule**

State that a product must discover and compose an existing universal capability before proposing a product-specific primitive.

- [ ] **Step 6: Commit**

Commit message:

`docs: formalize canonical capability ownership boundaries`

---

### Task 3: Add regression tests for universal capability ownership

**Files:**
- Create: `packages/omnii-runtime/tests/canonical-universal-capability-registry.test.ts`

**Interfaces:**
- Consumes: canonical primitive registry lookup/persistence contracts.
- Produces: deterministic tests proving required universal capability keys exist and external authority is not conflated with registry presence.

- [ ] **Step 1: Write failing tests**

Test that `application`, `appointment`, `assessment`, `evidence`, `verification`, `opportunity`, `service`, `marketplace`, `ai_identity`, `ai_knowledge_package`, `progression`, `change`, `version` and `attestation` are present in the canonical registry or its documented canonical backing.

Test that an authority-bearing capability has an authority reference/semantics but does not imply issuance by OMNII.

Test that AI capability metadata does not imply human professional authorization.

- [ ] **Step 2: Run tests and verify failures are meaningful**

Run the focused runtime test command used by the repository.

- [ ] **Step 3: Implement only the required lookup assertions**

Use the existing repository APIs/contracts; do not create a second registry API.

- [ ] **Step 4: Run the focused suite**

Expected: all new assertions pass.

- [ ] **Step 5: Commit**

Commit message:

`test: protect universal capability ownership semantics`

---

### Task 4: Run full certification and reconcile any failures

**Files:**
- Modify only files required by actual CI failures.

**Interfaces:**
- Consumes: completed registry migration, documentation and regression tests.
- Produces: verified main branch state.

- [ ] **Step 1: Run repository typecheck**

Expected: PASS.

- [ ] **Step 2: Run runtime tests**

Expected: all existing tests plus the new registry tests pass.

- [ ] **Step 3: Run runtime package build/typecheck**

Expected: PASS.

- [ ] **Step 4: Run production build**

Expected: PASS.

- [ ] **Step 5: Verify final GitHub Actions run against exact commit**

Confirm the run head SHA matches the final main revision and every required gate concludes successfully.

- [ ] **Step 6: Commit only if CI remediation changes code**

Use a focused fix commit and repeat certification.
