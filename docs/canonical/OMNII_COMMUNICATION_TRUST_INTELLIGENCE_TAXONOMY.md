# OMNII Communication Trust & Intelligence Taxonomy

**Status:** CANONICAL CAPABILITY TAXONOMY  
**Parent:** `docs/canonical/OMNII_COMMUNICATION_INTELLIGENCE_TAXONOMY.md`  
**Scope:** Authenticity, provenance, source quality, disclosure, secrecy, privacy, deception, manipulation, uncertainty and information propagation  
**Intelligence:** ABBA orchestration  

## 1. Why this exists

Communication intelligence must understand not only messages and signals, but the trust state surrounding them.

The same artifact can be simultaneously:

- authentic as a file but false in its claims;
- genuine but outdated;
- genuine but taken out of context;
- privately shared but later leaked;
- a real copy of a fake original;
- a translation of an authentic source but not the original;
- AI-generated and still factually correct;
- human-created and still false;
- confidential without being secret;
- sensitive without being false;
- widely repeated without being verified.

## 2. Source dimensions

```text
SOURCE
ORIGIN
CREATOR
CLAIMED_ORIGIN
CUSTODIAN
DISTRIBUTOR
CURRENT_HANDLER
PUBLISHER
VERIFIER
```

Each role is distinct. The sender of information is not automatically the creator, owner, verifier, publisher or authority.

## 3. Evidence dimensions

```text
OBSERVATION
RECORD
CLAIM
ASSERTION
ALLEGATION
REPORT
CORROBORATION
CONTRADICTION
VERIFICATION
INFERENCE
CONCLUSION
```

The system must preserve the difference between what was observed, what was said, what was inferred and what has been verified.

## 4. Provenance dimensions

```text
ORIGINAL
COPY
EXTRACT
SCREENSHOT
RECORDING
TRANSCRIPTION
TRANSLATION
SUMMARY
ANNOTATION
EDIT
COMPOSITE
DERIVATIVE
REMIX
SYNTHETIC
AI_MODIFIED
RE_ENCODED
REUPLOADED
UNKNOWN_ORIGIN
```

Propagation is represented as a graph rather than a single flat URL or filename.

## 5. Integrity dimensions

```text
INTACT
HASH_MATCH
CRYPTOGRAPHICALLY_VERIFIED
ALTERED
CORRUPTED
TRUNCATED
REORDERED
REPLAYED
DUPLICATED
INJECTED
MISSING_PARTS
UNKNOWN
```

Integrity describes preservation of the artifact or record, not truth of its content.

## 6. Disclosure dimensions

```text
AUTHORIZED
RESTRICTED
NEED_TO_KNOW
PRIVATE
CONFIDENTIAL
SECRET
UNAUTHORIZED_SUSPECTED
UNAUTHORIZED_CONFIRMED
PUBLIC
UNKNOWN_AUDIENCE
```

The system records intended audience separately from actual audience.

## 7. Private and intimate trust boundary

Private and intimate communications require explicit separation of:

`DISCLOSURE -> FORWARDING -> PUBLICATION -> TRANSFORMATION -> SECONDARY_USE`

A recipient may have authority for one without automatically possessing authority for the others.

The trust relationship by which private content was shared is itself contextual information and should be preserved where appropriate.

## 8. Secret and credential boundary

Secret material includes authentication and authorization material such as credentials, tokens, API secrets and private keys.

Communication intelligence recognizes exposure signals and triggers governed containment/remediation pathways.

It should never turn secret material into a normal discoverable communication object.

## 9. Deception and manipulated information

Analytical classifications include, where supported:

- misinformation: inaccurate information without assuming motive;
- disinformation: intentionally deceptive/misleading information where evidence supports an intent assessment;
- malinformation: genuine information used in harmful/misleading disclosure or context where the classification is justified;
- fabrication;
- manipulation;
- impersonation;
- forged or altered records;
- deceptive context;
- selective omission;
- synthetic media;
- identity/representation spoofing;
- replay or stale-state deception.

These are analytical classifications, not automatic verdicts.

## 10. Trust signals

Signals can include:

- independent corroboration;
- trusted provenance;
- cryptographic integrity;
- verified source identity;
- authorized custody;
- temporal consistency;
- contextual consistency;
- independent records;
- authoritative registration;
- reproducibility;
- contradiction by reliable evidence.

No single signal automatically proves truth in every domain.

## 11. Trust degradation

Trust can degrade through:

`SOURCE UNKNOWN -> CONTEXT LOSS -> UNVERIFIED REPOST -> EDIT -> CLIP -> SCREENSHOT -> REENCODE -> TRANSLATION -> SUMMARY -> VIRAL REPEAT`

The ecosystem should retain the relationship graph so later interpretation can recover earlier context.

## 12. False positives and false negatives

Classification itself is an observation/decision that can be wrong.

Therefore the ecosystem records:

`CLASSIFIER -> METHOD -> INPUT -> CONFIDENCE -> RESULT -> REVIEW/OVERRIDE -> EVIDENCE`

An AI classification must not silently overwrite the underlying artifact or its original provenance.

## 13. Human, AI and machine provenance

The provenance model supports:

- human-originated;
- AI-generated;
- AI-assisted;
- AI-transformed;
- machine-generated;
- sensor-generated;
- mixed-origin;
- unknown-origin.

Origin category does not by itself establish truth or authority.

## 14. Communication intelligence loop

```text
OBSERVE
-> IDENTIFY SOURCE
-> PRESERVE ORIGINAL
-> CLASSIFY
-> TRACE PROVENANCE
-> CHECK INTEGRITY
-> CHECK AUTHORITY/CONSENT
-> SEEK CORROBORATION
-> RECORD UNCERTAINTY
-> INTERPRET
-> ESCALATE WHEN NEEDED
-> ACT UNDER AUTHORITY
-> RECORD OUTCOME
-> RETURN FEEDBACK/PULSE
-> CONTINUE
```

## 15. Boundary

This taxonomy supports trust-aware communication intelligence. It does not create an independent truth oracle. Truth, legal status, evidentiary admissibility and authorization remain contextual, governed and evidence-dependent.
