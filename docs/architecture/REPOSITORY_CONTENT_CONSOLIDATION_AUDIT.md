# OMNII Repository Content Consolidation Audit

**Status:** Canonical consolidation register — repository estate audit
**Date:** 2026-09-05
**Authority:** OMNII canonical architecture
**Scope:** All repositories visible in the connected `carbonactual` GitHub account at audit time.

## 1. Purpose

`carbonactual/omnii` is the culmination repository for Carbon Actual architecture, reusable capabilities, shared contracts, canonical schemas, product composition rules, and governed integration patterns.

This audit establishes how the contents of every visible repository are treated:

- **Absorb** — unique architectural knowledge, domain models, specifications, tested design principles, and reusable contracts are brought into OMNII.
- **Compose** — product-specific functionality remains a downstream branch but is represented through OMNII common contracts.
- **Adapt** — third-party/open-source technology is represented as a replaceable implementation/provider adapter; useful patterns may be adopted, but the upstream project itself is not elevated into the constitution.
- **Reference** — useful ideas or source material remain linked as evidence/reference until validated.
- **Do not import** — secrets, vendor lock-in, copied upstream implementation, irrelevant product residue, or semantics that conflict with canonical authority boundaries are excluded.

The rule is not “copy every repository.” The rule is **capture every valuable idea, contract, capability, implementation lesson, and provenance-bearing artifact without duplicating or corrupting the canonical model.**

## 2. Account inventory

The connected account exposes 40 repositories in the audit snapshot:

### Carbon Actual / product / ecosystem repositories

1. `carbonactual/Carbon-Actual-`
2. `carbonactual/omnii`
3. `carbonactual/abba`
4. `carbonactual/abba-mas`
5. `carbonactual/omni`
6. `carbonactual/hapi-world`
7. `carbonactual/hapi-world-nexus`
8. `carbonactual/abba-automation-ecosystem`
9. `carbonactual/direct-bank-app`
10. `carbonactual/open-ballot`
11. `carbonactual/RITES`
12. `carbonactual/noun-student-bot`
13. `carbonactual/nigerian-cultural-atlas`
14. `carbonactual/bklit-ui`
15. `carbonactual/Shadow`
16. `carbonactual/chatbot`
17. `carbonactual/eve-slack-agent`
18. `carbonactual/eve-slack-agen`
19. `carbonactual/eve-slack-agent-template`
20. `carbonactual/ABDUHABU`

### Tooling / framework / integration repositories

21. `carbonactual/openclaw`
22. `carbonactual/caveman`
23. `carbonactual/ECC`
24. `carbonactual/Botpress`
25. `carbonactual/baserow`
26. `carbonactual/crewAI`
27. `carbonactual/universal-mcp`
28. `carbonactual/skills-from-google`
29. `carbonactual/thunderbolt`
30. `carbonactual/mcp-remote`
31. `carbonactual/PraisonAI`
32. `carbonactual/Grok-Api`
33. `carbonactual/mergekit`
34. `carbonactual/agent-skills`
35. `carbonactual/workflow`
36. `carbonactual/ai`
37. `carbonactual/command-code`
38. `carbonactual/claude-code-action`
39. `carbonactual/engram`
40. `carbonactual/Baserow`-class/workflow and agent-support components are treated as implementation research unless separately canonicalized.

### Inventory note

GitHub repository ownership does not itself make a repository a Carbon Actual product. Several repositories are forks, vendor projects, frameworks, templates, or experiments. They are therefore harvested for useful capabilities and patterns rather than promoted into the constitutional layer.

## 3. High-value architectural harvest from `Carbon-Actual-`

The original Carbon Actual repository contains material that is more extensive than the current OMNII architecture alone. The most important additions identified are now being consolidated here.

### 3.1 Audubon Continuum / Ecological Design Doctrine — ABSORB AS CANONICAL

The repository explicitly defines a canonical ecological design doctrine in which:

- every build contains both the being and its habitat;
- habitat is meaning-bearing, not decoration;
- Root, Actual, Becoming and Atlas describe dimensions of the living continuum;
- Plate is naturally fitted curation, not a fixed template;
- relationship is a first-class dimension of reality;
- many individually fitted Plates can remain one recognizable Book;
- the ultimate UX objective is helping the being live, navigate, connect, become and thrive in its real habitat.

This material was absent from the current OMNII repository at the time of audit and has been copied into:

`docs/architecture/AUDUBON_CONTINUUM_ECOLOGICAL_DESIGN_DOCTRINE.md`

The corresponding build method has also been consolidated into:

`docs/architecture/ECOLOGICAL_BUILD_METHOD.md`

