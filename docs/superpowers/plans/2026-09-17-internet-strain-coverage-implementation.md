# Internet Strain Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Internet Strain Coverage Law into reusable, testable ecosystem behavior so products inherit comprehensive internet lifecycle coverage without creating competing primitives.

**Architecture:** Internet strain remains a coverage concept over the existing Universal Digital Common Layer. Reusable checks observe canonical state, dependencies, events, evidence, authority, policy, settlement, liability, continuity, portability, and lifecycle; findings become ordinary events/evidence and do not form a new truth system.

**Tech Stack:** Existing OMNII canonical schemas, JSON Schema, Node.js validation scripts, GitHub Actions, existing event/evidence/state primitives.

**Spec:** `docs/canonical/OMNII_INTERNET_STRAIN_COVERAGE_LAW.md`

## Global Constraints

- Do not introduce a new canonical identity, authority, continuity root, ledger, universal event system, or provider-owned truth.
- Treat external internet standards and providers as adapters or transport mechanisms.
- Preserve human authority and explicit delegation for consequential actions.
- Preserve provenance, evidence, dependencies, lifecycle, settlement, and liability across provider boundaries.
- Never claim that every future vulnerability or exploit can be made impossible.
- Prefer open/free implementations and replaceable adapters where technically appropriate.
- Product-specific behavior consumes common-layer semantics rather than redefining them.

---

### Task 1: Add canonical strain coverage validation

**Files:**
- Create: `scripts/validate-internet-strain-coverage.mjs`
- Create: `scripts/internet-strain-coverage.invariants.test.mjs`
- Test: `scripts/internet-strain-coverage.invariants.test.mjs`

**Interfaces:**
- Consumes: `docs/canonical/OMNII_INTERNET_STRAIN_COVERAGE_LAW.md`, `docs/architecture/OMNII_INTERNET_STRAIN_CATALOG.md`, `docs/architecture/OMNII_INTERNET_STRAIN_CONFORMANCE_MATRIX.md`.
- Produces: a deterministic validator that asserts required strain domains and required canonical dimensions are present.

- [ ] **Step 1: Write the failing invariant test**

```javascript
import assert from 'node:assert/strict';
import fs from 'node:fs';

const law = fs.readFileSync('docs/canonical/OMNII_INTERNET_STRAIN_COVERAGE_LAW.md', 'utf8');
const catalog = fs.readFileSync('docs/architecture/OMNII_INTERNET_STRAIN_CATALOG.md', 'utf8');

for (const term of ['Identity', 'Authority', 'Capability', 'Intent', 'Policy', 'State', 'Event', 'Evidence', 'Provenance', 'Dependency', 'Continuity', 'Portability', 'Trust', 'Settlement', 'Liability', 'Lifecycle']) {
  assert.match(law, new RegExp(`\\b${term}\\b`));
}

for (const domain of ['Identity and Account', 'Subscription, Membership', 'Update, Patch', 'Security and Exploitation', 'AI and Agent', 'Advertising and Attention', 'Payments, Billing', 'Portability, Switching', 'Accessibility', 'Recovery, Succession']) {
  assert.match(law, new RegExp(domain));
}

assert.match(catalog, /Subscriptions & recurring obligations/);
assert.match(catalog, /Ads remain attributable interactions|Advertising/);
console.log('internet strain invariants passed');
```

- [ ] **Step 2: Run the test and verify the expected baseline failure if the validator/test wiring is absent**

Run: `node scripts/internet-strain-coverage.invariants.test.mjs`
Expected: FAIL until the repository contains the exact required test wiring.

- [ ] **Step 3: Implement the deterministic validator**

The validator should check file existence, required headings, required domain count, and required canonical-dimension vocabulary. It must not parse provider-specific semantics or create a second registry.

- [ ] **Step 4: Run the validator**

Run: `node scripts/validate-internet-strain-coverage.mjs`
Expected: PASS with all required coverage domains detected.

- [ ] **Step 5: Commit**

```bash
git add scripts/validate-internet-strain-coverage.mjs scripts/internet-strain-coverage.invariants.test.mjs docs/canonical/OMNII_INTERNET_STRAIN_COVERAGE_LAW.md docs/architecture/OMNII_INTERNET_STRAIN_CATALOG.md docs/architecture/OMNII_INTERNET_STRAIN_CONFORMANCE_MATRIX.md
git commit -m "test: validate internet strain coverage"
```

### Task 2: Add reusable watch/check contract

**Files:**
- Create: `docs/schema/OMNII_WATCH_CHECK_CONTRACT.md`
- Create: `schemas/omnii-watch-check.schema.json`
- Create: `scripts/watch-check-schema.invariants.test.mjs`

**Interfaces:**
- Consumes: existing canonical object/event/evidence/state semantics.
- Produces: a non-canonical check specification capable of describing condition, cadence/trigger, scope, severity, required authority, evidence requirements, notification policy, and response without becoming a new source of truth.

- [ ] **Step 1: Write the failing schema invariant test**

