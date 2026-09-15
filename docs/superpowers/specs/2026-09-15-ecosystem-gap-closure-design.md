# Ecosystem Gap Closure Design

**Date:** 2026-09-15  
**Status:** Approved for implementation  
**Scope:** Close verified implementation, runtime, security, interoperability, and evidence gaps without changing ecosystem-native constitutional law.

## Goal

Turn the existing OMNII control-plane doctrine into an enforced cross-ecosystem operating loop: canonical meaning → governed authority → capability routing → execution → evidence → state → conformance, while preserving all existing boundaries and treating external providers as replaceable implementations.

## Constitutional constraints

1. Constitution, Human Authority and Governance remain above the Control Plane.
2. ABBA can route and compose capabilities but cannot create authority.
3. Implementation truth and runtime truth cannot silently become constitutional truth.
4. Recency never outranks authority.
5. Contradictions are preserved, classified, resolved and propagated; they are not erased.
6. BUNK remains downstream of OMNII and is not a constitutional dependency.
7. OMNI remains a separate product from OMNII.
8. No competing primitive is introduced where an existing canonical object, relationship, authority, capability, event, registry or boundary already exists.
9. Phase 41 is not started by this work.
10. Free/open or replaceable implementations remain preferred; provider dependence must remain behind adapters.

## Architecture

### A. Control/evidence loop

Every material ecosystem object, capability, product, workflow, agent, integration, schema and runtime component remains traceable through the existing canonical control record:

`canonical_id → owner → contract → authority_class → scope → jurisdiction → implementation_ref → data_ref → runtime_ref → evidence_ref → lifecycle → version → dependencies → consumers → failure_policy → conformance_status`

The implementation adds executable validation and reporting around this record rather than creating a new registry concept.

### B. Universal execution loop

Consequential work follows:

`intent → authority validation → capability selection → execution attempt → acknowledgement → external evidence → verification → state transition → event → observation`

Execution controls include idempotency, duplicate/replay protection, bounded retry, timeout, lease/heartbeat, dead-letter handling, compensation/reversal, escalation, acknowledgement and evidence capture where applicable.

### C. Cross-repository conformance

OMNII is the canonical authority for ecosystem-wide conformance. Other bounded repositories export machine-checkable contracts describing their boundary, required consumers, dependencies and conformance evidence. A conformance runner evaluates these contracts without merging repositories or changing ownership boundaries.

Required bounded participants include ABBA, HAPi World, HAPi World Nexus, NAIRE, NGIN, RITES, IO, Value System, BUNK and OMNI.

### D. Identity and RLS

Database authorization remains restrictive by default. Application-role RLS is only enabled when a canonical identity-to-authority contract exists. The gap closure will first remove public exposure and incorrect grants, then add narrow policies only where the authoritative identity semantics make them provable.

### E. Runtime/event evidence

The existing common event envelope is the interoperability contract. Distributed transport adapters may be added without redefining event semantics. Evidence must distinguish acknowledgement from verified external completion.

## Workstreams

### Workstream 1 — Control-plane validator and drift detection

Build machine checks for control records, promotion status, dependency references, boundary declarations, stale/expired evidence and repository/schema drift.

### Workstream 2 — Runtime reliability and evidence enforcement

Close missing execution controls and test replay, timeout, lease, dead-letter, compensation and external-acknowledgement semantics using the existing runtime contracts.

### Workstream 3 — Cross-ecosystem conformance

Create a machine-readable conformance manifest for bounded repositories and execute it from OMNII CI. Fail closed on missing mandatory contracts or contradictory ownership/boundary declarations.

### Workstream 4 — Supabase hardening

Address the live `omnii-canonical` security findings: RLS-disabled `spatial_ref_sys`, 15 RLS-enabled tables without policies, public PostGIS placement, and exposed SECURITY DEFINER execution. Changes must remain restrictive and must not invent application-role authorization semantics.

### Workstream 5 — Verification and production readiness evidence

Continuously produce evidence for repository tests, CI, runtime build, database checks, deployment state, telemetry and unresolved production integrations. Unknowns remain explicitly unknown rather than promoted to success.

## Error handling

- Missing evidence → `UNVERIFIED`, not `PASS`.
- Conflicting canonical references → preserve both, classify and route to contradiction resolution.
- Provider timeout/failure → retain failed attempt and do not emit successful completion.
- Replay/duplicate → idempotent rejection or previously established result, according to operation semantics.
- Expired/revoked authority → deny execution.
- Missing conformance contract → fail the affected conformance target closed.
- Security finding without a safe policy mapping → keep restrictive denial and register the gap.

## Testing strategy

1. Unit tests for validators and state machines.
2. Contract tests for cross-repository manifests.
3. Integration tests for runtime adapters and event paths.
4. Database tests for grants, RLS, function exposure and authorization behavior.
5. Failure tests for replay, timeout, lease expiry, dead-letter and compensation.
6. CI tests proving pinned/verified control-plane workflow behavior.
7. Live health evidence for the canonical Supabase project.
8. Post-deployment smoke verification where a deployment target is available.

## Completion criteria

The gap-closure effort is complete only when:

- all P0/P1 current implementation gaps are either evidenced closed or explicitly governed as non-required;
- cross-ecosystem contracts are machine-checked;
- runtime reliability controls have executable tests;
- Supabase security findings are resolved or deliberately and explicitly retained with a documented reason;
- current CI/test/build evidence exists for the canonical runtime;
- unresolved external production integrations remain visibly marked as integration boundaries;
- no native ecosystem law or canonical boundary has been altered.
