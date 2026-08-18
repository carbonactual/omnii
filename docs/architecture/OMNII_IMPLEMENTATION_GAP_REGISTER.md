# OMNII Implementation Gap Register

**Scope:** Phase 1–40 runtime hardening and empirical verification.

| Priority | Gap | Consequence | Recommended fix | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository implementation evidence. | The Phase 26→27→28 implementation chain remains intentionally incomplete. | Keep Phase 27 explicitly unimplemented. | Phase 26, governance |
| P1 | New AuthorityRuntime tests/typecheck/build have not yet produced post-hardening CI execution evidence. | Authority implementation is committed and live database RPCs are verified, but repository execution evidence for the new code is not yet established. | Trigger the existing runtime workflow when workflow-dispatch capability is available; fix any failures and rerun. | GitHub Actions execution |
| P1 | Production ABBA intelligence is not implemented. | ABBA is an executable orchestration boundary, not production intelligence. | Integrate an authorized intelligence provider behind the existing boundary only when available. | ABBA + governance |
| P2 | Authenticated/anonymous application-role RLS behavior has not been live-tested. | RLS is enabled, but no explicit OMNII policies exist because the application identity/authority mapping is not yet authoritative. | Define and test narrow application policies only when that identity model exists. | Authority contract + deployment |
| P2 | Event transport remains local EventStore. | Durable event storage exists, but distributed consumer delivery is not proven. | Add transport adapter without changing event semantics when integration requires it. | Event runtime |
| P2 | Workflow/agent production integration remains local. | Production orchestration is not proven. | Add adapters after durable runtime parity is established. | Workflow/agent runtime |
| P3 | Distributed observability remains unimplemented. | Production telemetry is incomplete. | Add provider adapter when deployment stack requires it. | Audit/event runtime |
| P3 | Economic boundary is not a production settlement engine. | Monetary settlement/ownership processing remains incomplete. | Implement domain-specific adapters only when required. | Ledger boundary |
| P4 | Phase 31–40 production implementation remains future/horizon. | Civilization-scale semantics must not be coupled prematurely to core runtime. | Keep behind composition/adapters. | Universal runtime |

## Resolved in this pass

- Canonical production authority runtime boundary materialized without a new constitutional kernel.
- Authority persistence added to the existing `PersistencePort` and adapters.
- Durable `omnii_authorities` schema and named PostgreSQL issue/revoke/suspend RPCs applied to the canonical Supabase project.
- Delegation containment enforced for scope, capability, resource, context and duration.
- ABBA self-issuance/delegation rejected.
- Authority-bearing agents cannot issue/delegate/revoke/suspend governance authority.
- Authority versioning, idempotency and lifecycle checks implemented.
- Live durable issuance, idempotent repeat issuance, revocation and stale-version rejection verified.

## Explicit non-resolutions

- New AuthorityRuntime test suite is not marked PASS because no post-hardening runtime execution evidence is available.
- Phase 27 remains an implementation gap.
- ABBA production intelligence remains unimplemented.
- Authenticated/anonymous RLS policy behavior remains unverified.
- Distributed event transport remains unimplemented.
- Production workflow/agent integration remains unproven.
- Production deployment remains unclaimed.

## Readiness rule

A component is production-ready only when contract, implementation, empirical tests, persistence integration, CI evidence and deployment evidence exist. Documentation or source presence alone is insufficient.
