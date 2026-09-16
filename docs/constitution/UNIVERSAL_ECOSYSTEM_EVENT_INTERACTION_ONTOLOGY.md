# OMNII Universal Ecosystem Event & Interaction Ontology

**Status: CANONICAL ECOSYSTEM ONTOLOGY**  
**Parent:** `docs/constitution/UNIVERSAL_META_ONTOLOGY.md`  
**Scope:** Universal representation of real-world, virtual, hybrid, media-observed and reconstructed events; capacity-aware interaction; authority; representation; protocol; procedure; communications; accessibility; evidence; witnessing; reporting; media provenance; physical-world operations; records; certification and outcomes.  
**Naming:** This ontology is intentionally product-neutral. Product and repository names are governed separately and MUST NOT redefine these semantics.

## 1. Constitutional purpose

OMNII must represent interactions with the world whether OMNII hosts them, participates in them, observes them, receives media from them, or reconstructs them afterward.

An event is not made real by being inside OMNII. Media is not required for an event to exist. A recording, broadcast, transcript, report, sensor observation or witness account is evidence about an event, not the event itself.

The ontology therefore separates:

```text
REALITY
  → EVENT
  → OBSERVATION
  → MEDIA / RECORD
  → CLAIM / REPORT
  → VERIFICATION / CERTIFICATION
```

No product may collapse those layers.

## 2. Core universal distinctions

The following distinctions are constitutional:

```text
ENTITY         ≠ IDENTITY
IDENTITY       ≠ AFFILIATION
AFFILIATION    ≠ CAPACITY
CAPACITY       ≠ AUTHORITY
AUTHORITY      ≠ MANDATE
MANDATE        ≠ REPRESENTATION
REPRESENTATION ≠ DELEGATION
CAPACITY       ≠ CAPABILITY
CAPACITY       ≠ PRESENCE
PRESENCE       ≠ MODALITY
EVENT          ≠ MEDIA
OBSERVATION    ≠ CLAIM
CLAIM          ≠ FACT
STATEMENT      ≠ DECISION
PROTOCOL       ≠ PROCEDURE
PLANNED        ≠ ACTUAL
ACTUAL         ≠ REPORTED
REPORTED       ≠ CERTIFIED
REHEARSAL      ≠ LIVE EVENT
PERFORMANCE    ≠ FACTUAL OCCURRENCE
RECORD         ≠ REALITY
```

## 3. Universal Event

`Event` is the top-level contextual object for a bounded occurrence or occurrence-pattern that can be planned, observed, conducted, reconstructed or reported.

An Event MAY be:

```text
physical / in-person
virtual / remote
hybrid
asynchronous
external to OMNII
platform-hosted
externally-hosted
naturally-occurring
broadcast-observed
media-observed
retrospectively reconstructed
reported pending verification
```

An Event MAY have no media, one media source, or many independent media sources.

## 4. Event origin, presence and evidence are independent dimensions

```text
EVENT_ORIGIN
├── platform_hosted
├── externally_hosted
├── naturally_occurring
├── independently_recorded
├── broadcast_observed
├── retrospectively_reconstructed
└── reported_pending_verification

EVENT_PRESENCE
├── physical
├── virtual
├── hybrid
├── asynchronous
└── reconstructed_or_unknown
```

These dimensions MUST NOT be inferred from one another.

A physical event can have no recording. A broadcast can describe or show an event it did not host. OMNII can reconstruct an event that never entered an OMNII session.

## 5. Event Constitution

Every formal Event MAY carry an `EventConstitution`, the governing definition for that instance or event class.

```text
EventConstitution
├── purpose
├── authority
├── jurisdiction
├── event_type
├── protocol_sources
├── procedure_sources
├── participant_classes
├── capacity_rules
├── representation_rules
├── precedence_rules
├── floor_rules
├── access_rules
├── information_classification
├── media_rules
├── evidence_rules
├── witnessing_rules
├── accessibility_rules
├── language_rules
├── safety_rules
├── security_rules
├── decision_rules
├── transaction_rules
├── emergency_rules
├── record_rules
├── retention_rules
└── certification_rules
```

