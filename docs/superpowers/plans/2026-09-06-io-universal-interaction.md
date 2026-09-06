# IO Universal Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement IO as the universal interaction/occurrence contract across the OMNII common fabric and durable Supabase runtime.

**Architecture:** Add a focused `io.mjs` common primitive that validates and constructs canonical IO records, export it from the common package, and persist records in a product-neutral `omnii_io_records` table. Existing identity, authority, workflow, evidence, value, ledger and Pulse primitives remain authoritative for their own semantics and are referenced by IO rather than replaced.

**Tech Stack:** Node.js 22.23.2, ECMAScript modules, Node test runner, Supabase/PostgreSQL SQL migrations, existing OMNII common package.

**Spec:** `docs/superpowers/specs/2026-09-06-io-universal-interaction-design.md`

## Global Constraints

- Every meaningful state-changing ecosystem action has one primary IO occurrence.
- IO does not grant authority, replace identity, or become the ledger/domain database.
- Idempotency is mandatory for state-changing IO submissions.
- Product-specific schemas remain legal and semantic authorities for their domains.
- Canonical persistence is product-neutral and append-oriented.

---

### Task 1: Canonical IO primitive

**Files:**
- Create: `packages/omnii-common/src/io.mjs`
- Test: `packages/omnii-common/src/io.test.mjs`
- Modify: `packages/omnii-common/src/index.mjs`

**Interfaces:**
- Produces `ioRecord(input)` and `isIoRecord(value)`.
- `ioRecord(input)` returns a frozen canonical object with `id`, `schema_version`, `occurred_at`, `kind`, `action`, `actor`, `subject`, `status`, `source`, `product`, `correlation_id`, `causation`, `idempotency_key`, `authority`, `authorization`, `intent`, `context`, `inputs`, `outputs`, `value`, `state`, `evidence`, `provenance`, and `metadata`.

- [ ] Write failing tests for required fields, open-ended kind values, authority/authorization references, immutability and idempotency-key validation.
- [ ] Run `node packages/omnii-common/src/io.test.mjs`; confirm failure before implementation.
- [ ] Implement minimal constructor and structural validation using no new dependency.
- [ ] Export `ioRecord` and `isIoRecord` from `index.mjs`.
- [ ] Run the focused test again and require PASS.

### Task 2: Runtime wrapping seam

**Files:**
- Create: `packages/omnii-runtime/src/io-boundary.ts`
- Create: `packages/omnii-runtime/tests/io-boundary.test.ts`

**Interfaces:**
- Produces `toIoOccurrence(input)` as a typed adapter from runtime action results to the common IO contract.
- Produces `withIoOccurrence(action, input)` returning `{ result, io }`; it must create one primary IO for a completed, failed, cancelled or reversed state-changing action and preserve the caller idempotency key.

- [ ] Write failing tests for success, failure, cancellation and idempotent repeat input.
- [ ] Run `node --import tsx --test packages/omnii-runtime/tests/io-boundary.test.ts`; confirm failure before implementation.
- [ ] Implement the pure wrapping seam without database access.
- [ ] Run the focused runtime test and require PASS.

### Task 3: Durable IO persistence

**Files:**
- Create: `supabase/migrations/20260906043100_io_universal_interaction.sql`

**Interfaces:**
- Produces `public.omnii_io_records` with durable canonical columns plus JSONB extension fields.
- Primary uniqueness boundary is `(source_system, idempotency_key)` when an idempotency key is present.

- [ ] Create the append-oriented table with UUID identity, timestamptz occurrence fields, normalized kind/action/status, participant/product references, JSONB semantic groups, correlation/causation and provenance.
- [ ] Add indexes for actor, subject, product, kind, occurred time, correlation id and idempotency key.
- [ ] Add RLS and keep direct client writes disabled; the existing service-role/runtime boundary remains the writer.
- [ ] Add SQL comments documenting that IO records interactions but does not grant authority or replace ledgers.
- [ ] Add a compact SQL regression script under `supabase/` only if the repository already has a matching disposable SQL-test convention.

### Task 4: Ecosystem documentation binding

**Files:**
- Modify: `docs/architecture/OMNII_COMMON_LAYER.md`
- Modify: `docs/architecture/OMNII_ECOSYSTEM_COMPOSITION_INDEX.md`
- Create: `docs/canonical/OMNII_IO_CANONICAL_PROTOCOL.md`

**Interfaces:**
- Produces an explicit ecosystem rule: all meaningful cross-system actions/interactions are represented by IO, with product-specific semantics preserved.

- [ ] Add IO to the common interaction chain as the occurrence connective layer.
- [ ] State the boundary against Authority/SEAL, Runtime, Ledger/Pulse and domain products.
- [ ] Document representative flows: human-to-business, AI-to-system, product-to-product, movement, service, exchange and settlement.
- [ ] Add migration guidance for existing value-only IO records: retain them as IO value/exchange occurrences, not as a separate universal primitive.

### Task 5: Verification and commit

**Files:**
- No additional source files.

- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test:runtime`.
- [ ] Run `node packages/omnii-common/src/io.test.mjs`.
- [ ] Run the full `npm test` suite as configured by the repository.
- [ ] Verify the final main SHA and changed-file set through GitHub.
- [ ] Commit with `feat: make io the universal ecosystem interaction layer`.

