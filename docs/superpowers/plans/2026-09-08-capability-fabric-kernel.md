# Carbon Actual Capability Fabric Kernel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a provider-neutral Carbon Actual Capability Fabric (CACF) that registers, describes, routes, audits and composes capabilities from connected providers without allowing any provider to redefine OMNII semantics or authority.

**Architecture:** CACF sits between ABBA and external provider adapters. The registry defines canonical capability meaning and constraints; adapters implement provider-specific execution; the router selects candidates but never authorizes; Mission Intelligence, Authority Runtime, Execution Controller, evidence and Pulse remain the governing execution chain.

**Tech Stack:** TypeScript, existing `packages/omnii-runtime`, JSON canonical manifests, Vitest/Node test runner as already used by runtime tests, GitHub/Supabase/Vercel/AppDeploy/Notion/Canva/Amplitude/PostHog/Quicknode/OpenAI Platform/Automations as external capability providers.

**Spec:** `docs/architecture/CARBON_ACTUAL_CAPABILITY_FABRIC.md`

## Global Constraints

- Capability never implies authority.
- Provider implementations are replaceable adapters and cannot redefine OMNII semantics.
- Read/query capabilities and mutation/execution capabilities remain distinct.
- ABBA may discover, rank, compose and recommend; it cannot self-authorize.
- Every consequential provider execution must pass the existing identity, authority, policy, Mission Intelligence, execution, evidence and audit boundaries.
- Secrets, bearer tokens, API keys and payment credentials never enter capability definitions, event payloads or source control.
- One canonical capability identity may have multiple provider adapters; providers do not become duplicate canonical truths.
- Unknown or unavailable provider capabilities remain explicit gaps; they are never invented.
- Stateless routing evidence may influence selection but cannot grant authority or ownership.

---

### Task 1: Canonical CACF architecture specification

**Files:**
- Create: `docs/architecture/CARBON_ACTUAL_CAPABILITY_FABRIC.md`
- Create: `data/canonical/omnii-capability-fabric-provider-matrix.json`
- Modify: `README.md`

**Interfaces:**
- Consumes: existing OMNII terminology, Common Layer, Control Plane, Mission Intelligence, security/provider-boundary doctrine.
- Produces: stable CACF definitions and the provider matrix used by later registry and conformance tasks.

- [ ] **Step 1: Write the canonical architecture specification**

Define CACF as `intent → identity/context → capability discovery → provider selection → mission assessment → authority/approval → execution → acknowledgement → external evidence → verification → Actual/Pulse → learning` and define provider categories and boundaries.

- [ ] **Step 2: Define the provider matrix**

Represent all currently connected providers: GitHub, Vercel, Supabase, AppDeploy, Notion, Canva, Amplitude, PostHog, Quicknode, OpenAI Platform and Automations, with capability families derived only from their connected tool descriptions.

- [ ] **Step 3: Index the architecture in README**

Add CACF to canonical architecture sources without changing the constitutional position of OMNII or BUNK.

- [ ] **Step 4: Commit**

```text
docs: establish carbon actual capability fabric
```

---

### Task 2: Capability contract and registry tests

**Files:**
- Create: `packages/omnii-runtime/tests/capability-fabric-runtime.test.ts`

**Interfaces:**
- Consumes: planned `CapabilityDescriptor`, `CapabilityRegistryRuntime`, and `CapabilityAdapter` contracts.
- Produces: executable requirements for uniqueness, provider separation, lookup, status filtering, mutation classification, secret exclusion and provider replacement.

- [ ] **Step 1: Write the failing tests**

Cover these behaviors: duplicate canonical capability IDs are rejected; two providers may implement one canonical capability; unavailable/deprecated descriptors are excluded from active lookup; mutation capabilities carry side-effect and authority metadata; descriptors reject credential material; lookup is deterministic by capability ID then provider ID.

- [ ] **Step 2: Run the focused test suite and verify the new contract fails**

