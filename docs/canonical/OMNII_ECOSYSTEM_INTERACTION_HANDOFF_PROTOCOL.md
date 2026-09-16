# OMNII Ecosystem Interaction & Handoff Protocol

**Status:** CANONICAL CAPABILITY SCOPE  
**Scope:** Internal ecosystem operation + controlled interaction with the external world  
**Parent:** OMNII ecosystem / Communication & Presence Fabric / Universal Capability Fabric  
**Intelligence:** ABBA orchestration  

## 1. Purpose

The ecosystem must distinguish two related but different communication domains:

1. **World-facing communication** — how the ecosystem communicates with humans, organizations, governments, animals, machines, services, networks, environments and external systems.
2. **Ecosystem-internal communication** — how HAPI World, ABBA, entities, agents, products, services, registries, capabilities, environments and infrastructure coordinate internally.

The internal ecosystem is not merely another application communicating over generic channels. It has its own canonical interaction grammar, identity/authority model, routing semantics, capability contracts, event vocabulary, state transitions, provenance, handoff rules and machine-readable forms.

External protocols may be used as transports or adapters. They do not replace ecosystem-native semantics.

## 2. Core principle

**The world may speak many languages and protocols. The ecosystem must understand them, normalize them where authorized, and communicate back appropriately. Internally, the ecosystem speaks its own governed canonical forms.**

Therefore:

`WORLD FORM -> ADAPTER/INTERPRETER -> ECOSYSTEM FORM -> ABBA ORCHESTRATION -> ECOSYSTEM FORM -> ADAPTER/REPRESENTATION -> WORLD FORM`

Interoperability is not surrender of canonical meaning.

## 3. Internal ecosystem participants

The internal fabric can connect:

- Human / HAPI
- Household
- Organization / NGIN
- Individual environment / NAIRE
- RITES specialized environment
- HAPI World
- ABBA intelligence
- AI entities
- Agents
- SWIRMs
- TEAMs
- BUILD / MISSION execution contexts
- Products
- Services
- Capabilities
- Tools
- Registries
- Identity services
- Authority / Seal services
- Vault / Actual / Atlas / Index / Root / Terminal
- IO Ledger and financial capabilities
- Pulse / feedback systems
- External connectors and controlled adapters
- Machines, devices and sensors
- External organizations and institutions through governed boundaries.

## 4. Internal communication forms

Internal communication is represented through canonical machine-readable forms such as:

- command
- request
- response
- event
- signal
- intent
- proposal
- instruction
- delegation
- authorization
- consent
- challenge
- acknowledgement
- receipt
- status
- heartbeat
- presence
- discovery
- capability advertisement
- capability invocation
- result
- error
- exception
- escalation
- alert
- notification
- observation
- evidence
- fact
- assertion
- inference
- decision
- resolution
- task
- commitment
- handoff
- transfer
- cancellation
- revocation
- expiry
- reconciliation
- feedback
- value/pulse outcome.

These are semantic forms. Transport is separate.

## 5. Internal interaction grammar

Every governed interaction should be capable of carrying, as applicable:

- actor
- subject
- recipient
- role
- identity
- representation
- authority
- delegation
- consent
- intent
- capability
- action
- inputs
- constraints
- policy
- context
- correlation/session ID
- parent interaction
- timestamp
- state
- provenance
- evidence
- expected outcome
- actual outcome
- value/feedback
- retention requirements
- security/privacy classification
- next action.

The minimum required fields vary by interaction type. The ecosystem must not manufacture false certainty by filling absent information with assumptions.

## 6. Internal protocol stack

### Semantic layer
Canonical ecosystem objects, relationships, states, authority, intent, capability and outcomes.

### Interaction layer
Request/response, event, command, delegation, task, handoff, acknowledgement, escalation and feedback.

### Capability layer
Universal Capability Fabric and registry; discovery, eligibility, policy and invocation.

### Orchestration layer
ABBA routes and coordinates work across capabilities, agents, products, services and environments.

