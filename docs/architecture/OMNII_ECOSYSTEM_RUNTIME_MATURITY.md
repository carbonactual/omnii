# OMNII Ecosystem Runtime Maturity

**Status:** Canonical control-plane evidence view — 2026-09-15

This document is an evidence view over the existing OMNII architecture. It does not create a new runtime, registry or constitutional layer.

## Evidence model

A control progresses independently through:

`coded → tested → currently-executed → live-verified → CI-verified → deployed`

Documentation is evidence of specification, not proof of execution.

## Current matrix

| Area | Coded | Tested | Currently Executed | Live Verified | CI Verified | Deployed | Current position |
|---|---|---|---|---|---|---|---|
| Control Plane | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Canonical control contract exists; current execution evidence is still required |
| Contradiction Resolution | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Canonical doctrine implemented; propagation/re-conformance remains continuous |
| Common Layer | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Canonical reusable capability fabric exists |
| AuthorityRuntime | YES | YES | SOURCE VERIFIED | YES PRIOR | UNVERIFIED CURRENT | NO | Strong runtime authority boundary; current CI still required |
| RuntimeActivation | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Context → authority → route → execution → reconciliation → feedback exists |
| Ecosystem Conformance Runtime | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Existing conformance/composition engine; gap closure strengthens seams rather than adding a second engine |
| Event Engine | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Canonical event/idempotency/replay substrate exists |
| Integration / Interoperability Fabric | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Identity/resolution, capability admission, protocol routing and adapter boundaries exist |
| ABBA | YES | YES | PARTIAL | PARTIAL | UNVERIFIED CURRENT | NO | Orchestration boundary established; production intelligence provider remains external/unverified |
| Mission Intelligence | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Readiness exists and must not become execution authority |
| Agent Runtime | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Capability/delegated authority checks exist |
| HAPi World | YES | YES | SOURCE VERIFIED | N/A | UNVERIFIED CURRENT | NO | Native AI/world contracts and boundaries exist |
| HAPi World Nexus | YES | YES | SOURCE VERIFIED | N/A | UNVERIFIED CURRENT | NO | Compatibility/integration boundary exists |
| NAIRE | YES | YES | SOURCE VERIFIED | N/A | UNVERIFIED CURRENT | NO | Human environment boundary exists |
| NGIN | YES | YES | SOURCE VERIFIED | N/A | UNVERIFIED CURRENT | NO | Organization/territory boundary exists |
| RITES | YES | YES | SOURCE VERIFIED | N/A | UNVERIFIED CURRENT | NO | Continuity/regeneration boundary exists |
| IO | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Governed movement/value boundary exists |
| Value System | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Canonical value/regeneration boundary exists |
| BUNK | YES | YES | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Downstream property product; not constitutional |
| OMNI | YES | YES | SOURCE VERIFIED | N/A | UNVERIFIED CURRENT | NO | Separate product boundary; not OMNII |
| Repository Estate | YES | PARTIAL | SOURCE VERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Current GitHub account inventory is observable; cross-account/org verification remains environment-limited |
| Product Composition | YES | PARTIAL | PARTIAL | UNVERIFIED | UNVERIFIED | NO | Increasingly assembled from canonical capabilities |
| Observability | PARTIAL | PARTIAL | UNVERIFIED | PARTIAL | UNVERIFIED CURRENT | NO | Event/telemetry seams exist; deployment-specific operations evidence remains incomplete |
| Supabase / PostgreSQL | YES | YES | YES | YES CURRENT | N/A | YES LIVE | `omnii-canonical` is `ACTIVE_HEALTHY`; security advisors still report hardening findings |
| RLS / database exposure | YES | YES | PARTIAL | YES CURRENT | N/A | YES LIVE | Restrictive model remains intentional; current advisor findings require remediation without inventing broad app policies |
| Deployment | YES | N/A | UNVERIFIED | UNVERIFIED | UNVERIFIED CURRENT | NO | Concrete deployment target/post-deploy evidence remains required |

## Current high-priority gaps

1. Current repository install/typecheck/tests/runtime-build evidence through an execution-capable environment.
2. A current GitHub Actions run for the current implementation head.
3. Production deployment target and post-deploy health evidence.
4. Canonical application identity → authority mapping sufficient for narrow application-role RLS policies.
5. Production ABBA intelligence/model provider integration when required.
6. Distributed transport live delivery evidence.
7. Deployment-specific observability, alerting and operational dashboards.
8. Supabase security-advisor findings described below.

## Current Supabase security findings

The live `omnii-canonical` project is healthy, but current advisors report:

- 15 RLS-enabled public tables with no RLS policies.
- `public.spatial_ref_sys` exposed without RLS.
- PostGIS installed in the `public` schema.
- Three `public.st_estimatedextent(...)` SECURITY DEFINER overloads executable by `anon`.
- Those same PostGIS functions executable by `authenticated`.
- `public.omnii_has_active_authority(text)` executable by `authenticated` as SECURITY DEFINER.

These findings are security-hardening work, not permission to invent a permissive identity model. The default remains restrictive denial until an authoritative identity-to-authority contract proves the exact policy predicate.

## Established runtime facts

- `AuthorityRuntime` exists and enforces issuer restrictions, bounded delegation, expiry, suspension, revocation, resource/context limits and authorization.
- `RuntimeActivation` exists and performs context resolution, authority validation, route resolution, capability authorization, execution, reconciliation and feedback using durable idempotency.
- `MissionIntelligenceRuntime` exists and supplies structural readiness for TEAM/MISSION composition.
- The Common Layer capability registry exists and defines the canonical catalog of reusable capabilities.
- The Event Engine is the canonical event substrate for append, idempotency, replay and governed durable event persistence.
- CHARTER journey history routes through the Event Engine rather than creating a competing journey-event store.
- The Integration Fabric is provider-neutral and treats DID/ENS/HNS/DNS and MCP/A2A/API/SDK/CLI/WEB/LOCAL as replaceable adapters/rails.
- The Control Plane defines the promotion ladder and truth precedence.
- The existing Ecosystem Conformance Runtime already provides composition, capability admission, idempotency, execution, exception/recovery and reconciliation primitives; the gap closure therefore extends this runtime rather than introducing another universal orchestration runtime.

## Promotion rule

No area may be promoted to `production` because source code exists. Promotion requires the evidence appropriate to the control:

`contract + implementation + tests + current execution evidence + runtime verification + deployment verification`

where each item is applicable.
