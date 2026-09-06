# OMNII Universal Capability Registry

**Status: CANONICAL — 2026-09-06**

## Purpose

This registry is the canonical catalog of reusable ecosystem capabilities that sit between OMNII's deep constitutional primitives and domain/product implementations. It expands the Common Layer without creating a second constitutional kernel.

## Ownership map

| Canonical capability family | Owner | Examples |
|---|---|---|
| Human/entity identity | ROOT / HAPI | identity, identifier, role, profile, representation, relationship |
| Human/AI entry | HAPI / HAPI World | human entry, personal AI, AI identity, agent identity, AI minting |
| Learning | InstituteGPT | instruction, study, training, practice, competency, CPD, examinations, AI education |
| Knowledge | Knowledge substrate | data, information, knowledge, models, insight, research |
| Interaction/transition | IO | occurrence, handoff, movement, input/output, consequential transition |
| Service | General Service | service request, booking, assignment, execution, fulfillment, service outcome |
| Commerce discovery | General Marketplace | listing, product, offer, quote, discovery, matching |
| Exchange execution | Trade | order, transaction, exchange, fulfillment, delivery, settlement |
| Capital deployment | Investment | funding, instrument, portfolio, investment position |
| Collective exchange/value formation | Markets | market, price/value interaction, market participation |
| Possibility/prospect | Opportunities | opportunity, vacancy, nomination, grant, job, internship, project, scholarship |
| Human-side progression/value | NAIRE | human economic/value/progression semantics |
| Entity-side progression/value | NGIN | government, organization, association, institutional progression/value semantics |
| Verified durable state | ROOT | verified/tokenized records and relationships |
| Present state | ACTUAL | current operational reality |
| Public/discoverable projection | ATLAS | governed representation/discovery; never source of truth |

## Universal capability catalog

### Identity & participation
`identity, identifier, role, profile, representation, relationship, membership, delegation`

### Entry & application
`intent, request, inquiry, application, submission, registration, enrollment, nomination, referral, claim`

### Forms & evidence
`form, questionnaire, declaration, statement, document, evidence, proof, attestation, provenance`

### Discovery & coordination
`discovery, search, query, matching, recommendation, scheduling, appointment, booking, reservation, queue, allocation`

### Work & process
`task, assignment, workflow, case, stage, checkpoint, action, execution, fulfillment, delivery`

### Assessment & decision
`assessment, examination, interview, inspection, audit, evaluation, scoring, ranking, result, finding, recommendation_decision, approval, rejection, selection, adjudication`

### Authority & control
`authority, authorization, permission, consent, mandate, right, license, permit, clearance, policy, rule, control, compliance`

### Commerce & value exchange
`product, offer, quote, order, transaction, exchange, payment, receipt, invoice, refund, return, settlement, contract, obligation, ownership, custody`

### Finance & markets
`marketplace, market, investment, instrument, portfolio, funding, capital, investment_position`

### Opportunities & workforce
`opportunity, vacancy, selection, appointment, onboarding, performance, promotion, transfer, posting, deployment, succession, separation`

### Communication & collaboration
`communication, message, notification, invitation, conversation, collaboration, meeting, feedback`

### Place & movement
`location, address, territory, route, journey, movement, trip, shipment, delivery, checkpoint`

### State, lifecycle & progression
`state, status, lifecycle, change, version, progression, milestone, outcome, history, tracking`

### Risk & integrity
`risk, incident, issue, exception, investigation, remediation, verification, validation, integrity, trust`

### Knowledge, analytics & simulation
`analytics, scenario, simulation, forecast, foresight, model, insight`

### AI & agent lifecycle
`ai_identity, agent_identity, ai_minting, ai_knowledge_package, ai_training, ai_assessment, ai_deployment, ai_evaluation, ai_monitoring, ai_update, ai_retirement, human_supervision`

### Interoperability
`api, adapter, connector, protocol, schema_mapping, import_export, synchronization`

## Canonical tests

A proposed universal capability MUST:

1. have stable semantics across multiple unrelated domains;
2. compose existing OMNII primitives rather than redefine them;
3. declare canonical backing and ownership;
4. preserve identity, provenance, authority, lifecycle, relationships and auditability;
5. remain open to jurisdiction, policy and domain-specific extensions;
6. avoid implying authority merely because a record exists;
7. avoid conflating AI technical capability with human or legal authorization;
8. carry temporal/version context where the meaning can change;
9. integrate through IO where its use constitutes a consequential ecosystem interaction;
10. remain usable by products without making the product a new source of universal semantics.

## Domain examples

`University admission = Application + Eligibility + Enrollment + Learning + Assessment + Result + Credential`

`Driving qualification = Application + Learning + Practice + Assessment + Evidence + Authority + License`

`SIWES = Opportunity + Application + Matching + Assignment + Experience + Assessment + Evidence + Outcome`

`Medical result = Request + Appointment + Procedure + Observation + Measurement + Result + Evidence + Authority`

`Audit = Assignment + Scope + Evidence + Assessment + Finding + Recommendation/Decision + Report`

`Race result = Event + Participant + Timing/Observation + Result + Ranking + Authority`

`Promotion = Eligibility + Application/Nomination + Assessment + Interview + Decision + Appointment + Progression`

## Certification and authority

The registry distinguishes `record`, `result`, `evidence`, `attestation`, `credential`, `certificate`, `qualification`, `registration` and `license`. An ecosystem record does not become an external authority's credential merely by being stored or tokenized. External issuers retain authority for their own certificates, qualifications, registrations and licenses.

## AI learning rule

Personal and entity AI may be minted through HAPI/HAPI World and educated through InstituteGPT. InstituteGPT may maintain AI learning, assessment, capability and knowledge provenance. AI capability does not by itself confer human professional qualification or regulated authority.

## Architectural rule

`discover existing universal capability → compose → configure domain semantics → add bounded domain capability → only then consider new universal capability`

Products are consumers/compositions of the registry, not competing registries.