Run:

```bash
npm run test:runtime -- packages/omnii-runtime/tests/capability-fabric-runtime.test.ts
```

Expected: failure because the CACF runtime does not yet exist.

- [ ] **Step 3: Keep the tests as the executable specification**

Do not weaken tests to accommodate implementation details.

---

### Task 3: Capability registry runtime

**Files:**
- Create: `packages/omnii-runtime/src/capability-fabric-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`

**Interfaces:**
- Consumes: `JsonObject`, existing registry semantics, CACF architecture specification.
- Produces: `CapabilityDescriptor`, `CapabilityAdapter`, `CapabilityRegistryRuntime`, `register`, `resolve`, `lookup`, `list`, `deprecate`.

- [ ] **Step 1: Implement only the minimum API required by the failing tests**

Use a provider-neutral descriptor with: `id`, `name`, `version`, `providerId`, `domain`, `operation`, `status`, `authorityClass`, `riskClass`, `sideEffect`, `identityScope`, `inputSchema`, `outputSchema`, `dependencies`, `costHint`, `latencyHint`, `reliabilityHint`, `auditPolicy`, `metadata`. Keep provider credentials outside the descriptor.

- [ ] **Step 2: Reject credential-bearing descriptors**

Reject keys containing `key`, `token`, `secret`, `password`, `credential`, `private_key`, or `authorization` when their values appear to contain credential material. Do not inspect or retain secret values.

- [ ] **Step 3: Enforce deterministic canonical identity**

Treat `id` as the canonical capability identity. A second provider implementation is allowed only when it retains the same canonical capability meaning and has a distinct `providerId`.

- [ ] **Step 4: Run the focused tests and verify green**

Run the same command from Task 2 and require PASS.

- [ ] **Step 5: Commit**

```text
feat: add capability fabric registry runtime
```

---

### Task 4: Provider adapter and routing tests

**Files:**
- Create: `packages/omnii-runtime/tests/capability-router-runtime.test.ts`

**Interfaces:**
- Consumes: `CapabilityDescriptor`, `CapabilityRegistryRuntime`.
- Produces: tested `CapabilityRouterRuntime.route` contract that ranks but never authorizes or executes.

- [ ] **Step 1: Write the failing tests**

Test deterministic ranking, unavailable provider exclusion, risk/side-effect awareness, preference for stronger reliability/cost/latency when requirements are otherwise equal, and the invariant that a route result is a plan/candidate set rather than a permission.

- [ ] **Step 2: Run the focused test and verify red**

Run:

```bash
npm run test:runtime -- packages/omnii-runtime/tests/capability-router-runtime.test.ts
```

Expected: missing runtime/router implementation failures.

---

### Task 5: Provider-neutral router and ABBA integration

**Files:**
- Create: `packages/omnii-runtime/src/capability-router-runtime.ts`
- Modify: `packages/omnii-runtime/src/abba-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`

**Interfaces:**
- Consumes: `CapabilityRegistryRuntime`, optional Mission Learning selection hints, existing `MissionIntelligenceRuntime` and `runtime-resolver` semantics.
- Produces: `CapabilityRouterRuntime.route`, `CapabilityRouteCandidate`, and ABBA capability discovery through the CACF catalog.

- [ ] **Step 1: Implement deterministic candidate scoring**

Score only among capabilities that match the requested canonical capability and are active/available. Use requirement coverage first, then risk/side-effect compatibility, reliability, latency and cost, with stable ID/provider tie-breakers.

- [ ] **Step 2: Preserve the authority boundary**

Never return `authorized=true` from the router. The router may return `recommended`, `requiresApproval`, `requiresAuthority` and explanation fields, but Authority Runtime remains the only authority validator.

- [ ] **Step 3: Connect ABBA's existing `CapabilityCatalog` abstraction**

Provide an adapter or registry implementation compatible with `AbbaCapabilityRecord` so ABBA can discover CACF capabilities without hard-coding providers.

