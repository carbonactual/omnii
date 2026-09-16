# OMNII Communication & Interaction Operations

**Status:** CANONICAL CAPABILITY SCOPE  
**Parent:** `docs/canonical/OMNII_COMMUNICATION_PRESENCE_FABRIC.md`  
**Companion:** `docs/canonical/OMNII_COMMUNICATION_INTELLIGENCE_TAXONOMY.md`  
**Intelligence:** ABBA orchestration  
**Scope:** Real-world communication workflows from preparation through live interaction, artifacts, decisions, follow-up, feedback and continuity.

## 1. Why this companion exists

The Communication Intelligence Taxonomy defines what communication is, who or what can communicate, the forms and signal systems involved, and how signals may be observed and interpreted.

This document defines the **operational lifecycle of communication**: the work people and systems actually perform around communication.

Communication is therefore not only:

`send → receive`

It may be:

`discover → invite → verify → consent → prepare → connect → communicate → observe → document → decide → assign → execute → review → follow up → retain/expire → learn/curate`.

A product may expose a simple interface. The ecosystem supplies the underlying capability.

## 2. Universal interaction lifecycle

```text
INTENT
→ DISCOVERY
→ ELIGIBILITY / CAPABILITY CHECK
→ INVITATION / CONTACT
→ IDENTITY / AUTHORITY
→ CONSENT / NOTICE
→ SCHEDULING / PREPARATION
→ CONNECTION
→ PRESENCE
→ LIVE / ASYNC INTERACTION
→ CAPTURE / RECORDING
→ TRANSCRIPTION / TRANSLATION
→ DOCUMENTATION
→ QUESTIONS / ANSWERS
→ DECISIONS / RESOLUTIONS
→ TASKS / COMMITMENTS
→ DISTRIBUTION / SHARING
→ REVIEW / FEEDBACK
→ FOLLOW-UP
→ OUTCOME / VALUE / PULSE
→ CONTINUITY / RETENTION / EXPIRY
```

Every stage may be omitted when irrelevant, but it must not be assumed irrelevant merely because a product UI hides it.

## 3. Interaction types

The fabric includes, without separate product primitives:

- conversation;
- chat;
- messaging;
- email;
- voicemail;
- voice call;
- video call;
- conference call;
- meeting;
- interview;
- panel interview;
- hearing;
- consultation;
- appointment;
- tutoring session;
- classroom session;
- examination;
- remote examination/proctoring;
- presentation;
- lecture;
- workshop;
- training;
- briefing;
- debriefing;
- negotiation;
- mediation;
- diplomatic encounter;
- press briefing;
- public forum;
- town hall;
- community meeting;
- event;
- ceremony;
- conference;
- webinar;
- broadcast;
- livestream;
- office-hours interaction;
- customer-support interaction;
- sales interaction;
- business-to-business exchange;
- business-to-government exchange;
- government-to-citizen communication;
- emergency communication;
- incident command/coordination;
- inspection;
- audit interview;
- research interview;
- field observation;
- scientific collaboration;
- machine/agent session;
- human-agent handoff;
- AI-mediated interaction;
- asynchronous review;
- document review;
- approval workflow;
- resolution workflow;
- feedback/review exchange.

## 4. Interview intelligence

An interview is a structured communication event, not merely a video recording.

Capabilities may include:

- interview type;
- purpose;
- interviewer/interviewee roles;
- panel members;
- invitation;
- scheduling;
- identity verification;
- role verification;
- consent and notices;
- optional recording/photo rules;
- accessibility requirements;
- interview guide/questions;
- question sequencing;
- live notes;
- transcript;
- translation;
- speaker attribution;
- evidence/documents supplied;
- answers;
- follow-up questions;
- scoring or assessment where the surrounding use case authorizes it;
- interviewer observations;
- candidate corrections;
- decision/resolution;
- next steps;
- action items;
- retention and access controls.

The system must distinguish **what was said**, **what was observed**, **what was inferred**, and **what decision was made**.

## 5. Examination and proctoring communication