The relationship model has been consolidated into:

`docs/architecture/ECOSYSTEM_RELATIONSHIP_MODEL.md`

Source evidence: `carbonactual/Carbon-Actual-/docs/AUDUBON_CONTINUUM_ECOLOGICAL_DESIGN_DOCTRINE.md`, `ECOLOGICAL_BUILD_METHOD.md`, and `ECOSYSTEM_RELATIONSHIP_MODEL.md`.

### 3.2 Audubon must be an ecosystem-wide build method, not a visual theme

The source doctrine explicitly rejects copying Audubon's artwork as a skin. It uses the Audubon / Book / Plate / Bird / Habitat relationship as a method for observing, composing, contextualizing, and preserving individuality while maintaining a coherent whole.

OMNII adoption rule:

**Every significant future build must be capable of recording design genealogy:** identity, Root, Actual, Becoming, Atlas purpose, character references, habitat references, Plate references, translation choices, and the resulting unique Plate.

### 3.3 Relationship-first ecosystem model — ABSORB AND STRENGTHEN

The older ecosystem model defines:

`Identity (#) → Root → Actual → Becoming → Atlas`

with Relationship and Interaction operating across the continuum.

This strengthens the existing OMNII universal graph by making the distinction explicit:

- identity is persistent reference;
- Root is grounding ecological context;
- Actual is current manifested state;
- Becoming is ongoing transformation and possibility;
- Atlas is a navigable expression of relevant reality;
- Relationship and Interaction are cross-cutting rather than merely database joins.

OMNII must preserve the current distinction between canonical runtime state, events, evidence, and relationships while adopting this richer ecological meaning.

### 3.4 Product registry v1 — ABSORB AS HISTORICAL PRODUCT ESTATE

The older product registry contains a wider branch inventory than the currently implemented/conforming product registry. It explicitly names:

RITES, NOUN BOT, SOARE, APARE, SPARE, INSTITUTEGPT, BUNK, OMNI, IO/I-O, PABLOPAY, NANO BANK, OPEN BANK, TIP, CAPITAL, SPOTIST, BUILD LABS, AGRICULTURE, CHARTER, ALTTEL, SERVICES, MEDIA, PRAI, VMS, NGIN, BABYLON, TUMI TOYS, HAPI WORLD, HAPI BANK, DIRECT BANK and ZUJID & CO.

These names are preserved as **historical/registered branch evidence**, not automatically marked as built products. Current implementation status continues to be determined by actual repository evidence and the OMNII product conformance registry.

Important branch semantics from the source include:

- OMNI is a product and not the identity/hash or Foundation.
- HAPI World is an AI-native operating environment/branch.
- HAPI Bank is a financial interface with regulatory boundaries.
- TIP covers trade/investment.
- CAPITAL covers market/trading infrastructure.
- IO/I-O is the ecosystem movement/value interface.
- CHARTER covers transport and logistics.
- ALTTEL covers communications, telecom, satellite and connectivity.
- MEDIA covers creation, licensing, distribution, monetization, traceability and archiving.
- NGIN covers government/entity infrastructure.
- VMS is a visitor-management/access branch.
- AI professional capability requires education, practice, assessment, credentialing, supervised service and continuing development; a credential is not authority.

Source evidence: `carbonactual/Carbon-Actual-/docs/CARBON_ACTUAL_PRODUCT_REGISTRY_V1.md`.

### 3.5 Architecture freeze — ABSORB WITH SEMANTIC RECONCILIATION

The older architecture freeze contains several durable concepts that strengthen OMNII:

- human and AI are complementary rather than mutually substitutable;
- `#` is a minted identity construct, not the human itself;
- HAPI is the Human API/interface;
- ABBA is master intelligence but does not self-authorize;
- SEAL represents human approval where approval is required;
- Pulse is validated feedback/evidence;
- Value is multidimensional;
- tokenization, decimalization and fractionalization represent eligible rights/value rather than creating rights/value from nothing;
- ledgers preserve provenance and uniqueness;
- Root, Actual, Atlas, Becoming, Vault and Index have distinct semantic roles;
- the ecosystem is relationship-first;
- products inherit common infrastructure instead of redefining it;
- regulated domains require their own legal/safety/institutional controls.

One historical statement places NAIRE and NGIN as two fundamental operating environments on the Floor. Current OMNII architecture already recognizes the domains, but the exact environmental placement must remain explicitly composed from shared capabilities rather than creating a new constitutional kernel. The canonical rule is therefore:

**NAIRE and NGIN may be foundational operating environments/compositions on the Floor, but neither is a new constitutional kernel and neither may redefine OMNII.**

