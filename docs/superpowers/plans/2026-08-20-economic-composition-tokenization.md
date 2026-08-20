# Economic Composition, Tokenization & Settlement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make fractionalization, decimalization, democratization, tokenization, minting and optional blockchain settlement composable with OMNII value vectors, Pulse, ecosystem capacity and inverted economics.

**Architecture:** Preserve the constitutional distinction between value, representation, authority and settlement. A reusable economic composition runtime computes multidimensional given/pulse vectors and dynamic asset/liability state, while token and mint records reference governed underlying objects. Blockchain remains an optional settlement/provenance rail.

**Tech Stack:** TypeScript, existing OMNII runtime, Vitest, Supabase/Postgres.

**Spec:** `docs/constitution/ECONOMIC_COMPOSITION.md`

## Global Constraints

- Fractionalization is a scope/allocation concept, not decimal precision.
- Decimalization describes measurable resolution/level and must not invent unsupported precision.
- Democratization governs access/distribution and does not imply equal ownership.
- Tokenization represents an underlying governed object or right and does not redefine it.
- Minting requires explicit issuer authority, provenance and idempotency.
- Blockchain is optional infrastructure and does not constitute truth or authority.
- Value dimensions remain independently represented before aggregation.
- Asset/liability classification follows the inverted Pulse-vs-Value-Given rule.

### Task 1: Economic Constitution and Runtime

**Files:**
- Create: `docs/constitution/ECONOMIC_COMPOSITION.md`
- Create: `packages/omnii-runtime/src/economic-composition-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`

- [x] Define constitutional distinctions and open-world rules.
- [x] Model independent value-vector dimensions.
- [x] Model fraction and decimalization separately.
- [x] Calculate inverted asset/liability classification.
- [x] Aggregate individual vectors into ecosystem vectors and derive average, floor and Safe Haven references.

### Task 2: Tokenization and Minting Boundaries

**Files:**
- `packages/omnii-runtime/src/economic-composition-runtime.ts`

- [x] Define token representations with underlying-object references.
- [x] Require mint issuer, authority, provenance and idempotency.
- [x] Permit off-chain, ledger, blockchain and hybrid settlement rails.

### Task 3: Persistence

**Supabase project:** `omnii-canonical`

- [x] Add multidimensional economic vectors.
- [x] Add economic compositions.
- [x] Add token representations.
- [x] Add mint issuance records with unique idempotency keys.
- [x] Enable RLS and authenticated access policies.

### Task 4: Regression Coverage

**Files:**
- Create: `tests/unit/economic-composition.test.ts`

- [x] Test fraction and resolution separation.
- [x] Test asset/liability inversion.
- [x] Test dimension-preserving aggregation.
- [x] Test ecosystem average/floor/Safe Haven separation.
- [x] Test minting authorization/idempotency requirements.

### Verification

- [x] Verify runtime exports and source files through GitHub.
- [x] Verify Supabase migration application and new tables.
- [x] Verify RLS policy presence on the new tables.
- [ ] Run repository TypeScript/Vitest commands locally and record actual results.