### Trust layer
Identity, Seal, authorization, delegation, provenance, signatures/attestations where required, policy and audit.

### Transport layer
MCP, A2A, APIs, RPC, webhooks, pub/sub, queues, streams, CLI, SDK, Web, local IPC, network protocols and future adapters.

Transport is replaceable; ecosystem semantics are not.

## 7. Handoff is a first-class interaction

A handoff is not merely forwarding a message.

A canonical handoff can transfer:

- responsibility
- task ownership
- context
- conversation/session state
- authority within a defined scope
- documents
- evidence
- assets where authorized
- custody
- unresolved questions
- deadlines
- dependencies
- obligations
- next actions
- human escalation responsibility.

A handoff should identify:

`FROM -> TO -> WHAT -> WHY -> AUTHORITY -> STATE -> EVIDENCE -> ACCEPTANCE -> NEXT OWNER`

A transfer is not complete merely because it was sent. Where applicable, the receiving party must acknowledge, accept, reject, partially accept, or escalate it.

## 8. Internal-to-world boundary

The ecosystem must maintain a boundary between:

`INTERNAL CANONICAL STATE`

and

`EXTERNAL REPRESENTATION`.

One internal event may be represented externally as:

- a message
- email
- SMS
- phone call
- voicemail
- notification
- document
- letter
- signed instrument
- meeting
- interview
- public statement
- diplomatic communication
- government filing
- API request
- webhook
- machine protocol
- animal-facing signal
- human-readable explanation.

Conversely, one external interaction may enter the ecosystem as a normalized canonical event, request, observation, document, relationship, task, decision or feedback signal, subject to authority and provenance.

## 9. Protocol translation

ABBA and the ecosystem fabric may translate between:

- natural languages
- sign languages
- speech and text
- speech and captions
- visual and textual forms
- structured and human-readable forms
- external API schemas and ecosystem objects
- business protocols and canonical interactions
- diplomatic/official formats and internal records
- machine protocols and capability invocations
- legacy/historical signalling and interpreted observations.

Translation must preserve uncertainty, provenance and the original representation where required.

`TRANSLATION != ORIGINAL`

`SUMMARY != SOURCE`

`INTERPRETATION != OBSERVATION`

## 10. External world interaction

World-facing interaction includes:

- people
- families
- businesses
- institutions
- governments
- regulators
- courts and administrative bodies
- schools and universities
- health and emergency systems
- diplomatic actors
- military/security systems where lawfully authorized
- financial institutions
- media
- communities
- animals and ecological systems
- devices
- software
- APIs
- networks
- sensors
- external AI systems
- public information sources.

The ecosystem adapts its representation to the recipient rather than requiring the world to adopt one Carbon Actual interface.

## 11. Interaction lifecycle

A typical ecosystem interaction can follow:

`DISCOVER -> IDENTIFY -> AUTHORIZE -> CONNECT -> NEGOTIATE -> COMMUNICATE -> ACT -> OBSERVE -> ACKNOWLEDGE -> HANDOFF/ESCALATE -> COMPLETE -> FEEDBACK -> RECORD -> CONTINUE`

Not every interaction requires every state.

## 12. Negotiation

Before invoking capabilities or transferring responsibility, systems may negotiate:

- capability
- modality
- protocol
- version
- quality
- privacy
- authority
- rate/limits
- cost/value
- accessibility
- language
- timing
- fallback
- retention.

Negotiation must not silently expand authority.

## 13. Escalation

When an interaction exceeds capability, authority, confidence, safety or policy boundaries, it can escalate:

`AGENT -> ABBA -> HUMAN -> SPECIALIST -> AUTHORIZED EXTERNAL PARTY`

Escalation preserves context and provenance while minimizing unnecessary disclosure.

## 14. Failure and fallback

Internal and external communication must account for:

- unavailable service
- incompatible protocol
- timeout
- stale data
- duplicate event
- lost event
- partial delivery
- conflicting state
- malformed payload
- revoked authority
- expired session
- unavailable human
- failed handoff
- failed acknowledgement
- translation uncertainty
- modality failure.

