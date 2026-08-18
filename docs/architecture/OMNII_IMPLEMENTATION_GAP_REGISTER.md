# OMNII Implementation Gap Register

**Audit scope:** Phase 1–40

| Priority | Gap | Consequence | Recommended fix | Dependency |
|---|---|---|---|---|
| P0 | Phase 27 has no repository package or commit evidence. | Phase 26→27→28 evolution chain is not fully evidenced. | Treat Phase 27 as unimplemented/reference gap; do not fabricate it. | Phase 26, governance |
| P1 | No single production universal object/relationship runtime is evidenced. | Canonical contracts exist but runtime materialization is incomplete. | Implement the canonical object/relationship services against the schemas. | Object/relationship schemas |
| P1 | Phase 21–40 packages lack individual manifests and production integration evidence. | They cannot be called proven production services. | Integrate only after contract tests and package boundaries exist. | Runtime boundary |
| P1 | Root application is BUNK while repository architecture is OMNII. | Without explicit boundary, product and constitution can be conflated. | Boundary is now canonicalized; keep BUNK product-specific. | Repository boundary |
| P1 | Multiple historical Carbon Actual documents claim canonical authority. | Terminology and architecture can conflict with OMNII. | Canonical OMNII documents supersede historical material; future cleanup should archive/mark legacy sources. | Canonical architecture |
| P2 | Registry semantics are primarily documented, not implemented as one service. | Duplicate semantic stores remain possible in runtime. | Implement registry contracts behind one semantic registry interface. | Registry contract |
| P2 | Event/state separation is documented but not proven by a shared runtime. | Individual implementations may conflate occurrence and state. | Add contract tests around event/state/command/action/execution/workflow/transaction. | Event schema |
| P2 | ABBA runtime is documented but no production ABBA implementation is evidenced in this repository. | Orchestration readiness is architectural, not production-proven. | Connect ABBA only through authority/capability contracts. | Authority + agent contracts |
| P3 | Economic ledger runtime is documented but production ledger implementation is not evidenced here. | Economic readiness is partial. | Implement auditable ledger/transaction contracts before production economics. | Value + event contracts |
| P3 | Distributed persistence, transport, observability and recovery implementations are not evidenced as universal services. | Scale/resilience claims remain architectural. | Build replaceable infrastructure adapters after core contract tests. | Universal runtime |
| P4 | Phase 36–40 civilization-scale runtime semantics remain future/horizon architecture. | Premature implementation could destabilize core. | Keep as constrained compositions/reference specimens until evidence requires productionization. | Phases 21–35 |

## Readiness interpretation

A component is **READY** only when its contract, implementation, integration boundary and validation evidence exist. A document describing a service is not sufficient evidence of runtime readiness.
