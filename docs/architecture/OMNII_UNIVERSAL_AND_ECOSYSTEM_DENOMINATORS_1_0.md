# OMNII Universal & Ecosystem Denominators — Canonical 1.0

**Status:** CANONICAL — 2026-09-08

## Purpose

This document defines the reusable denominator model for Carbon Actual / OMNII. It exists to prevent every new application, institution, territory, agent or product from rebuilding concepts that already recur across the ecosystem.

The Common Layer is the reusable substrate. Products and domains compose it; they do not silently create competing versions of its canonical semantics.

## 1. Two denominator levels

### Universal denominators

Universal denominators are broad abstractions that recur across independent domains and are also supported by established ontology/data standards. They are intentionally conservative: this catalog does **not** claim that one ontology has discovered every metaphysical category of reality. It identifies abstractions with strong cross-domain evidence and practical interoperability value.

The initial canonical set is:

`THING`
`AGENT`
`ACTIVITY`
`PROCESS`
`RELATION`
`QUALITY`
`STATE`
`CHANGE`
`IDENTITY`
`IDENTIFIER`
`INFORMATION`
`COLLECTION`
`MEASUREMENT`
`TIME`
`PLACE`
`REPRESENTATION`
`CONTEXT`
`PURPOSE`

### Ecosystem denominators

Ecosystem denominators are universal application capabilities that recur throughout Carbon Actual even when they are not primitive categories of reality. They are the reusable operating vocabulary of the ecosystem.

Canonical examples include:

`INTENT, CAPABILITY, AUTHORITY, AUTHORIZATION, OBLIGATION, REQUEST, SERVICE, WORKFLOW, TASK, DISCOVERY, MATCHING, AVAILABILITY, RESOURCE, RIGHTS, VALUE, EXCHANGE, MARKET, OFFER, ORDER, TRANSACTION, SETTLEMENT, EVIDENCE, PROVENANCE, POLICY, DECISION, COMMUNICATION, AUDIT, REGISTRY, COMPLIANCE, RISK, CONSENT, CREDENTIAL, SCHEDULING, BOOKING, QUEUE, ALLOCATION, EXECUTION, FULFILLMENT, DELIVERY, INTEROPERABILITY`

These must normally be reused through the Common Layer and its canonical backing contracts rather than reimplemented inside individual products.

## 2. External standards informing the synthesis

- **Basic Formal Ontology (BFO):** distinguishes continuants and occurrents and provides reusable categories including objects, qualities, roles, functions, processes, sites and spatial/temporal regions. https://ontology.buffalo.edu/smith/BOBFO.html
- **W3C PROV:** centers provenance around entities, activities and agents, with time, derivation, attribution, association and delegation. https://www.w3.org/TR/prov-dm/
- **RDF/RDFS:** provides a general-purpose resource/graph model and a vocabulary for classes and properties; the RDF 1.2 work continues that interoperability model. https://www.w3.org/TR/rdf-schema/
- **W3C OWL-Time:** models instants, intervals, durations and temporal relations. https://www.w3.org/TR/owl-time/
- **W3C SSN/SOSA:** models observations, properties, sensors, actuators, procedures and samples. https://www.w3.org/TR/vocab-ssn-2023/
- **W3C Organization Ontology:** provides organization, unit, membership, role, post, reporting, location and organizational change concepts while intentionally allowing domain extensions. https://www.w3.org/TR/vocab-org/
- **W3C ODRL:** provides reusable policy semantics around assets, parties, actions, permissions, prohibitions, duties and constraints. https://www.w3.org/TR/odrl-model/
- **Schema.org:** provides widely reused cross-domain concepts such as Thing, Person, Organization, Place, CreativeWork and Action, including identifiers, owners, actions, locations and results. https://schema.org/Thing
- **ActivityStreams:** provides a general activity/object/actor vocabulary with identifiers, time, location, participants and related representations. https://www.w3.org/TR/activitystreams-core/
- **ISO/IEC 11179:** provides a metadata-registry framework for shared data concepts, representations, units, value domains and relationships across organizations. https://www.iso.org/standard/78914.html
- **OpenAPI:** demonstrates a technology-neutral way to publish reusable interfaces, components, schemas and security requirements without making the implementation itself the semantic authority. https://spec.openapis.org/oas/latest.html

