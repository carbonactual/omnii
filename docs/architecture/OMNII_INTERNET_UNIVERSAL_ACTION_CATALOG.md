# OMNII Universal Internet Action Catalog

Status: Canonical coverage catalog (not a new primitive)

This catalog translates the observed internet into a reusable inventory of actions, checks, decisions, reviews, failures, protections, recoveries, and exits. It exists so the ecosystem does not repeatedly rediscover the same work inside individual products.

The catalog is intentionally implementation-neutral. A product, Desk surface, ABBA agent, provider adapter, API, browser integration, or physical integration may implement these actions differently, but the meaning must resolve through the existing universal body:

`Entity → Identity → Authority → Relationship → Capability → Intent → Policy → State → Event → Evidence → Provenance → Dependency → Continuity → Portability → Trust → Settlement → Liability → Lifecycle`

## 1. Universal action grammar

Every internet interaction should be representable as one or more of:

- discover, search, locate, compare, rank, filter, recommend
- identify, prove, authenticate, reauthenticate, federate, bind, unlink
- authorize, delegate, constrain, approve, deny, revoke, suspend, restore
- request, negotiate, confirm, consent, withdraw, acknowledge, attest
- create, configure, activate, use, monitor, pause, resume, change, renew
- subscribe, trial, upgrade, downgrade, prorate, cancel, refund, credit, expire
- pay, charge, settle, reconcile, dispute, chargeback, escrow, release
- send, receive, publish, share, forward, reply, react, mention, notify
- upload, download, import, export, sync, replicate, transform, migrate
- install, update, patch, rollback, uninstall, retire, deprecate, replace
- observe, watch, check, verify, validate, test, scan, assess, review
- detect, flag, classify, quarantine, block, contain, remediate, recover
- log, timestamp, evidence, prove, reconstruct, audit, report
- rate, review, endorse, challenge, appeal, moderate, resolve
- advertise, target, expose, engage, attribute, compensate, opt out
- book, schedule, dispatch, track, deliver, return, exchange, warranty
- connect, integrate, map, translate, adapt, retry, throttle, fail over
- port, switch, handoff, transfer, preserve, exit, delete, destroy

No action vocabulary here creates a new canonical object. It is a coverage and conformance inventory.

## 2. Internet-wide action domains

### Identity, account and presence
- discover account providers and identity requirements
- create account / profile / organization / household / workspace
- link and unlink accounts
- associate identifiers and aliases
- verify email, phone, domain, address, organization, device, person or attribute
- authenticate with password, passkey, hardware key, certificate, wallet or federation
- step up authentication for sensitive actions
- manage sessions, devices, tokens, recovery codes and trusted devices
- detect duplicate, stale, abandoned, synthetic or conflicting identities
- merge or separate identities only with explicit authority and evidence
- recover locked, lost, compromised or inaccessible accounts
- transfer or close accounts where provider policy permits
- record identity assurance, method, time, scope and evidence

### Authority, access and delegation
- view current permissions and grants
- request access
- grant scoped access
- delegate authority to a person, organization, service or agent
- impose time, amount, resource, geography, purpose and action limits
- require confirmation for consequential actions
- revoke, suspend and expire grants
- detect privilege drift
- detect inherited or transitive authority that exceeds the principal grant
- distinguish capability possession from authority to exercise it
- prevent confused-deputy and cross-principal actions
- reconcile provider permissions against canonical authority

### Discovery, search and knowledge
- search the open web and connected sources
- discover people, organizations, products, services, places, files and agents
- compare alternatives and terms
- identify duplicates, stale pages, dead links and superseded records
- preserve source, timestamp and retrieval evidence
- distinguish fact, assertion, advertisement, opinion, review and generated content
- track content revisions and provenance
- detect manipulated or context-stripped media
- provide citation/evidence trails
- support user-defined ranking and filtering criteria without silently converting them into authority

### Communication and collaboration
- send, receive, reply, forward, react, mention, quote and thread
- identify participants and principals
- detect spoofing, impersonation, spam and malicious attachments
- schedule and cancel messages
- route across email, chat, SMS, voice, video, social and collaboration systems
- preserve message provenance and attachments
- manage read/delivery state
- reconcile fragmented conversations
- export and migrate conversation history where supported
- retain dispute and evidence context

