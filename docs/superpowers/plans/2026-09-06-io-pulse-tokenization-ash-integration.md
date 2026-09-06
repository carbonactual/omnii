# IO + Pulse + Transformation + Tokenization + ASH Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable, provider-neutral value-transition substrate that connects Pulse, Value, IO minting, the full transformation/tokenization stack, rights, ledger, settlement, and ASH assurance without collapsing their responsibilities.

**Architecture:** Extend the existing `packages/omnii-economics` implementation for Pulse, Value, Tokenization, and Settlement; add focused shared contracts for material value transitions and ASH assurance; then connect those contracts to the existing runtime rather than creating a second runtime. The implementation remains substrate-neutral: blockchain, token standards, identity providers, and settlement providers are adapters, not constitutional dependencies.

**Tech Stack:** Existing OMNII JavaScript/ESM package conventions, Node.js package tooling, existing repository test runner, Postgres/Supabase-compatible persistence adapters where present, GitHub Actions validation.

**Spec:** `docs/superpowers/specs/2026-09-06-io-pulse-tokenization-ash-integration-design.md`

## Global Constraints

- Preserve `Democratization → Decentralization → Decimalization → Fractionalization → Tokenization → Ledgers → Blockchain` as the canonical transformation sequence.
- Minting creates a canonical IO instance/value record; minting does not imply tokenization.
- Tokenization is a representation layer and must not silently redefine the underlying object, right, claim, obligation, liability, or authority.
- IO owns value-object/value-movement semantics; Pulse owns feedback/measurement; ASH owns security, trust, integrity, assurance, authorization enforcement, and recovery controls.
- `ownership ≠ custody ≠ possession ≠ control ≠ access ≠ use ≠ claim ≠ obligation ≠ liability ≠ authority`.
- Negative, residual, redundant, depleted, harmful, risky, recoverable, recyclable, remediable, liability-bearing, and unknown states remain observable where permitted by law, privacy, ethics, and policy.
- Historical state is never destructively overwritten; corrections use explicit governed transitions.
- Agent actions preserve principal attribution and cannot inherit authority merely from intelligence or capability.
- Provider and infrastructure implementations remain replaceable.
- Shared capabilities belong in reusable packages; product-specific semantics remain in product/domain modules.

---

## Repository File Map

Create or modify only focused files. Existing economics modules remain the implementation home for economic semantics; the integration package owns cross-module transition contracts.

- Create: `packages/omnii-economics/src/transition.mjs` — canonical material value-transition object and lifecycle validation.
- Modify: `packages/omnii-economics/src/index.mjs` — export the strengthened economics primitives without changing existing public meanings.
- Modify: `packages/omnii-economics/src/pulse.mjs` — expose normalized Pulse/Feedback references needed by transitions.
- Modify: `packages/omnii-economics/src/value.mjs` — expose multidimensional value context and revaluation-safe references.
- Modify: `packages/omnii-economics/src/tokenization.mjs` — separate mint references from token representations and enforce token-class invariants.
- Modify: `packages/omnii-economics/src/settlement.mjs` — link settlement to governed obligations/value states and support retry-safe state transitions.
- Create: `packages/omnii-ash/package.json` — focused ASH package metadata.
- Create: `packages/omnii-ash/src/index.mjs` — ASH assurance decision API.
- Create: `packages/omnii-ash/src/assurance.mjs` — assurance envelope, decision states, holds, quarantine, escalation, and revocation references.
- Create: `packages/omnii-ash/tests/assurance.test.mjs` — ASH unit/contract tests.
- Create: `packages/omnii-integration/package.json` — cross-package integration package metadata.
- Create: `packages/omnii-integration/src/index.mjs` — public integration API.
- Create: `packages/omnii-integration/src/lifecycle.mjs` — governed Reality → Pulse → Value → Mint → Represent → Rights → Ledger → Settlement lifecycle orchestration.
- Create: `packages/omnii-integration/tests/lifecycle.test.mjs` — end-to-end happy/denied/held/corrected/recovered tests.
- Modify: repository package/workspace metadata only if required by the existing workspace layout; do not introduce a new package manager.
- Create: `docs/architecture/OMNII_IO_PULSE_TOKENIZATION_ASH_INTEGRATION.md` — implementation-facing conformance contract.
- Create: `docs/architecture/OMNII_TOKEN_CLASS_REGISTRY.md` — extensible token-class catalog and constraints.
- Create: `docs/architecture/OMNII_VALUE_TRANSITION_STATE_MACHINE.md` — state machine, failure semantics, and correction/revocation model.

