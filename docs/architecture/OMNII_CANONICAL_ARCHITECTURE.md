# OMNII Canonical Architecture

**Status: CANONICAL — Phase 1–40 reconciled architecture**

This document is the single authoritative architecture description. Supporting documents may explain a component, but may not redefine its canonical semantics.

## 1. Constitution

OMNII is a constitutional operating-environment architecture. The foundational kernel sequence is:

`BEING → IDENTITY → KNOWLEDGE → MOTION → VALUE → TRUST → RELATIONSHIP → INTENT → EXECUTION → CAPABILITY → RESOURCE → COMPOSITION → CONTINUITY → INTEGRATION`

Governance, security, economics, ABBA/orchestration, audit, observability and resilience constrain and operate across the sequence; they are not additional foundational kernels.

## 2. Objects

Every governed object uses one universal envelope: identity, type, version, lifecycle, provenance, authority context, attributes, relationships, dependencies, capabilities, resources, timestamps and extensions. Domain objects specialize this contract.

## 3. Graph

The universal graph is:

`Object --[typed Relationship]--> Object`

Consequential edges carry source, target, type, authority, provenance, lifecycle/status and temporal validity where required. Dependency edges are semantically distinct from ordinary relationships.

## 4. Events

An event records an occurrence/observation and preserves attribution, provenance, time, correlation and outcome where applicable. Events are not state, commands, queries, actions, executions or workflows.

## 5. State

State is the modeled condition of an object/system. State transitions are governed operations and should produce observable events. State is not an event log.

## 6. Registries

Registries index canonical objects, relationships, dependencies, capabilities, resources, products, services and agents. A registry is a system of record/index for one semantic domain; duplicate registries must not create alternate definitions.

## 7. Runtime

The universal runtime is the implementation boundary that resolves:

`identity → authority → policy → capability → resource → dependency → execution → state transition → event → audit`

Persistence, transport, storage, databases and provider implementations remain replaceable infrastructure beneath the contracts.

## 8. Agents

Agents are runtime participants governed by an agent contract. They plan, reason, coordinate and execute only within delegated authority and capability/resource constraints. Agents are not constitutional dependencies.

## 9. ABBA

ABBA is master intelligence/orchestration. It may perceive, reason, plan, compose, route, delegate, monitor, learn and escalate. It cannot self-authorize, redefine constitutional semantics, bypass policy or convert capability into authority.

## 10. Governance

Governance answers: who may act, what they may do, why, under what authority, for how long, against which object, with which resources/capabilities, and who can revoke/audit the action.

## 11. Security

Authentication establishes identity evidence. Authorization evaluates authority/policy. Permissions are concrete allowed operations. Secrets and data protection secure implementation state. Trust is a separate modeled confidence/assurance concept.

## 12. Value / Economy

Value, money, asset, resource, ownership, contribution, price, cost, obligation, right, ledger entry and transaction are separate concepts. Economic implementations must remain auditable and policy-governed.

## 13. Composition

Products, services, workflows, organizations, institutions, territories and ecosystems compose canonical objects and capabilities. Composition cannot redefine canonical primitives.

## 14. Integration

Integration crosses system boundaries through explicit contracts, adapters, provenance, authority and compatibility constraints. External providers are replaceable.

## 15. Human layer

People are canonical object participants with identity, agency, relationships, consent, authority and continuity. Human authority cannot be silently substituted by agent optimization.

## 16. Organization layer

Organizations and institutions are governed object compositions with mandates, membership, roles, resources, policies, services, accountability and lifecycle.

## 17. Product/service layer

A product packages capabilities and workflows for a defined outcome. A service exposes an authorized capability. BUNK is a product implementation in this repository, not an OMNII constitutional primitive.

## 18. Territory layer

Territories compose people, institutions, infrastructure, resources, services, economy, events and governance. Territorial models remain subordinate to applicable legal and constitutional authority.

## 19. Ecosystem/world layer

Ecosystems and worlds are higher-order compositions. Phase 21–40 architecture belongs here. They use the canonical graph and object envelope rather than defining competing ones.

## 20. Phase 21–40 architecture

The phases are layered as:

```text
FOUNDATIONAL CONSTITUTION
        ↓
UNIVERSAL RUNTIME
        ↓
ECOSYSTEM RUNTIME (21–25)
        ↓
GOVERNED SELF-AUDIT / EVOLUTION (26–30)
        ↓
HUMAN / INSTITUTION / TERRITORY / CIVIC / PLANETARY COMPOSITION (31–35)
        ↓
INTER-CIVILIZATIONAL / MULTI-INTELLIGENCE / MULTI-WORLD HORIZONS (36–40)
```

Phase 27 is currently an evidence gap: no Phase 27 package or commit is present in the repository. It is not treated as implemented merely because the roadmap names it.

Phase 40's `CivilizationNode`/`CivilizationRelation` model is an implementation-specific view/adapter candidate, not a second canonical graph.

## Canonical / implementation / extension / future

- **CANONICAL:** constitutional kernels, object envelope, graph, authority boundaries and core semantic contracts.
- **IMPLEMENTATION:** concrete databases, APIs, runtimes, adapters, BUNK and executable reference packages.
- **EXTENSION:** domain objects/compositions that use canonical contracts without redefining them.
- **FUTURE:** Phase 31–40 capabilities whose production implementation is not proven by current repository evidence.

## Core dependency rule

No constitutional kernel depends on BUNK, a product, a specific agent, ABBA, a provider, or a Phase 31–40 horizon. ABBA coordinates the substrate; governance constrains it; products and ecosystems compose it.