The constitution is versioned. Historical event states retain the constitution/version effective at the relevant time.

## 6. Capacity and Authority ontology

A `CapacityGrant` establishes that an entity may exercise a defined capacity under specified authority and constraints.

```text
CapacityGrant
├── subject
├── capacity
├── granting_authority
├── authority_basis
├── verification_assertions
├── scope
├── jurisdiction
├── valid_from
├── valid_until
├── constraints
├── delegation_rules
├── disclosure_rules
├── concurrency_policy
└── revocation_status
```

Possession, eligibility, activation and exercise are separate states:

```text
POSSESSION
→ ELIGIBILITY
→ ACTIVATION
→ EXERCISE
```

A verified capacity is not automatically exercisable in every event.

## 7. Capacity concurrency and conflict

A subject MAY hold multiple capacities while some combinations are prohibited from simultaneous exercise.

Concurrency is governed contextually by:

```text
capacity
jurisdiction
matter
event constitution
conflict rules
exclusive-office rules
temporal rules
delegation
representation
security/privacy
```

Supported policies MAY include:

```text
ALLOW
ALLOW_WITH_DISCLOSURE
ALLOW_IF_NONCONFLICTING
ALLOW_ACROSS_EVENTS
ALLOW_BUT_NOT_SIMULTANEOUSLY
EXCLUSIVE
EVENT_DEFINED
JURISDICTION_DEFINED
```

A capacity conflict MUST NOT erase either underlying capacity; it constrains exercise and records the reason.

## 8. Representation and delegation

Representation is a first-class relationship, not an alias for identity.

```text
Representative
→ exercises Capacity
→ represents Subject / Collective / Organization
→ under Mandate / Delegation
→ for Matter / Event / Jurisdiction
→ with defined permitted actions
```

Representation MAY be limited by:

```text
matter
jurisdiction
time
action type
signature authority
voting authority
settlement authority
information access
sub-delegation
```

Delegated actors MUST remain distinct from the represented person/entity.

Every consequential action MUST be able to preserve both `ACTED_BY` and `ACTED_FOR` where representation applies.

## 9. Collective capacities

A collective capacity is a governed collective identity, not a large user account.

```text
CollectiveCapacity
├── collective_identity
├── constitution
├── membership
├── offices
├── quorum
├── voting_rule
├── spokesperson_rule
├── signing_rule
├── succession_rule
└── delegation_rule
```

Collective decisions record membership/quorum state and the individual capacities participating in the collective act.

## 10. Presence and modality

Presence is the representation mechanism through which a capacity participates.

```text
live_human
live_avatar
pre_recorded
protected_identity
altered_voice
sign_interpreter
sign_avatar
assistive_communication
delegated_human
authorized_agent
screen_or_document_presence
field_device
```

Presence MUST carry provenance and MUST NOT change the underlying identity, capacity or authority semantics.

## 11. Communication modality fabric

Event information MAY be rendered through multiple modalities:

```text
voice
text
captions
sign
visual
image
video
audio_description
haptic / tactile
aac / assistive output
translation
interpretation
synthetic voice
```

The same authoritative event/action MAY be rendered through multiple modalities while preserving a common source event.

An interpreter, captioner, translator, assistive device, sign avatar or synthetic voice is not automatically the authoritative speaker.

## 12. Accessibility as a core event dimension

Accessibility MUST be native to the event model rather than an afterthought.

Supported participation classes MAY include:

```text
deaf
hard_of_hearing
blind
low_vision
deafblind
non_speaking
mobility
cognitive
language-related
temporary or situational accessibility need
```

Accessible participation can include captions, sign interpretation, audio description, descriptive transcripts, AAC, visual cues, haptic cues, high-contrast modes, screen-reader semantics and equivalent voting/signing/recognition pathways.

A person's accessibility modality MUST NOT reduce their authority or capacity.

## 13. Information topology

Event information carries independent metadata for:

```text
classification
intended audience
actual audience
purpose
disclosure authority
retention
forwarding
publication
redaction
sensitivity
secrecy
urgency
```

Supported states MAY include:

```text
public
participants_only
restricted
need_to_know
private
confidential
secret
sealed
```

The system MUST distinguish intended audience from actual disclosure.

## 14. Communication events

All communication channels can be represented as `CommunicationEvent` objects:

```text
email
message
voice
video
phone
radio
notice
letter
broadcast
announcement
private note
floor note
emergency signal
system message
agent message
```

A CommunicationEvent records, where applicable:

```text
sender
sender_capacity
representation
channel
recipient(s)
recipient_capacity / audience rule
classification
purpose
time
delivery
acknowledgement
response
provenance
```

CC, BCC, circular distribution, restricted distribution, blind distribution, sealed communication and escalation are policy behaviors over this model rather than email-only primitives.

## 15. Protocol

Protocol defines recognized conventions, precedence, ceremonial behavior, forms of address, acknowledgements, recognition, observances and event decorum.

Protocol sources MAY include:

```text
constitutional / national
statutory / institutional
organizational
traditional / cultural
religious
international
sporting
entertainment
venue
special event
```

Protocol sources MUST retain provenance and precedence rather than being flattened into one global rule set.

## 16. Procedure

Procedure is distinct from protocol.

Procedure defines permissible and required progression of formal acts, such as:

```text
motion
second
amendment
debate
recognition
point_of_order
reply
closure
vote
count
result
appeal
reconsideration
certification
```

Protocol may influence procedure, but the terms MUST remain distinct.

## 17. Live protocol updates

Protocol can change during an event through authorized `ProtocolUpdate` objects.

```text
ProtocolUpdate
├── issuer
├── issuer_capacity
├── authority
├── reason
├── issued_time
├── effective_time
├── scope
├── affected_entities
├── supersedes
├── acknowledgement
└── evidence
```

The platform MUST be able to answer:

> What protocol was in force at time T?

A later protocol update MUST NOT rewrite earlier event history.

## 18. Recognition

Recognition is a first-class event action.

```text
RecognitionEvent
├── recognized_entity
├── recognized_capacity / distinction
├── reason
├── recognizing_authority
├── recognition_text
├── protocol_effect
├── audience_visibility
├── start_time
└── end_time
```

Ceremonial recognition MUST NOT automatically create legal authority.

Examples include special guest, former officeholder, honoree, dignitary, survivor, award recipient, visiting delegation and memorial recognition.

## 19. Observances and silence

Intentional collective non-action, such as a minute of silence, is a recordable Event/Protocol action.

```text
Observance
├── type
├── reason
├── initiating_authority
├── intended_duration
├── start_time
├── end_time
├── scope
├── exceptions
├── accessibility_modalities
└── evidence
```

Possible types include:

```text
moment_of_silence
minute_of_silence
period_of_reflection
prayer
memorial_observance
national_mourning
traditional_observance
religious_observance
```

## 20. Floor

`FloorState` models recognized speaking/action precedence.

```text
FloorState
├── current_holder
├── holder_capacity
├── representation
├── matter
├── purpose
├── allocated_time
├── elapsed_time
├── remaining_time
├── precedence
├── right_of_reply
├── interruption_rules
├── point_of_order
├── next_eligible_speakers
└── state
```

The floor can be requested, queued, recognized, granted, yielded, interrupted, transferred, suspended and released.

A participant retains their capacity even when not holding the floor.

## 21. Notes

The ontology distinguishes:

```text
personal_note
meeting_note
secretariat_note
note_to_chair
note_to_speaker
private_floor_note
passed_note
official_minute
verbatim_record
evidence_annotation
```

Notes have authorship, capacity, audience, classification, matter, timestamp and provenance.

## 22. Event program and agenda

A program/agenda defines intended progression; it is not the actual timeline.

```text
PLANNED
→ ACTUAL
→ REPORTED
→ CERTIFIED (where applicable)
```