### Subscription, membership and recurring obligation
- discover plan, price, tax, billing cycle, usage limit and cancellation terms
- start free trial or paid subscription
- record informed consent and billing authorization
- monitor renewal date and price changes
- detect silent plan or terms changes
- renew, pause, resume, upgrade, downgrade and change billing method
- calculate or expose proration and credits
- cancel with a direct exit path
- verify cancellation actually stopped future charges
- request refund, credit or dispute
- track unused entitlements
- track expiry and post-expiry access
- preserve receipts, terms, authorization and cancellation evidence
- detect subscriptions hidden in app stores, bundles, family plans or intermediary accounts

### Commerce and services
- discover seller/provider
- compare price, availability, shipping, tax, warranty and return conditions
- create order, reservation, booking or service request
- confirm inventory and capacity
- pay, authorize and settle
- track fulfillment, dispatch and delivery
- modify or cancel order
- return, exchange, refund and reconcile
- manage warranty, guarantee and service contract
- open dispute and preserve evidence
- detect counterfeit, fraud, bait-and-switch and material mismatch
- connect physical outcome to digital record

### Payments, money and financial interaction
- add, remove and verify payment methods
- authorize one-time or recurring payment
- execute payment
- handle decline, timeout, duplicate, partial and delayed settlement
- reconcile statement against expected transaction
- detect unauthorized or anomalous transaction
- freeze or limit action under policy
- refund, reverse, credit and charge back
- manage invoices, receipts, taxes, fees and exchange rates
- support escrow and conditional release
- preserve transaction evidence and liability chain
- distinguish quoted price, authorization, capture, settlement and final reconciliation

### Advertising and attention
- identify ad/sponsored content
- record why an ad was shown when that information is available
- record targeting category and consent basis where available
- manage advertising preferences
- opt in / opt out of personalized advertising where supported
- measure exposure, interaction and conversion without silently treating engagement as consent
- distinguish organic, sponsored, affiliate and editorial content
- detect deceptive placement and dark-pattern interaction
- block or allow categories
- preserve evidence of commercial claims and resulting transactions
- account for attention as a measurable interaction/value signal without making it canonical ownership

### Privacy and personal data
- identify what data is collected
- identify purpose, recipient, retention and processing context
- consent, refuse, withdraw and reauthorize where applicable
- view, correct, export and delete data where supported
- detect secondary use and unexpected sharing
- track data lineage and downstream dependencies
- minimize data before transmission
- redact or tokenize sensitive fields
- detect overcollection and excessive exposure
- preserve privacy evidence without turning privacy metadata into a second identity system

### Software, updates and change
- inventory installed software and versions
- check update availability
- validate update source and integrity
- assess compatibility and dependencies
- preview material changes
- install, defer, schedule or reject within authority
- verify post-update health
- rollback where supported
- track end-of-support and end-of-life
- detect vulnerable or abandoned dependencies
- reconcile local version with provider version
- preserve update provenance and change evidence

### Security and resilience
- inventory assets and dependencies
- check credentials, sessions, certificates, keys and secrets
- detect suspicious login and anomalous behavior
- detect phishing, spoofing, malware, injection, SSRF, authorization failure and supply-chain risk
- scan APIs and connected services
- enforce least privilege
- rate limit and quota
- isolate risky content/tool execution
- block or quarantine
- notify and escalate
- preserve forensic evidence
- contain incident
- rotate or revoke credentials
- restore known-good state
- test recovery
- learn from incident and harden controls

### AI and agent operations
- identify agent, principal and human authority
- inspect delegated capability
- constrain tools, data, spend, destinations and side effects
- validate model/tool/provider provenance
- detect prompt injection and untrusted instructions
- isolate untrusted content from governing instructions
- validate tool arguments and outputs
- require confirmation for consequential actions
- monitor token/resource/economic consumption
- detect data/model poisoning
- detect sensitive information disclosure
- prevent unsafe output from becoming an action automatically
- record complete agent action chain
- revoke agent access immediately
- reconcile agent authority after policy or SEAL changes
- recover from agent misbehavior with evidence and liability preserved

