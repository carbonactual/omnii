# OMNII Implementation Gap Register

**Scope:** Phase 1–40 runtime hardening and empirical verification. **No Phase 41 work is included.**

| Priority | Gap | Consequence | Status | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository implementation evidence. | Phase 26→27→28 remains intentionally incomplete. | IMPLEMENTATION GAP | Phase 26, governance |
| P1 | Current repository execution/typecheck/tests/build/CI evidence is not observable through connected GitHub tooling. | Current source cannot be called empirically verified in this environment. | UNVERIFIED — ENVIRONMENT LIMITATION | GitHub Actions execution or shell |
| P1 | Production ABBA intelligence is not implemented. | ABBA is an orchestration/intelligence boundary, not production intelligence. | UNIMPLEMENTED | Authorized intelligence provider + governance |
| P2 | Authenticated/anonymous application-role RLS behavior is not defined. | Browser/application-role access cannot be safely claimed. RLS remains restrictive. | UNVERIFIED/BLOCKED by missing identity binding | Identity → Authority contract |
| P2 | Full database-side parent-authority containment is not implemented. | Constitutional containment remains runtime-owned; SQL is not a second authority engine. | PARTIAL by design | Existing AuthorityRuntime contract |
| P2 | Distributed event transport remains local. | Durable event storage exists, but distributed delivery is not proven. | UNIMPLEMENTED | Event transport adapter |
| P2 | Workflow/agent production integration remains local. | Production orchestration is not proven. | PARTIAL | Deployment adapters |
| P3 | Distributed observability remains unimplemented. | Production telemetry is incomplete. | UNIMPLEMENTED | Deployment stack |
| P3 | Economic boundary is not a production settlement engine. | Settlement/ownership processing remains incomplete. | PARTIAL | Ledger adapters |
| P4 | Phase 31–40 production implementation remains future/horizon. | Civilization-scale semantics remain composition concerns. | FUTURE | Universal runtime |

## Resolved in current hardening

- Mutable PostgreSQL function `search_path` findings resolved by migration 0006.
- Mutating OMNII RPC execution restricted to `service_role` by migration 0007.
- State/event expected-version, authority provenance, idempotency and atomic rollback hardened by migration 0008.
- ExecutionRuntime terminal mutation now uses the existing execution/audit atomic boundary.
- Relationship mutation now uses optimistic CAS semantics.
- Execution state transitions now use optimistic CAS semantics.
- Durable execution/audit RPC now requires expected version and rejects stale finalization by migration 0009.
- Memory adapter execution/state atomic semantics now mirror the named durable boundaries for idempotency and version checks.
- Fresh live 0009 commit, stale-version rejection and rollback behavior verified on `omnii-canonical`.

## Explicit non-resolutions

- Current repository test/typecheck/build/CI execution remains unverified because the connected GitHub tooling does not expose workflow dispatch or a shell execution environment.
- Phase 27 remains an implementation gap.
- ABBA production intelligence remains unimplemented.
- Authenticated/anonymous RLS policy behavior remains unresolved because application identity → authority mapping is not authoritative.
- Full database-side parent-authority containment remains intentionally runtime-owned.
- Distributed event transport remains unimplemented.
- Production workflow/agent integration remains unproven.
- Production deployment remains unclaimed.

## Readiness rule

A component is production-ready only when contract, implementation, empirical tests, persistence integration, current CI evidence and deployment evidence exist. Documentation or source presence alone is insufficient.