- [ ] **Step 4: Run focused router and existing ABBA tests**

Run:

```bash
npm run test:runtime -- packages/omnii-runtime/tests/capability-router-runtime.test.ts packages/omnii-runtime/tests/abba-mission-intelligence.test.ts
```

Require PASS.

- [ ] **Step 5: Commit**

```text
feat: route capabilities through carbon actual fabric
```

---

### Task 6: Canonical connected-provider matrix

**Files:**
- Modify: `data/canonical/omnii-capability-fabric-provider-matrix.json`
- Create: `docs/canonical/CACF_PROVIDER_CAPABILITY_MATRIX.md`

**Interfaces:**
- Consumes: actual connected plugin/tool capabilities.
- Produces: provider adapters that map to canonical capability classes.

- [ ] **Step 1: Encode GitHub capabilities**

Map repository search/read/write, branches/commits, issues, pull requests, reviews, CI/workflows, releases and repository governance to source-control, collaboration, lifecycle and verification capabilities.

- [ ] **Step 2: Encode Supabase capabilities**

Map Postgres/schema operations, SQL/data access, authentication, edge functions, realtime/storage and project/runtime management while keeping privileged operations behind server/runtime authority boundaries.

- [ ] **Step 3: Encode Vercel and AppDeploy capabilities**

Map build, deploy, preview, release/version, deployment verification, QA/result observation, source snapshots, domain management and backend-secret configuration. Treat the overlapping deployment functions as alternate providers rather than duplicate canonical deployment truth.

- [ ] **Step 4: Encode Notion capabilities**

Map documentation, PRD/spec generation, knowledge retrieval, project/task context and research/context gathering to knowledge/documentation capabilities.

- [ ] **Step 5: Encode Canva capabilities**

Map design creation/refinement and format/size transformation to creative-production and representation capabilities.

- [ ] **Step 6: Encode Amplitude and PostHog capabilities**

Map analytics discovery/query, dashboards/charts, product intelligence, experiments, feature flags, error tracking, surveys, logs and LLM analytics into observation/measurement/experimentation capabilities.

- [ ] **Step 7: Encode Quicknode capabilities**

Map blockchain endpoint management, RPC/infrastructure usage, logs, security/rate-limit controls and usage/billing observations into distributed-ledger infrastructure capabilities.

- [ ] **Step 8: Encode OpenAI Platform capabilities**

Map AI model/provider configuration and API-key lifecycle management as provider operations. Explicitly prohibit key material from entering CACF descriptors or telemetry.

- [ ] **Step 9: Encode Automations capabilities**

Map reminders, recurring execution, scheduled searches and conditional checks to scheduling/orchestration capabilities; automation creation remains subject to the same authority boundary as other mutations.

- [ ] **Step 10: Commit**

```text
docs: map connected providers into cacf capabilities
```

---

### Task 7: Conformance and security validation

**Files:**
- Create: `scripts/validate-capability-fabric.mjs`
- Modify: `.github/workflows/control-plane-conformance.yml`
- Create: `packages/omnii-runtime/tests/capability-fabric-conformance.test.ts`

**Interfaces:**
- Consumes: provider matrix, runtime descriptors, Control Plane registry and security posture doctrine.
- Produces: deterministic conformance check for canonical fields, provider boundaries and secret exclusion.

- [ ] **Step 1: Write failing conformance tests**

Require every provider entry to contain provider ID, canonical capability IDs, operation, side-effect class, risk class, authority boundary and provenance; require at least one explicit adapter/provider distinction where multiple providers cover the same operation; reject credential-like values.

- [ ] **Step 2: Run tests and verify red**

Run:

```bash
node --import tsx --test packages/omnii-runtime/tests/capability-fabric-conformance.test.ts
```

- [ ] **Step 3: Implement the validator**

Make failures explicit and deterministic. The validator must not mutate repository files or provider state.

- [ ] **Step 4: Add it to Control Plane Conformance**