Examination communication includes:

- exam instructions;
- candidate identity/session binding;
- room/session setup;
- permitted materials;
- accessibility accommodations;
- time notifications;
- live proctor communication;
- candidate questions;
- technical support;
- warnings;
- incident notices;
- submission confirmation;
- attendance;
- session evidence;
- post-exam documentation;
- review/appeal communication.

### Proctoring modalities

Where authorized by the exam owner and applicable rules, the ecosystem may coordinate:

- camera/video;
- microphone/audio;
- screen capture;
- screen/application sharing;
- browser/device telemetry;
- identity verification;
- face matching or other biometric verification;
- environment checks;
- human proctor observation;
- automated anomaly detection;
- live chat/voice escalation.

Proctoring signals are evidence, not automatically misconduct findings. An automated anomaly, biometric mismatch, gaze change or environmental signal must remain distinguishable from a confirmed violation and support human review where required.

## 6. Face, body and biometric communication

The communication fabric may use appearance and biometric capabilities as **interaction and verification signals**, but identity remains a separate canonical concept.

Possible modalities include:

- face detection;
- face matching/verification;
- liveness/presentation-attack detection;
- voice characteristics;
- fingerprint or other biometric modalities where legally and technically appropriate;
- body/gesture recognition;
- eye gaze;
- posture;
- expression;
- movement;
- avatar/character tracking.

The system must distinguish:

```text
FACE IMAGE
≠
FACE REPRESENTATION / TEMPLATE
≠
FACE MATCH RESULT
≠
IDENTITY CLAIM
≠
IDENTITY AUTHORITY
```

Biometric processing requires explicit purpose, authorization, lifecycle, retention, access control and audit semantics. Recognition is probabilistic and must expose uncertainty. NIST evaluations show that face-recognition error behavior can vary with demographics, image conditions and population composition; the ecosystem must therefore treat match results as evidence with measurable limitations rather than infallible identity facts. https://www.nist.gov/publications/face-recognition-vendor-test-part-3-demographic-effects

## 7. Photograph, camera and media-consent lifecycle

The ecosystem must model **permission to capture** separately from **permission to publish**.

A participant may choose, according to the use case:

- do not photograph;
- do not record;
- photograph allowed;
- recording allowed;
- private recording only;
- organizational retention allowed;
- internal sharing allowed;
- named-person sharing allowed;
- public posting allowed;
- commercial reuse allowed;
- derivative/editing allowed;
- AI transformation allowed;
- avatar/character generation allowed;
- facial recognition allowed;
- biometric indexing allowed;
- temporary use only;
- withdraw permission subject to applicable retention/legal constraints.

A consent record should capture:

- who consented or declined;
- what was requested;
- what purpose was stated;
- which medium was involved;
- scope;
- duration;
- audience;
- publication channels;
- transformation rights;
- biometric/AI-processing permission;
- withdrawal/change;
- timestamp;
- authority basis;
- provenance.

The system must never silently equate **“I attended”** with **“I consented to being photographed and publicly posted.”**

## 8. Character, avatar and persona participation

An interaction may contain:

- real face;
- live camera feed;
- avatar;
- stylized/anime character;
- professional virtual presenter;
- animated character;
- virtual human;
- organization representative;
- AI representative;
- voice-only representation;
- text-only presence;
- delegated human-controlled representation;
- autonomous bounded representation.

Required separations:

```text
IDENTITY
≠ APPEARANCE
≠ CHARACTER
≠ AVATAR
≠ VOICE
≠ AGENT
≠ AUTHORITY
```

Synthetic or transformed representations should carry provenance and appropriate disclosure. C2PA Content Credentials are an implementation anchor for recording verifiable provenance across creation and subsequent modifications of digital assets. https://c2pa.org/faqs/

## 9. Event communication

An event is a communication environment with participants, program, time, place/virtual room, access rules and outcomes.

Event capabilities include:

- event discovery;
- invitation;
- registration;
- ticketing/access status;
- identity/credential verification;
- participant roles;
- agenda/program;
- speakers/panels;
- accessibility requirements;
- attendance/presence;
- live session state;
- streaming/broadcast;
- chat/questions;
- stage/backstage coordination;
- announcements;
- interpretation/captions;
- photography/recording status;
- document sharing;
- decisions/resolutions;
- event minutes;
- tasks and follow-up;
- feedback;
- post-event media and documentation.

## 10. Attendance and presence

Attendance is not one boolean.

The fabric may distinguish:

- invited;
- registered;
- credentialed;
- checked in;
- physically present;
- virtually present;
- present but unavailable to interact;
- joined late;
- left early;
- temporarily disconnected;
- represented by delegate;
- excused;
- absent;
- attendance unverified.

Presence signals may derive from explicit check-in, human confirmation, device/session state, access control, event interaction or other authorized evidence. They must not silently become blanket location tracking.

## 11. Live interaction

“Live” means interaction with bounded temporal continuity, not merely a video stream.

Live capabilities may include:

- participant roster;
- speaking queue;
- speaker recognition/attribution;
- live transcription;
- captions;
- translation;
- sign-language interpretation;
- questions;
- polls;
- reactions;
- chat;
- hand-raising;
- moderation;
- screen sharing;
- document presentation;
- live data retrieval;
- shared whiteboard;
- shared workspace;
- live decisions;
- task creation;
- human support/escalation;
- connection-quality monitoring;
- fallback to voice/text/async channels.

## 12. Documents as communication

Documents are communication objects, not merely file attachments.

Supported document interaction includes:

- compose;
- draft;
- edit;
- annotate;
- comment;
- review;
- approve;
- reject;
- sign;
- request signature;
- version;
- compare;
- redact;
- translate;
- summarize;
- extract structured data;
- attach evidence;
- link to decisions;
- link to tasks;
- link to relationships;
- share;
- publish;
- restrict;
- expire;
- archive.

Every document interaction should preserve applicable version/provenance and access semantics.

## 13. Document sharing and collaboration

Sharing dimensions include:

- who can access;
- who can view;
- who can comment;
- who can edit;
- who can copy;
- who can download;
- who can reshare;
- who can publish;
- expiry;
- watermarking where appropriate;
- version used for a decision;
- audit history.

A shared document should remain linked to the communication/event/task/decision that caused or consumed it.

## 14. Pulling up real data during communication

ABBA may retrieve governed real data during an interaction instead of relying on static answers.

Examples:

- current schedules;
- official records;
- account/status data;
- event rosters;
- inventory;
- business data;
- approved knowledge;
- documents;
- meeting history;
- tasks;
- policies;
- timetables;
- live operational data;
- service availability;
- authorized external information.

The interaction should preserve:

- which source was used;
- when it was retrieved;
- what data was shown;
- authority for access;
- transformation/summarization performed by ABBA;
- whether the displayed data may be stale;
- resulting decision/action.

The assistant must not imply that static model knowledge is live data.

## 15. Minutes, notes and documentation

Minutes may include:

- event/session identity;
- date/time;
- venue/virtual room;
- attendance;
- apologies/absences where appropriate;
- agenda;
- discussion summary;
- questions;
- answers;
- evidence referenced;
- decisions;
- resolutions;
- dissent/alternative views where applicable;
- tasks;
- owners;
- deadlines;
- dependencies;
- follow-up meetings;
- documents produced/shared;
- approvals;
- unresolved issues.

Minutes are a derived record, not a replacement for source evidence. When accuracy matters, the source recording/transcript/document should remain separately governed.

## 16. Resolutions and decisions

Communication can produce formal or informal outcomes:

- acknowledgement;
- recommendation;
- decision;
- approval;
- rejection;
- resolution;
- commitment;
- instruction;
- escalation;
- deferral;
- issue opened;
- issue closed;
- vote/poll result;
- settlement;
- agreement;
- disagreement.

A resolution must identify, where applicable:

- decision-maker/authority;
- scope;
- affected parties;
- evidence considered;
- effective time;
- conditions;
- tasks created;
- review/appeal path;
- provenance.

ABBA may structure communication into a decision object but must not invent authority that was never granted.

## 17. Tasks and commitments

Communication commonly produces work.

A task may carry:

- source communication;
- objective;
- owner;
- delegate;
- priority;
- deadline;
- dependencies;
- required capabilities;
- documents/evidence;
- status;
- blockers;
- completion evidence;
- reviewer;
- outcome;
- feedback/value signal.

The task remains linked to its communication origin so the ecosystem can reconstruct why it exists.

## 18. Voicemail and asynchronous voice

Voicemail is a first-class communication object.

Capabilities include:

- caller identity/presentation;
- timestamp;
- audio;
- transcription;
- translation;
- summary;
- urgency;
- callback/contact action;
- attachments/links;
- acknowledgement;
- forwarding;
- retention/expiry;
- human escalation;
- provenance.

A voicemail transcription is a derivative representation of the original audio and must not silently replace it as the source record.

## 19. Business communication

The fabric supports business communication as workflows, not simply messages:

- prospecting;
- inquiry;
- quotation;
- proposal;
- bid;
- tender;
- negotiation;
- procurement;
- contract communication;
- order;
- fulfillment;
- invoice;
- payment notice;
- support;
- complaint;
- escalation;
- service request;
- account management;
- partner communication;
- board/management communication;
- staff communication;
- customer communication;
- investor communication;
- regulator communication;
- business-to-government communication.

Communication may create or update ecosystem relationships, commitments, transactions, documents and value signals subject to authority.

## 20. Feedback and reviews

Feedback must be broader than a star rating.

Forms include:

- free-text feedback;
- structured feedback;
- rating;
- review;
- testimonial;
- complaint;
- praise;
- bug report;
- suggestion;
- feature request;
- survey response;
- interview feedback;
- peer review;
- customer review;
- employee feedback;
- performance feedback;
- service evaluation;
- event evaluation;
- outcome evaluation;
- post-incident review;
- after-action review.

Feedback objects should preserve:

- subject;
- author/presenter;
- relationship to subject;
- context;
- evidence;
- date;
- visibility;
- response;
- resolution;
- outcome;
- appeal/correction;
- whether it represents a verified experience or an unverified claim.

A review is not automatically fact. A complaint is not automatically proven misconduct. Feedback can inform curation without becoming an unqualified canonical truth.

## 21. Communication quality and failure

The fabric explicitly models:

- latency;
- jitter;
- packet loss;
- dropped calls;
- audio clipping;
- video degradation;
- poor lighting;
- background noise;
- overlapping speakers;
- low bandwidth;
- caption errors;
- translation errors;
- speech recognition errors;
- sign interpretation errors;
- identity-match uncertainty;
- document version conflicts;
- stale data;
- missing context;
- ambiguous references;
- unavailable sources;
- conflicting records;
- participant misunderstanding;
- failed delivery;
- failed acknowledgement;
- failed handoff.

A good communication system does not hide failure; it surfaces it and provides fallback paths.

## 22. Fallback and modality negotiation

Participants and agents may negotiate:

- language;
- dialect;
- sign language;
- voice/text;
- video/audio;
- captions;
- translation;
- accessibility method;
- bandwidth;
- device capability;
- offline mode;
- human assistance;
- timing;
- retention.

Example:

```text
VIDEO unavailable
→ AUDIO
→ LIVE CAPTIONS
→ TEXT CHAT
→ ASYNC MESSAGE
→ HUMAN CALLBACK
```

Communication continuity should survive individual transport or modality failure where possible.

## 23. Contactability and discoverability

Communication requires knowing whether and how another participant may be reached.

Separate:

- identity discovery;
- capability discovery;
- contact discovery;
- presence discovery;
- authorization discovery;
- availability;
- preferred modality;
- preferred language;
- accessibility requirements;
- notification preferences;
- quiet hours;
- escalation path.

