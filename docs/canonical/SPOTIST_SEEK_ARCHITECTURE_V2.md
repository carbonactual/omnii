# SPOTIST — Universal SEEK Architecture v2

**Status:** CANONICAL ECOSYSTEM CAPABILITY CONTRACT
**Supersedes:** narrow sourcing/procurement interpretations as the complete meaning of SPOTIST
**Depends on:** `docs/canonical/SPOTIST_CANONICAL_CAPABILITY.md`; Universal Meta-Ontology; Universal Event & Interaction Ontology; canonical capability/relationship/evidence/authority contracts

## 1. Purpose

This document strengthens the canonical SPOTIST model before standalone product implementation.

SPOTIST remains the ecosystem-wide **SEEK capability**. It is not restricted to sourcing, procurement, products, services, commerce or markets.

The product may be narrow or broad in any given surface; the capability remains open-world.

## 2. Canonical primitive: SEEK

A `SEEK` is a first-class ecosystem object representing an authorized intent to discover, locate, identify, trace, match, qualify, verify, connect, assemble or monitor something legitimately sought.

A seek may target one or more:

- people or participant capabilities;
- identities or identity leads;
- family/relationship connections;
- animals or pets;
- objects, property or vehicles;
- locations and places;
- rare, unique, obsolete or scarce items;
- books, art, collectibles and historical objects;
- information, documents, records and evidence leads;
- skills, expertise and human services;
- suppliers, manufacturers and production capacity;
- resources and underused capacity;
- opportunities, offers, promotions, deals and openings;
- events, activities, adventures and experiences;
- missing or lost objects and lawful recovery leads;
- any other representable object of intent accepted under the open-world ontology.

This list is explicitly non-exhaustive.

## 3. Seek object contract

A seek SHOULD be representable using the following semantic dimensions where applicable:

```text
seek_id
seeker
intent
objective
candidate_target
criteria
constraints
preferences
context
location
geographic_scope
time_window
urgency
priority
acceptable_substitutions
source_policy
privacy_class
authority_context
consent_context
evidence_requirements
verification_requirements
notification_policy
monitoring_policy
expiry
status
parent_seek
related_seeks
mission_id
results
claims
outcomes
provenance
corrections
```

Implementations MAY add fields, but must not change the meaning of these canonical dimensions without governed extension.

## 4. Seek lifecycle

Canonical seek lifecycle:

```text
DRAFT
  ↓
AUTHORIZED
  ↓
INTERPRETING
  ↓
DISCOVERING
  ↓
MATCHING / TRACING / LOCATING
  ↓
QUALIFYING
  ↓
VERIFYING
  ↓
CONNECTED / ASSEMBLED / ALERTED
  ↓
HANDOFF
  ↓
OUTCOME
  ↓
CLOSED / EXPIRED / CANCELLED / CONTINUING
```

A seek may branch, pause, resume, be refined, or become a standing seek.

The lifecycle records history; correction does not erase prior states.

## 5. Intent before category

The user does not need to identify a domain category before creating a seek.

SPOTIST interprets natural-language, voice, visual, document-based or compound expressions into a provisional seek model.

The initial interpretation MAY remain uncertain.

Unknown or ambiguous intent MUST NOT be forced into an incorrect familiar category merely to satisfy implementation convenience.

## 6. Standing Seeks

A **Standing Seek** is an authorized seek that remains active after an initial discovery cycle.

A standing seek includes:

- scope;
- authorized discovery sources;
- monitoring conditions;
- notification rules;
- refresh/event triggers;
- privacy/security constraints;
- expiry or review period;
- authority boundaries;
- evidence thresholds.

Examples include:

> Keep looking for this vehicle.

> Alert me when this rare book appears.

> Watch for a suitable property.

> Notify me when someone with this capability becomes available.

A standing seek MUST be revocable and MUST not silently expand its scope.

## 7. Discovery Source Fabric

SPOTIST is a discovery capability, not a single search provider.

The Discovery Source Fabric may federate authorized sources such as:

- ecosystem registries and records;
- public web resources;
- structured databases;
- marketplaces;
- public registries;
- archives and libraries;
- partner systems;
- providers and businesses;
- participant-contributed data;
- agents;
- sensors/signals where lawfully available;
- future source types.

Each source SHOULD expose provenance and operational metadata such as:

```text
source_id
source_type
authority
access_scope
freshness
geographic_scope
coverage
cost
terms
reliability
provenance
```

SPOTIST MUST NOT imply that unsearched sources were searched.

## 8. Result semantics

A SPOTIST result is a representation of a discovery, claim, lead, match, evidence item, or relationship—not automatically the underlying real-world truth, ownership, identity, permission, availability or entitlement.

Canonical result states include:

- exact match;
- strong match;
- possible match;
- alternative;
- substitute;
- lead;
- unverified lead;
- evidence-backed finding;
- conflicting finding;
- historical finding;
- inferred relationship;
- unresolved.

Every material result SHOULD be traceable to sources, timestamps and evidence where available.

## 9. Evidence and verification

Discovery MUST remain distinct from verification.

SPOTIST SHOULD preserve:

```text
observation
→ source
→ claim
→ evidence
→ corroboration
→ verification status
→ contradiction
→ correction/history
```

A generated or inferred answer cannot become verified merely because it was generated confidently.

## 10. Match semantics

A match is contextual.

SPOTIST MAY compare:

- exactness;
- compatibility;
- constraints;
- geography;
- timing;
- availability;
- cost/value where relevant;
- quality;
- evidence strength;
- provenance;
- reliability;
- risk;
- user preferences.

Match explanations SHOULD identify the principal relevance factors rather than exposing opaque scores as if they were objective truth.

Paid placement MUST NOT silently masquerade as relevance.

## 11. Seeker / holder / provider network

SPOTIST operates bidirectionally.

```text
SEEKER → seeks X

HOLDER / PROVIDER / EXPERT / OPPORTUNITY → exposes X

SPOTIST → discovers and connects compatible sides
```

This allows:

- people seeking capabilities;
- people offering capabilities;
- organizations seeking suppliers;
- suppliers offering supply;
- owners exposing resources;
- people seeking rare items;
- holders exposing rare items;
- opportunity seekers and opportunity holders.

SPOTIST does not automatically become the transaction owner merely because it connects the parties.

## 12. Compound seeks and missions

A complex seek may become a mission composed of related seeks.

```text
MISSION
  ├── SEEK A
  ├── SEEK B
  ├── SEEK C
  └── SEEK D
          ↓
compatibility / dependency analysis
          ↓
assembly
          ↓
ABBA or another authorized orchestrator
```

SPOTIST discovers and composes candidate components. ABBA remains the general ecosystem intelligence/orchestration layer.

## 13. Outcome semantics

SPOTIST MUST distinguish between:

- found;
- provisionally found;
- verified;
- connected;
- accepted by seeker;
- acted upon;
- completed;
- failed;
- unresolved;
- expired.

Finding something does not imply that the user accepted it or that an action occurred.

## 14. No-result semantics

SPOTIST MUST NOT collapse all unsuccessful discovery into `not found`.

Canonical unresolved states SHOULD include:

- no result in searched sources;
- no exact result, alternatives found;
- possible leads only;
- insufficient information;
- insufficient source coverage;
- source inaccessible;
- verification unavailable;
- authority/privacy restriction;
- seek expired;
- genuinely unresolved.

## 15. Tailoring and personalization

SPOTIST MAY tailor a seek from authorized context including:

- explicit preferences;
- prior accepts/rejects;
- saved seeks;
- recurring patterns;
- geography;
- mobility;
- budget/economic boundaries;
- timing;
- accessibility requirements;
- relevant capabilities and relationships.

Personalization MUST be discoverable, controllable and bounded by permission and privacy rules.

Personalized relevance MUST NOT silently become an irreversible assumption about the user.

## 16. Unknown and open-world operation

SPOTIST must remain compatible with the OMNII unknown-first model.

A new category of seek may first be represented as:

```text
unknown / provisional seek
→ evidence
→ candidate interpretation
→ relationship discovery
→ governed classification
```

