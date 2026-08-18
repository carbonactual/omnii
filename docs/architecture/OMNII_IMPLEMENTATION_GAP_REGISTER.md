# OMNII Implementation Gap Register

**Scope:** Updated after runtime verification and persistence materialization.

| Priority | Gap | Consequence | Recommended fix | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository package or commit evidence. | The Phase 26→27→28 implementation chain remains incomplete. | Keep Phase 27 explicitly unimplemented. | Phase 26, governance |
| P1 | Direct execution of tests/typecheck/build is unavailable in the connected GitHub chat environment. | Empirical verification is not yet evidenced by this conversation. | Run the new GitHub Actions workflow and use its actual result as verification evidence. | CI |
| P1 | Runtime classes remain primarily in-memory and are not yet universally wired to PersistencePort. | Durable storage exists as an adapter, but the complete runtime is not yet storage-independent in production operation. | Introduce persistence-backed runtime facades incrementally without changing synchronous contract semantics until integration tests prove parity. | PersistencePort |
| P1 | Durable multi-record atomicity is not implemented through Supabase/PostgREST. | State+event, execution+audit and ledger+audit cannot yet claim durable atomicity. | Add explicit PostgreSQL RPCs for the required atomic boundaries and test them against the durable adapter. | Consistency model |
| P1 | Universal graph durable persistence is not wired into GraphRuntime. | Graph execution remains in-memory. | Add a graph persistence facade backed by canonical relationship/object stores. | Graph runtime + PersistencePort |
| P1 | Production authority issuance/revocation remains an injected boundary. | Authorization is testable but governance infrastructure is not proven. | Connect to the canonical governance/authority service. | Authority contract |
| P1 | Production ABBA intelligence is not implemented. | ABBA is an executable orchestration boundary, not production intelligence. | Integrate an authorized intelligence provider behind the existing boundary only when available. | ABBA + governance |
| P2 | Registry persistence is not wired into RegistryRuntime. | Durable registry records exist but runtime registry state remains in-memory. | Add a persistence-backed registry facade and parity tests. | RegistryRuntime |
| P2 | Event transport remains local EventStore. | Durable event storage exists, but event bus/consumer delivery is not proven. | Add transport adapter without changing event semantics. | Event runtime |
| P2 | Optimistic compare-and-swap version conflicts are not enforced by the durable adapter. | Concurrent updates may require stronger conflict detection. | Add conditional update/RPC semantics. | PersistencePort |
| P2 | Workflow/agent production integration remains local. | Production orchestration is not proven. | Add adapters after durable runtime parity is established. | Workflow/agent runtime |
| P3 | Distributed observability remains unimplemented. | Production telemetry is incomplete. | Add provider adapter when deployment stack requires it. | Audit/event runtime |
| P3 | Economic boundary is not a production settlement engine. | Monetary settlement/ownership processing remains incomplete. | Implement domain-specific adapters only when required. | Ledger boundary |
| P4 | Phase 31–40 production implementation remains future/horizon. | Civilization-scale semantics could be prematurely coupled to core runtime. | Keep behind composition/adapters. | Universal runtime |

## Resolved in this pass

- Persistence port established.
- Deterministic memory persistence adapter established.
- Durable Supabase/PostgreSQL adapter established.
- Durable schema migration established for the canonical runtime collections.
- Consistency model documented.
- Runtime test command established.
- GitHub Actions verification workflow established.
- Runtime status matrix separated CODE/TESTED/PERSISTED/INTEGRATED/CI-VERIFIED/DEPLOYED.

## Explicit non-resolutions

- Phase 27 remains an implementation gap.
- ABBA production intelligence remains unimplemented.
- Durable database transactions are not claimed until RPC-backed atomic operations exist.
- Runtime persistence integration is partial until all canonical runtime operations use the persistence ports.

## Readiness rule

A component is production-ready only when contract, implementation, empirical tests, persistence integration, CI evidence and deployment evidence exist. Documentation or source presence alone is insufficient.
