# Integration-First Universal Interoperability Fabric Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved Integration-First Universal Interoperability Fabric doctrine into provider-neutral OMNII contracts for identity/name resolution, capability discovery and routing, trust admission, integration execution, and Proof/Pulse/Value accountability.

**Architecture:** OMNII remains the constitutional layer and defines interfaces, invariants, lifecycle semantics, and adapter boundaries. ENS, HNS, DID methods, DNS, MCP, A2A, APIs, SDKs, CLIs, web adapters, model providers, policy engines, secrets systems, workload identity, event buses, workflow engines, and observability systems are replaceable implementations behind those contracts. Integration is represented as a governed relationship, while resolution, verification, authority, execution, and tokenization remain distinct stages.

**Tech Stack:** Existing OMNII TypeScript kernel patterns; provider-neutral TypeScript interfaces; JSON-serializable contracts; existing entity identifiers, Proof/Pulse/Value lifecycle; GitHub-hosted documentation and tests. No new mandatory commercial dependency. Open standards and self-hostable/open-source adapters are preferred.

**Spec:** `docs/superpowers/specs/2026-09-07-integration-first-universal-interoperability-fabric-design.md`

## Global Constraints

- `MINT != TOKENIZE`.
- `MINT -> TERMINAL`.
- `TOKENIZE -> INDEX`.
- Resolution never silently grants trust or SEAL authority.
- `#` remains the HAPI↔AI identity bridge and is not authority.
- SEAL remains explicit, scoped, revocable, attributable, and auditable human authority.
- External providers and protocols remain replaceable adapters.
- Free/open-source, self-hosted, open-standard, or free public infrastructure is preferred for the constitutional core.
- Commercial hosted services can only appear behind optional adapters.
- PHOENIX is defensive containment/recovery only.
- Failed integrations remain accountable and may stop at Terminal.
- Future/speculative capabilities remain separated by `OLD | NOW | FUTURE | EMERGING | UNKNOWN_ALIEN`.
- Products must consume OMNII contracts rather than redefine them.

---

## File Map

**Create**
- `packages/kernel/src/integration/integration.ts` — universal integration record and lifecycle state.
- `packages/kernel/src/integration/identity.ts` — identity references, DID/name references, evidence-based correlation contracts.
- `packages/kernel/src/integration/resolution.ts` — resolver and resolution-result contracts.
- `packages/kernel/src/integration/capability.ts` — capability cards, registry records, trust/admission state.
- `packages/kernel/src/integration/routing.ts` — protocol and provider route selection contracts.
- `packages/kernel/src/integration/protocols.ts` — protocol families MCP/A2A/API/SDK/CLI/WEB/LOCAL.
- `packages/kernel/src/integration/lifecycle.ts` — discover/import/quarantine/admit/revoke/deprecate lifecycle.
- `packages/kernel/src/integration/accountability.ts` — integration outcome → Pulse/Value/Proof/Mint/Terminal bridge.
- `packages/kernel/src/integration/index.ts` — integration module exports.
- `packages/kernel/test/integration/integration.test.ts` — integration invariants and lifecycle tests.
- `packages/kernel/test/integration/identity.test.ts` — identity/name/resolution separation tests.
- `packages/kernel/test/integration/routing.test.ts` — protocol-selection tests.
- `packages/kernel/test/integration/accountability.test.ts` — failed/successful integration accountability tests.
- `docs/canonical/INTEGRATION_FIRST_INTEROPERABILITY_FABRIC_V1.md` — implementation-facing canonical summary and invariants.
- `docs/canonical/IDENTITY_NAMING_RESOLUTION_MESH_V1.md` — DID/ENS/HNS/DNS model.
- `docs/canonical/CAPABILITY_TRUST_EXCHANGE_V1.md` — admission/trust/provenance model.
- `docs/canonical/PROTOCOL_SELECTION_ROUTER_V1.md` — route-selection model.

**Modify**
- `packages/kernel/src/index.ts` — export integration module.
- Existing canonical/index/runtime documentation that references universal capability or integration semantics, only where required to point to the new contracts.

---

### Task 1: Add the universal integration contract

**Files:**
- Create: `packages/kernel/src/integration/integration.ts`
- Create: `packages/kernel/src/integration/lifecycle.ts`
- Test: `packages/kernel/test/integration/integration.test.ts`

**Interfaces:**
- Produces `IntegrationRecord`, `IntegrationState`, `IntegrationEndpointRef`, `IntegrationConstraint`, and `assertIntegrationRecord()`.
- Produces lifecycle transitions: `DISCOVERED`, `IMPORTED`, `QUARANTINED`, `TESTING`, `ADMITTED`, `ACTIVE`, `DEGRADED`, `REVOKED`, `DEPRECATED`.