Fallback may change transport or modality without changing the underlying intended interaction.

## 15. Internal event continuity

An internal event may produce multiple consequences:

`EVENT -> RELATIONSHIP -> TASK -> DOCUMENT -> DECISION -> VALUE/PULSE -> MEMORY -> CURATION`

The ecosystem must avoid duplicating the same event as unrelated facts in different products.

## 16. Product boundary

Products are faces and specialized experiences, not independent communication universes.

A product may provide:

- UI
- workflow-specific presentation
- domain-specific experience
- deployment boundary
- product-specific rules.

The product should consume canonical ecosystem capabilities for:

- identity
- communication
- presence
- documents
- meetings
- tasks
- handoffs
- authority
- memory
- orchestration
- records
- notifications
- feedback
- intelligence.

## 17. Internal code and external protocols

The ecosystem's "code" is the combination of:

- canonical object vocabulary
- interaction types
- state machines
- capability contracts
- event semantics
- relationship semantics
- authority model
- routing rules
- provenance rules
- policy evaluation
- handoff semantics
- error/exception semantics
- versioning and compatibility rules.

This internal code can be serialized through many external technical formats. JSON, protobuf, HTTP, MCP, A2A, events, queues or other protocols are representations/transports, not the ecosystem's constitutional meaning.

## 18. Security and privacy

Internal communication requires least privilege, authentication, authorization, provenance, replay protection where needed, integrity protection, auditability and policy enforcement.

External communication requires purpose-bound disclosure, consent where required, selective disclosure, privacy-preserving representations and clear separation between public representation and internal identity/authority.

Incognito/pseudonymous presentation does not mean the canonical identity object ceases to exist.

## 19. Human authority

AI and agents may communicate, coordinate and prepare actions, but authority remains governed by the ecosystem's Human Authority and Seal laws.

An agent's ability to communicate does not automatically grant it authority to:

- transfer value
- sign an instrument
- publish an official statement
- disclose protected information
- accept an agreement
- alter canonical identity
- delegate authority beyond its grant.

## 20. Communication intelligence

ABBA may interpret external signals, codes, symbols, languages, protocols, documents, behavior and machine events and normalize them into canonical ecosystem forms.

Interpretation must preserve:

- original observation
- source
- provenance
- decoding/translation method
- confidence
- ambiguity
- alternative interpretations
- authorization for the interpretation.

## 21. World-to-ecosystem-to-world loop

The complete pattern is:

`WORLD OBSERVATION`
`-> COMMUNICATION/SIGNAL`
`-> INTERPRETATION`
`-> CANONICAL ECOSYSTEM EVENT`
`-> ABBA INTELLIGENCE`
`-> CAPABILITY/DECISION`
`-> AUTHORIZED ACTION`
`-> EXTERNAL REPRESENTATION`
`-> WORLD RESPONSE`
`-> FEEDBACK`
`-> ECOSYSTEM CONTINUITY`.

## 22. No competing primitives

This protocol does not create a second identity system, second memory system, second registry, second authority system, second orchestration system or second communication universe.

It binds existing canonical primitives into an interaction/handoff grammar.

## 23. Maturity

- **Canonical:** internal interaction grammar, handoff semantics, world/ecosystem boundary, authority requirements.
- **Implemented:** adapters and protocol implementations that conform to canonical contracts.
- **Emerging:** advanced multimodal translation, autonomous negotiation and richer cross-domain handoff.
- **Candidate/Experimental:** future interaction modalities and machine communication forms.
- **Future:** biological, neural and other not-yet-production mechanisms.

## 24. Architectural test

For every product, agent, service or capability ask:

> Can it correctly communicate with the ecosystem, obtain what it is authorized to obtain, hand off work without losing context or authority, return outcomes and feedback, and communicate with the outside world without creating a competing internal primitive?

If not, it is not yet conformant to the ecosystem interaction fabric.