Source evidence: `carbonactual/Carbon-Actual-/docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE_V1.md`.

### 3.6 Continuum memory — ABSORB THE SEMANTIC CONTRACT

The old `api/continuum/remember.js` implements a durable memory signal with:

- source
- user/identity reference
- layer
- type
- title
- content
- tags
- metadata
- route
- seal state
- provider
- creation timestamp

This is valuable as a memory/evidence envelope and provenance model.

OMNII adoption:

- preserve the semantic fields;
- route writes through the canonical OMNII memory/evidence runtime;
- keep provider selection behind adapters;
- enforce authority, provenance, privacy, retention, and lifecycle rules;
- avoid a parallel direct-write persistence architecture.

### 3.7 Continuum recall / remember pair — ABSORB AS MEMORY CAPABILITY

The paired recall/remember design demonstrates a simple, portable model for durable agent memory that can sit above storage providers.

OMNII should expose memory as a reusable capability with:

`capture → normalize → provenance → authorize → persist → index → recall → contextualize → audit`

This belongs in the Common Layer / intelligence infrastructure and not only in ABBA.

### 3.8 I/O APIs — ABSORB AS IMPLEMENTATION EVIDENCE

The older Carbon Actual repository includes separate I/O routes for:

- inputs
- operations
- outputs
- exchange
- pulse
- return signals
- value movements
- value states

The semantic idea is strongly aligned with the current OMNII I/O common primitive. The consolidation action is to preserve these distinctions while routing them through the canonical runtime.

The rule remains:

**I/O is a governed movement boundary, not merely an HTTP endpoint family.**

### 3.9 Swarm activation/batching — ABSORB AS ORCHESTRATION CAPABILITY

The old `api/swarm` area includes activation order and batch concepts. These strengthen the existing Swarm/Team model:

- swarm members should be discoverable;
- activation may be staged;
- execution should be grouped into bounded batches where appropriate;
- failures should remain attributable;
- order should be explicit rather than implied by agent-tool discovery order;
- every activation remains subject to capability and authority gates.

This is reusable orchestration capability, not a new constitutional layer.

### 3.10 Integration health — ABSORB

The source repository has an `integration-health` helper and explicit support for multiple accepted environment names/providers. The useful architectural lesson is provider-tolerant health discovery and normalization.

OMNII adoption:

`provider health → adapter contract → normalized capability status → observability → policy`

rather than provider-specific logic leaking into the constitutional core.

## 4. High-value harvest from product repositories

### 4.1 ABBA

Absorb the product/runtime boundary, agent identity, session/plan/decision/tool-call model, and provider adapter pattern into the canonical intelligence architecture.

Strengthen existing OMNII rule:

**ABBA may reason, curate, route, compare, learn and orchestrate; it cannot issue constitutional authority, replace legal authority, or silently bypass SEAL/authorization/evidence.**

### 4.2 ABBA MAS

Absorb the useful command/routing/proof-coordination and intelligence-exchange concepts as reusable orchestration capabilities. Keep GitHub/repository artifacts as implementation evidence, not constitutional authority.

The intelligence-exchange registry concept maps naturally to Common Layer registries and capability/discovery structures.

### 4.3 OMNI

Treat local event buses, state managers, and UX as product manifestations. Canonical identity, relationships, state, authority, evidence, graph, value and Pulse remain in OMNII.

The OMNI surface should consume OMNII Atlas/Actual/Discovery rather than becoming a competing source of truth.

### 4.4 HAPI World

Absorb the AI-world model: AI identities, learning, skill progression, work, interaction, economic participation and evolution under governance.

Maintain the rule that skill/credential does not equal authority and that external law/rights remain authoritative.

### 4.5 HAPI World Nexus

Absorb navigation/presentation ideas as an Atlas/Nexus surface over canonical OMNII data rather than an independent graph or registry.

### 4.6 ABBA Automation Ecosystem / NASC

Absorb the institutional configuration model: registries, forms, processes, agents, workflows, automations, workers and institutional data entry.

These map directly to Common Layer `Management`, `Document/Evidence`, `Workflow`, `Capability`, `Context`, `Authority`, `Execution`, and `Interoperability`.

### 4.7 Direct Bank App

Absorb the direct bank/user flow as a downstream financial branch. Consequential movement of money or rights must travel through canonical authority/authorization/transaction/settlement/evidence structures.

### 4.8 Open Ballot

Absorb the voting/simulation domain model, training workflows, civic process and evidence structures while preserving the explicit simulator/training boundary. It must never imply that a private simulator is an official election system.

