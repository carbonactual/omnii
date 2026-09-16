# OMNII Interaction Trust, Distribution, Custody & Conformance

**Status:** CANONICAL CONFORMANCE MODEL  
**Scope:** Ecosystem-wide communication, information, artifacts, events, evidence, secrets, private material, decisions, handoffs and feedback  
**Parent:** `docs/canonical/OMNII_ECOSYSTEM_INTERACTION_HANDOFF_PROTOCOL.md`  
**Intelligence:** ABBA orchestration  

## 1. Purpose

The ecosystem does not treat every received item as equally trustworthy, public, authentic, authorized, actionable or complete.

An interaction may contain information, media, documents, credentials, code, APIs, evidence, claims, instructions, events, feedback or value signals. The ecosystem therefore evaluates **what the item is, where it came from, who may know it, who may act on it, what authority exists, whether it is authentic, how it was transformed, who currently has custody, and what may happen next**.

This is a conformance model for those semantics. It does not create a second communication, identity, authority, memory, registry or value system.

## 2. Core separation rules

The following distinctions are canonical:

`MESSAGE != TRUTH`

`ASSERTION != FACT`

`CLAIM != EVIDENCE`

`OBSERVATION != INTERPRETATION`

`SOURCE != AUTHORITY`

`AUTHORITY != CONSENT`

`CONSENT TO SEND != CONSENT TO FORWARD`

`CONSENT TO RECEIVE != CONSENT TO PUBLISH`

`POSSESSION != PERMISSION`

`ACCESS != AUTHORIZATION`

`DELIVERY != RECEIPT`

`RECEIPT != ACKNOWLEDGEMENT`

`ACKNOWLEDGEMENT != AGREEMENT`

`AGREEMENT != EXECUTION`

`ORIGINAL != COPY`

`COPY != DERIVATIVE`

`TRANSLATION != ORIGINAL`

`SUMMARY != SOURCE`

`SCREENSHOT != SOURCE RECORD`

`ARCHIVE != LIVE STATE`

`PRIVATE != SECRET`

`SENSITIVE != FALSE`

`SECRET != TRUE`

`CLASSIFICATION != AUTHENTICITY`

`POPULARITY != TRUTH`

`REPETITION != VERIFICATION`

`ANONYMOUS/PSEUDONYMOUS != UNTRACEABLE`

`AI-GENERATED != FALSE`

`HUMAN-GENERATED != TRUE`

These distinctions prevent the ecosystem from converting format, confidence, popularity, possession or repetition into unsupported authority or truth.

## 3. Canonical information state

A received item can be represented with the following semantic dimensions, as applicable:

```text
OBJECT
SOURCE
CREATOR/ORIGINATOR
CLAIMED_ORIGIN
RECIPIENT
AUTHORITY
CONSENT
CLASSIFICATION
AUDIENCE
PURPOSE
SENSITIVITY
URGENCY
TIME-BILITY
AUTHENTICITY
INTEGRITY
PROVENANCE
CUSTODY
TRANSFORMATION
CONFIDENCE
VERIFICATION_STATE
DISCLOSURE_STATE
RETENTION
EXPIRY
RELATED_INTERACTIONS
RELATED_EVENTS
VALUE/PULSE
```

Missing fields remain unknown. The ecosystem must not manufacture certainty.

## 4. Classification and handling

Classification may include combinations of:

- General/public
- Internal
- Restricted
- Confidential
- Secret
- Need-to-know
- Sensitive
- Privileged where applicable
- Safety-critical
- Personal/private
- Intimate/private
- Credential/secret material
- Commercially sensitive
- Unreleased/pre-publication
- Evidence/custody-controlled
- Regulatory/official handling

Classification is a handling instruction and contextual property. It does not by itself determine truth, legal status or authority.

### Handling controls

A governed item may specify:

`VIEW -> RECEIVE -> COPY -> FORWARD -> DOWNLOAD -> EDIT -> TRANSFORM -> SHARE -> PUBLISH -> INDEX -> RETAIN -> ARCHIVE -> DELETE/DESTROY`

Each action is independently policy-controlled where necessary.

## 5. Audience and distribution

The canonical interaction grammar supports:

- TO
- CC
- BCC
- Reply-To
- Forward
- Redirect
- Distribution list
- Group
- Targeted recipient set
- Need-to-know audience
- Circular distribution
- Broadcast
- Multicast
- Public release
- Restricted release
- Escalation-only distribution
- FYI / informational distribution
- Action-required distribution.

### BCC semantics

