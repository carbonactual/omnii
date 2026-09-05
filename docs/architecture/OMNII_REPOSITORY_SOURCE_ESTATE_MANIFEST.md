# OMNII Repository Source Estate Manifest

**Status:** Canonical consolidation registry
**Date:** 2026-09-05

This manifest is the control surface for harvesting valuable Carbon Actual repository content into OMNII. It is intentionally broader than the product registry: source repositories may contain products, reusable capabilities, specifications, experiments, adapters, UI, data, or provenance.

## Disposition vocabulary

- **ABSORB** — move the reusable implementation/semantic content into OMNII.
- **COMPOSE** — keep the product branch but bind it to canonical OMNII/HAPI World contracts.
- **ADAPT** — retain provider-specific implementation behind an OMNII adapter.
- **REFERENCE** — retain source lineage for research/comparison without treating it as canonical runtime.
- **REJECT_SUPERSEDE** — preserve provenance but explicitly supersede weaker/contradictory semantics.

## First-party / Carbon Actual repositories

| Repository | Primary value found/expected | OMNII target | Disposition |
|---|---|---|---|
| Carbon-Actual- | constitutional doctrines, APIs, agents, continuum, product history, data | constitution, common, source lineage, products | ABSORB + REFERENCE |
| omnii | canonical runtime, DB, schemas, registries, products | canonical substrate | ABSORB/CANON |
| abba | ABBA intelligence, API, HAPI World, command center, products | agent/orchestration/HAPI capabilities | ABSORB + COMPOSE |
| abba-mas | HAPI laws, token/value logic, multi-agent, registries, workflows | common/economics/agents/HAPI | ABSORB + REFERENCE |
| omni | operational OMNI interface/runtime | product adapter/projection | COMPOSE |
| hapi-world | human/AI world participation | HAPI World common layer | ABSORB |
| hapi-world-nexus | Atlas/Nexus presentation and world navigation | HAPI World + Atlas | ABSORB + COMPOSE |
| abba-automation-ecosystem | NASC forms, registries, workflows, automations, workers | workflow/institutional composition | ABSORB + COMPOSE |
| direct-bank-app | controlled banking flow | finance/authorization/settlement | COMPOSE |
| open-ballot | civic simulation/training | civic domain adapter + evidence | COMPOSE |
| RITES | human continuity | NAIRE/continuity capability | COMPOSE |
| noun-student-bot | institutional source registry, student support, escalation | HAPI learning + institutional workflow | COMPOSE |
| nigerian-cultural-atlas | cultural knowledge, provenance, Atlas | knowledge/Atlas/HAPI World | ABSORB + COMPOSE |
| bklit-ui | UI/interaction system | presentation capability/design genealogy | ABSORB |
| Shadow | experimental surface | presentation/reference | REFERENCE |
| chatbot | messaging/chat surface | communication capability | ABSORB/COMPOSE |
| eve | filesystem-first durable agents, schedules, skills | agent capability adapter | ABSORB + ADAPT |
| eve-slack-agent | Slack agent surface | communication adapter | ADAPT |
| eve-slack-agen | Slack agent variant | communication adapter | REFERENCE |
| eve-slack-agent-template | agent template | agent capability reference | ABSORB + REFERENCE |
| ABDUHABU | small experimental artifact | source lineage | REFERENCE |

## Tooling / provider / framework repositories

| Repository | Value | OMNII target | Disposition |
|---|---|---|---|
| openclaw | agent runtime implementation patterns | agent adapters | ADAPT + REFERENCE |
| caveman | context compression/session/subagent patterns | agent tooling | ABSORB + ADAPT |
| ECC | execution/connectivity experiment | optional adapter | REJECT_SUPERSEDE as dependency |
| Botpress | conversational/workflow framework | adapter pattern | ADAPT + REFERENCE |
| baserow | data/table platform | data adapter pattern | ADAPT + REFERENCE |
| crewAI | multi-agent orchestration | agent adapter | ADAPT + REFERENCE |
| universal-mcp | MCP interoperability | protocol adapter | ADAPT |
| skills-from-google | reusable skills content | capability registry/reference | ABSORB/REFERENCE after license/provenance review |
| thunderbolt | execution/tooling patterns | runtime/tool adapter | ABSORB + ADAPT |
| mcp-remote | remote MCP transport | interoperability adapter | ADAPT |
| PraisonAI | agent orchestration | agent adapter | ADAPT + REFERENCE |
| Grok-Api | provider API integration | model/provider adapter | ADAPT |
| mergekit | model merge tooling | model-ops capability adapter | ADAPT |
| agent-skills | development/verification skills | build governance capability | ABSORB |
| workflow | workflow engine patterns | common workflow capability | ABSORB + ADAPT |
| ai | AI framework/runtime material | model/agent adapters | ADAPT + REFERENCE |
| command-code | command execution/tooling | execution adapter | ABSORB + ADAPT |
| claude-code-action | code-agent CI/action patterns | build/CI adapter | ABSORB + ADAPT |
| engram | memory/agent patterns | knowledge/memory capability | ABSORB + ADAPT |

## Product estate represented by the canonical product registry

Built/conforming: ABBA, ABBA MAS, BKLIT UI, BUNK, Direct Bank App, HAPI World, HAPI World Nexus, NASC, Nigerian Cultural Atlas, NOUN Student Bot, OMNI, Open Ballot, RITES.

Composed: NAIRE, NGIN.

Specified branches retained as product specifications until implementation evidence exists: TIP, Charter, Media, AltTel, Agriculture, Spare, Spotist, Build Labs, Services, VMS, HAPI Bank, Nano Bank, PabloPay, Open Bank, Capital, Institute GPT, PRAI, SOARE, APARE, Babylon, Tumi Toys, Direct Bank, Marketplace, Capital Block.

Reference: ZUJID & CO.

## Harvest rule for every source artifact

A source artifact is incomplete in the consolidation only when its disposition is missing. Every valuable file, function, schema, UI component, data set, route, workflow, formula, prompt, design, or implementation pattern must receive one of the dispositions above with source repository + path + revision provenance.

## Canonical target map

- `packages/omnii-common` — reusable semantic contracts.
- `packages/omnii-products` — product adapters/compositions.
- `packages/omnii-agents` — governed agent capability fabric.
- `packages/omnii-workflow` — forms/process/tasks/workers/automation/registry.
- `packages/omnii-knowledge` — memory/knowledge/evidence/Atlas/design genealogy.
- `packages/omnii-economics` — value/PULSE/tokenization/trade/investment/settlement.
- `packages/omnii-source` — source artifact lineage and dispositions.
- HAPI World contracts — common human/AI participation environment.
- `supabase` — canonical durable state, event, registry, evidence, and runtime persistence.
- `apps` / product surfaces — specialized presentations and bounded experiences.

## Non-goals

This manifest does not authorize copying third-party repositories wholesale, flattening product identity, changing constitutional law without governance, or treating a repository name as proof that its code is canonical.
