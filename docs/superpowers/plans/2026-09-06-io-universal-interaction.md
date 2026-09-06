# IO Universal Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement IO as the universal interaction/occurrence contract across the OMNII common fabric and durable Supabase runtime.

**Architecture:** Add a focused `io.mjs` common primitive plus a common-package runtime wrapper, export both from the common package, and persist records in a product-neutral `omnii_io_records` table. Existing identity, authority, workflow, evidence, value, ledger and Pulse primitives remain authoritative for their own semantics and are referenced by IO rather than replaced.

**Tech Stack:** Node.js 22.23.2, ECMAScript modules, Node test runner, Supabase/PostgreSQL SQL migrations, existing OMNII common package.

**Spec:** `docs/superpowers/specs/2026-09-06-io-universal-interaction-design.md`

## Global Constraints

- Every meaningful state-changing ecosystem action has one primary IO occurrence.
- IO does not grant authority, replace identity, or become the ledger/domain database.
- Idempotency is mandatory for state-changing IO persistence.
- Product-specific schemas remain semantic authorities for their domains.
- Canonical persistence is product-neutral and append-oriented.

---

### Task 1: Canonical IO primitive

**Files:**
- Create: `packages/omnii-common/src/io.mjs`
- Test: `packages/omnii-common/src/io.test.mjs`
- Modify: `packages/omnii-common/src/index.mjs`

**Interfaces:**
- Produces `ioRecord(input)` and `isIoRecord(value)`.
- Exposes `IO_KINDS` and `IO_STATUSES` for canonical vocabulary checks.

- [ ] Test required identity/action/actor fields, supported kinds/statuses, references, immutability and validity checks.
- [ ] Run `node packages/omnii-common/src/io.test.mjs` before implementation and confirm RED.
- [ ] Implement constructor and structural validation without new dependencies.
- [ ] Export the IO primitive and raise the common package version to `1.1.0`.
- [ ] Re-run focused tests and require GREEN.

### Task 2: Common runtime IO boundary

**Files:**
- Create: `packages/omnii-common/src/io-boundary.mjs`
- Test: `packages/omnii-common/src/io-boundary.test.mjs`
- Modify: `packages/omnii-common/src/index.mjs`

**Interfaces:**
- Produces `toIoOccurrence(input)` as the canonical constructor adapter.
- Produces `withIoOccurrence(action, input)` returning `{ result, io }` on success and attaching the failed primary IO to the thrown error on failure.

- [ ] Test successful action wrapping with one primary IO.
- [ ] Test failed action wrapping with a `failed` IO occurrence.
- [ ] Implement the wrapper over `ioRecord`; never duplicate IO schema semantics in product/runtime code.
- [ ] Re-run focused tests and require GREEN.

### Task 3: Durable IO persistence

**Files:**
- Create: `supabase/migrations/20260906043100_io_universal_interaction.sql`

**Interfaces:**
- Produces `public.omnii_io_records` with durable canonical columns plus JSONB extension fields.
- Primary idempotency uniqueness boundary is `(source_system, idempotency_key)` when an idempotency key is present.

- [ ] Create the append-oriented table with UUID identity, occurrence fields, kind/action/status, actor/subject, product/capability, causality, governance references and semantic JSONB groups.
- [ ] Add indexes for time, kind/status, product/source, correlation, actor and subject.
- [ ] Enable RLS; do not introduce client-side write authority.
- [ ] Add comments explicitly distinguishing IO records from authority and ledgers.

### Task 4: Ecosystem documentation binding

**Files:**
- Modify: `docs/architecture/OMNII_COMMON_LAYER.md`
- Modify: `docs/architecture/OMNII_ECOSYSTEM_COMPOSITION_INDEX.md`
- Create: `docs/canonical/OMNII_IO_CANONICAL_PROTOCOL.md`

**Interfaces:**
- Establishes the canonical rule that every material ecosystem action/interaction is represented by IO, while domain-specific records retain their own semantics.

- [ ] Bind IO into the common interaction chain.
- [ ] Define IO boundaries against Authority/SEAL, Runtime, Ledger/Pulse and products.
- [ ] Document cross-product, human, AI, system, movement, service and economic flows.

### Task 5: Verification

**Files:**
- Modify: `package.json`

- [ ] Include the IO primitive and boundary tests in the root `npm test` script.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test:runtime`.
- [ ] Run `node packages/omnii-common/src/io.test.mjs`.
- [ ] Run `node packages/omnii-common/src/io-boundary.test.mjs`.
- [ ] Run the full `npm test` suite.
- [ ] Confirm the resulting main commit and changed-file set through GitHub/CI.
