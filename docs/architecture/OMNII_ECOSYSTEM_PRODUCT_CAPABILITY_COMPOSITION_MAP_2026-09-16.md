# OMNII Ecosystem Product / Capability Composition Map — 2026-09-16

**Status:** CANONICAL CONFORMANCE MAP
**Principle:** product context organizes composition; it does not imprison capability.

| Product/composition | Primary context | Consumes reusable capabilities | Reusable contribution / exposed composition | Key handoff boundary |
|---|---|---|---|---|
| OMNI Economic Participation | trade / markets / economic participation | identity, discovery, matching, authority, workflow, interoperability | economic coordination compositions; trade/settlement workflow patterns | economic workflow → I/O / settlement / HAPI / receiving participant |
| OMNI Operating Surface | runtime / integration | identity, authority, workflow, interoperability, discovery, matching | operating/routing/provider integration patterns | execution/provider event → canonical state/evidence/workflow |
| DESK Workspace | participant presentation | identity, discovery, matching, authority, workflow, interoperability | dashboard/workspace presentation patterns | workspace action → governed capability; state remains canonical |
| SPOTIST | universal SEEK | identity, discovery, matching, authority, workflow, interoperability | universal seek/discovery/tracing composition | active seek → provider/domain capability or human handoff |
| ABBA | master intelligence/orchestration | all applicable registered capabilities and authority context | orchestration, composition, mission/team coordination | mission/task → selected capability/product/human execution |
| HAPI | human authority/interaction | identity, authority, workflow, interoperability | human consent, representation and authority composition | human authority/consent → governed execution |
| RITES | continuity/lifecycle | identity, authority, workflow, interoperability | continuity/lifecycle/relationship patterns | lifecycle transition → HAPI / NGIN / receiving product |
| NGIN | organizational / territorial | identity, discovery, matching, authority, workflow, interoperability | institutional/organizational operating compositions | organization/institution workflow → service, workforce, economic or government capability |
| NAIRE | human-side operating environment | identity, discovery, matching, authority, workflow, interoperability | personal progression/value/opportunity compositions | human activity → HAPI / OMNI / service / opportunity capability |

## Reuse rules

1. The rows identify composition context, not permanent ownership of the listed capabilities.
2. A capability may move from local-use to reusable-candidate, shared or canonical without losing its originating product history.
3. Duplicate candidates are semantic matches, not automatic deletion targets; reconcile through the canonical capability contract first.
4. Provider implementations remain adapters and can be replaced without changing the semantic capability identity.
5. Cross-product workflows must end in a canonical receiving capability, human actor, or explicitly governed terminal state.

## Known deliberate compatibility boundary

The historical `carbonactual/desk` and `carbonactual/omni` repositories remain distinct. Their roles are reconciled by `OMNII_OMNI_DESK_REPOSITORY_RECONCILIATION.md`; this map does not rename either repository.

## Immediate gap classes for future conformance reports

- capabilities implemented in products but absent from the canonical capability fabric;
- semantically duplicated product-local capabilities;
- product workflows with no explicit receiving handoff;
- provider integrations without adapter contracts;
- consequential actions missing authority/evidence paths;
- capabilities marked permanently product-specific rather than using maturity/context states;
- compatibility identifiers that lack migration/provenance coverage.