---

## Task 1: Establish failing contract tests for the shared lifecycle

**Files:**
- Create: `packages/omnii-integration/tests/lifecycle.test.mjs`
- Create: `packages/omnii-ash/tests/assurance.test.mjs`

**Interfaces:**
- Consumes: the public constructors/functions defined in the tests below.
- Produces: executable contract expectations for Tasks 2–6.

- [ ] **Step 1: Write the failing lifecycle tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createTransition, applyTransition } from '../src/lifecycle.mjs';

const base = {
  actor: { id: 'human-1', principalId: 'human-1' },
  subject: { id: 'object-1', type: 'asset' },
  action: 'create',
  inputs: [],
  context: { purpose: 'test' }
};

test('material transition carries Pulse, Value, mint, representation, rights, ledger and settlement references', () => {
  const transition = createTransition({
    ...base,
    pulseReference: 'pulse-1',
    feedbackReference: 'feedback-1',
    valueReference: 'value-1',
    mintReference: 'mint-1',
    representationReference: 'token-1',
    rightsReference: 'rights-1',
    ledgerReference: 'ledger-1',
    settlementReference: 'settlement-1'
  });
  assert.equal(transition.valueReference, 'value-1');
  assert.equal(transition.mintReference, 'mint-1');
  assert.equal(transition.representationReference, 'token-1');
});

