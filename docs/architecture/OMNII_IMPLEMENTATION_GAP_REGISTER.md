# OMNII Implementation Gap Register

**Scope:** Persistence integration and empirical verification after the audited Phase 1–40 architecture.

| Priority | Gap | Consequence | Recommended fix | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository implementation evidence. | The Phase 26→27→28 implementation chain remains intentionally incomplete. | Keep Phase 27 explicitly unimplemented. | Phase 26, governance |
| P1 | Production authority issuance/revocation remains an injected boundary. | Authorization is executable and testable, but production governance infrastructure is not proven. | Connect to the canonical governance/authority service when available. | Authority contract |
| P1 | Production ABBA intelligence is not implemented. | ABBA is an executable orchestration boundary, not production intelligence. | Integrate an authorized intelligence provider behind the existing boundary only when available. | ABBA + governance |
| P2 | Authenticated/anonymous application-role RLS behavior has not been live-tested. | RLS is enabled on all OMNII tables, but no explicit OMNII policies currently exist. | Define and test hosting-application policies when the application identity/authority model is ready. | Authority contract + deployment |
| P2 | Event transport remains local EventStore. | Durable event storage exists, but distributed consumer delivery is not proven. | Add transport adapter without changing event semantics when integration requires it. | Event runtime |
| P2 | Workflow/agent production integration remains local. | Production orchestration is not proven. | Add adapters after durable runtime parity is established. | Workflow/agent runtime |
| P3 | Distributed observability remains unimplemented. | Production telemetry is incomplete. | Add provider adapter when deployment stack requires it. | Audit/event runtime |
| P3 | Economic boundary is not a production settlement engine. | Monetary settlement/ownership processing remains incomplete. | Implement domain-specific adapters only when required. | Ledger boundary |
| P4 | Phase 31–40 production implementation remains future/horizon. | Civilization-scale semantics must not be coupled prematurely to core runtime. | Keep behind composition/adapters. | Universal runtime |

## Resolved in this pass

- Stateful canonical runtimes now use injected `PersistencePort` boundaries.
- Memory persistence remains deterministic and transaction-capable for tests.
- Supabase/PostgreSQL CRUD, optimistic versioning and explicit atomic RPC boundaries are implemented.
- GraphRuntime is a projection over canonical object/relationship persistence.
- State transition + event uses the persistence atomic boundary.
- Execution + audit uses the persistence atomic boundary.
- Ledger + audit uses the persistence atomic boundary.
- Idempotency and optimistic concurrency contracts are implemented and live-verified at the database boundary.
- Runtime contract and persistence tests execute in CI.
- A standalone `@omnii/runtime` build target is CI-verifiable.
- GitHub Actions evidence exists: run 32103355581 passed install, typecheck, 23/23 runtime tests and runtime build.
- Canonical Supabase project is now explicitly `omnii-canonical` (`fomkrgrsqakabftymbjn`).
- Migrations 0003 and 0004 were applied successfully to the canonical project.
- Live PostgreSQL schema/RPC smoke verification passed for object persistence, state/event atomicity, execution/audit atomicity, ledger/audit atomicity, idempotency uniqueness and optimistic concurrency.
- RLS is enabled on all 11 OMNII runtime tables.

## Explicit non-resolutions

- Phase 27 remains an implementation gap.
- ABBA production intelligence remains unimplemented.
- Production authority issuance/revocation remains outside this runtime materialization pass.
- Authenticated/anonymous RLS policy behavior remains unverified; the OMNII tables currently have zero explicit `pg_policies` entries.
- Distributed event transport remains unimplemented.
- Production workflow/agent integration remains unproven.
- Production deployment remains unclaimed.

## Readiness rule

A component is production-ready only when contract, implementation, empirical tests, persistence integration, CI evidence and deployment evidence exist. Documentation or source presence alone is insufficient.