The standards are evidence and interoperability references, not constitutional authorities. Carbon Actual retains its own canonical semantics and boundaries.

## 3. Universal denominator rules

Every universal denominator should support, directly or through linked common contracts:

`identity → representation → relationship → time/place/context → state/lifecycle → provenance/evidence → change → interoperability`

A universal denominator may be extended by domain vocabulary but its canonical meaning must remain stable.

## 4. Ecosystem denominator rules

Every ecosystem denominator should declare:

- canonical owner/backing;
- lifecycle and valid states;
- authority and authorization requirements;
- identity and provenance requirements;
- temporal validity where applicable;
- evidence and audit expectations;
- domain extension mechanism;
- technology/provider adapters;
- reuse policy.

A capability is not authority merely because it exists. A record is not truth merely because it is stored. A representation is not the thing represented. A match is not authorization. A token is not authority.

## 5. Application composition rule

A new application MUST follow this order:

`discover denominator → reuse existing capability → compose common contracts → configure domain semantics → add bounded domain capability → add technology-specific implementation`

Only when a concept demonstrably cannot be represented or cleanly extended by existing common contracts should a new denominator be proposed.

## 6. Layer classification

| Layer | Meaning | Example |
|---|---|---|
| Universal | Cross-domain abstraction | Thing, Agent, Process, Relation, Time |
| Ecosystem | Reusable OMNII operating capability | Authority, Workflow, Evidence, Value, Exchange |
| Domain | Specialized semantic capability | Vehicle certification, academic examination, property lease |
| Technology | Implementation/protocol concern | PostgreSQL table, payment API, blockchain adapter |

Technology-specific implementations must remain replaceable. Domain-specific semantics must remain composable. Neither may silently become a new universal denominator.

## 7. Existing OMNII alignment

The Common Primitive Registry remains the single authoritative registry. This taxonomy enriches that registry; it does not create a parallel registry.

Existing Common Layer contracts already establish the deeper ecosystem set `ENTITY + RELATIONSHIP + INTENT + CAPABILITY + VALUE + AUTHORITY + MOTION + OUTCOME`, the reusable capability catalog, the universal operating pattern, and the rule `build once → strengthen once → compose many times → configure locally → deploy/handoff cleanly`.

The new denominator classification adds the missing distinction between:

1. broad cross-domain primitives;
2. Carbon Actual's reusable operational capabilities;
3. domain-specific semantics; and
4. technology-specific implementations.

## 8. Examples of reuse

**Transport:** Agent + Thing/Object + Place + Time + Capability + Authority + Credential + Booking + Value + Evidence + Workflow + IO.

**Education:** Agent + Organization + Purpose + Intent + Application + Capability + Assessment + Evidence + Credential + Workflow.

**Property:** Thing + Agent + Place + Relationship + Rights + Authority + Value + Evidence + Transaction + State.

**Government:** Organization + Agent + Jurisdiction/Place + Authority + Service + Request + Form + Workflow + Decision + Registry + Evidence + Audit.

**Media:** Thing/CreativeWork + Agent + Rights + Representation + Value + Exchange + Evidence + Provenance + Communication + Distribution.

The product is different. The denominator substrate is not.

## 9. Non-duplication law

When two or more products independently need materially the same capability, the architecture must first evaluate promotion into the Common Layer. Once canonicalized, downstream applications consume it rather than rebuilding their own universal implementation.

**Rule:** `build once → strengthen once → reuse everywhere → specialize only at the boundary`.

## 10. Open-world rule

The denominator fabric is extensible. New concepts may be introduced without forcing premature universalization. Unknown or novel concepts remain provisional until they satisfy the denominator tests; they may be used as bounded domain concepts before promotion.

This preserves an open, evolving ecosystem while preventing semantic fragmentation.