test('correction preserves previous state lineage', () => {
  const transition = createTransition({ ...base, action: 'correct', previousState: { status: 'issued' } });
  const applied = applyTransition(transition);
  assert.deepEqual(applied.previousState, { status: 'issued' });
  assert.equal(applied.status, 'applied');
});
```

- [ ] **Step 2: Write the failing ASH authorization tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAssurance } from '../src/assurance.mjs';

test('ASH denies a material transition without authority proof', () => {
  const result = evaluateAssurance({ actorId: 'agent-1', principalId: 'human-1', authorityId: null });
  assert.equal(result.decision, 'deny');
});

test('ASH can hold a transition when identity is valid but risk is unresolved', () => {
  const result = evaluateAssurance({
    actorId: 'agent-1', principalId: 'human-1', authorityId: 'auth-1', riskState: 'review'
  });
  assert.equal(result.decision, 'hold');
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `node --test packages/omnii-integration/tests/lifecycle.test.mjs packages/omnii-ash/tests/assurance.test.mjs`
Expected: FAIL because the new modules do not yet exist.

- [ ] **Step 4: Commit the red tests**

```bash
git add packages/omnii-integration/tests/lifecycle.test.mjs packages/omnii-ash/tests/assurance.test.mjs
git commit -m "test: define IO lifecycle and ASH assurance contracts"
```

---

## Task 2: Implement the shared value-transition contract

**Files:**
- Create: `packages/omnii-economics/src/transition.mjs`
- Modify: `packages/omnii-economics/src/index.mjs`
- Modify: `packages/omnii-economics/src/pulse.mjs`
- Modify: `packages/omnii-economics/src/value.mjs`

**Interfaces:**
- Produces: `createTransition(input)`, `validateTransition(transition)`, and stable Pulse/Value reference helpers.

- [ ] **Step 1: Implement `createTransition` with a stable envelope**

```js
export function createTransition(input = {}) {
  const now = new Date().toISOString();
  return {
    transitionId: input.transitionId ?? crypto.randomUUID(),
    subject: input.subject ?? null,
    identity: input.identity ?? null,
    actor: input.actor ?? null,
    principal: input.principal ?? null,
    authority: input.authority ?? null,
    purpose: input.purpose ?? null,
    context: input.context ?? {},
    action: input.action ?? null,
    inputs: input.inputs ?? [],
    outputs: input.outputs ?? [],
    pulseReference: input.pulseReference ?? null,
    feedbackReference: input.feedbackReference ?? null,
    valueReference: input.valueReference ?? null,
    mintReference: input.mintReference ?? null,
    representationReference: input.representationReference ?? null,
    rightsReference: input.rightsReference ?? null,
    provenanceReference: input.provenanceReference ?? null,
    evidenceReference: input.evidenceReference ?? null,
    ledgerReference: input.ledgerReference ?? null,
    settlementReference: input.settlementReference ?? null,
    riskState: input.riskState ?? 'unassessed',
    securityState: input.securityState ?? 'unassessed',
    policyReference: input.policyReference ?? null,
    previousState: input.previousState ?? null,
    resultingState: input.resultingState ?? null,
    status: input.status ?? 'proposed',
    temporalValidity: input.temporalValidity ?? { validFrom: now },
    createdAt: input.createdAt ?? now,
    extensions: input.extensions ?? {}
  };
}
```

- [ ] **Step 2: Implement validation invariants**

```js
export function validateTransition(t) {
  const errors = [];
  if (!t.transitionId) errors.push('transitionId is required');
  if (!t.action) errors.push('action is required');
  if (!Array.isArray(t.inputs)) errors.push('inputs must be an array');
  if (!Array.isArray(t.outputs)) errors.push('outputs must be an array');
  if (t.action === 'correct' && !t.previousState) errors.push('correction requires previousState');
  return { valid: errors.length === 0, errors };
}
```

- [ ] **Step 3: Extend Pulse/Value modules only with reference-safe helpers**

Use helpers that return references rather than embedding mutable economic state into ASH or token records. Existing Pulse measurement semantics remain authoritative in `pulse.mjs`; Value remains multidimensional and revaluation-safe in `value.mjs`.

- [ ] **Step 4: Run the economics package tests plus red lifecycle tests**

Run: `node --test packages/omnii-economics/tests packages/omnii-integration/tests/lifecycle.test.mjs`
Expected: existing economics tests continue to pass; lifecycle tests still fail at missing downstream lifecycle/ASH implementation.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-economics/src/transition.mjs packages/omnii-economics/src/index.mjs packages/omnii-economics/src/pulse.mjs packages/omnii-economics/src/value.mjs
git commit -m "feat: add canonical material value transition contract"
```

---

## Task 3: Separate minting from token representation

**Files:**
- Modify: `packages/omnii-economics/src/tokenization.mjs`
- Modify: `packages/omnii-economics/src/index.mjs`
- Create: `docs/architecture/OMNII_TOKEN_CLASS_REGISTRY.md`

**Interfaces:**
- Produces: `createMintRecord(input)`, `representToken(input)`, `TOKEN_CLASSES`, and token-reference validation.

- [ ] **Step 1: Add tests that prove minting and tokenization are distinct**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createMintRecord, representToken } from '../src/tokenization.mjs';

test('mint creates a canonical IO reference without requiring a token', () => {
  const mint = createMintRecord({ objectId: 'object-1', source: 'pulse-1', classification: 'beneficial' });
  assert.ok(mint.mintId);
  assert.equal(mint.representationReference, null);
});

