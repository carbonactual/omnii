# OMNII Common Layer — Canonical 1.0

**Status: CANONICAL — 2026-09-06**

## Purpose

The Common Layer is the reusable semantic fabric beneath Carbon Actual products and institutional deployments. It does not create a second constitutional kernel and it does not replace the canonical OMNII object/relationship model.

## Denominator Taxonomy — added 2026-09-08

The Common Layer now explicitly separates **Universal Denominators** from **Ecosystem Denominators** while retaining one authoritative registry, `public.omnii_common_primitives`.

- **Universal denominators** are conservative cross-domain abstractions supported by established ontology and interoperability patterns: `THING, AGENT, ACTIVITY, PROCESS, RELATION, QUALITY, STATE, CHANGE, IDENTITY, IDENTIFIER, INFORMATION, COLLECTION, MEASUREMENT, TIME, PLACE, REPRESENTATION, CONTEXT, PURPOSE`.
- **Ecosystem denominators** are recurring Carbon Actual operating capabilities: `INTENT, CAPABILITY, AUTHORITY, AUTHORIZATION, OBLIGATION, REQUEST, SERVICE, WORKFLOW, TASK, DISCOVERY, MATCHING, AVAILABILITY, RESOURCE, RIGHTS, VALUE, EXCHANGE, MARKET, OFFER, ORDER, TRANSACTION, SETTLEMENT, EVIDENCE, PROVENANCE, POLICY, DECISION, COMMUNICATION, AUDIT, REGISTRY, COMPLIANCE, RISK, CONSENT, CREDENTIAL, SCHEDULING, BOOKING, QUEUE, ALLOCATION, EXECUTION, FULFILLMENT, DELIVERY, INTEROPERABILITY`.
- Domain-specific concepts extend these contracts; technology-specific implementations sit at the edge and remain replaceable.

The complete research-backed taxonomy and reuse rules are defined in `docs/architecture/OMNII_UNIVERSAL_AND_ECOSYSTEM_DENOMINATORS_1_0.md`.

## Eight Deep Common Denominators

`ENTITY + RELATIONSHIP + INTENT + CAPABILITY + VALUE + AUTHORITY + MOTION + OUTCOME`

These are expressed through the existing OMNII foundation and composition contracts.

## Shared Primitive Registry

The original live Common Layer registry contains 31 reusable deep/common/cross-cutting primitives. It is extended by the 2026-09-06 Universal Capability Registry with additional reusable capabilities without creating a second registry.

The authoritative registry table remains `public.omnii_common_primitives`.

The expanded canonical capability catalog is defined in `docs/canonical/OMNII_UNIVERSAL_CAPABILITY_REGISTRY.md` and implemented through idempotent registry extensions.

Core shared entries remain:

`identity, relationship, intent, capability, discovery, matching, context, availability, lifecycle, trust, authority, authorization, resource, property, rights, value, exchange, market, offer, order, transaction, io, settlement, management, communication, document_evidence, workflow, location_time, compliance_risk, analytics_learning, interoperability`

Expanded reusable capabilities include, among others:

`identifier, role, profile, representation, membership, delegation, request, inquiry, application, submission, registration, enrollment, nomination, referral, claim, form, questionnaire, declaration, statement, document, evidence, proof, attestation, provenance, search, query, scheduling, appointment, booking, reservation, queue, allocation, task, assignment, case, stage, checkpoint, action, execution, fulfillment, delivery, assessment, examination, interview, inspection, audit, evaluation, scoring, ranking, result, finding, approval, rejection, selection, adjudication, permission, consent, mandate, license, permit, clearance, policy, rule, control, marketplace, quote, invoice, payment, receipt, refund, return, contract, obligation, ownership, custody, instrument, portfolio, funding, capital, investment_position, notification, invitation, conversation, collaboration, meeting, feedback, address, territory, movement, trip, shipment, state, status, change, version, progression, milestone, outcome, history, tracking, analytics, scenario, simulation, ai_identity, agent_identity, ai_minting, ai_knowledge_package, ai_training, ai_assessment, ai_deployment, ai_evaluation, ai_monitoring, ai_update, ai_retirement, human_supervision, api, adapter, connector, protocol, schema_mapping, import_export, synchronization`

## Canonical Ownership Boundaries

