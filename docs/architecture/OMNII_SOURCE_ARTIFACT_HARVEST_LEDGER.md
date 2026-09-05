# OMNII Source Artifact Harvest Ledger

**Status:** Active canonical harvest ledger
**Date:** 2026-09-05

This ledger records concrete source artifacts discovered during the repository sweep. It is deliberately more granular than the repository manifest: a repository can contain several different dispositions.

## Canonical source artifact envelope

Every absorbed, composed or adapted artifact must remain traceable by:

`source_repository + source_ref/commit + source_path + artifact_kind + semantic_area + target_layer + disposition + provenance_note + content_hash + captured_at + reviewer_outcome`

A transformation does not erase lineage. A canonical implementation may replace or strengthen source behavior, but the originating repository/path/revision remains discoverable in the source ledger and, where persisted, in `omnii_source_artifacts` / `omnii_design_genealogies`.

## Allowed dispositions

- `ABSORB` — semantics or implementation pattern moves into canonical OMNII capability/data/runtime.
- `COMPOSE` — functionality remains product/domain-local but binds to OMNII contracts.
- `ADAPT` — provider/framework implementation is retained behind a replaceable adapter.
- `REFERENCE` — useful source evidence retained without canonical adoption yet.
- `REJECT_SUPERSEDE` — conflicting, unsafe or weaker semantics are retained only as historical evidence and must not define runtime behavior.

## Artifact ledger