test('token representation references an existing mint', () => {
  const token = representToken({ mintReference: 'mint-1', class: 'fungible' });
  assert.equal(token.mintReference, 'mint-1');
});
```

- [ ] **Step 2: Implement mint record semantics**

The record must carry identifier, source/origin, issuer/creator, authority context, event/Pulse/feedback links, valuation context, classification, lifecycle, provenance, anti-duplication reference, rights/constraints, and ASH state.

- [ ] **Step 3: Implement the extensible token-class registry**

Use an extensible map with these initial classes: unique, fungible, fractional, decimalized, dynamic, composite, credential, attestation, non-transferable, access, usage, claim, obligation, liability, reward, governance, reputation, time, capacity, capability.

- [ ] **Step 4: Enforce the token invariants**

A representation must always reference its mint. A token representation cannot mutate the underlying object type, ownership semantics, authority, or legal status implicitly. Fractional and decimalized forms must preserve the underlying reference and explicit unit semantics.

- [ ] **Step 5: Add the registry documentation and examples**

Document how additional token classes are added without changing the constitutional contract.

- [ ] **Step 6: Run the targeted tests**

Run: `node --test packages/omnii-economics/tests`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/omnii-economics/src/tokenization.mjs packages/omnii-economics/src/index.mjs docs/architecture/OMNII_TOKEN_CLASS_REGISTRY.md
git commit -m "feat: separate IO minting from token representations"
```

---

## Task 4: Implement ASH assurance envelopes

**Files:**
- Create: `packages/omnii-ash/package.json`
- Create: `packages/omnii-ash/src/assurance.mjs`
- Create: `packages/omnii-ash/src/index.mjs`
- Test: `packages/omnii-ash/tests/assurance.test.mjs`

**Interfaces:**
- Produces: `createAssuranceEnvelope(input)`, `evaluateAssurance(input)`, `holdTransition()`, `quarantineTransition()`, and `revokeReference()`.

- [ ] **Step 1: Implement the assurance decision model**

```js
export const ASSURANCE_DECISIONS = Object.freeze([
  'allow', 'deny', 'challenge', 'hold', 'quarantine', 'escalate'
]);

export function evaluateAssurance(input = {}) {
  if (!input.actorId || !input.principalId || !input.authorityId) {
    return { decision: 'deny', reasons: ['identity_or_authority_missing'] };
  }
  if (input.riskState === 'review') {
    return { decision: 'hold', reasons: ['risk_review_required'] };
  }
  if (input.revoked === true) {
    return { decision: 'deny', reasons: ['revoked'] };
  }
  return { decision: 'allow', reasons: [] };
}
```

- [ ] **Step 2: Add the minimum ASH envelope**

Include actor, principal, authority, action, value/resource reference, timestamp, context, policy, evidence, credential, integrity proof, risk state, security state, status, prior/resulting states, provenance, review, and revocation references. Keep the object extensible.

- [ ] **Step 3: Add explicit hold/quarantine/revocation records**

These operations change security state without deleting or silently rewriting IO state. They must remain attributable and auditable.

- [ ] **Step 4: Run ASH tests**

Run: `node --test packages/omnii-ash/tests/assurance.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-ash
git commit -m "feat: add ASH assurance envelope and decisions"
```

---

## Task 5: Build the cross-package lifecycle orchestrator

**Files:**
- Create: `packages/omnii-integration/package.json`
- Create: `packages/omnii-integration/src/lifecycle.mjs`
- Create: `packages/omnii-integration/src/index.mjs`
- Test: `packages/omnii-integration/tests/lifecycle.test.mjs`

**Interfaces:**
- Consumes: economics transition/mint/tokenization functions and ASH assurance functions.
- Produces: `proposeLifecycle(input)`, `applyLifecycle(input)`, and explicit transition outcomes.

- [ ] **Step 1: Implement the gated lifecycle**

```js
export function applyLifecycle({ transition, assurance }) {
  const decision = assurance ?? { decision: 'allow', reasons: [] };
  if (decision.decision !== 'allow') {
    return {
      status: decision.decision,
      transition,
      securityDecision: decision
    };
  }
  return {
    status: 'applied',
    transition: { ...transition, status: 'applied' },
    securityDecision: decision
  };
}
```

- [ ] **Step 2: Preserve the full semantic sequence**