An event can insert, defer, reorder, suspend or cancel program items through authorized state changes without corrupting the original plan.

## 23. Event timeline

The event timeline MAY maintain multiple temporal dimensions:

```text
planned_time
actual_time
observed_time
reported_time
effective_time
recorded_time
published_time
```

Events retain the distinction between occurrence and subsequent reporting/recognition.

## 24. Time authority

For high-integrity contexts the system MAY record:

```text
server_time
trusted_external_time
device_time
venue_time
sensor_time
```

Time-source provenance and uncertainty MUST be retained where material to evidence.

## 25. Materials

Event materials are governed objects with:

```text
identity
owner/source
author
version
classification
audience
validity
supersedes
related_matter
integrity
provenance
retention
```

Material versioning MUST be non-destructive. A superseded agenda or resolution remains historically recoverable.

## 26. Actions

The ontology uses a general action grammar rather than creating unrelated primitives for every event type.

Examples:

```text
SPEAK
REQUEST_FLOOR
RECOGNIZE
DECLARE
VOTE
SIGN
WITNESS
ATTEST
APPROVE
REJECT
OBJECT
APPEAL
ESCALATE
DELEGATE
HANDOVER
AUTHORIZE
DISCLOSE
WITHHOLD
ACKNOWLEDGE
TRANSFER
INSPECT
PERFORM
COMPETE
PUBLISH
RECORD
```

An Action SHOULD preserve:

```text
actor
active_capacity
authority
representation
object
intent
context
time
policy
result
evidence
```

## 27. Observation, witnessing and attestation

Witnessing is represented through observation and attestation rather than a universal reputation score.

```text
Observation
├── observer
├── observer_capacity
├── subject
├── event/action
├── modality
├── start/end
├── directness
├── observation_conditions
├── evidence
├── limitations
└── declaration
```

`Attestation` represents a formal assertion concerning an object, action, document, signature, sequence or receipt.

## 28. Witness eligibility

Witness suitability is contextual.

The system MAY evaluate:

```text
authorized_witness_capacity
independence
conflict_of_interest
qualification
procedural requirement
presence requirement
observation quality
identity verification
```

The ecosystem MUST NOT reduce witnessing eligibility to a universal trust/reputation score.

## 29. Observation conditions

Where material, the system can record:

```text
line_of_sight
visibility
lighting
distance
duration
obstruction
audio availability
translation/interpretation
sensor/device limitations
time synchronization
uncertainty
```

An observation remains distinct from the conclusion drawn from it.

## 30. Claims and reporting

Claims and reports are first-class objects.

```text
Claim
├── claimant
├── claimed_fact
├── capacity
├── assertion_time
├── claimed_effective_time
├── source
├── evidence
├── corroboration
├── contradiction
├── status
└── resolution

Report
├── author
├── author_capacity
├── purpose
├── observations
├── claims
├── evidence
├── corroboration
├── contradictions
├── interpretation
├── uncertainty
├── corrections
└── publication/certification state
```

The ontology preserves the distinction between observation, claim, interpretation and conclusion.

## 31. Claim graph

Claims MAY be linked in a graph:

```text
CLAIM
→ supported_by
→ contradicted_by
→ reported_by
→ acknowledged_by
→ disputed_by
→ supersedes
→ superseded_by
→ resolved_by
```

Multiple legitimate claims can coexist while a matter remains unresolved.

## 32. Evidence

Evidence includes any material used to support or evaluate an observation, claim, action or decision.

Examples:

```text
document
image
video
audio
transcript
sensor record
system log
signature
credential
witness statement
broadcast
external registry assertion
physical artefact
measurement
```

Evidence MUST retain provenance, integrity, custody and contextual relationships where applicable.

## 33. Chain of custody

```text
CAPTURE
→ SEAL / IDENTIFY
→ CUSTODY
→ TRANSFER
→ ACCESS
→ ANALYSIS
→ PRESENTATION
→ CERTIFICATION
→ ARCHIVE
```

Custody transfers MUST be append-only events. Existing custody history MUST NOT be rewritten.

