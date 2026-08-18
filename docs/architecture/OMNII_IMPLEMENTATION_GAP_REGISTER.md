# OMNII Implementation Gap Register

**Scope:** Phase 1–40 runtime hardening and empirical verification. **No Phase 41 work is included.**

| Priority | Gap | Consequence | Recommended fix | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository implementation evidence. | The Phase 26→27→28 implementation chain remains intentionally incomplete. | Keep Phase 27 explicitly unimplemented. | Phase 26, governance |
| P1 | Current repository typecheck/runtime tests/build/CI evidence is not yet observable for the corrective hardening commit. | Source and live database evidence exist, but current repository execution evidence must come from an actual current workflow or execution-capable environment. | Observe the current push workflow if available; otherwise execute the repository-native commands in an execution-capable environment. | GitHub Actions execution |
| P1 | Production ABBA intelligence is not implemented. | ABBA is an executable orchestration boundary, not production intelligence. | Integrate an authorized intelligence provider behind the existing boundary only when available. | ABBA + governance |
| P2 | Authenticated/anonymous application-role RLS behavior is not defined. | RLS remains restrictive; browser/application-role access cannot be safely claimed until identity-to-authority mapping is authoritative. | Define narrow policies only when the existing authority/application identity model provides sufficient evidence. | Authority contract + deployment |
| P2 | Live parent-authority containment is not enforced by the PostgreSQL issue RPC itself. | Constitutional delegation containment is enforced in `AuthorityRuntime`; the issue RPC is a durable storage boundary and is now restricted to the backend service role. | Keep runtime containment. Add a database-side delegation boundary only if the existing runtime contract later requires database-side atomic delegation. | AuthorityRuntime + persistence |
| P2 | Event transport remains local EventStore. | Durable event storage exists, but distributed consumer delivery is not proven. | Add transport adapter without changing event semantics when integration requires it. | Event runtime |
| P2 | Workflow/agent production integration remains local. | Production orchestration is not proven. | Add adapters after durable runtime parity is established. | Workflow/agent runtime |
| P3 | Distributed observability remains unimplemented. | Production telemetry is incomplete. | Add provider adapter when deployment stack requires it. | Audit/event runtime |
| P3 | Economic boundary is not a production settlement engine. | Monetary settlement/ownership processing remains incomplete. | Implement domain-specific adapters only when required. | Ledger boundary |
| P4 | Phase 31–40 production implementation remains future/horizon. | Civilization-scale semantics must not be coupled prematurely to core runtime. | Keep behind composition/adapters. | Universal runtime |

## Resolved / verified in this pass

- Current code remains within the Phase 1–40 architecture.
- `AuthorityRuntime` remains exported and persistence-backed.
- Shared authorization rejects suspended, revoked and expired authority.
- Supabase security-advisor mutable `search_path` findings for OMNII functions were resolved by migration `0006_omnii_runtime_security_hardening`.
- Mutating OMNII database RPC execution is restricted to `service_role` by migration `0007_omnii_runtime_function_privileges` while application-role identity remains unresolved.
- Durable state/event RPC now enforces expected-version concurrency and event authority provenance through migration `0008_omnii_runtime_state_event_hardening`.
- Durable state/event live commit, rollback, idempotency and stale-version behavior were freshly exercised.
- ExecutionRuntime no longer pre-mutates terminal state before the execution/audit atomic boundary; a regression test covers audit failure recovery.
- Durable execution/audit live commit and rollback were freshly exercised.
- Durable ledger/audit live commit and rollback were freshly exercised.
- Canonical Supabase project `omnii-canonical` (`fomkrgrsqakabftymbjn`) is active and live-accessible.
- Live authority issuance, idempotency, revocation, suspension and stale-version behavior have been exercised across the authority hardening work.
- No old inactive Crimson Diamond or Green School project was touched.

## Explicit non-resolutions

- Current repository execution/CI evidence remains unverified until an actual current workflow run or execution-capable environment provides evidence.
- Phase 27 remains an implementation gap.
- ABBA production intelligence remains unimplemented.
- Authenticated/anonymous RLS policy behavior remains unverified because the application identity/authority mapping is not authoritative.
- Live database-side parent-authority containment remains intentionally runtime-owned.
- Distributed event transport remains unimplemented.
- Production workflow/agent integration remains unproven.
- Production deployment remains unclaimed.

## Readiness rule

A component is production-ready only when contract, implementation, empirical tests, persistence integration, current CI evidence and deployment evidence exist. Documentation or source presence alone is insufficient.