The orchestrator must model, in order, observation/Pulse/feedback/value, mint, classification, transformation/representation, rights, ledger, custody, transfer/exchange, settlement, use/consumption, recovery/transformation, revaluation, and retirement/continuation. Not every domain must implement every optional stage.

- [ ] **Step 3: Add state-transition outcomes**

Supported outcomes must include `applied`, `denied`, `challenged`, `held`, `quarantined`, `escalated`, `corrected`, `revoked`, `recovered`, and `reversed` as explicit states rather than exceptions that erase economic context.

- [ ] **Step 4: Add idempotency**

A material command must accept an idempotency key/reference and produce the same transition result for a safe retry. Duplicate mint and settlement attempts must be detectable.

- [ ] **Step 5: Run the end-to-end tests**

Run: `node --test packages/omnii-integration/tests/lifecycle.test.mjs`
Expected: PASS for creation, denied, held, correction, and retry/idempotency scenarios.

- [ ] **Step 6: Commit**

```bash
git add packages/omnii-integration
 git commit -m "feat: integrate IO Pulse Value tokenization and ASH lifecycle"
```

---

## Task 6: Strengthen settlement linkage and failure recovery

**Files:**
- Modify: `packages/omnii-economics/src/settlement.mjs`
- Modify: `packages/omnii-integration/src/lifecycle.mjs`
- Test: `packages/omnii-integration/tests/lifecycle.test.mjs`

**Interfaces:**
- Consumes: governed obligation/value references and ASH decisions.
- Produces: retry-safe settlement transitions and explicit reversal/correction links.

- [ ] **Step 1: Add tests for settlement safety**

```js
test('denied settlement produces no applied state mutation', () => {
  const result = applyLifecycle({
    transition: createTransition({ action: 'settle' }),
    assurance: { decision: 'deny', reasons: ['unauthorized'] }
  });
  assert.equal(result.status, 'deny');
  assert.equal(result.transition.status, 'proposed');
});
```

- [ ] **Step 2: Require the settlement reference to point to the governed obligation/value state**

The settlement implementation must reject an unlinked material settlement and return an explainable validation result.

- [ ] **Step 3: Add explicit reversal/correction metadata**

Never delete a previous settlement record. A reversal references its predecessor and records the new resulting state.

- [ ] **Step 4: Run economics and integration tests**

Run: `node --test packages/omnii-economics/tests packages/omnii-integration/tests/lifecycle.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-economics/src/settlement.mjs packages/omnii-integration/src/lifecycle.mjs packages/omnii-integration/tests/lifecycle.test.mjs
git commit -m "feat: make settlement retry-safe and state-linked"
```

---

## Task 7: Add architecture conformance documentation

**Files:**
- Create: `docs/architecture/OMNII_IO_PULSE_TOKENIZATION_ASH_INTEGRATION.md`
- Create: `docs/architecture/OMNII_VALUE_TRANSITION_STATE_MACHINE.md`
- Modify: `docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md`

**Interfaces:**
- Produces: implementation-facing documentation and canonical references; no product may need to understand internal package implementation to consume the contracts.

- [ ] **Step 1: Document the responsibility matrix**

Record:

`ABBA = orchestration`
`Seal = human authority`
`Pulse = feedback/measurement`
`Value = multidimensional evaluation`
`IO = value movement/minting/representation`
`Tokenization = representation inside IO`
`Ledger = state/history/provenance substrate`
`ASH = security/trust/integrity/assurance`

- [ ] **Step 2: Document the canonical lifecycle**

Use the exact transformation doctrine and show which stages are mandatory versus domain-optional.

- [ ] **Step 3: Document state-machine corrections**

Explicitly distinguish original event, correction, supersession, revocation, cancellation, reversal, restatement, dispute, and fraud determination.

- [ ] **Step 4: Link the new documents from the canonical architecture**

Add references without promoting implementation files into constitutional definitions.

- [ ] **Step 5: Commit**