- **HAPI** is the Human API and principal ecosystem entry boundary. A human can arrive through any product or institutional channel and is bound to one ecosystem-native identity hashtag.
- **HAPI World** is the AI-side operating world associated with that identity and its personal/entity AI relationships.
- **InstituteGPT** owns all learning, instruction, study, training, practice, competency development, CPD and AI education. It composes universal application, scheduling, assessment, evidence and credential capabilities rather than duplicating them.
- **Knowledge** is the shared knowledge substrate. InstituteGPT teaches and updates knowledge/capability state; Knowledge is not itself a school.
- **General Service** owns universal service mechanics. Products consume it rather than creating product-specific universal service systems.
- **General Marketplace** owns universal marketplace/discovery/listing/offer capability. Domain marketplaces are compositions/views.
- **Trade** owns exchange execution and fulfillment.
- **Investment** owns capital deployment and investment-position semantics.
- **Markets** owns market/value formation mechanics.
- **Opportunities** owns opportunities such as jobs, contracts, internships, grants, scholarships, projects and other prospects.
- **NGIN** carries entity/government/organization/association-side progression and value semantics.
- **NAIRE** carries human-side progression and value/economic semantics, without redefining the legal meaning of the national currency Naira.
- **ROOT** remains the durable canonical identity/verified-state context; external authority identifiers remain linked records.
- **ACTUAL** represents current operational reality.
- **ATLAS** is a governed discoverable/public projection and is not a competing system of record.
- **IO** records significant interaction, movement, handoff and state transition between these layers and domains.

## Universal Operating Pattern

`intent → discovery → match → context/availability → authority/authorization → application/request → workflow → execution → evidence → result/outcome → settlement/ledger → pulse/learning`

Not every flow uses every stage; the pattern is compositional.

## Education / InstituteGPT Boundary

InstituteGPT is the canonical owner of learning and competency semantics. Education may involve physical, online, hybrid, workplace, field, simulation and self-directed modes. InstituteGPT may orchestrate admission, application, internships, SIWES, practical training, examinations, proctoring/invigilation integrations, CPD, promotion examinations and certification preparation while leaving legal issuance and professional authorization to the competent authority.

Human and AI learning are linked but distinct. A person's qualification can inform the authorized knowledge/capability available to that person's AI, but human professional qualification is not automatically an AI professional licence.

## Evidence, Results and Certificates

The Common Layer distinguishes `record`, `result`, `evidence`, `attestation`, `credential`, `certificate`, `qualification`, `registration` and `license`. A receipt is a transactional acknowledgement/record; it is not automatically a legal certificate. External authorities remain the issuers of their own authority-bearing credentials.

## ABBA Boundary

ABBA is the master intelligence/orchestration layer. It may interpret, reason, plan, discover, match, route, compose, monitor, learn and escalate. It may not issue authority, change the Constitution, or replace required human/legal authority.

## Graph and Atlas

The universal graph remains `Object --[typed Relationship]--> Object`. Atlas is a governed discoverable representation over canonical objects and relationships; it is not a competing system of record.

## Interoperability

External systems connect through adapters, APIs, webhooks, protocols, import/export and identity/schema mappings. No proprietary provider is constitutional.

## Economics

Value is universal and is not reduced to money. Existing economic vectors, value observations, tokenization, market orders, trades and settlements remain domain implementations of the shared exchange/value semantics.

## Trading and Investment

Trade intent, offer and investment-position records provide reusable composition primitives. Instrument types remain open-world: money, currency, tokens, securities, equity, debt, credit, royalties, licenses, permits, certificates, credentials, contracts, leases, subscriptions, memberships, franchises, mandates, collateral, property, land, resource rights, data rights, AI rights, access rights, carbon/water/energy rights, attention, reputation, position, rank, clearance, skill, time, capacity and opportunity.

## Horizon Safety

Every governed object remains classifiable across `OLD | NOW | FUTURE | EMERGING | UNKNOWN_ALIEN`. Future, simulated or unknown states cannot silently become Actual. Unknown/alien candidates receive provisional treatment with provenance and uncertainty; authority and trust are never inferred.

## Reuse Rule

`build once → strengthen once → compose many times → configure locally → deploy/handoff cleanly`

A new requirement should first reuse an existing primitive/capability before introducing a new domain contract or constitutional change.