## 34. Media and provenance

Media is an evidence/output layer that can represent:

```text
audio
video
photography
livestream
broadcast
recording
screen capture
field capture
remote camera
body camera
venue camera
sensor-derived media
```

Media provenance SHOULD represent:

```text
source
creator/operator
capture_time
device/context
location where appropriate
original/derivative status
edits
transforms
translation
captioning
voice alteration
AI processing
publication
```

A recording is not automatically authoritative merely because it is genuine; authenticity of the artifact and truth of its content are separate assertions.

## 35. Reality / performance state

Events and media MAY be classified as:

```text
LIVE_REAL
LIVE_PERFORMANCE
REHEARSAL
SIMULATION
DRILL
REENACTMENT
STAGED
PRERECORDED
FICTIONAL
AI_GENERATED
MIXED
```

This state MUST travel with derivatives where relevant so staged material cannot silently become represented as an unqualified factual event.

## 36. External and observed events

OMNII can represent an event it did not host.

Possible source relationships include:

```text
OBSERVED_FROM
BROADCAST_OF
RECORDED_BY
REPORTED_BY
WITNESSED_BY
REFERENCED_BY
RECONSTRUCTED_FROM
CORROBORATED_BY
```

External events can therefore enter the ecosystem without pretending that OMNII originated or controlled them.

## 37. Official record and public representation

The following are distinct artifacts:

```text
raw event evidence
official record
certified record
public broadcast
public report
media derivative
summary
highlight
```

A broadcast may be delayed, edited, captioned, translated or commercially packaged without becoming the official record.

## 38. Records and archival states

Record classes MAY include:

```text
ephemeral
working
operational
official
evidentiary
certified
archival
public
restricted
sealed
```

Records retain content, context, structure, provenance, version and access/retention rules.

## 39. Correction, challenge and review

Official records MUST support non-destructive correction.

```text
record v1
→ challenge / correction request
→ evidence review
→ record v2
```

Earlier versions remain retrievable.

Claims and decisions MAY have challenge, review, appeal, reconsideration and resolution states.

## 40. Physical-world event state

For physical events, the ontology MAY represent:

```text
venue
zone
room
seat
stage
entrance
exit
restricted area
accessibility route
equipment
camera
microphone
display
medical point
security point
sensor
```

Physical objects and locations are references into the world, not substitutes for it.

## 41. Admission and credentials

Event participation can be governed by:

```text
credential
identity verification
capacity eligibility
zone eligibility
time validity
admission state
revocation
```

Credentials do not become the identity or capacity itself.

## 42. Safety, security and incidents

Events MAY transition through:

```text
NORMAL
→ INCIDENT
→ EMERGENCY
→ EVACUATION / RESPONSE
→ RECOVERY
→ AFTER_ACTION
```

An `Incident` records reporter, observer, capacity, location, time, severity, response authority, evidence, status and resolution.

Emergency protocol MUST preserve stronger traceability rather than weaker auditability.

## 43. Rehearsal, simulation and replay

The same event configuration MAY be instantiated as:

```text
DESIGN
REHEARSAL
SIMULATION
LIVE
REPLAY
AFTER_ACTION
```

Simulation and rehearsal outputs MUST NOT silently acquire live-event legal or evidentiary status.

## 44. Nested interactions

Events MAY contain sessions, proceedings, rooms, caucuses, committees, breakouts, bilateral meetings, private channels and sub-events.

```text
Event
├── Session
│   ├── Interaction
│   ├── Floor
│   └── Actions
├── Sub-session
└── Private interaction
```

Nested records remain linkable to the parent event.

## 45. Handover and succession

Formal transfer is represented as an Action with:

```text
from
→ to
→ capacity
→ authority
→ object / responsibility
→ condition
→ time
→ witnesses
→ evidence
→ acceptance
```

The symbolic/ceremonial act and the legally operative act MAY be linked but MUST NOT be conflated.

## 46. Public experience

A public audience is a participant class with its own information and accessibility policy.

Public views MAY include:

