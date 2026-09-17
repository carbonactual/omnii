# Desk — Audit-Derived Capability Extension

> **Canonical naming (Sept 16, 2026):** The trade product is **TIP** — repository `carbonactual/tip` (formerly Desk, briefly OMNI). Repository `carbonactual/omni` is the OMNI Browser and is unrelated to this product.

**Ecosystem:** Carbon Actual / OMNII  
**Status:** CANONICAL PRODUCT CAPABILITY EXTENSION  
**Applies to:** Desk  
**Parent contracts:** `DESK_ECOSYSTEM_CONFORMANCE_AND_CAPABILITY_CONTRACT.md`, `DESK_MASTER_SCOPE_AND_VALUE_CHAIN.md`  
**Source:** capability and ontology audit of the existing `carbonactual/tip` product repository plus the canonical Universal Event & Interaction ontology.

---

## 1. Purpose

The audit established that Desk already contains substantial sourcing, demand aggregation, logistics, settlement, provenance, quality, risk and recovery concepts. The missing layer is not another marketplace feature set. It is the **operational semantics that make those capabilities reliable in the physical, digital and institutional world**.

This extension therefore adds the missing cross-cutting capabilities without creating competing Desk ontologies.

Desk remains an economic coordination composition. Shared OMNII primitives remain authoritative.

---

## 2. Reality → event → observation → evidence → claim

Desk MUST distinguish:

```text
REAL-WORLD CONDITION / TRANSACTION
        ↓
EVENT
        ↓
OBSERVATION
        ↓
MEDIA / RECORD / SENSOR / DOCUMENT
        ↓
CLAIM / REPORT
        ↓
VERIFICATION / CERTIFICATION
        ↓
DECISION / STATE CHANGE
```

A shipment does not become real because Desk recorded it. A photograph, livestream, invoice, scan, GPS signal or witness account is evidence about an event, not the event itself.

Desk records whether information is:

- directly observed;
- externally reported;
- imported from another system;
- machine-detected;
- inferred;
- reconstructed;
- attested by an eligible witness;
- verified against independent evidence;
- certified by an authorized authority.

No single `verified=true` field may collapse these distinctions.

---

## 3. Universal trade-event envelope

Every material Desk lifecycle event SHOULD be representable with:

```yaml
event_id:
event_type:
event_version:
subject_id:
transaction_id:
occurred_at:
observed_at:
recorded_at:
location:
principal:
acting_capacity:
authority_context:
participants: []
preceding_events: []
concurrent_events: []
state_before:
state_after:
source:
evidence_refs: []
media_refs: []
claim_refs: []
attestation_refs: []
jurisdiction:
privacy_class:
security_class:
confidence:
provenance:
correction_of:
```

Historical records remain reconstructable. Corrections supersede or annotate; they do not erase the original event.

---

## 4. Capacity must not be confused with authority or resource availability

Desk uses the word `capacity` in several domains. These are now explicitly separated:

```text
RESOURCE CAPACITY
machine time / warehouse space / vehicle capacity / workforce availability / production capacity

AUTHORITY CAPACITY
what a person or entity is presently empowered or eligible to exercise in context

TECHNICAL CAPACITY
what a system, channel or device is capable of doing

TRANSACTION CAPACITY
what quantity/value/time/risk a particular commitment can safely support
```

A factory offering 500 machine-hours is not making a constitutional authority claim. A person authorized to sign a contract is not offering 500 machine-hours merely because they possess that authority.

Capacity records therefore include owner/provider, amount, unit, interval, location, constraints, reservation state, evidence, eligibility and authority context where applicable.

---

## 5. Capacity lifecycle and double-commitment prevention

Capacity MUST support explicit states such as:

```text
declared
observed
available
held
reserved
allocated
committed
in_use
partially_used
released
expired
blocked
contested
cancelled
fulfilled
failed
```

The same inventory, funds, machine-time, transport slot, person-time or warehouse slot cannot silently be promised twice.

Conflicting commitments become explicit concurrency exceptions requiring policy or authorized resolution.

---

## 6. Representation, mandate and counterpart authority

Desk MUST separate:

```text
I AM THE COUNTERPART
I REPRESENT THE COUNTERPART
I REPRESENT THE ORGANIZATION
I ACT FOR A BENEFICIARY
I ACT AS AN AGENT / BROKER / OPERATOR
```

Every material act may carry:

- represented principal;
- acting participant;
- capacity/role context;
- mandate or delegation reference;
- scope;
- effective period;
- jurisdiction;
- revocation/suspension state.