### APIs, integrations and automation
- discover endpoint/capability
- authenticate and authorize
- negotiate schema/version
- validate request and response
- enforce object/function/property authorization
- inventory APIs and versions
- handle pagination, rate limits, quotas and backpressure
- retry idempotently
- deduplicate requests
- validate webhooks and signatures
- prevent replay
- handle timeout and partial failure
- circuit break and fail over
- map provider objects into canonical objects without semantic loss
- record provider dependency and portability status

### DNS, domains, certificates and routing
- discover registration and registrar
- verify registrant authority
- monitor expiration and renewal
- detect unauthorized transfer or nameserver changes
- inspect DNS records and dependencies
- validate DNSSEC where deployed
- monitor certificate issuance, expiry and mismatch
- track redirects and routing changes
- detect hijack, takeover and stale delegation
- preserve domain transfer evidence
- export configuration and dependency map
- execute controlled registrar/provider migration

### Files, documents, media and content rights
- upload/download/import/export
- classify file and media type
- validate content and metadata
- scan malware
- transcode/transform
- preserve original and derivative provenance
- manage sharing permissions
- manage licenses and entitlements
- stream, cache and resume
- detect missing/corrupt content
- manage version history
- watermark or attest where appropriate
- revoke access
- export rights and relationships
- recover deleted or corrupted material where possible

### Devices, browsers and local state
- discover devices
- enroll/un-enroll
- bind device to identity
- manage permissions
- manage sessions and cookies
- detect stale sessions
- synchronize state
- handle offline work
- resolve conflicts
- manage browser extensions
- detect malicious extension behavior
- manage notifications
- manage local storage and cache
- wipe or revoke lost device access
- preserve continuity when device changes

### Accessibility and human usability
- keyboard operation
- screen-reader semantics
- captions and transcripts
- audio description
- contrast and visual alternatives
- motion reduction
- focus visibility and order
- touch target and pointer support
- readable language
- error identification and recovery
- cognitive load reduction
- persistent context and undo
- localization and timezone clarity
- accessible authentication and recovery
- accessible cancellation and consent

WCAG 2.2 is treated as an external conformance reference rather than a replacement for the universal body. citeturn1search2turn1search7

### Localization and context
- language negotiation
- locale formatting
- date/time/timezone conversion
- currency conversion and display
- measurement units
- address and geography handling
- legal/jurisdiction context
- tax context
- cultural and accessibility context
- daylight-saving and calendar edge cases
- region-specific availability

### Availability, outage and dependency management
- monitor provider availability
- detect degraded service
- identify dependency chain
- calculate blast radius
- detect cascading failures
- enter degraded/offline mode
- queue work
- retry safely
- fail over
- reconcile after recovery
- verify external provider recovery
- notify affected users
- preserve events generated during outage

### Synchronization and concurrency
- detect stale state
- compare versions
- merge or reject conflicting updates
- enforce idempotency
- detect duplicate submission
- serialize consequential actions
- handle eventual consistency
- reconcile after reconnect
- preserve causal ordering
- detect replay and race conditions

### Human administration and bureaucracy
- fill forms
- reuse verified attributes with consent
- upload evidence
- request documents
- track application status
- schedule appointment
- satisfy checklist
- identify missing requirement
- remind user
- escalate delay
- reconcile submitted vs accepted information
- preserve receipt/reference number
- appeal or correct an administrative decision

### Trust, reviews and reputation
- rate service/product/provider
- write review
- receive review
- verify reviewer relationship where possible
- detect review manipulation
- identify conflicts of interest
- track provider response
- challenge inaccurate information
- appeal moderation
- preserve evidence and revision history
- separate reputation signal from canonical truth

### Terms, policy and rights
- detect terms change
- compare old and new versions
- identify materially affected rights/obligations
- record acknowledgement
- request consent where required
- decline and exit where available
- track jurisdiction
- preserve historical policy versions
- connect policy to dependent subscriptions/services
- surface deadlines

### Digital assets, ownership and entitlement
- identify asset
- determine current state and holder
- inspect license/entitlement
- transfer where permitted
- lend/share where permitted
- revoke entitlement
- inherit/succeed where supported
- preserve provenance
- distinguish possession, access, license and ownership
- detect dependency on provider-controlled accounts