SPOTIST MUST NOT force all future seeks into today's taxonomy.

## 17. Sensitive and human-related seeking

People-related seeks require context-sensitive authority.

Examples may include lawful discovery of:

- experts;
- performers;
- service providers;
- family relationships;
- missing property connections;
- genealogical leads;
- other legitimate people-related objectives.

SPOTIST MUST NOT provide unrestricted surveillance, stalking, doxxing, unauthorized private-record access or unauthorized disclosure infrastructure.

Sensitive seeks use appropriate identity, privacy, safeguarding, evidence, consent and authority mechanisms.

## 18. Economic boundary

SPOTIST MAY discover economic opportunities, offers, suppliers, production capacity, procurement paths and other trade-related objects.

The relevant economic domain remains responsible for its own semantics.

For example:

```text
SPOTIST → discovers opportunity / supply / match
OMNI   → economic participation / trade / markets / investment
I/O    → applicable value circulation / ledger / settlement
```

SPOTIST does not create a competing economic constitution or ledger.

## 19. Authority boundary

SPOTIST discovery does not grant authority.

Consequential action must use the applicable authority, consent, policy, safeguarding, security, legal and governance mechanisms.

Examples include:

- financial commitment;
- binding agreements;
- sensitive disclosure;
- regulated services;
- physical intervention;
- movement of value;
- consequential communications;
- access to private records.

## 20. Commercial integrity

The discovery layer must preserve trust.

The following are prohibited:

- paid relevance represented as organic relevance without disclosure;
- fabricated inventory;
- fabricated availability;
- fabricated reviews;
- fabricated evidence;
- invented transaction history;
- hidden conflicts of interest.

A commercial relationship must remain distinguishable from an evidence-backed relevance determination.

## 21. Product forms

SPOTIST MAY exist as:

- standalone product;
- product module;
- DESK capability;
- OMNI capability;
- API/service;
- agent capability;
- internal ecosystem service;
- workflow;
- future interface.

The standalone product does not own the canonical meaning.

## 22. Canonical ecosystem boundaries

```text
OMNII   = constitutional/runtime substrate
ABBA    = intelligence / reasoning / orchestration
SPOTIST = universal SEEK / discovery / matching / tracing
DESK    = participant workspace/dashboard surface
OMNI    = economic participation / trade / markets / investment
I/O     = value circulation / ledger / settlement
HAPI    = human identity / authority / continuity surface
```

These are compositions, not competing constitutions.

## 23. Event and provenance compatibility

Material seek events SHOULD map to the Universal Event & Interaction ontology, preserving:

- event identity;
- actors/capacities;
- authority context;
- source/evidence;
- timestamps;
- communication/disclosure context;
- state changes;
- correction/history;
- outcome.

## 24. Interoperability

SPOTIST interfaces SHOULD be capability-oriented and provider-neutral so other ecosystem products can invoke SEEK without embedding SPOTIST internals.

At minimum, future interfaces should support conceptual operations such as:

```text
createSeek
interpretSeek
refineSeek
searchSeek
qualifyResult
verifyResult
saveSeek
activateStandingSeek
pauseStandingSeek
resumeStandingSeek
cancelSeek
getSeekStatus
getSeekEvidence
getSeekHistory
handoffSeek
composeMission
```

Exact API names are implementation details unless separately canonicalized.

## 25. Conformance prohibitions

An implementation is non-conformant if it:

- defines SPOTIST only as sourcing;
- requires the user to pick a narrow category before expressing intent;
- treats search output as truth without evidence state;
- silently converts discovery into authority;
- creates a second identity/authority/economic ontology;
- hides paid ranking as organic relevance;
- erases uncertainty or historical corrections;
- collapses all no-result states into failure;
- assumes today's taxonomy is complete;
- silently expands a standing seek's scope;
- makes the product UI the constitutional source of truth.

## 26. Canonical invariant

> **SPOTIST turns a legitimate human or ecosystem intent to seek into an evidence-aware, context-sensitive, open-world discovery process, without confusing finding with truth, authority, ownership, or action.**