- [ ] Step 1: Write failing tests proving an integration must identify source/target, relationship, protocol, trust state, authority requirements, provenance, and lifecycle state.
- [ ] Step 2: Run the targeted integration tests and verify the missing contract fails.
- [ ] Step 3: Implement the minimal serializable contracts and validation.
- [ ] Step 4: Add lifecycle transition validation so illegal transitions throw and revocation cannot silently return to active.
- [ ] Step 5: Re-run targeted tests.
- [ ] Step 6: Commit with `feat(kernel): add universal integration contract`.

---

### Task 2: Add identity, naming, and resolution mesh contracts

**Files:**
- Create: `packages/kernel/src/integration/identity.ts`
- Create: `packages/kernel/src/integration/resolution.ts`
- Test: `packages/kernel/test/integration/identity.test.ts`

**Interfaces:**
- Produces `IdentityRef`, `NameRef`, `ResolutionMethodRef`, `ResolutionResult`, `VerificationEvidence`, `CorrelationCandidate`, and `IdentityCorrelationDecision`.
- Supports identity/name schemes including `did`, `ens`, `hns`, `dns`, and generic `uri` without treating them as equivalent.

- [ ] Step 1: Write failing tests for `resolve != verify != authorize`, for multi-method identity representation, and for evidence-based correlation.
- [ ] Step 2: Verify the tests fail before implementation.
- [ ] Step 3: Implement the scheme-neutral identity and resolution contracts.
- [ ] Step 4: Add ENS-specific metadata fields needed for forward/reverse records, text/content records, wildcard resolution, and DNS-linked resolution without making ENS mandatory.
- [ ] Step 5: Add HNS-specific metadata fields needed for decentralized DNS-compatible resolution without making HNS mandatory.
- [ ] Step 6: Add DID method reference fields so any registered method can be represented by a replaceable driver.
- [ ] Step 7: Add correlation rules requiring explicit evidence and support for conflict, stale, revoked, ambiguous, and uncorrelated states.
- [ ] Step 8: Re-run targeted tests.
- [ ] Step 9: Commit with `feat(kernel): add identity naming resolution mesh`.

---

### Task 3: Add capability cards and federated registry contracts

**Files:**
- Create: `packages/kernel/src/integration/capability.ts`
- Test: `packages/kernel/test/integration/integration.test.ts`

**Interfaces:**
- Produces `CapabilityCard`, `CapabilityImplementation`, `CapabilityRegistryEntry`, `CapabilityTrustProfile`, `CapabilityPermission`, `CapabilityDependency`, and `CapabilitySubstitutionSet`.

- [ ] Step 1: Write failing tests proving a capability can expose multiple implementations and protocols without creating separate conceptual capabilities.
- [ ] Step 2: Verify failure.
- [ ] Step 3: Implement provider-neutral capability contracts.
- [ ] Step 4: Add fields for protocol, version, source, license, maintainer, dependencies, permissions, data boundary, jurisdiction, trust, provenance, SBOM reference, quality, reliability, latency, cost/value, fallback, substitution, and revocation.
- [ ] Step 5: Add deterministic capability identity independent of provider identity.
- [ ] Step 6: Re-run targeted tests.
- [ ] Step 7: Commit with `feat(kernel): add universal capability registry contracts`.

---

### Task 4: Add protocol and provider selection router contracts

**Files:**
- Create: `packages/kernel/src/integration/protocols.ts`
- Create: `packages/kernel/src/integration/routing.ts`
- Test: `packages/kernel/test/integration/routing.test.ts`

**Interfaces:**
- Produces `ProtocolKind`, `RouteCandidate`, `RouteContext`, `RouteDecision`, and `rankIntegrationRoutes()`.

- [ ] Step 1: Write failing tests for default preference: deterministic→CLI, structured tool/data→MCP, agent delegation→A2A, direct service→API, embedded performance→SDK, browser/external world→WEB, private/edge→LOCAL.
- [ ] Step 2: Verify failure.
- [ ] Step 3: Implement protocol-neutral route candidates.
- [ ] Step 4: Implement route scoring across capability fit, authority, privacy, availability, trust, value, latency, cost, data boundary, and jurisdiction.
- [ ] Step 5: Ensure route ranking never treats provider popularity as constitutional authority.
- [ ] Step 6: Add explicit `no-safe-route` outcome rather than silently selecting a degraded unsafe provider.
- [ ] Step 7: Re-run targeted tests.
- [ ] Step 8: Commit with `feat(kernel): add protocol selection router contracts`.

---

### Task 5: Add capability trust exchange and admission lifecycle

**Files:**
- Modify: `packages/kernel/src/integration/capability.ts`
- Modify: `packages/kernel/src/integration/lifecycle.ts`
- Test: `packages/kernel/test/integration/integration.test.ts`
- Create: `docs/canonical/CAPABILITY_TRUST_EXCHANGE_V1.md`

