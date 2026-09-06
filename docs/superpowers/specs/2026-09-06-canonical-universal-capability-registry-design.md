# Canonical Universal Capability Registry Design

**Status: CANONICAL DESIGN BASELINE — 2026-09-06**

## Purpose

Establish a governed registry of reusable ecosystem capabilities without creating a second constitutional kernel. The registry makes universal capabilities discoverable, assigns canonical ownership, records backing contracts, and prevents products from creating duplicate foundational systems.

## Architectural model

```text
DEEP CANONICAL PRIMITIVES
        ↓
REUSABLE UNIVERSAL CAPABILITIES
        ↓
DOMAIN COMPOSITIONS
        ↓
INSTITUTIONAL CONFIGURATIONS
        ↓
PRODUCTS
        ↓
EXPERIENCES
```

A capability may be universal without becoming a constitutional primitive. Universal capabilities compose existing OMNII primitives and may themselves be composed by domains and products.

## Canonical ownership

| Capability/domain | Canonical owner | Boundary |
|---|---|---|
| Human/entity identity | Root / HAPI | Ecosystem identity is the canonical identity; external identifiers are linked evidence/authority references. |
| Human entry/interface | HAPI | Human API for entry into the ecosystem from any product, institution or direct channel. |
| AI world/interface | HAPI World | AI-side operating world linked to the identity hashtag. |
| Learning and instruction | InstituteGPT | All learning, teaching, training, study, practice, competency development and AI education. |
| Knowledge | Knowledge substrate | Shared knowledge; InstituteGPT is the learning interface to it. |
| Universal interaction/transition | IO | Events, movements, handoffs and state transitions between objects, actors, products and domains. |
| Service | General Service | Universal service request, fulfillment and service lifecycle. |
| Marketplace | General Marketplace | Universal discovery/listing/offer marketplace; domain views are compositions. |
| Trade | Trade | Negotiated exchange and fulfillment execution. |
| Investment | Investment | Capital deployment and investment positions. |
| Markets | Markets | Collective price/value formation and market mechanisms. |
| Opportunities | Opportunities | Jobs, contracts, grants, scholarships, internships, projects, investment opportunities and other opportunities. |
| Human progression/value | NAIRE | Human-side progression/value/economic semantics; not a replacement for any legal currency. |
| Entity/government progression/value | NGIN | Government, organization, association and entity-side progression/value semantics. |
| Current operational reality | Actual | Present state, not the long-term source of verified identity. |
| Curated public/discoverable projection | Atlas | Governed projection over canonical objects/relationships; not a competing system of record. |

## Universal capability families

### Identity and relationship
`identity, identifier, entity, role, profile, representation, relationship, membership, delegation`

### Entry and request
`intent, request, inquiry, application, submission, registration, enrollment, nomination, referral, claim`

### Intake and evidence
`form, questionnaire, declaration, statement, document, evidence, proof, attestation, provenance`

### Discovery and coordination
`discovery, search, query, matching, recommendation, scheduling, appointment, booking, reservation, queue, availability, capacity, allocation`

### Work and process
`task, assignment, workflow, case, stage, checkpoint, action, execution, service, fulfillment, delivery`

### Assessment and decision
`assessment, examination, interview, inspection, audit, evaluation, scoring, ranking, result, finding, recommendation, decision, approval, rejection, selection, adjudication`

### Authority and control
`authority, authorization, permission, consent, mandate, right, license, permit, clearance, compliance, policy, rule, control`

### Commerce and economic exchange
`product, offer, quote, order, transaction, exchange, payment, receipt, invoice, refund, return, settlement, contract, obligation, asset, liability, ownership, custody`

### Markets, finance and opportunity
`marketplace, market, investment, instrument, portfolio, position, funding, capital, opportunity, vacancy, allocation`

### Communication and collaboration
`communication, message, notification, invitation, conversation, collaboration, meeting, feedback`

### Place and movement
`location, address, territory, route, journey, movement, trip, shipment, delivery, checkpoint`

### Risk and integrity
`risk, incident, issue, exception, investigation, remediation, verification, validation, integrity, trust`

### State and progression
`state, status, lifecycle, change, version, progression, milestone, outcome, history, tracking`

### Knowledge and intelligence
`data, information, knowledge, model, theory, insight, forecast, foresight, scenario, simulation, analytics`

### AI and agent lifecycle
`AI identity, agent identity, minting, configuration, knowledge package, training, learning, assessment, capability profile, authorization, deployment, task, evaluation, monitoring, update, retirement, human supervision`

### Interoperability
`API, adapter, connector, protocol, schema mapping, import, export, synchronization`

## Education boundary

InstituteGPT owns educational semantics and workflows. It may compose universal Application, Scheduling, Assessment, Evidence, Credential, Communication, Opportunity, Payment and other capabilities. It does not claim authority to issue external legal/professional credentials. External authorities remain issuers of their own certificates, qualifications, registrations and licenses.

InstituteGPT may create ecosystem-native credentials where the achievement is genuinely defined by an ecosystem standard. Those credentials MUST declare their issuer, standard, scope and non-equivalence to external regulated authority.

## Identity and AI boundary

A human enters through HAPI and is represented by an ecosystem-native identity hashtag. A personal AI is minted in association with that identity and operates in HAPI World. The AI can learn and be evaluated through InstituteGPT. Human qualifications may inform the AI's authorized knowledge/capability context, but a human professional license does not automatically become an AI license.

AI actions remain subject to explicit authority, authorization and human/legal boundaries.

## Universal record principle

Any meaningful occurrence can produce structured records, evidence and/or attestations. These outputs are semantically typed rather than all being called certificates. A receipt, exam result, race result, medical report, audit finding, registration certificate and degree may all be verifiable records/attestations but have different issuers, semantics and legal effects.

## Composition rules

1. Reuse an existing canonical capability before introducing a new one.
2. A domain may specialize a universal capability without redefining its universal semantics.
3. A product may compose universal capabilities but may not create a competing canonical version.
4. External authority remains external authority; verification does not transfer issuer authority to OMNII.
5. Identity follows the ecosystem identity hashtag across products and domains.
6. IO records significant movement, interaction, handoff and state transition.
7. Root receives verified/tokenized human/entity records; Actual expresses current operational reality; Atlas projects governed views.
8. Universal capabilities remain open-world and extensible; adding a capability does not create a constitutional kernel.
9. Future/emerging/unknown capabilities require provenance, uncertainty and versioning and cannot silently become Actual.
10. All capabilities declare lifecycle, provenance, authority context, dependencies and canonical backing.

## Registry status model

Each registered capability uses a lifecycle such as:

`candidate | canonical | active | deprecated | superseded`

A capability also declares architectural class:

`foundation | reusable_capability | cross_cutting | integration`

Domain modules and products are not promoted to universal capability merely because they reuse a common term.