A contact channel, account ownership or possession of a document is not by itself proof of authority.

---

## 7. Negotiation and transaction proceedings

Because Desk already coordinates RFQ, negotiation, auction and allocation, those processes become explicit proceedings rather than unstructured messages.

A proceeding may contain:

```text
matter / request
participants
rules
opening
offers
counteroffers
clarifications
questions
responses
deadlines
recognition / participation state
allocations
consents / approvals
decision
accepted terms
withdrawal / expiry
record
```

Each offer, counteroffer, amendment, approval and rejection is immutable history with actor, authority, time and evidence.

ABBA may coordinate and summarize a proceeding but cannot silently alter the authoritative negotiated record.

---

## 8. Handover, custody and chain of responsibility

Desk MUST treat handoff as a first-class event.

Examples:

```text
supplier → inspector
inspector → consolidator
consolidator → carrier
carrier → customs/border
customs → warehouse
warehouse → final recipient
agent → principal
human → AI agent
AI agent → human approver
```

A handoff records:

- sending party;
- receiving party;
- item/obligation/case;
- authority basis;
- time and place;
- condition;
- quantity;
- identifiers;
- evidence;
- custody state;
- exceptions;
- acceptance/rejection;
- next responsible party.

The chain of custody is a chain of accountable events, not merely a status label.

---

## 9. Communication as an economic-control layer

Desk communications MUST be modeled separately from their economic consequences.

The system can represent:

```text
message
request for information
instruction
offer
acceptance
notice
alert
approval
rejection
claim
escalation
handover
report
broadcast
```

Information handling may include:

```text
public
general
need-to-know
restricted
confidential
secret
sensitive
regulated
embargoed
```

Distribution semantics such as direct recipient, group, copy, blind copy, escalation list, time-limited disclosure and jurisdictional restrictions MUST remain attributable and auditable.

A communication does not automatically create an economic commitment unless the applicable authority, contract and policy conditions are satisfied.

---

## 10. Media, inspection and live evidence

Desk MAY consume or coordinate:

- photographs;
- documents;
- audio;
- video;
- livestreams;
- screen recordings;
- sensor streams;
- GPS/location traces;
- barcode/QR/RFID scans;
- telematics;
- laboratory outputs;
- machine logs;
- witness observations;
- third-party attestations.

For each evidence item, retain source, capture time, event time where known, device/system, integrity/provenance state, transformations and relationship to the claim it supports.

Live media remains evidence. Provenance does not itself establish truth.

---

## 11. Time authority and synchronization

Desk MUST distinguish at minimum:

```text
planned time
occurred time
observed time
recorded time
reported time
verified time
settlement effective time
```

Distributed trade events may use different clocks. The system records source clock, synchronization state, offset/uncertainty where material, and the authoritative time for contractual or regulatory purposes.

This prevents disputes caused by treating message time, device time, event time and legal effective time as identical.

---

## 12. Offline and degraded-network operation

Desk intake and execution MUST be capable of degraded operation where the economic context requires it.

Offline/low-bandwidth records can be:

```text
captured locally
signed/identified
queued
synchronized
conflict-checked
reconciled
```

Reconciliation MUST preserve both the local observation and the eventual canonical state. A later synchronization cannot silently rewrite the earlier fact.

This applies especially to field inspection, market-agent intake, rural supply chains, transport, border operations and informal commerce.

---

## 13. Federation and external-system observation

Desk can operate on transactions it does not host.

Origin states may include:

```text
Desk_hosted
external_system
partner_system
naturally_occurring
independently_recorded
broadcast_observed
reported_pending_verification
imported
federated
reconstructed
```

Desk MUST preserve external origin and authority rather than presenting imported events as native Desk events.

External identifiers, source assertions, jurisdiction, timestamps and synchronization/translation mappings remain visible.

---

## 14. Digital twins and physical-world state

Where useful, Desk MAY maintain representations of:

- warehouse state;
- factory state;
- machine condition/capacity;
- routes;
- ports and border points;
- farms and production sites;
- storage environments;
- vehicles and containers;
- inventory locations;
- facility zones.

Twin state MUST distinguish:

```text
observed
operational
predicted
simulated
historical
stale
divergent
```

A twin is a model of reality, not reality itself.

---

## 15. Scenario, simulation and rehearsal

Before expensive or irreversible execution, Desk MAY model:

- alternate suppliers;
- route failures;
- customs delay;
- payment failure;
- capacity loss;
- weather disruption;
- shortage;
- demand surge;
- quality failure;
- recall;
- return/recovery;
- emergency response.