| Source | Artifact | What is valuable | Canonical target | Disposition |
|---|---|---|---|---|
| Carbon-Actual- | `api/agent.js` | ABBA request routing, authorization response shape, account/target/seal context | agent gateway/authority adapter | ABSORB + ADAPT |
| Carbon-Actual- | `api/zujid-agent.js` | bounded agent request handling | communication/agent adapter | ABSORB |
| Carbon-Actual- | `data/product_family_registry_v2.json` | product constellation and IO/PULSE/Proof/Return spine | product/economic registry | ABSORB + RECONCILE |
| Carbon-Actual- | `data/ecc_registry.json` | ecosystem registry scope, routes, returns, pulse/value/risk | source registry; OMNII control plane | ABSORB, ECC dependency REJECTED |
| Carbon-Actual- | `data/batch_9_full_scope_registry.json` | broad domain/scope inventory including education, health, maps, records, transport, emergency, land | universal registry/domain map | ABSORB |
| Carbon-Actual- | `data/swarm_memory_providers.json` | provider-independent memory routing inventory | knowledge/memory adapters | ABSORB + ADAPT |
| Carbon-Actual- | `docs/integrations/CONTINUUM_MEMORY_SWARM.md` | provider independence for durable memory | knowledge/memory architecture | ABSORB |
| ABBA | `command-center/types/core.ts` | route/product status/domain vocabularies | common product/command contracts | ABSORB + RECONCILE |
| ABBA | `command-center/data/product-registry.ts` | product metadata and monetization/next-action concepts | product registry | ABSORB + RECONCILE |
| ABBA | `command-center/lib/integrations/registry.ts` | integration catalog patterns | adapter registry | ABSORB |
| ABBA | `command-center/lib/github-assets/registry.ts` | source/repo asset registry | source lineage | ABSORB |
| ABBA | `command-center/lib/ecosystem-swarm/registry.ts` | execution rails, queues, alerts, commits, deployments, proof returns | execution/integration registry | ABSORB + ADAPT |
| ABBA | `api/hapi.js` | HAPI World summary route | HAPI World gateway | ABSORB + COMPOSE |
| ABBA | `src/hapi/world-network.js` | HAPI World network summary model | HAPI World | ABSORB |
| ABBA | `public/hapi-world.html` | HAPI World presentation | HAPI World presentation | ABSORB design intelligence |
| ABBA | `public/ai-hapi-world.html` | AI/HAPI World presentation | HAPI World presentation | ABSORB design intelligence |
| ABBA | `spare/workflows.md` | product search + ownership-memory workflow | discovery/memory/workflow | ABSORB |
| ABBA | `spare/architecture.md` | safety, compatibility and consented ownership memory | common safeguards/memory | ABSORB |
| ABBA MAS | `lib/intelligence-exchange.ts` | intelligence exchange registry/routing | agent interoperability | ABSORB |
| ABBA MAS | `app/api/abba/registry/route.ts` | registry response contract | product/agent registry | RECONCILE into canonical registry |
| ABBA MAS | `app/api/token/classify/route.ts` | multidimensional asset/liability scoring | economics/tokenization | ABSORB + RECONCILE |
| ABBA MAS | `data/token-classification-schema.json` | token classification schema | economics/tokenization schema | ABSORB |
| ABBA MAS | `config/seal-authority-levels.json` | explicit human SEAL authority levels | authority/SEAL | ABSORB + RECONCILE |
| ABBA MAS | `docs/IO_PROTOCOL_TOKEN_LEDGER_FOUNDATION.md` | I/O/token/ledger as shared value foundation | economics/I-O | ABSORB |
| ABBA MAS | `00_GOVERNANCE_FORMATION/BASE_VALUE_TOKEN_*` | value token formulas | economics/PULSE | ABSORB + RECONCILE |
| ABBA MAS | `00_GOVERNANCE_FORMATION/TOKEN_STATE_MACHINE_AND_VALUE_LEDGER_LAW.md` | token state transitions and ledger movement | economics/state machine | ABSORB |
| OMNI | `src/identity/ens/registry.ts` | identity name registry implementation | identity/discovery adapter | ABSORB/ADAPT |
| OMNI | `src/rites/contracts/ecosystem-registry.ts` | ecosystem and capability registry contract | common registry | ABSORB |
| OMNI | `src/rites/contracts/ecosystem-router.ts` | intent/domain/intelligence route contract | common routing | ABSORB + RECONCILE |
| OMNI | `src/types/index.ts` | short-term/continuity memory model | knowledge/memory | ABSORB + RECONCILE |
| HAPI World | `CONSTITUTION.md` | Memory Anchor, Governance Anchor, synchronization concepts | HAPI World common contract | ABSORB + RECONCILE |
| HAPI World | `architecture/the-bridge.md` | security, ownership, synchronization, memory and governance anchors | HAPI participation envelope | ABSORB |
| RITES | `docs/RITES_AGENT_REGISTRY_V1.md` | bounded agents over Continuum, no data ownership/authority expansion | agent fabric | ABSORB |
| RITES | `docs/RITES_PRODUCT_SURFACE_V1.md` | contextual Continuum surfaces composed from authorized roles/relationships/scenarios | HAPI/continuity presentation | ABSORB |
| RITES | `docs/RITES_CONTINUUM_CANONICAL_V2.md` | Human Continuity Infrastructure model | NAIRE/continuity domain | COMPOSE |
| RITES | `src/main.jsx` | continuity surface vocabulary | HAPI World continuity module | ABSORB design intelligence |
| NASC | `MASTER_EXPORT.json` | production snapshot of forms/registries/workflows/automation | source data + workflow | ABSORB + PROVENANCE |
| NASC | `lib/nasc/seed.ts` | registry definitions including institution/person/membership | universal/institutional registry | ABSORB |
| NASC | `lib/nasc/types.ts` | workflow state vocabulary | common workflow | ABSORB + RECONCILE |
| NASC | `lib/nasc/metrics.ts` | event-based workflow metrics | analytics/learning | ABSORB |
| NASC | `lib/nasc/http.ts` | structured API error contract | API common capability | ABSORB |
| NASC | `lib/nasc/supabase.ts` | persistence adapter | Supabase adapter | ADAPT |
| Cultural Atlas | `app/page.tsx` | Atlas entry/presentation | HAPI World/Atlas | COMPOSE |
| Product Registry | legacy product registry docs | all product branches and domain specifications | canonical product estate | ABSORB + RECONCILE |

## Reconciliation controls

1. Product registries converge to one canonical estate with projections back to product repositories.
2. HAPI identity/world concepts converge on the HAPI World participation contract and shared identity semantics.
3. Continuum memory, HAPI Memory Anchor, OMNI memory and ownership-memory patterns converge on governed knowledge/memory capabilities with context-specific namespaces.
4. RITES authority concepts, ABBA SEAL levels and OMNII authority runtime converge on the canonical authority/authorization boundary.
5. NASC, ABBA automation, workflow engines and execution-rail patterns converge into `packages/omnii-workflow` plus replaceable adapters.
6. Token/value formulas converge with the existing OMNII economic tables/runtime; weaker variants remain provenance/reference.
7. Domain/product/integration/agent/source registries become reusable registry capabilities rather than duplicate constitutions.
8. ECC, OpenClaw, CrewAI, PraisonAI, Botpress, Baserow, model APIs and MCP implementations remain adapters or references.

## Data preservation requirement

A source artifact containing code, data, configuration, prompt content, registry records, design metadata, implementation-specific constants or tests must either be imported, transformed into a canonical representation with provenance, or explicitly classified as reference/rejected. It must never disappear merely because its surrounding application is consolidated.