BCC is a confidentiality/disclosure property of distribution, not merely an email UI feature.

A recipient may receive an interaction while not being shown other recipients. Internal records must preserve the authorized distribution semantics without exposing hidden recipient relationships to recipients lacking permission to know them.

## 6. Hierarchy and leveled interactions

Interactions may move through:

```text
UPWARD
DOWNWARD
LATERAL
CROSS-DOMAIN
DELEGATED
REFERRED
ESCALATED
RETURNED
```

They may also follow organizational or operational levels such as:

```text
CONSTITUTION / ROOT AUTHORITY
-> DOMAIN
-> ORGANIZATION
-> UNIT
-> ROLE
-> HUMAN / AI / AGENT
-> TASK / CASE / EVENT
```

A lower level may not silently create authority for a higher level.

A higher level may delegate a bounded authority downward without transferring unrelated authority.

## 7. Chain of custody

Custody applies to information, documents, media, evidence, credentials, assets, cases, responsibilities and other governed objects where integrity or accountability matters.

Canonical custody lifecycle:

`CREATE/ORIGINATE -> RECEIVE -> REGISTER -> CUSTODIAN -> TRANSFER -> ACKNOWLEDGE -> REVIEW -> ACT -> TRANSFER/RETURN -> CLOSE -> ARCHIVE`

A custody event should preserve, as applicable:

`FROM -> TO -> WHAT -> WHEN -> WHY -> AUTHORITY -> CONDITION -> INTEGRITY -> EVIDENCE -> ACKNOWLEDGEMENT -> NEXT CUSTODIAN`

A handoff can be:

`ACCEPTED | REJECTED | PARTIAL | DEFERRED | ESCALATED | RETURNED`

## 8. Authenticity and provenance

The ecosystem distinguishes:

- Original/source artifact
- Exact copy
- Re-encoded copy
- Extract
- Screenshot
- Photograph of another artifact
- Translation
- Transcription
- Summary
- Annotation
- Edited version
- Composite
- Derivative
- Synthetic/generated artifact
- AI-modified artifact
- Unknown-origin artifact.

For media, documents and other artifacts, provenance may include:

`ORIGIN -> CREATION -> TRANSFER -> TRANSFORMATION -> PUBLICATION -> REUSE -> ARCHIVE`

Where available, integrity and provenance evidence can be cryptographically bound to the artifact or its record. Provenance does not automatically prove the truth of the underlying claims.

## 9. Originality and authenticity states

Possible states include:

`ORIGINAL_CONFIRMED`
`ORIGINAL_CLAIMED`
`COPY_CONFIRMED`
`DERIVATIVE_CONFIRMED`
`ALTERED`
`PARTIALLY_ALTERED`
`SYNTHETIC`
`AI_MODIFIED`
`TRANSLATED`
`RE_ENCODED`
`SOURCE_UNKNOWN`
`AUTHENTICITY_UNRESOLVED`
`CONFLICTING_PROVENANCE`

The ecosystem must not collapse these into a simple true/false field.

## 10. Private and intimate material

Private or intimate material can include:

- private photographs
- intimate photographs or videos
- private messages
- private audio
- private recordings
- personal documents
- private location or presence information
- personal data
- confidential correspondence.

A person may voluntarily send or disclose such material to a recipient based on confidence, relationship or context. That act does **not automatically authorize onward disclosure, publication, forwarding, indexing, commercial reuse, transformation, or redistribution**.

The canonical model therefore records separately:

`ORIGINATOR INTENT`
`RECIPIENT AUTHORITY`
`DISCLOSURE CONSENT`
`FORWARDING CONSENT`
`PUBLICATION CONSENT`
`TRANSFORMATION CONSENT`
`COMMERCIAL/SECONDARY USE CONSENT`

Unauthorized onward distribution is modeled as a disclosure/handling event against the relevant policy, not as a new content type.

## 11. Leaks and unauthorized disclosure

A leak is a governed event in which information reaches an audience outside its authorized disclosure path.

Examples include:

- unreleased music
- unreleased films
- unreleased videos
- unreleased photographs
- confidential documents
- private correspondence
- internal communications
- protected datasets
- credentials or API secrets
- restricted source code
- pre-publication research
- private recordings
- intimate/private media.

The ecosystem records:

`WHAT -> SOURCE/CUSTODIAN -> AUTHORIZED AUDIENCE -> ACTUAL AUDIENCE -> DISCLOSURE PATH -> DETECTION -> CONTAINMENT -> NOTIFICATION/ESCALATION -> REMEDIATION -> CUSTODY/PROVENANCE UPDATE`