### Recovery, succession, inheritance and exit
- recover account
- recover device
- recover credential
- recover data
- invoke delegated recovery
- invoke emergency authority
- succession planning
- inheritance handoff
- provider shutdown migration
- export before closure
- revoke all access
- cancel obligations
- settle outstanding value/liability
- verify deletion/destruction
- preserve legally or operationally required evidence

### Fraud, abuse, disputes and moderation
- detect fraud pattern
- challenge transaction
- report abuse
- report impersonation
- suspend risky capability
- preserve evidence
- submit appeal
- receive decision
- request human review where supported
- restore wrongly restricted access
- track repeat abuse
- prevent retaliation and evidence tampering

### Resource, cost and economic strain
- track storage, bandwidth, compute and API usage
- detect unexpected usage
- forecast cost
- enforce budget
- alert on threshold
- throttle
- stop or pause nonessential workloads
- compare provider costs
- detect hidden fees
- reconcile invoice vs actual use
- account for energy/resource consequences where observable

### Interoperability and switching
- discover export capability
- export data and metadata
- export relationships
- export authority/delegation state
- export provenance and evidence
- export obligations and liabilities
- map schemas
- validate semantic preservation
- import into destination
- test migrated state
- compare source and destination
- hand off capability
- switch provider
- verify exit completeness

EU cloud-switching and interoperability work and ICANN transfer rules reinforce the principle that portability must be operational rather than merely a file download. citeturn0search14turn0search15

### Audit, evidence and reconstruction
- record event
- timestamp
- identify actor/principal
- record authority and delegation chain
- capture intent
- record old/new state
- preserve evidence
- preserve provenance
- correlate related events
- reconstruct timeline
- detect missing event segments
- verify integrity
- produce user-readable explanation
- support dispute and audit

### Physical and cyber-physical interaction
- discover connected asset
- verify physical/digital identity binding
- authorize command
- inspect sensor data
- detect unsafe state
- command device/vehicle/access system
- verify physical outcome
- handle offline operation
- preserve safety interlocks
- reconcile physical and digital state
- assign liability for consequential action

### Institutional and public services
- identity proofing
- application
- licensing
- permit
- education enrollment
- health/service appointment
- tax/fee interaction
- benefit/entitlement
- public record lookup
- evidence submission
- queue/status tracking
- correction and appeal
- renewal and expiry
- institutional handoff

### Lifecycle closure
Every connected thing must have an explicit lifecycle path:

`discover → establish → configure → activate → use → monitor → change → renew → suspend → recover → migrate → transfer → exit → expire/destroy → preserve required evidence`

## 3. Continuous watch/check coverage

Desk and ABBA should be able to instantiate checks against any relevant state or dependency without creating a new canonical primitive.

Examples include:

- domain expires within threshold
- certificate expires within threshold
- subscription renews within threshold
- subscription price changed
- subscription unused beyond threshold
- payment method expires/fails
- new permission requested
- permission changed
- account recovery factor changed
- suspicious authentication detected
- provider terms changed
- privacy policy changed
- software update available
- software end-of-support approaching
- vulnerable dependency detected
- API schema changed
- API unavailable/degraded
- webhook failed/replayed
- data export no longer preserves relationships
- connected account locked
- dependent service unavailable
- backup stale or failed
- device missing/stale/untrusted
- agent grant expired or drifted
- agent attempted action outside authority
- agent output lacks evidence
- ad preference changed
- unexpected tracking detected
- recurring charge differs from authorization
- invoice differs from expected amount
- order delayed
- delivery state inconsistent
- warranty approaching expiry
- license approaching expiry
- content right revoked
- identity assurance degraded
- recovery path missing
- succession path missing
- critical dependency has single point of failure
- provider exit path unavailable
- evidence retention deadline approaching

Each check resolves to an existing watch/check contract and may result in `observe`, `notify`, `recommend`, `confirm`, `authorize`, `block`, or `escalate`.

## 4. Review and feedback coverage

The ecosystem must treat review as a first-class human interaction pattern without turning ratings into truth:

- product review
- service review
- provider review
- transaction review
- agent-action review
- security event review
- accessibility review
- data-use review
- policy/terms review
- subscription review
- advertisement review
- content/source review
- migration/portability review
- incident postmortem
- dispute review
- appeal review
- user correction
- provider response
- human escalation

Review output is evidence/feedback and may influence Pulse, trust or future recommendations according to policy, but it does not overwrite canonical facts.

## 5. Loophole and failure-pattern closure

The following failure patterns are explicitly prohibited from disappearing between adapters or products:

1. **Authority laundering** — possession of a credential/token is treated as authority.
2. **Identity confusion** — provider account ID is mistaken for universal identity.
3. **Delegation laundering** — an agent's delegated capability silently becomes broader authority.
4. **Provider lock-in** — proprietary storage or API state becomes the user's continuity root.
5. **Semantic export loss** — export preserves bytes but loses relationships, authority, history or obligations.
6. **Cancellation illusion** — UI reports cancellation while future billing remains active.
7. **Renewal surprise** — recurring obligation changes without an observable event/evidence trail.
8. **Update trust gap** — update executes without source/integrity/dependency validation.
9. **Silent policy mutation** — terms, privacy or permissions change without detectable state transition.
10. **Ad/consent conflation** — exposure or click is treated as consent or purchase authority.
11. **Review-to-truth conversion** — ratings become canonical facts without provenance.
12. **Agent output execution** — model output becomes action without independent validation and authority.
13. **Tool-result instruction injection** — untrusted tool/web content changes governing intent.
14. **Replay/double execution** — retry or webhook causes duplicate consequential action.
15. **Race-induced liability gap** — concurrent actions leave unclear final state or responsible principal.
16. **Recovery privilege escalation** — recovery path grants more authority than the original principal.
17. **Evidence severance** — action survives but supporting provenance is lost.
18. **Deletion without closure** — account/data disappears while subscriptions, dependencies or obligations remain.
19. **Outage amnesia** — events occurring during provider failure disappear after recovery.
20. **Dependency blindness** — a service appears healthy while a critical upstream dependency is failing.
21. **Credential sprawl** — stale keys/sessions remain active after authority changes.
22. **Notification fatigue** — repeated alerts obscure material risk and cause users to miss critical events.
23. **False completion** — workflow marks done before external state is verified.
24. **Partial migration** — some objects move while relationships/dependencies remain behind.
25. **Version ambiguity** — multiple versions are simultaneously treated as current without explicit state.
26. **Jurisdiction mismatch** — a technically valid action violates the applicable policy/legal context.
27. **Accessibility dead end** — security, cancellation, recovery or consent becomes unusable for some users.
28. **Hidden intermediary** — app store, bundle, reseller or identity provider obscures the actual obligation owner.
29. **Provider disappearance** — continuity depends on a service that can terminate without a recoverable representation.
30. **Human override opacity** — privileged manual intervention changes state without a traceable reason and authority.
31. **Economic externality blindness** — compute, storage, bandwidth, attention or resource consumption is invisible to value/liability analysis.
32. **Cross-system identifier drift** — mappings change and silently attach events to the wrong object.
33. **Stale authorization** — capability remains usable after its purpose, relationship or policy has expired.
34. **Evidence poisoning** — imported logs, reviews, documents or model context are accepted without trust/provenance assessment.
35. **Cascade amplification** — one provider failure triggers uncontrolled retries, cost, duplicate events or downstream outages.

## 6. Coverage rule

A new internet problem is not solved by adding a competing primitive. It is first mapped to the existing dimensions, event/evidence/provenance model, watch/check contract, authority model, lifecycle, continuity and portability.

A new domain is justified only if the existing body cannot express the domain's meaning without semantic loss. Any proposed extension must include:

- canonical dimension mapping
- identity/authority implications
- event/evidence requirements
- dependency implications
- continuity and portability treatment
- settlement/liability treatment where relevant
- lifecycle states
- watch/check triggers
- recovery and exit paths
- external standards/adapters
- security and abuse cases
- accessibility/human usability considerations
- testable conformance invariants

This keeps the ecosystem open, extensible and internet-native without allowing every new website, provider, protocol or product to create another competing truth system.
