# Internet Recycle Bin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Formalize and machine-validate the Internet Recycle Bin as a cross-cutting digital exit/recovery lifecycle without creating a competing canonical primitive.

**Architecture:** Reuse canonical object, authority, relationship, event, evidence, continuity, Ash and Phoenix semantics. Add one versioned schema for disposition state, one conformance validator/test pair, and one architecture contract describing dependency-aware deletion, recovery, retention, preservation and purge.

**Tech Stack:** JSON Schema 2020-12, Node.js ESM tests, existing OMNII npm scripts and repository documentation conventions.

**Spec:** `docs/superpowers/specs/2026-09-17-internet-recycle-bin-design.md`

## Global Constraints

- Do not create a new constitutional root/registry/ledger/authority system.
- Recycle state is lifecycle/disposition state, not ownership or authority.
- Preserve provenance, dependencies, evidence, liability and continuity.
- Distinguish recoverable, revoked, expired, orphaned, quarantined, preserved, archived, suppressed, purgable and purged states.
- Permanent destruction is itself an auditable lifecycle event.
- Provider-specific mechanisms remain adapters.
- Unknown state must not be silently treated as trusted or destroyed.

---

### Task 1: Add the canonical digital disposition schema

**Files:**
- Create: `schemas/omnii-digital-disposition.schema.json`

**Interfaces:**
- Consumes: existing canonical object/event/authority vocabulary.
- Produces: `omnii://schemas/digital-disposition/v1` machine-readable disposition contract.

- [ ] **Step 1: Write the schema** with required identity, subject, state, requested disposition, authority, timing, dependencies, evidence and lifecycle fields; enumerate the supported disposition states and actions; keep extension/provider metadata preservable.
- [ ] **Step 2: Validate the JSON syntax and schema invariants** using a small Node check before wiring it into conformance.
- [ ] **Step 3: Commit** with `feat: add internet recycle disposition schema`.

### Task 2: Add the architecture contract

**Files:**
- Create: `docs/architecture/OMNII_INTERNET_RECYCLE_BIN.md`

**Interfaces:**
- Consumes: `docs/architecture/OMNII_ASH_PHOENIX_CONTINUITY_BOUNDARY.md`, canonical object/event documentation and approved Internet Recycle Bin design.
- Produces: canonical technical contract for digital exit/disposition semantics.

- [ ] **Step 1: Document the lifecycle** `active → deactivated → disposition requested → dependency resolution → recoverable/revoked/expired/orphaned/quarantined/preserved/archived/suppressed → purgable → purged`.
- [ ] **Step 2: Document dependency propagation** across references, versions, replicas, caches, derivatives, embeddings, credentials, permissions, subscriptions, integrations and evidence.
- [ ] **Step 3: Document recovery, preservation, retention, purge and proof-of-disposition boundaries**, including the rule that purge never silently implies historical erasure where preservation is required.
- [ ] **Step 4: Explicitly bind the contract to existing Ash/Phoenix/Continuity semantics** and state that this is not a second trash, ledger, authority or identity system.
- [ ] **Step 5: Commit** with `docs: define internet recycle bin lifecycle contract`.

### Task 3: Add validator and invariant tests

**Files:**
- Create: `scripts/validate-digital-disposition.mjs`
- Create: `scripts/digital-disposition-invariants.test.mjs`
- Modify: `package.json`

**Interfaces:**
- `validate-digital-disposition.mjs` reads the architecture contract and schema and fails closed when required states, boundaries or schema properties are missing.
- `digital-disposition-invariants.test.mjs` executes the validator and directly tests the key lifecycle invariants.

- [ ] **Step 1: Write failing tests** for schema existence, required state vocabulary, authority/provenance/evidence fields, purge audibility, dependency awareness and no-competing-primitive language.
- [ ] **Step 2: Implement the validator** with deterministic repository-relative checks and concise failure messages.
- [ ] **Step 3: Run the focused test** and verify PASS.
- [ ] **Step 4: Add `node scripts/validate-digital-disposition.mjs` to `conformance` and the focused canonical test path** without removing existing checks.
- [ ] **Step 5: Run the full existing canonical/conformance checks** and verify no regressions.
- [ ] **Step 6: Commit** with `test: enforce internet recycle disposition conformance`.

### Task 4: Final verification and integration readiness

**Files:**
- Modify only where verification identifies a concrete defect.

- [ ] **Step 1: Run `npm run conformance` and the focused disposition test.**
- [ ] **Step 2: Run `npm test` or the repository's complete available test command.**
- [ ] **Step 3: Inspect the branch diff for accidental destructive or unrelated changes.**
- [ ] **Step 4: Create a pull request from `codex/internet-recycle-bin-2026-09-17` to `main` with the scope, invariants and verification results.**