Being identifiable does not automatically mean being contactable.

Being contactable does not automatically mean being available.

Being available does not automatically mean authorized for the requested interaction.

## 24. Recording, publication and reuse

The fabric distinguishes:

```text
CAPTURE
→ RETAIN
→ ACCESS
→ SHARE
→ PUBLISH
→ DERIVE
→ TRAIN / ANALYZE
→ ARCHIVE
→ DELETE / EXPIRE
```

Permission may differ at each stage.

For example:

`allow photograph` does not automatically mean `allow public posting`.

`allow recording` does not automatically mean `allow AI analysis`.

`allow private sharing` does not automatically mean `allow public publication`.

`allow publication` does not automatically mean `allow biometric indexing`.

## 25. AI-mediated communication

ABBA may assist communication through:

- translation;
- summarization;
- transcription;
- retrieval;
- drafting;
- accessibility conversion;
- agenda generation;
- question preparation;
- meeting assistance;
- task extraction;
- decision structuring;
- document comparison;
- data lookup;
- live moderation;
- participant handoff;
- agent delegation.

AI-mediated content must preserve whether it was:

- directly authored by a human;
- generated by AI;
- transformed by AI;
- translated by AI;
- summarized by AI;
- retrieved from a live source;
- inferred by the model.

## 26. Human handoff

Communication must support explicit transitions:

```text
HUMAN
↔ ABBA
↔ SPECIALIZED AGENT
↔ SERVICE
↔ HUMAN
```

The handoff should preserve context necessary for continuity while respecting authorization, privacy and minimum disclosure.

A user should not have to restart the conversation merely because responsibility moved from AI to human or from one service to another.

## 27. Search, retrieval and context injection

Communication can request information from:

- ecosystem registries;
- approved documents;
- records;
- live services;
- organizational systems;
- knowledge stores;
- previous authorized interactions;
- external sources;
- public information.

Retrieved information must carry source, timestamp and authority context where applicable.

## 28. Communication as an event source

Communication can emit structured events such as:

- invitation created;
- invitation accepted;
- participant joined;
- participant left;
- message sent;
- message delivered;
- message read;
- voicemail created;
- call started;
- call ended;
- interview started;
- interview completed;
- exam started;
- exam submitted;
- attendance recorded;
- document shared;
- document approved;
- question asked;
- answer recorded;
- decision made;
- resolution issued;
- task created;
- task completed;
- review submitted;
- feedback received;
- escalation opened;
- escalation resolved.

Events are governed ecosystem objects, not hidden side effects inside a product.

## 29. Privacy, consent and minors

Communication involving children or other protected contexts requires appropriate authority and privacy handling.

Particular care applies to:

- photographs;
- recordings;
- biometric processing;
- public publication;
- location/proximity;
- behavioral analytics;
- proctoring;
- automated profiling;
- AI-generated representations.

The fabric must preserve consent/authorization states rather than assuming one blanket permission covers every downstream use.

## 30. Interoperability and federation

Communication may cross organizations, products and networks.

The ecosystem should support standards/protocol adapters without letting any one protocol become the canonical ontology.

Current examples include:

- WebRTC and related real-time media capabilities;
- ActivityPub/federated social communication;
- email and messaging protocols;
- calendar/scheduling protocols;
- HTTP/API/RPC;
- event/pub-sub systems;
- A2A agent communication;
- MCP tool/resource interaction;
- document and content-provenance systems;
- emergency alert formats such as CAP.

W3C ActivityPub defines both client-server and federated server-server APIs for content and notifications, illustrating why communication can cross administrative boundaries. https://www.w3.org/TR/activitypub/

## 31. Emergency and public warning communication

Emergency communication is a special reliability case:

- authoritative source;
- alert type;
- severity;
- geographic scope;
- language;
- accessibility;
- instructions;
- timestamp;
- expiration;
- acknowledgement where relevant;
- multi-channel dissemination;
- correction/update;
- cancellation;
- audit trail.