Scenario results are hypotheses, not historical facts. Executed events supersede predictions for operational state while preserving the prediction for audit and learning.

---

## 16. Accessibility and communication modality

The canonical Desk record is modality-independent.

Equivalent access may be provided through:

```text
web
app
WhatsApp
voice
SMS
USSD
assistive technology
field agent
API
bulk file
```

A translation, transcription, interpreter or AAC/TTS output changes communication modality, not the underlying authority or transaction identity.

Accessibility preferences may be participant-specific, transaction-specific or temporary.

---

## 17. Emergency and exception mode

Desk must distinguish ordinary exception handling from emergency coordination.

Emergency state may trigger:

- accelerated routing;
- alternative suppliers;
- priority transport;
- safety controls;
- emergency procurement;
- evacuation/recovery coordination;
- emergency communications;
- expedited approval within pre-authorized scope.

Emergency mode does not erase evidence, authority or post-event accountability.

---

## 18. Rights, consent and disclosure constraints

Transactions involving media, likeness, voice, location, proprietary data, commercially sensitive information, confidential pricing, protected designs or personal information MUST carry applicable rights/consent constraints.

Restrictions may be:

```text
recording allowed / prohibited
broadcast allowed / prohibited
commercial reuse allowed / prohibited
territorial restriction
time embargo
participant restriction
AI-use/training restriction
third-party disclosure restriction
```

Desk coordinates lawful use; it does not infer permission from mere possession.

---

## 19. Evidence-aware reputation and outcomes

Reputation signals MUST remain decomposed into:

```text
observation
claim
evidence
verified fact
opinion
adjudicated outcome
```

A complaint is not automatically a finding. A rating is not automatically evidence. An adjudicated finding does not erase the underlying historical record.

Pulse receives outcome observations from these distinctions rather than a flattened reputation score.

---

## 20. Value and sustainability event accounting

Material Desk actions MAY emit event-level impact measurements for:

- money/value;
- time;
- transport;
- fuel/energy;
- water;
- waste;
- emissions;
- packaging;
- local employment/capability creation;
- reuse/recovery;
- community effects.

Measurements carry source and confidence. Unavailable environmental or social data is recorded as unknown rather than guessed.

---

## 21. Stronger Desk orchestration loop

The Desk lifecycle is therefore strengthened to:

```text
OBSERVE / RECEIVE
        ↓
INTENT / OFFER / CLAIM
        ↓
IDENTIFY + AUTHORITY + REPRESENTATION
        ↓
DISCOVER + MATCH + AGGREGATE
        ↓
VERIFY / EVIDENCE / QUALIFY
        ↓
NEGOTIATE / PROCEEDING
        ↓
RESERVE / AUTHORIZE / COMMIT
        ↓
SOURCE / PRODUCE / INSPECT
        ↓
HANDOVER / CUSTODY
        ↓
MOVE / CUSTOMS / DELIVER
        ↓
ACCEPT / REJECT / RETURN / CLAIM
        ↓
SETTLE / RECONCILE
        ↓
OUTCOME / CERTIFICATION
        ↓
PULSE / REVALUE / RECOVER
        ↓
LEARN / RECOMPOSE
```

At every stage, the Desk preserves:

```text
WHO
ACTING AS WHAT
UNDER WHAT AUTHORITY
DOING WHAT
TO WHAT
WHEN
WHERE
WITH WHOM
UNDER WHICH RULES
BASED ON WHICH EVIDENCE
WITH WHAT RESULT
```

---

## 22. Conformance additions

A Desk implementation is non-conformant if it:

- treats a listing as fact without evidence state;
- treats a role as universal authority;
- confuses capacity with authority or availability;
- silently double-books inventory/capacity/funds/time;
- deletes superseded trade history;
- loses lineage across handoffs;
- treats communication as an automatic contract without applicable authority;
- hides uncertainty in a single trust/verification score;
- presents externally observed events as native Desk events;
- treats predictions or digital twins as reality;
- loses transaction identity across offline synchronization;
- exposes protected information outside its lawful disclosure scope;
- permits ABBA to create or exercise authority it was not granted.

---

## 23. Relationship to the canonical Event & Interaction ontology

Desk adopts the shared Event & Interaction semantics. It does not redefine them.

Desk-specific economic objects remain governed by the Desk/TIP economic layer; universal event, interaction, evidence, witnessing, representation, capacity, authority, media, time, federation and handover semantics remain governed by the canonical OMNII layers.

This extension is intentionally additive so Desk can become more capable without becoming a competing ontology.
