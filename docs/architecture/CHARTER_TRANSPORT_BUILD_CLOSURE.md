# CHARTER — Transport Architecture Build Closure

## Closure status

The canonical transport architecture is considered **source-complete** for product composition.

This does not claim that every transport service or integration has been implemented. It means the source model is broad enough to accept present, historical and future movement capabilities without creating competing primitives.

## Closed source concerns

- movement capability representation;
- multimodal journey composition;
- graph continuity;
- routing and fallback;
- availability and assignment;
- execution and exception states;
- recovery/recomposition;
- HAPI/Fleet/Logistico boundaries;
- NAB/Pilgrim/Hitch composition boundaries;
- service integrity;
- future-mode extensibility;
- product extraction/handoff;
- IO value boundary.

## Remaining implementation tracks

These are product/integration execution tracks, not new canonical transport primitives:

1. adapters to live location and mobility providers;
2. infrastructure and station registries;
3. live vehicle/asset telemetry;
4. regulatory and institutional integrations;
5. inspection/maintenance integrations;
6. real-world dispatch integrations;
7. safety/emergency integrations;
8. production observability and evidence pipelines;
9. product-specific interfaces and workflows.

## Architectural rule

Do not reopen the transport ontology to solve an integration problem. Add an adapter, capability, workflow or product composition at the appropriate boundary.

## Final invariant

> **Charter is the universal movement layer of OMNII: it composes people, assets, infrastructure, routes, modes, services and recovery into movement without owning the human, fleet, goods, automobile registry or value domains.**