**Interfaces:**
- Produces `CapabilityAdmissionInput`, `CapabilityGateResult`, `TrustFinding`, and `AdmissionDecision`.

- [ ] Step 1: Write failing tests for `DISCOVER -> IMPORT -> QUARANTINE -> LICENSE -> SECURITY -> SBOM -> PROVENANCE -> SANDBOX -> CAPABILITY TEST -> PULSE TEST -> POLICY/SEAL -> ADMITTED`.
- [ ] Step 2: Verify failure.
- [ ] Step 3: Implement ordered admission gates and immutable evidence references.
- [ ] Step 4: Add explicit quarantine as the initial state for externally discovered capabilities.
- [ ] Step 5: Add continuous trust degradation/revocation states based on findings, version change, proof failure, or security events.
- [ ] Step 6: Document replaceable adapters for OPA/Cedar, SPIFFE/SPIRE, OpenBao, Sigstore/Cosign, and in-toto rather than embedding their implementations into OMNII.
- [ ] Step 7: Re-run targeted tests.
- [ ] Step 8: Commit with `feat(kernel): add capability trust exchange`.

---

### Task 6: Connect integration outcomes to Proof, Pulse, Value, Mint, and Terminal

**Files:**
- Create: `packages/kernel/src/integration/accountability.ts`
- Test: `packages/kernel/test/integration/accountability.test.ts`

**Interfaces:**
- Produces `IntegrationOutcome`, `IntegrationFeedback`, `IntegrationAccountability`, and `accountIntegrationOutcome()`.

- [ ] Step 1: Write failing tests for success, partial success, timeout, DNS failure, authentication failure, authorization failure, incompatibility, security rejection, and unexpected output.
- [ ] Step 2: Verify failure.
- [ ] Step 3: Implement outcome normalization without converting failure into value.
- [ ] Step 4: Ensure meaningful feedback produces a minted Pulse and routes the minted object to Terminal.
- [ ] Step 5: Ensure no tokenization or Index membership happens automatically from minting.
- [ ] Step 6: Preserve value consumed by failed attempts for the existing accounting/settlement/ASH lifecycle.
- [ ] Step 7: Re-run targeted tests.
- [ ] Step 8: Commit with `feat(kernel): connect integrations to pulse proof value lifecycle`.

---

### Task 7: Export and integrate the kernel module

**Files:**
- Create: `packages/kernel/src/integration/index.ts`
- Modify: `packages/kernel/src/index.ts`
- Test: existing package-level type/test suite plus targeted integration tests.

**Interfaces:**
- Produces the public kernel API surface for all integration contracts.

- [ ] Step 1: Add exports without changing existing exported semantics.
- [ ] Step 2: Run TypeScript type checking/build and targeted tests.
- [ ] Step 3: Fix only integration-related failures introduced by the new exports.
- [ ] Step 4: Commit with `feat(kernel): expose integration fabric contracts`.

---

### Task 8: Publish the canonical integration documentation

**Files:**
- Create: `docs/canonical/INTEGRATION_FIRST_INTEROPERABILITY_FABRIC_V1.md`
- Create: `docs/canonical/IDENTITY_NAMING_RESOLUTION_MESH_V1.md`
- Create: `docs/canonical/PROTOCOL_SELECTION_ROUTER_V1.md`
- Modify: `docs/ARCHITECTURE_BOUNDARY_V1.md` only where necessary to reference the new universal integration boundary.

**Interfaces:**
- Documentation becomes the normative integration reference for products and future adapters.

- [ ] Step 1: Document canonical concepts and prohibited conflations.
- [ ] Step 2: Document DID/ENS/HNS/DNS coexistence and `RESOLVE -> VERIFY -> CORRELATE -> PROVE -> AUTHORIZE`.
- [ ] Step 3: Document protocol routing and adapter replacement.
- [ ] Step 4: Document trust admission and revocation.
- [ ] Step 5: Document `VALUE SENT -> PULSE -> MINT -> TERMINAL`, followed only optionally by curation/tokenization/indexing.
- [ ] Step 6: Document free/open-core and provider-neutrality requirements.
- [ ] Step 7: Commit with `docs: publish integration fabric canonical contracts`.

---

### Task 9: Add cross-repository adoption contracts for ABBA, HAPI, HAPI World, HAPI World Nexus, and ABBA-MAS

**Files:**
- Modify repository-local architecture docs in `B3C0M1NG/ABBA`, `B3C0M1NG/HAPI`, `carbonactual/hapi-world`, `carbonactual/hapi-world-nexus`, and `carbonactual/abba-mas` only where existing integration boundaries need explicit reference to OMNII integration contracts.
- Create repository-local adapter registration/readme docs only when no existing integration entry point exists.

**Interfaces:**
- Products consume `IntegrationRecord`/`CapabilityCard`/`RouteDecision` contracts rather than inventing parallel registries.

