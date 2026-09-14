# Ecosystem Runtime Integration Design

**Status:** Approved execution design
**Date:** 2026-09-14
**Scope:** OMNII control-plane, universal runtime, ABBA orchestration, capability registry, repository estate and downstream product composition.

## Goal

Turn the already-established OMNII constitutional, common-layer and runtime contracts into one evidence-backed ecosystem operating substrate without introducing a competing constitutional layer, competing authority model, second universal registry, or destructive repository consolidation.

## Existing facts

1. OMNII is the canonical constitutional/runtime architecture.
2. The Common Layer already defines the universal and ecosystem denominator taxonomy and the canonical universal capability catalog.
3. The Control Plane already defines truth precedence, the promotion ladder, the authority gate, execution reliability controls, evidence-to-Actual semantics, contradiction handling, provider boundaries, agent governance and continuous conformance controls.
4. AuthorityRuntime already enforces bounded authority issuance/delegation, expiry, suspension, revocation, resource/context limits and the prohibition on ABBA/agents issuing authority.
5. RuntimeActivation already composes context resolution, authority validation, route resolution, capability authorization, execution, reconciliation and feedback using durable idempotency.
6. Mission Intelligence already supplies structural TEAM/MISSION readiness and explicitly does not grant permission.
7. The current maturity blocker is primarily evidence: current install/typecheck/test/build/CI/deployment verification is not available through the connected environment, rather than absence of the corresponding runtime contracts.

## Architectural invariants

- Constitution > Human Authority/Governance > canonical architecture/contracts > runtime contracts > implementation > observed runtime/data > historical/proposed material.
- Newer material does not automatically outrank higher authority.
- ABBA may reason, discover, plan, route, compose, monitor and escalate; ABBA cannot create authority or redefine constitutional semantics.
- A route match is not authorization.
- Mission readiness is not authorization.
- Execution acceptance is not completion.
- External acknowledgement must be verified before external success becomes internal success.
- Actual state is projected only from validated evidence.
- Pulse is feedback/measurement, not authority or ownership.
- Products consume universal capabilities; products do not redefine universal semantics.
- External providers are replaceable implementation boundaries.
- Historical material remains provenance-bearing and is not silently erased.
- BUNK remains a downstream product boundary and must not become a constitutional dependency.

## Integration model

```text
Human Authority / Constitution
          |
          v
      OMNII Control Plane
          |
          +--> Canonical Registry / Contradiction Resolution
          |
          +--> Common Layer / Universal Capability Registry
          |
          +--> Identity / Trust / Evidence / Authority
          |
          +--> ABBA orchestration
          |       |
          |       +--> Mission Intelligence (readiness)
          |       +--> Capability discovery
          |       +--> Authority request/delegation
          |
          +--> Runtime Activation
                  |
                  +--> Context
                  +--> AuthorityRuntime
                  +--> Route
                  +--> ExecutionRuntime
                  +--> Evidence
                  +--> Reconciliation
                  +--> Feedback/Pulse
                  |
                  v
          NAIRE / NGIN / RITES / HAPI World / Products
```

## Workstreams

### 1. Canonical estate control

Maintain one authoritative control-plane representation of material ecosystem objects and repositories. Every material repository is classified as canonical, implementation, product, adapter/reference, historical, or unresolved. Classification is evidence-based and does not imply ownership or production status.

### 2. Runtime conformance closure

Promote controls from “specified” to “implemented” only when code exists and is testable. Promote to “verified” only after current executable evidence is captured. Promote to “production” only after deployment/environment evidence exists.

### 3. ABBA-runtime integration hardening

Ensure all consequential ABBA routing paths use the existing authority/runtime boundaries. Do not introduce a second authorization function. Where an existing seam is already correct, add tests and evidence rather than refactoring for appearance.

### 4. Capability fabric

Treat the current Common Layer capability registry as the canonical catalog. Add provider/runtime bindings and conformance metadata only where a capability cannot be routed or verified from current contracts.

### 5. Product composition

Map downstream products/environments to shared capabilities and runtime controls. Prefer composition over bespoke infrastructure. Preserve specialized domain semantics where genuinely required.

### 6. Verification and observability

Capture current CI/runtime/deployment evidence, durable event traces, control findings, and external verification results. Never infer success from documentation alone.

## Human-only boundary

The system may proceed autonomously until a task requires a credential or platform capability not available to the connected tools, such as:

- GitHub organization/enterprise administration unavailable to the current connection;
- production secrets or credentials not exposed to the environment;
- browser/authenticated application-role RLS verification requiring a live user session;
- deployment-provider production access;
- regulated/legal authority decisions;
- approval that is itself the legally required act rather than an engineering preference.

At such a boundary, preserve the finding, required action, evidence collected and exact unblock condition. Do not fabricate completion.

## Completion criteria

The integration stage is complete only when:

1. canonical control records represent the current estate and runtime boundaries;
2. every consequential runtime path has an explicit authority/evidence path;
3. tests cover authority, routing, idempotency, replay, reconciliation and contradiction-sensitive behavior;
4. current CI and execution evidence exists for the changed code;
5. deployment state is independently verified where relevant;
6. unresolved provider or human boundaries are visible as findings, not hidden exceptions;
7. product repositories consume the shared substrate without creating competing universal primitives.