The ecosystem should help detect, classify, contain and govern unauthorized disclosure. It must not become a distribution mechanism for leaked secrets or private material.

## 12. Credentials, secrets and sensitive technical material

The same interaction grammar covers:

- passwords
- access tokens
- API keys
- private keys
- recovery codes
- session material
- confidential endpoints
- sensitive configuration
- authentication artifacts.

These objects require stronger handling policies, least-privilege access, redaction where appropriate, rotation/revocation workflows, provenance and audit.

Secret exposure is an event to contain and remediate. A leaked secret is not an instruction to reproduce or redistribute it.

## 13. Claims, misinformation, deception and uncertainty

The ecosystem can represent content quality without prematurely asserting a conclusion.

Analytical states include:

`OBSERVED`
`REPORTED`
`ASSERTED`
`ALLEGED`
`UNVERIFIED`
`CORROBORATED`
`CONTRADICTED`
`VERIFIED`
`DISPROVEN_BY_AVAILABLE_EVIDENCE`
`AMBIGUOUS`
`OUTDATED`
`CONTEXT_MISSING`
`SATIRE/PARODY`
`HOAX`
`FABRICATED`
`MANIPULATED`
`IMPERSONATED`
`DECEPTIVE_CONTEXT`
`SYNTHETIC/MANUFACTURED`

The terms misinformation, disinformation and malinformation can be represented as analytical classifications where supported by evidence and context. They must not be used as automatic substitutes for proof.

A claim may be false without proving malicious intent. A true item may still be presented in a misleading context. A mistaken statement is not automatically a deliberate deception.

## 14. Copies, transformations and propagation

Information can propagate through:

`ORIGINAL -> COPY -> FORWARD -> SCREENSHOT -> DOWNLOAD -> REUPLOAD -> EDIT -> CLIP -> TRANSLATE -> SUMMARIZE -> QUOTE -> REMIX -> SYNTHETIC DERIVATIVE -> PUBLICATION`

Each transformation may alter:

- context
- completeness
- meaning
- authenticity signals
- provenance
- consent requirements
- classification
- audience
- evidence value.

Therefore each derivative should retain a relationship to the prior object where possible.

## 15. Integrity and tamper states

The ecosystem may track:

- intact
- checksum/hash match
- cryptographically verified
- altered
- corrupted
- truncated
- recompressed/re-encoded
- replayed
- duplicated
- reordered
- injected
- partially missing
- integrity unknown.

Integrity answers whether an artifact matches its recorded representation; it does not alone answer whether the content itself is true.

## 16. Time and urgency

Interactions may have:

`ROUTINE`
`TIMELY`
`URGENT`
`CRITICAL`
`EMERGENCY`
`LIFE_SAFETY`

and temporal properties:

`IMMEDIATE | SCHEDULED | DEADLINE_BOUND | EVENT_TRIGGERED | RECURRING | ONGOING | EXPIRING | EPHEMERAL | PERSISTENT`

Urgency may change routing and notification without changing the underlying authority model.

## 17. Emergency interaction chain

Emergency interactions can follow:

`DISTRESS/OBSERVATION -> INTAKE -> TRIAGE -> IDENTITY/LOCATION AS AVAILABLE -> DISPATCH -> RESPONDER -> STATUS -> HANDOFF -> RESOLUTION -> AFTER-ACTION -> FEEDBACK`

The same canonical model can represent emergency phone calls, text, radio, alarms, location signals, medical alerts, public warnings and machine-generated incidents.

Emergency routing must support fallback when a preferred channel fails.

## 18. Event and circular semantics

The ecosystem distinguishes:

- individual interaction
- case
- incident
- event
- meeting
- broadcast
- circular
- periodic bulletin
- scheduled notice
- alert
- public announcement
- transaction-triggered notification.

A circular or broadcast has an intended audience and distribution event. Individual responses can become separate child interactions linked to the parent distribution.

## 19. Feedback and ecosystem value

Feedback can include:

- acknowledgement
- correction
- review
- rating
- complaint
- praise
- recommendation
- test result
- incident report
- outcome report
- survey response
- usage signal
- performance result
- after-action review
- human correction of AI output.

A governed feedback chain is:

`INTERACTION -> FEEDBACK -> OBSERVED OUTCOME -> PULSE/VALUE SIGNAL -> MINTED RECORD -> TOKENIZATION WHEN GOVERNED -> INDEX/CONTINUITY`