ITU's Common Alerting Protocol is designed for consistent all-hazard alerts across multiple warning systems and media, including mobile networks, internet services, broadcast, sirens and digital signage. https://www.itu.int/en/ITU-D/Emergency-Telecommunications/Pages/Common-Alerting-Protocol-and-Call-to-Action.aspx

## 32. Communication governance rules

The ecosystem should enforce these distinctions:

- identity ≠ appearance;
- identity ≠ biometric observation;
- attendance ≠ consent to photography;
- photography permission ≠ publication permission;
- recording permission ≠ AI-analysis permission;
- communication ≠ interpretation;
- interpretation ≠ fact;
- feedback ≠ truth;
- review ≠ verified claim;
- transcript ≠ original recording;
- summary ≠ source document;
- presence ≠ location tracking;
- contactability ≠ availability;
- availability ≠ authorization;
- notification ≠ acknowledgement;
- acknowledgement ≠ agreement;
- agreement ≠ execution;
- task ≠ completion;
- decision ≠ authority to execute outside scope;
- AI assistance ≠ human approval;
- avatar ≠ human identity;
- clone ≠ original authority;
- live data ≠ cached/static knowledge.

## 33. Continuum integration

Communication outputs can become, where authorized:

- relationships;
- knowledge;
- records;
- tasks;
- documents;
- decisions;
- commitments;
- services;
- value/pulse signals;
- learning signals;
- future context;
- curation inputs.

This is the same ecosystem continuum already governing the Communication & Presence Fabric. Products consume and emit these governed capabilities rather than creating parallel stores of truth.

## 34. Implementation maturity

### Canonical now

- interaction lifecycle;
- identity/authority/consent separation;
- communication modalities;
- accessibility conversion;
- interviews;
- meetings/events;
- attendance/presence;
- documents and document sharing;
- tasks;
- minutes;
- questions/answers;
- decisions/resolutions;
- feedback/reviews;
- voicemail;
- live data retrieval;
- recording/publication permission model;
- human handoff;
- provenance;
- communication event model.

### Implemented where product capability already exists

Capability-specific implementations may be consumed through the ecosystem registry; their existence does not create a competing ontology.

### Emerging

- richer multimodal proctoring;
- advanced real-time translation;
- adaptive accessibility;
- biometric liveness and anti-spoofing;
- advanced spatial meetings;
- richer federated communication;
- integrated sensing and communication.

### Candidate / Experimental

- advanced synthetic presence;
- neural communication interfaces;
- interspecies translation research;
- experimental biological communication interfaces.

### Future

Any genuinely novel communication modality not yet sufficiently specified for production.

## 35. Final canonical model

```text
WHO / WHAT
    ↓
WHY / INTENT
    ↓
AUTHORITY / CONSENT
    ↓
HOW THEY APPEAR
    ↓
HOW THEY CAN COMMUNICATE
    ↓
WHICH MODALITY / LANGUAGE / SIGNAL SYSTEM
    ↓
WHEN / WHERE / WITH WHOM
    ↓
LIVE / ASYNC / BROADCAST / PRIVATE / PUBLIC
    ↓
PERCEIVE / TRANSLATE / INTERPRET
    ↓
VERIFY / QUALIFY / PRESERVE UNCERTAINTY
    ↓
CAPTURE / RECORD / DOCUMENT
    ↓
DATA / DOCUMENTS / EVIDENCE
    ↓
QUESTIONS / ANSWERS / DISCUSSION
    ↓
DECISIONS / RESOLUTIONS / AGREEMENTS
    ↓
TASKS / OWNERS / DEADLINES
    ↓
SHARE / PUBLISH / RETAIN / EXPIRE
    ↓
FEEDBACK / REVIEW / OUTCOME
    ↓
RELATIONSHIPS / VALUE / PULSE / CONTINUITY
    ↓
ABBA CURATION AND ORCHESTRATION
```

This operational scope is part of the Communication Fabric; it does not create a separate meeting app, interview engine, proctoring ontology, document universe, review primitive or business-messaging universe inside individual products.