```text
live state
schedule
captions
interpretation
announcements
safe public updates
replay
highlights
certified/public record
```

Public presentation does not automatically expose restricted or sealed information.

## 47. Economics and transactions

An event can generate or contain economic actions without making economics part of every event.

Examples include:

```text
ticket
sponsorship
vendor transaction
royalty
broadcast right
settlement
refund
donation
contract
sale
fee
```

These MUST route to canonical ecosystem economic semantics rather than creating a parallel event ledger.

## 48. External authority federation

Verification and protocol can rely on external authorities.

An external assertion should preserve:

```text
source authority
external identifier
asserted fact
scope
validity
issued time
retrieval time
signature/provenance where available
mapping
```

External standards and registries are mappings or sources; they do not automatically become OMNII constitutional truth.

## 49. Continuous verification

Identity, capacity, authority, credentials and external assertions MAY change while an event is active.

The event engine therefore supports re-evaluation:

```text
verified
→ changed
→ suspended
→ expired
→ revoked
→ reverified
```

An earlier action remains tied to the state that was valid when the action occurred.

## 50. ABBA boundary

ABBA is the intelligence and orchestration layer across the ontology.

ABBA MAY:

```text
observe
reason
classify
retrieve rules
identify conflicts
suggest procedure
prepare records
coordinate capabilities
route communications
summarize
translate
assist accessibility
surface missing evidence
prepare reports
```

ABBA MUST NOT silently manufacture authority, identity, capacity, legal status, truth or certification merely by generating an answer.

Deterministic policy/authority mechanisms and human/institutional authority remain the sources of consequential authorization where required.

## 51. Product boundary

Products and experiences consume this ontology.

They MAY expose specialized views for:

```text
meetings
hearings
assemblies
concerts
sports
inaugurations
ceremonies
inspections
exams
interviews
conferences
press events
emergency operations
field operations
```

They MUST NOT introduce competing foundational definitions for identity, capacity, authority, representation, event, evidence, record, communication or provenance.

## 52. Universal event invariants

1. **Reality is independent of platform hosting.**
2. **Media is evidence/output, not the underlying event.**
3. **A capacity is contextual authority, not a display role.**
4. **Identity, capacity, authority, representation, presence and capability remain distinct.**
5. **Historical event state is reconstructable.**
6. **Protocol updates do not rewrite prior history.**
7. **Planned, actual, observed, reported and certified states remain distinct.**
8. **Observation, claim, inference and conclusion remain distinct.**
9. **Authenticity of an artifact does not automatically establish truth of its content.**
10. **Accessibility modality does not reduce authority.**
11. **AI assistance does not automatically become human authority.**
12. **Corrections append history; they do not erase it.**
13. **External standards are mappings/sources, not automatic constitutional truth.**
14. **Products compose the ontology; they do not redefine it.**
15. **New event types and modalities may emerge without requiring a constitutional rewrite.**

## 53. Canonical event graph

```text
ENTITY
  ↓
IDENTITY
  ↓
AFFILIATION
  ↓
CAPACITY
  ↓
AUTHORITY / MANDATE
  ↓
REPRESENTATION / DELEGATION
  ↓
ELIGIBILITY / CONCURRENCY / CONFLICT
  ↓
EVENT
  ↓
EVENT CONSTITUTION
  ↓
PROTOCOL + PROCEDURE
  ↓
PARTICIPATION / FLOOR / COMMUNICATION / MATERIAL
  ↓
PRESENCE + ACCESSIBILITY MODALITY
  ↓
ACTION / OBSERVATION / WITNESSING
  ↓
MEDIA / EVIDENCE / CLAIM / REPORT
  ↓
TIMELINE / DECISION / OUTCOME
  ↓
RECORD / CERTIFICATION / PUBLICATION
  ↓
FEEDBACK / VALUE / FURTHER INTERACTION
```

## Final invariant

> **OMNII represents the event and the world's relationship to it without confusing the world, the event, the actor, the capacity, the representation, the media, the claim, the evidence or the record.**