```bash
git add docs/architecture/OMNII_IO_PULSE_TOKENIZATION_ASH_INTEGRATION.md docs/architecture/OMNII_VALUE_TRANSITION_STATE_MACHINE.md docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md
git commit -m "docs: establish IO Pulse tokenization ASH conformance contract"
```

---

## Task 8: Add cross-domain conformance examples

**Files:**
- Create: `docs/architecture/OMNII_VALUE_TRANSITION_EXAMPLES.md`
- Test: `packages/omnii-integration/tests/lifecycle.test.mjs`

**Interfaces:**
- Consumes: all contracts from Tasks 2–6.
- Produces: examples showing the substrate works across media, education, exchange/trade, property, transport, institutions, environmental value, and agentic work without domain-specific constitutional changes.

- [ ] **Step 1: Add examples for a physical asset, creative work, credential, service, environmental outcome, and agent capability**

Each example must show the same generic lifecycle with different domain data.

- [ ] **Step 2: Add tests proving the same transition contract accepts multiple object classes**

```js
for (const type of ['asset', 'media', 'credential', 'service', 'environmental_outcome', 'agent_capability']) {
  test(`supports ${type} without changing core semantics`, () => {
    const transition = createTransition({ subject: { id: `${type}-1`, type }, action: 'create' });
    assert.equal(validateTransition(transition).valid, true);
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add docs/architecture/OMNII_VALUE_TRANSITION_EXAMPLES.md packages/omnii-integration/tests/lifecycle.test.mjs
git commit -m "test: prove universal value transition composition across domains"
```

---

## Task 9: Repository-wide verification and canonical traceability

**Files:**
- Modify: `docs/architecture/OMNII_CANONICAL_TRACEABILITY.md` when that file exists; otherwise add the nearest existing traceability index.
- Modify: root/package workspace configuration only when required for test discovery.

- [ ] **Step 1: Run every affected package test**

Run: `node --test packages/omnii-economics/tests packages/omnii-ash/tests packages/omnii-integration/tests`
Expected: PASS.

- [ ] **Step 2: Run the repository's existing lint/type/build commands**

Use the commands already declared by repository/package manifests; do not introduce a second toolchain.
Expected: no new failures caused by this integration.

- [ ] **Step 3: Search for semantic contradictions**

Search the repository for claims that equate minting with tokenization, tokenization with blockchain, authentication with authorization, or a token with the constitutional definition of an asset. Update only files whose statements conflict with the approved design.

- [ ] **Step 4: Verify product boundary conformance**

Confirm BUNK and other domain packages consume universal contracts rather than establishing competing token/value/security semantics.

- [ ] **Step 5: Update traceability**

Record the implementation files, tests, conformance documents, and any runtime/deployment evidence that remains unverified.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: verify IO Pulse tokenization ASH integration conformance"
```

---

## Final Acceptance Gate

- [ ] IO, Pulse, Value, minting, tokenization, rights, ledger, settlement, and ASH are independently identifiable responsibilities.
- [ ] A material value lifecycle is traceable end-to-end.
- [ ] Mint records do not require tokenization.
- [ ] Token records always reference their underlying mint/object and cannot silently redefine it.
- [ ] The exact transformation sequence is preserved.
- [ ] Blockchain is optional infrastructure.
- [ ] Negative/residual states remain observable.
- [ ] Agent actions preserve principal attribution.
- [ ] Security can allow, deny, challenge, hold, quarantine, or escalate without erasing IO history.
- [ ] Corrections/revocations/reversals preserve historical lineage.
- [ ] Material commands are retry-safe and duplicate-aware.
- [ ] Existing economics behavior remains compatible unless deliberately strengthened by an explicit contract.
- [ ] Automated tests cover successful, denied, held, corrected, revoked, and recovered flows.
- [ ] The new integration is reusable by BUNK, CHARTER, education, creator/media, exchange/trade, STOS, EMIRATE, and future products without creating product-specific constitutional primitives.
