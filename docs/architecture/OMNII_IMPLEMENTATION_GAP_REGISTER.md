# OMNII Implementation Gap Register

**Scope:** Phase 1–40 runtime hardening and empirical verification. No Phase 41 work is included.

| Priority | Gap | Consequence | Recommended fix | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository implementation evidence. | The Phase 26→27→28 implementation chain remains intentionally incomplete. | Keep Phase 27 explicitly unimplemented. | Phase 26, governance |
| P1 | Post-hardening authority tests/typecheck/build have not produced current execution evidence. | The authority implementation is inspected and live PostgreSQL persistence is verified, but current repository execution evidence is unavailable through the connected GitHub tooling. | Run the existing workflow or repository commands in an execution-capable environment and record fresh results. | GitHub Actions execution |
| P1 | Production ABBA intelligence is not implemented. | ABBA is an executable orchestration boundary, not production intelligence. | Integrate an authorized intelligence provider behind the existing boundary only when available. | ABBA + governance |
| P2 | Authenticated/anonymous application-role RLS behavior has not been live-tested. | RLS is enabled, but no explicit OMNII policies exist because the application identity/authority mapping is not yet authoritative. | Define and test narrow application policies only when that identity model exists. | Authority contract + deployment |
| P2 | Live parent-authority containment is not enforced by the PostgreSQL issue RPC itself. | Constitutional delegation containment is correctly enforced in `AuthorityRuntime`, but the durable RPC is intentionally a storage boundary rather than a second authority semantics engine. | Preserve runtime containment; add a durable transactional delegation operation only if the existing runtime contract later requires database-side atomic delegation. | AuthorityRuntime + persistence |
| P2 | Supabase security advisor reports mutable `search_path` on OMNII PostgreSQL functions, including the authority issue/revoke/suspend functions. | Function name resolution is less constrained than a hardened deployment should require. | Add explicit function `search_path` settings in a narrowly scoped migration after confirming the repository's existing migration convention. | Database hardening |
| P2 | Event transport remains local EventStore. | Durable event storage exists, but distributed consumer delivery is not proven. | Add transport adapter without changing event semantics when integration requires it. | Event runtime |
| P2 | Workflow/agent production integration remains local. | Production orchestration is not proven. | Add adapters after durable runtime parity is established. | Workflow/agent runtime |
| P3 | Distributed observability remains unimplemented. | Production telemetry is incomplete. | Add provider adapter when deployment stack requires it. | Audit/event runtime |
| P3 | Economic boundary is not a production settlement engine. | Monetary settlement/ownership processing remains incomplete. | Implement domain-specific adapters only when required. | Ledger boundary |
| P4 | Phase 31–40 production implementation remains future/horizon. | Civilization-scale semantics must not be coupled prematurely to core runtime. | Keep behind composition/adapters. | Universal runtime |

## Resolved / verified in this pass

- Current `main` remained within the Phase 1–40 architecture.
- `AuthorityRuntime` remains exported and persistence-backed.
- The shared authorization guard was corrected to reject suspended authority and explicit revoked/expired lifecycle states.
- A regression test was added for suspended-authority rejection.
- Canonical Supabase project `omnii-canonical` (`fomkrgrsqakabftymbjn`) is active and live-accessible.
- Live `omnii_authorities` schema, parent foreign key, lifecycle constraints, indexes and RLS enablement were inspected.
- Live issue/revoke/suspend RPCs were inspected and exercised.
- Live idempotent issuance was verified.
- Live revocation and version increment were verified.
- Live stale-version rejection was verified.
- Live suspension and version increment were verified.
- No old inactive Crimson Diamond or Green School project was touched.

## Explicit non-resolutions

- Current authority tests are not marked PASS because no current repository execution evidence is available through the connected GitHub tooling.
- Current typecheck/build/CI are not marked PASS for the same reason.
- Phase 27 remains an implementation gap.
- ABBA production intelligence remains unimplemented.
- Authenticated/anonymous RLS policy behavior remains unverified.
- Live database-side delegation containment remains intentionally unimplemented in the named issue RPC; constitutional containment remains in `AuthorityRuntime`.
- Supabase security-advisor search-path warnings remain open and were not silently treated as resolved.
- Distributed event transport remains unimplemented.
- Production workflow/agent integration remains unproven.
- Production deployment remains unclaimed.

## Readiness rule

A component is production-ready only when contract, implementation, empirical tests, persistence integration, CI evidence and deployment evidence exist. Documentation or source presence alone is insufficient.