### 4.9 RITES

Absorb human continuity semantics: life, death, rites, family, wishes, estate, digital estate, memorial, succession, cemetery/funeral relationships, cultural and legal context, and continuity over time.

These map strongly to Root, Relationship, Lifecycle, Continuity, Document/Evidence, Authority, Value, and Management.

### 4.10 NOUN Student Bot

Absorb the institutional source registry, support workflow, escalation model, student-facing communication adapters, and strong boundaries around institution impersonation and official submissions.

The student remains the actor; ABBA is advisory/orchestration intelligence, not a substitute for institutional or student authority.

### 4.11 Nigerian Cultural Atlas

Absorb cultural knowledge, place, heritage, narrative, provenance and Atlas representation into the ecosystem Knowledge + Atlas model.

The repository reinforces the need for culture to remain contextual rather than being reduced to isolated articles.

### 4.12 BKLIT UI / Shadow / Chatbot / Eve Slack experiments

Treat these as presentation, interaction, messaging, or experimental agent surfaces. Reuse useful interface/communication patterns through adapters and components. They do not define constitutional semantics.

## 5. High-value harvest from agent/tooling repositories

### `caveman`

Useful capability lessons:

- token-efficient communication;
- exact preservation of code/URLs/paths while compressing prose;
- session-level style switching;
- review and commit helpers;
- compression of persistent instruction/memory files;
- subagent roles for investigation/build/review.

Important companion ideas explicitly referenced by the source include:

- `grill-me` — adversarial requirements interrogation;
- `junior-to-senior` — review transformation;
- `loop-factory` — inbox → active → archive with review gates;
- `interface-kit` — usable, accessible UI discipline.

These are best absorbed as reusable agent/development capabilities, not as a new OMNII language or brand.

### `agent-skills`

The repo provides a strong development lifecycle:

`DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP`

and embeds skills such as:

- spec-driven development;
- planning/task decomposition;
- incremental implementation;
- test-driven development;
- context engineering;
- source-driven development;
- doubt-driven development;
- API/interface design;
- browser testing;
- debugging/recovery;
- code review;
- security/hardening;
- performance;
- CI/CD;
- migrations/deprecation;
- documentation/ADRs;
- observability;
- shipping/launch.

OMNII should make these quality gates available to its own build and orchestration environment, while the constitutional model remains independent of any one skills package.

### `eve`

The filesystem-first durable-agent design is a useful operational convention:

- always-on instructions;
- typed tools;
- on-demand skills;
- channels;
- schedules;
- conventional inspectable structure;
- human-in-the-loop support;
- subagents.

OMNII adoption should express these as capability contracts and agent runtime conventions rather than hard-coding the upstream framework.

### `workflow`

Absorb workflow composition, state transitions, dependencies, retries, scheduling, and execution observability where they strengthen OMNII's Workflow/Execution model.

### `universal-mcp`

Absorb protocol-neutral MCP discovery/bridge concepts as interoperability adapters. MCP remains an interface protocol, not a constitutional object.

### `mcp-remote`

Absorb remote MCP transport/connection concepts as provider adapters with strict boundary validation and provenance.

### `crewAI`, `PraisonAI`, `openclaw`, `Botpress`

Treat as orchestration/runtime/reference implementations. Absorb useful multi-agent patterns, routing, tool execution, channel connectivity, memory, scheduling, and operational lessons. Do not duplicate their provider/runtime semantics inside the constitution.

### `ECC`

ECC is explicitly **not** a required constitutional dependency. Useful orchestration/engineering patterns may be reused where independently implementable, but OMNII remains capable of operating with ordinary code, workers, queues, schedulers, authorized agents and open protocols.

### `baserow`

Absorb useful structured-data, forms, table, and data-entry patterns as a possible adapter capability. It does not become the canonical database model.

### `skills-from-google`

Treat as skill/reference material. Extract useful instructional patterns into the governed capability/skill registry where validated.

### `thunderbolt`

Treat as infrastructure/reference implementation. Extract useful concurrency, transport, performance, or agent infrastructure lessons only after validating their fit with OMNII contracts.

### `Grok-Api`

Treat as model/provider adapter. It cannot redefine model-independent ABBA semantics.

### `mergekit`

Treat as model composition/experimentation capability. Useful model-merging and evaluation patterns belong behind a capability adapter and provenance registry.

### `command-code`

Treat as coding/command execution capability subject to strong authority, capability, sandboxing, evidence, and audit boundaries.

### `claude-code-action`

Treat as CI/agent action integration. Useful workflow patterns belong in deployment/automation adapters.