```javascript
import assert from 'node:assert/strict';
import fs from 'node:fs';

const schema = JSON.parse(fs.readFileSync('schemas/omnii-watch-check.schema.json', 'utf8'));
for (const key of ['id', 'subject', 'condition', 'trigger', 'severity', 'authority', 'evidence', 'response']) {
  assert.ok(schema.properties?.[key], `missing ${key}`);
}
assert.equal(schema.additionalProperties, true);
console.log('watch/check schema invariants passed');
```

- [ ] **Step 2: Run the test to verify failure before schema creation**

Run: `node scripts/watch-check-schema.invariants.test.mjs`
Expected: FAIL because the schema does not yet exist.

- [ ] **Step 3: Implement the schema and document the mapping**

The schema must express watch/check behavior while writing material findings into ordinary Event/Evidence/State flows. It must support examples such as subscription renewal, certificate expiry, domain expiry, stale credential, dependency vulnerability, accessibility regression, payment failure, policy change, portability drift, ad-consent mismatch, and agent authority drift.

- [ ] **Step 4: Run the test**

Run: `node scripts/watch-check-schema.invariants.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add docs/schema/OMNII_WATCH_CHECK_CONTRACT.md schemas/omnii-watch-check.schema.json scripts/watch-check-schema.invariants.test.mjs
git commit -m "feat: add reusable watch check contract"
```

### Task 3: Wire universal coverage into repository CI

**Files:**
- Modify: existing OMNII GitHub Actions workflow that runs canonical validators
- Modify: existing package/test script manifest only if the repository already has one

**Interfaces:**
- Consumes: Tasks 1-2 validators.
- Produces: CI failure when the coverage contract or watch/check schema regresses.

- [ ] **Step 1: Add failing CI command locally**

Run the validator commands directly and record the expected command lines that CI will execute.

- [ ] **Step 2: Add the checks to the existing canonical validation workflow**

Do not create a duplicate workflow if an existing canonical validator workflow can own the checks.

- [ ] **Step 3: Run all affected validation locally**

Run: `node scripts/validate-internet-strain-coverage.mjs && node scripts/internet-strain-coverage.invariants.test.mjs && node scripts/watch-check-schema.invariants.test.mjs`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows

git commit -m "ci: enforce internet strain coverage"
```

### Task 4: Bind products to inherited coverage

**Files:**
- Modify: product conformance documents where present, beginning with Desk
- Create only product-specific coverage addenda where a product has genuine domain-specific requirements

**Interfaces:**
- Consumes: common-layer law, catalog, conformance matrix, watch/check contract.
- Produces: explicit inheritance statements and product-level tests showing that the fruit consumes the body.

- [ ] **Step 1: Identify existing product conformance files**

Search each product repository for canonical/common-layer/security/conformance documentation before adding anything new.

- [ ] **Step 2: Add inheritance mappings without duplicating primitives**

For each product, map its existing workflows to the universal dimensions and declare provider-specific adapters as non-canonical.

- [ ] **Step 3: Add product checks only where a product has unique semantics**

Examples: Desk ad interactions, subscription center, update center, agent actions, or marketplace workflows. Do not recreate common identity, authority, event, portability, or continuity semantics.

- [ ] **Step 4: Run product conformance tests**

Expected: product tests verify inherited semantics and fail if a competing primitive is introduced.

- [ ] **Step 5: Commit each product binding separately**

Use focused commits so product changes remain independently reviewable.

### Task 5: Establish a living external-risk watchlist

**Files:**
- Create: `docs/security/OMNII_EXTERNAL_STRAIN_SOURCES.md`

**Interfaces:**
- Consumes: standards/security sources such as OWASP, CISA, NIST, W3C, IETF, ICANN and applicable regulatory/consumer-protection sources.
- Produces: a provenance-bearing reference list with source, publication/update date, affected strain domain, mapped canonical dimensions, and review cadence.

- [ ] **Step 1: Define the source record format**

Each entry must include source authority, source URL, last checked date, applicable domain, material change summary, and ecosystem mapping.

- [ ] **Step 2: Seed current sources**

Include current OWASP Top 10:2025, OWASP API Security, NIST SP 800-63-4, W3C WCAG 2.2, IETF agent identity/delegation work, ICANN transfer/domain policies, relevant switching/portability rules, and current subscription/consumer-protection material where applicable.

- [ ] **Step 3: Add review cadence and stale-source detection**

A source should be marked for re-review when its publication/update timestamp changes or when the ecosystem detects a mapped domain changed materially.

- [ ] **Step 4: Commit**

```bash
git add docs/security/OMNII_EXTERNAL_STRAIN_SOURCES.md
git commit -m "docs: track external internet strain sources"
```

## Self-review checklist

- Coverage includes technical security and ordinary human friction such as subscriptions, renewals, updates, ads, forms, accessibility, payments, recovery, portability, and lifecycle.
- No new canonical root, identity, ledger, continuity, or event primitive is introduced.
- Watch/check behavior is an implementation contract whose findings flow through existing state/event/evidence semantics.
- Product fruits inherit the body rather than reproducing it.
- External standards remain adapters/evidence rather than being silently replaced.
- Security is comprehensive and defense-in-depth, without an impossible absolute guarantee.