- [ ] Step 1: Inspect each repository's existing integration/provider registry and preserve existing product-specific behavior.
- [ ] Step 2: Add explicit provider-neutral contract references.
- [ ] Step 3: Mark OpenRouter, native APIs, local runtimes, MCP, A2A, CLI, and web adapters as replaceable rails where currently hard-coded.
- [ ] Step 4: Preserve the current HAPI mint/Terminal/Index semantics and ABBA's orchestration boundary.
- [ ] Step 5: Run repository-specific static/type/test checks where available.
- [ ] Step 6: Create separate commits per repository.

---

### Task 10: Add the first real adapters for DID, ENS, HNS, and DNS behind the universal contracts

**Files:**
- Create adapter modules in the appropriate integration/adapters locations after repository structure inspection.
- Tests: adapter-specific tests using deterministic fixtures and mocked/network-isolated resolution responses.

**Interfaces:**
- Each adapter implements the same generic resolver interface and returns standardized `ResolutionResult` and evidence references.

- [ ] Step 1: Implement DID resolution through a method-driver interface rather than hard-coding one DID method.
- [ ] Step 2: Implement ENS resolver adapter supporting forward/reverse, text/content records, wildcard resolution, and DNS-linked records where feasible.
- [ ] Step 3: Implement HNS resolver adapter behind the same resolver interface.
- [ ] Step 4: Implement standard DNS/DNSSEC adapter and explicit uncertainty/error states.
- [ ] Step 5: Ensure adapter outputs are untrusted until verification/correlation/policy stages.
- [ ] Step 6: Test adapter selection and fallback.
- [ ] Step 7: Commit each adapter family independently.

---

### Task 11: Add the first capability protocol adapters

**Files:**
- Adapter modules for MCP, A2A, API, CLI, SDK, WEB, and LOCAL execution after repository structure inspection.
- Tests: deterministic mock transport tests.

**Interfaces:**
- Each adapter implements a common execution contract and emits normalized outcome/evidence data.

- [ ] Step 1: Add MCP capability discovery/execution adapter boundary.
- [ ] Step 2: Add A2A Agent Card discovery/delegation adapter boundary.
- [ ] Step 3: Add direct API and SDK adapter boundary.
- [ ] Step 4: Add deterministic CLI adapter boundary.
- [ ] Step 5: Add browser/web adapter boundary.
- [ ] Step 6: Add local/edge execution boundary.
- [ ] Step 7: Verify a single capability can expose more than one transport without duplication of capability identity.
- [ ] Step 8: Commit independently by adapter family.

---

### Task 12: Verification, safety review, and handoff

**Files:**
- No new production files unless verification finds a defect.
- Modify tests/docs only for verified defects or missing acceptance coverage.

- [ ] Step 1: Run full OMNII kernel type checks and tests.
- [ ] Step 2: Run targeted integration tests and verify each invariant from the approved specification.
- [ ] Step 3: Run repository-specific checks for adopted cross-repository contracts.
- [ ] Step 4: Inspect git diff/commit history and verify no BUNK extraction boundary was violated.
- [ ] Step 5: Verify no commercial provider was introduced as a mandatory dependency.
- [ ] Step 6: Verify `MINT != TOKENIZE`, `MINT -> TERMINAL`, and `TOKENIZE -> INDEX` are preserved.
- [ ] Step 7: Verify all claims of passing CI are backed by completed status/run evidence; do not infer success from missing status records.
- [ ] Step 8: Record any human gate that remains, especially standalone `B3C0M1NG/BUNK` repository creation, credential/secrets provisioning, DNS/domain ownership, blockchain transactions, or external-account permissions.
- [ ] Step 9: Finalize with a verification commit only when all checks pass.

---

## Acceptance Coverage

- Integration is a first-class universal contract.
- Identity, naming, resolution, verification, Proof, and authority remain distinct.
- DID, ENS, HNS, DNS, and generic URI/name systems coexist without conflation.
- Capability identity is independent from implementation/provider identity.
- MCP, A2A, API, SDK, CLI, WEB, and LOCAL are interchangeable execution rails.
- External capabilities begin quarantined and require evidence-backed admission.
- Trust can degrade, be revoked, and recover only through explicit lifecycle transitions.
- Identity correlation supports ambiguity and conflict rather than forcing false joins.
- Integration outcomes feed existing Proof/Pulse/Value/Mint/Terminal semantics.
- Failed attempts can stop at Terminal and never become Index value merely through minting.
- Security containment is defensive.
- Durable infrastructure remains replaceable and is not constitutional.
- The system is stateless by default while supporting durable workflows where needed.
- Experience/natural-habitat and meaningful-motion doctrine remains intact.
- Products remain below OMNII and consume contracts rather than redefine them.