### `engram`

Treat as memory/persistence reference. Useful semantic patterns reinforce OMNII's memory/evidence capability; persistence remains provider-neutral.

### `ai`

Treat the large general AI repository as implementation/reference material. Do not import a competing constitutional abstraction without semantic comparison and provenance.

## 6. Canonical concepts confirmed across multiple repositories

The following are now treated as cross-repository reinforced architecture:

1. Being / Entity is prior to application representation.
2. Identity must remain persistent while state changes.
3. Root is contextual/grounding continuity, not merely a parent record.
4. Actual is present manifested state.
5. Becoming is continuous transformation, not a terminal workflow stage.
6. Atlas is curated/navigable representation, not operational truth.
7. Plate is fitted expression, not a universal template.
8. Habitat and meaningful relationships are part of identity where they constitute meaning.
9. Relationship is first-class and can have state, history, authority, value, provenance and temporal validity.
10. Interaction is what occurs through relationships and can change state, value, evidence, authority and future possibility.
11. ABBA is intelligence/orchestration, never self-authorizing sovereignty.
12. SEAL / human authority remains explicit.
13. Capability is not authority.
14. Credential is not authority.
15. Discovery/matching is not authorization.
16. Event is not state.
17. Evidence is not authority.
18. Tokenization is not proof of ownership/authority.
19. Providers/protocols are adapters, not constitutional dependencies.
20. Products are branches/compositions, not competing constitutions.
21. I/O is governed movement/exchange.
22. Pulse is feedback/evidence, and Value measures multidimensional consequence.
23. Memory requires identity, provenance, authority, lifecycle and retention semantics.
24. Unknown is a legitimate temporary state and must retain provenance/uncertainty.
25. Human and AI should be complementary, with explicit human authority for consequential actions.
26. Development itself needs specification, testing, review, observability and reversible migration discipline.

## 7. Audubon architecture is now binding on product design

All new or substantially revised products should use this design sequence before selecting a page or UI template:

`Life/context → Identity → Root → Actual → Relationships → Interactions → Becoming → Atlas purpose → Character → Habitat → Plate references → Translation → Product Plate`

The shared Carbon Actual identity must come from deeper DNA, not forced visual sameness.

The required outcome is:

**many worlds, many habitats, many Plates, one living Book.**

## 8. Consolidation gap register

### Now consolidated into OMNII

- Audubon Continuum doctrine
- Ecological Build Method
- Ecosystem Relationship Model
- historical Product Registry branch inventory
- older Architecture Freeze principles (semantically reconciled)
- Continuum memory semantic contract
- I/O route distinctions
- Swarm activation/batching pattern
- integration-health/provider normalization concept
- agent development lifecycle concepts from `agent-skills`
- filesystem-first durable-agent conventions from `eve`
- brevity/compression, adversarial review, and loop concepts from `caveman`

### Still requiring executable runtime wiring

- product-by-product migration from local state/event implementations into canonical OMNII runtime;
- universal Atlas/Plate reference library and design-genealogy storage;
- canonical memory capture/recall service over OMNII evidence/storage;
- executable Swarm/Team activation with staged batches and auditable ordering;
- institution/product adapters for all registered branches;
- automated conformance scanner across all Carbon Actual repositories;
- historical branch catalog resolution against current 47-item product catalog;
- formal NAIRE operating-environment composition and NGIN institutional composition implementation contracts;
- deeper harvest of selected product source trees where architecture is embodied primarily in code rather than documentation.

## 9. No-copy rule

The culmination repository should contain:

- canonical semantics;
- reusable contracts;
- canonical schemas;
- architecture and design doctrines;
- capability abstractions;
- registry/index structures;
- reference mappings;
- product composition contracts;
- integration adapters;
- migration/conformance tooling;
- provenance back to source repositories.

It should **not** become a giant dump of every downstream implementation.

The source repositories remain valuable because they provide executable product surfaces and experiments. OMNII remains the canonical semantic center from which those surfaces compose.

## 10. Completion standard

This audit is complete only when each visible repository has:

1. a status classification;
2. its unique architectural/domain contribution identified;
3. relevant semantics either absorbed into OMNII or explicitly rejected/superseded;
4. provenance recorded;
5. product-specific implementations mapped to the common layer;
6. no product silently redefining constitutional semantics;
7. an executable conformance check where the relevant product is maintained as a Carbon Actual branch.

**Canonical outcome:** `carbonactual/omnii` is the semantic and architectural culmination; the other repositories become products, compositions, implementations, experiments, adapters, or references connected to that center without losing their independent histories or useful innovations.