Run the validator in CI alongside existing registry/security checks.

- [ ] **Step 5: Verify green**

Run the focused test and the repository conformance command.

- [ ] **Step 6: Commit**

```text
feat: add capability fabric conformance control
```

---

### Task 8: Mission learning and continuous capability optimization

**Files:**
- Modify: `packages/omnii-runtime/src/mission-learning-runtime.ts`
- Create: `packages/omnii-runtime/src/capability-feedback-runtime.ts`
- Create: `packages/omnii-runtime/tests/capability-feedback-runtime.test.ts`
- Create: `docs/architecture/OMNII_CAPABILITY_FEEDBACK_AND_LEARNING.md`

**Interfaces:**
- Consumes: Mission outcome/learning signals and CACF capability descriptors.
- Produces: non-authoritative selection hints for future routing.

- [ ] **Step 1: Write failing tests**

Test that outcomes can update provider/capability reliability hints; failures lower confidence; stale signals can be bounded by evidence age; and no feedback method can return or modify authority.

- [ ] **Step 2: Run the focused test and verify red**

Run:

```bash
npm run test:runtime -- packages/omnii-runtime/tests/capability-feedback-runtime.test.ts
```

- [ ] **Step 3: Implement capability feedback**

Keep feedback stateless and explicit: input history plus new outcome produces selection evidence. Do not mutate the registry implicitly.

- [ ] **Step 4: Connect selection hints to router scoring**

Selection hints affect tie-breaking/quality preference only; they cannot override missing capability, policy denial, authority denial or mission blocking.

- [ ] **Step 5: Run the focused learning/router suite**

Require PASS.

- [ ] **Step 6: Commit**

```text
feat: add capability outcome feedback
```

---

### Task 9: Verification and repository integration

**Files:**
- Modify: `docs/architecture/OMNII_INTEGRATED_RUNTIME_STACK.md`
- Modify: `docs/architecture/OMNII_FINAL_DEPENDENCY_GRAPH.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: completed CACF runtime, provider matrix, conformance validator, Mission Intelligence/Adaptation/Learning.
- Produces: canonical system map showing CACF as a reusable common capability fabric.

- [ ] **Step 1: Update the integrated runtime stack**

Place CACF between capability discovery and governed workflow/execution, while retaining concurrent operation of NAIRE, NGIN, RITES/NGIN continuity, HAPI World and domain products.

- [ ] **Step 2: Update dependency graph**

Classify CACF as an integration/composition runtime capability, not a new constitutional kernel.

- [ ] **Step 3: Run the full runtime suite**

Run:

```bash
npm test
```

- [ ] **Step 4: Run typecheck and production build**

Run:

```bash
npm run typecheck
npm run build
```

- [ ] **Step 5: Run Control Plane Conformance and security posture validation**

Run the existing conformance workflow commands and the CACF validator; confirm failures are fail-closed and no secrets are emitted.

- [ ] **Step 6: Inspect the final PR state**

Confirm PR #41 remains open/unmerged, compare the current head to `main`, and check that current-head CI is green before claiming verification.

- [ ] **Step 7: Commit the integration**

```text
docs: integrate capability fabric into runtime architecture
```

---

## Self-Review Checklist

- [ ] Every connected provider is represented without making any provider constitutional.
- [ ] Capability descriptors are separate from credentials and authority.
- [ ] Multiple providers can implement one canonical capability without creating duplicate semantic truth.
- [ ] ABBA routes through CACF but still cannot self-authorize.
- [ ] Mission Intelligence remains mandatory before consequential execution.
- [ ] Mission Adaptation never widens authority or silently changes the objective.
- [ ] Mission Learning changes selection evidence, never permission.
- [ ] External execution remains `intent → attempt → acknowledgement → external evidence → verification → Actual/Pulse`.
- [ ] Provider failures remain visible and do not become false success.
- [ ] Conformance is deterministic and fails closed.