**Pulse remains distinct from Value.** Minting and tokenization follow existing ecosystem authority and value laws; they are not created by this conformance model.

## 20. Escalation and containment

Escalation is appropriate where there is:

- insufficient authority
- insufficient confidence
- high sensitivity
- emergency conditions
- conflicting evidence
- suspected impersonation
- suspected unauthorized disclosure
- secret/credential exposure
- safety-critical impact
- unresolved custody
- failed handoff
- policy conflict.

Possible path:

`AGENT -> ABBA -> HUMAN -> SPECIALIST -> AUTHORIZED EXTERNAL PARTY`

Containment is distinct from deletion and distinct from publication. Where possible, preserve evidence and provenance while preventing further unauthorized exposure.

## 21. Conformance examples

### Example A — confidential circular

`CIRCULAR + CONFIDENTIAL + DISTRIBUTION_LIST + ACTION_REQUIRED`

Must preserve audience, handling restrictions, parent event and acknowledgements. A recipient cannot infer publication rights merely from receipt.

### Example B — BCC distribution

`EMAIL + TO=A + BCC=B,C`

B and C can receive the information without receiving A's complete hidden-recipient context. Internal audit may preserve the actual distribution graph subject to authorized access.

### Example C — trusted private/intimate disclosure

`PRIVATE_INTIMATE_MEDIA + ORIGINATOR=A + RECIPIENT=B + CONSENT=SCOPE_LIMITED`

B's possession does not establish permission to forward, publish, monetize, transform or index the material.

### Example D — unreleased film leak

`UNRELEASED_ARTIFACT + CUSTODIAN=Studio + AUTHORIZED_AUDIENCE=Limited + ACTUAL_AUDIENCE=Unauthorized`

Record disclosure event, provenance, custody break, containment and authorized remediation. Do not treat the leaked copy as the authoritative release artifact.

### Example E — exposed API secret

`SECRET_MATERIAL + UNAUTHORIZED_DISCLOSURE`

Trigger containment and credential lifecycle remediation. Do not propagate the secret as ordinary content.

### Example F — fake or altered media

`MEDIA + SOURCE_CLAIMED=X + PROVENANCE=UNRESOLVED + INTEGRITY=ALTERED_OR_UNKNOWN`

Preserve the original claim, evidence and uncertainty. Do not convert the object directly into a verified fact.

### Example G — social post repeating an unverified claim

`CLAIM + REPOST_COUNT=HIGH + VERIFICATION=UNVERIFIED`

High repetition does not upgrade the verification state.

### Example H — translated official statement

`ORIGINAL -> TRANSLATION -> PUBLICATION`

The translation remains linked to the original and retains translator/provenance information where available.

### Example I — emergency call

`EMERGENCY + REAL_TIME + FALLBACK_REQUIRED`

The system prioritizes timely routing and responder handoff while preserving authority, uncertainty, location confidence and incident continuity.

### Example J — feedback becomes ecosystem value

`SERVICE_COMPLETION -> VERIFIED_FEEDBACK -> OUTCOME -> PULSE -> MINTED_FEEDBACK_RECORD -> TOKENIZATION_IF_AUTHORIZED`

The product does not invent its own token or value primitive.

## 22. Product conformance test

A product, agent or service conforms when it can:

1. classify information without inventing unsupported truth;
2. preserve source/provenance and transformation relationships;
3. distinguish possession, access, consent and authority;
4. enforce or request audience/distribution restrictions;
5. preserve custody through handoff;
6. represent urgency and temporal constraints;
7. detect and escalate possible leaks, secret exposure, impersonation and integrity failures;
8. keep original material distinct from copies, derivatives and summaries;
9. preserve uncertainty and conflicting evidence;
10. route emergency and sensitive interactions through appropriate escalation;
11. return outcomes and feedback to the ecosystem;
12. allow governed feedback to become minted ecosystem records and later tokenized through existing value rules;
13. avoid creating a competing communication, identity, authority, memory, registry or value primitive.

## 23. Canonical test statement

> The ecosystem must know not only **what was communicated**, but **who originated it, who was authorized to receive it, who actually received it, whether it is authentic, what changed, who has custody, what may be done with it, what happened because of it, and what value/feedback returned to the ecosystem**.

## 24. Boundary

This model governs semantics. Legal validity, evidentiary admissibility, privacy rights, records obligations, emergency procedures and jurisdiction-specific rules remain external constraints that the relevant implementation must satisfy.

The ecosystem should represent those constraints and avoid pretending that a generic internal label automatically determines external legal status.
