# OMNII Implementation Gap Register

**Scope:** Updated after runtime materialization.

| Priority | Gap | Consequence | Recommended fix | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository package or commit evidence. | The Phase 26→27→28 evolution chain remains incomplete as implementation evidence. | Keep Phase 27 explicitly unimplemented; materialize only if later authorized by repository evidence. | Phase 26, governance |
| P1 | Runtime persistence is in-memory only. | Runtime state is not durable or horizontally scalable. | Add a replaceable persistence adapter behind the current contracts. | Object/registry/event runtime |
| P1 | Universal graph storage is in-memory only. | Graph is executable but not production-persistent. | Add a graph persistence adapter without changing graph semantics. | Graph runtime |
| P1 | Authority issuance/revocation remains an injected boundary. | Authorization can be exercised, but production authority infrastructure is not proven. | Connect to the canonical governance/authority service. | Authority contract |
| P1 | No production ABBA intelligence is implemented. | ABBA orchestration is executable as a boundary, not as production intelligence. | Integrate an authorized intelligence provider behind the ABBA contract. | ABBA boundary + governance |
| P1 | Tests are created but not executed in the available GitHub environment. | Runtime correctness has not been empirically verified here. | Run repository-native typecheck/tests in a shell/CI environment. | Test runner |
| P2 | Registry schemas are runtime contracts rather than dedicated canonical JSON schemas. | Registry validation is code-level rather than independently schema-published. | Add registry schemas only if required by an external persistence/API boundary; avoid duplicate semantics. | Registry runtime |
| P2 | Workflow/agent integration is in-memory and local. | Production orchestration is not yet proven. | Add adapters to existing production services after contract tests pass. | Workflow/agent runtime |
| P2 | Event transport is local EventStore only. | No durable event bus/consumer infrastructure is proven. | Add a transport adapter without changing event semantics. | Event runtime |
| P3 | Observability is structured audit/event capture, not distributed telemetry. | Production tracing/metrics/log aggregation remains incomplete. | Add OpenTelemetry/provider adapter if the deployment stack requires it. | Audit/event runtime |
| P3 | Economic boundary is an auditable ledger contract, not a complete economic engine. | Production settlement/ownership/monetary processing remains incomplete. | Implement domain-specific economic adapters only when required. | Ledger boundary |
| P4 | Phase 31–40 production implementation remains future/horizon. | Civilization-scale semantics could be prematurely coupled to the core. | Keep behind composition/adapters. | Universal runtime |

## Resolved gaps

- Canonical object runtime: materialized.
- Canonical relationship runtime: materialized.
- Registry runtime: materialized.
- Event/state transition runtime: materialized.
- Graph runtime: materialized.
- Execution runtime: materialized.
- Workflow runtime: materialized.
- Agent boundary runtime: materialized.
- ABBA orchestration boundary: materialized without autonomous intelligence fabrication.
- Audit runtime: materialized.
- Economic/ledger boundary: materialized without conflating value and money.
- Phase 40 competing graph risk: adapter established.

## Readiness rule

A component is **production READY** only when contract, implementation, integration, executable validation and deployment evidence exist. Code presence alone is not deployment evidence.
