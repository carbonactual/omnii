# OMNII Internet Strain Coverage Law

**Status:** Canonical expansion of the Universal Digital Common Layer
**Scope:** Internet-facing and internet-mediated activity across HAPi World
**Relationship to CANON:** This document operationalizes the Universal Digital Common Layer dimensions already established by CANON.md. It does **not** introduce a new canonical object, identity, registry, ledger, root, continuity primitive, or competing internet protocol.

## 1. Purpose

The internet is not only a collection of protocols and applications. It is a fragmented operating environment in which humans, organizations, agents, services, assets, devices, providers, and real-world obligations repeatedly encounter friction, ambiguity, failure, lock-in, security exposure, opaque state, duplicated work, and broken handoffs.

OMNII shall treat those recurring failure and friction patterns as **internet strains** to be observed, represented, mitigated, evidenced, reconciled, and continuously improved through the existing canonical dimensions:

`Entity → Identity → Authority → Relationship → Capability → Intent → Policy → State → Event → Evidence → Provenance → Dependency → Continuity → Portability → Trust → Settlement → Liability → Lifecycle`

"Internet strain" is a coverage concept, not a new primitive.

## 2. Coverage Principle

For every material internet interaction, the ecosystem should be able to answer, to the degree appropriate to the interaction:

- What is involved?
- Who or what is acting?
- Who is the principal?
- What authority exists and what are its limits?
- What was intended?
- What capability or mechanism was used?
- What policy applied?
- What state existed before and after?
- What event occurred?
- What evidence supports it?
- Where did the information or object come from?
- What depends on it?
- How does the relationship continue through failure or provider replacement?
- Can the meaningful state be exported or handed off?
- What trust state applies?
- What was settled, billed, exchanged, or promised?
- Who bears liability or obligation?
- What is the lifecycle and exit path?

A lower-level technical mechanism must not be mistaken for a complete answer to these questions.

## 3. Internet Strain Domains

### 3.1 Identity and Account Strain

Cover identity fragmentation, duplicate accounts, identity proofing, authentication, federation, passkeys, MFA/2FA, recovery, account takeover, session continuity, device binding, credential loss, identity collision, pseudonymity, organizational identity, household/shared identity, agent identity, and human-to-agent continuity.

Current identity guidance recognizes identity proofing, authentication, authenticator lifecycle management, federation, assertions, security, privacy, and user experience as distinct concerns rather than one account primitive. NIST SP 800-63-4 is the current revision as of 2025. citeturn791938search0turn791938search1

### 3.2 Authority, Permission, and Delegation Strain

Cover the difference between identity, ownership, authority, permission, capability, role, consent, delegation, impersonation, recovery authority, administrator powers, service accounts, API keys, OAuth grants, agent delegation, multi-hop delegation, revocation, expiry, and emergency access.

No credential, session, account, agent, or provider assertion may silently become broader authority than the canonical policy permits.

### 3.3 Discovery, Search, and Retrieval Strain

Cover search relevance, stale results, ranking opacity, duplicate results, broken links, dead pages, inaccessible archives, crawling restrictions, robots directives, indexing delays, regional differences, personalization, query ambiguity, missing metadata, poor structured data, inaccessible content, link rot, and provenance loss during retrieval.

### 3.4 Content, Knowledge, and Information Strain

Cover misinformation, outdated information, conflicting sources, context collapse, provenance gaps, quotation/citation loss, content duplication, deepfakes, generated content, manipulated media, content authenticity, moderation decisions, appeals, age/access controls, rights restrictions, takedowns, archival preservation, and knowledge freshness.

### 3.5 Communication Strain

Cover email, messaging, notifications, spam, phishing, spoofing, delivery failures, threading, identity ambiguity, unread/unseen state, attachment compatibility, message loss, forwarding provenance, channel fragmentation, asynchronous expectations, escalation, and cross-channel continuity.

### 3.6 Subscription, Membership, License, and Recurring Obligation Strain

Cover discovery, comparison, trial periods, consent, recurring billing, renewals, failed payments, plan changes, seat changes, proration, pauses, cancellations, refunds, credits, coupons, entitlements, usage limits, renewal reminders, price changes, terms changes, expiry, grace periods, migration, and evidence.

Subscription cancellation is a recognized consumer-friction problem; the FTC's 2024 final click-to-cancel rule requires covered sellers to make cancellation as easy as enrollment and includes consent and pre-billing disclosure requirements. citeturn733753search7turn733753search6

### 3.7 Update, Patch, Version, and Change Strain

Cover operating-system updates, application updates, browser updates, model updates, data updates, security patches, dependency upgrades, breaking changes, compatibility, migrations, schema changes, certificate renewal, domain/DNS changes, deprecations, forced upgrades, rollback, release notes, maintenance windows, and change provenance.

Every consequential update should have detectable version/state transitions, dependency impact, verification, rollback or recovery information where feasible, and attributable evidence.

### 3.8 Security and Exploitation Strain

Cover broken access control, misconfiguration, software supply-chain failures, cryptographic failures, injection, insecure design, authentication failures, integrity failures, logging/alerting failures, exceptional-condition failures, API-specific authorization and resource-abuse failures, SSRF, enumeration, unsafe third-party API consumption, and agentic AI risks.

These are reflected in OWASP Top 10:2025 and the OWASP API Security project. citeturn791938search3turn791938search10

### 3.9 AI and Agent Strain

Cover prompt injection, malicious or poisoned tool inputs, excessive agency, unsafe outputs, data leakage, agent identity, principal preservation, delegated authority, capability attenuation, tool/provider substitution, multi-agent chains, agent-to-agent trust, model/tool provenance, action confirmation, agent cost/exhaustion abuse, and liability attribution.

Current IETF work includes proposals for decentralized agent identity, delegation, authorization, capability scoping, and auditable multi-agent workflows; these are treated as external standards/adapters rather than as OMNII constitutional replacements. citeturn791938search12turn791938search15

### 3.10 Privacy, Consent, and Personal-Data Strain

Cover notice, consent, purpose limitation, data minimization, secondary use, tracking, profiling, data subject requests, deletion, correction, access, portability, retention, lawful basis, privacy-preserving analytics, cross-service identity correlation, sensitive data leakage, child/age considerations, and consent withdrawal.

### 3.11 Advertising and Attention-Economy Strain

Cover ad exposure, targeting, contextual versus behavioral selection, consent/preferences, ad provenance, disclosures, misleading advertising, frequency, repetition, invasive formats, ad measurement, attribution, sponsored content, affiliate relationships, rewards, watch-to-earn/engagement mechanics, click fraud, bot traffic, invalid traffic, ad-blocking interaction, and user controls.

The ecosystem must be able to represent an ad impression or engagement as an attributable interaction without assuming that attention, a click, or a viewing event constitutes commercial consent.

### 3.12 Payments, Billing, and Financial-Interaction Strain

Cover card payments, bank transfer, wallets, mobile money, crypto, stablecoins, vouchers, credits, subscriptions, invoices, taxes, fees, exchange rates, failed payments, duplicate charges, chargebacks, refunds, escrow, settlement delays, reconciliation, payment-provider outages, fraud, sanctions/compliance checks, and transaction disputes.

Settlement remains distinct from authority and liability.

### 3.13 Commerce, Marketplace, and Service Strain

Cover product/service discovery, identity of seller/provider, availability, pricing, variants, stock, delivery promises, order state, fulfillment, returns, warranties, cancellation, disputes, reviews, counterfeit/fraud risk, marketplace dependency, platform fees, seller portability, and service handoff.

### 3.14 Portability, Switching, and Lock-In Strain

Cover data export, semantic export, metadata, configuration, dependencies, credentials, relationships, audit history, workflow state, billing state, entitlements, media rights, cloud resources, applications, provider migration, egress costs, interoperability, and operational handoff.

EU Data Act materials explicitly identify high switching charges, lengthy procedures, lack of interoperability, and loss of data/applications as barriers to cloud/data-processing-service switching. citeturn733753search9

Domain transfer policy likewise formalizes holder-authorized transfer between registrars and requires clear transfer processes, illustrating that portability is itself a governed lifecycle concern. citeturn791938search13turn791938search9

### 3.15 DNS, Domain, Naming, and Routing Strain

Cover domain registration, renewal, transfer, lock states, registrant identity, DNS configuration, DNSSEC, certificates, nameserver changes, propagation, subdomains, redirects, redirects/forwarders, registrar access, expiration, recovery, abuse, routing integrity, and domain-provider dependency.

### 3.16 API and Integration Strain

Cover API discovery, versioning, schemas, authentication, authorization, rate limits, quotas, pagination, retries, idempotency, webhooks, signature verification, replay, timeouts, partial failure, incompatible payloads, upstream changes, undocumented behavior, provider-specific extensions, and safe consumption.

### 3.17 File, Media, and Data-Format Strain

Cover uploads/downloads, storage, MIME/content validation, malware, compression, codecs, formats, transcoding, metadata, EXIF/provenance, streaming, captions, subtitles, accessibility, large objects, corruption, integrity verification, rights, DRM/provider restrictions, and media migration.

### 3.18 Device, Browser, Session, and Local-Environment Strain

Cover desktop/mobile divergence, responsive layout, browser compatibility, cookies, storage, cache, service workers, permissions, camera/microphone/location access, notifications, local state, device loss, shared devices, synchronization, offline operation, battery/data constraints, and device trust.

### 3.19 Accessibility and Human-Usability Strain

Cover visual, auditory, motor, speech, cognitive, language, learning, neurological, age-related, and situational access barriers. WCAG 2.2 is the current W3C Recommendation and is explicitly designed to apply across devices and testable success criteria. citeturn733753search0turn733753search1

### 3.20 Localization, Language, Time, Currency, and Geography Strain

Cover locale, language negotiation, translation, units, calendars, time zones, daylight changes, holidays, legal regions, currency conversion, tax jurisdiction, geofencing, travel, address formats, postal constraints, and inconsistent regional features.

### 3.21 Reliability, Availability, and Dependency Strain

Cover outages, latency, degradation, cascading failures, dependency exhaustion, DNS/provider failure, certificate expiry, cloud-region failure, queue backlog, rate limiting, quota exhaustion, storage exhaustion, third-party outage, disaster recovery, and degraded/offline modes.

### 3.22 State, Synchronization, and Concurrency Strain

Cover stale state, eventual consistency, race conditions, conflicting edits, duplicate actions, retries, replay, idempotency, offline edits, reconciliation, ordering, clock skew, session drift, and partial completion.

### 3.23 Human Workflow and Administrative Strain

Cover repetitive forms, repeated verification, copy/paste, manual reconciliation, fragmented dashboards, approval chains, reminder fatigue, status chasing, paperwork, support escalation, document requests, appointment scheduling, queue management, and proof-of-completion requirements.

### 3.24 Trust, Reputation, and Verification Strain

Cover reviews, ratings, badges, certificates, credentials, domain reputation, seller reputation, AI/model provenance, source verification, freshness, revocation, disputes, fraud signals, and confidence changes over time.

Trust is lifecycle state, not a permanent boolean.

### 3.25 Legal, Policy, and Terms-of-Service Strain

Cover changing terms, versioning, consent, notice, jurisdiction, eligibility, age, contractual obligations, policy conflicts, dispute procedures, retention, deletion, disclosure, licensing, and proof of which policy version applied at the time of action.

### 3.26 Rights, Ownership, Licensing, and Digital-Asset Strain

Cover copyright, licenses, permissions, subscriptions versus ownership, DRM, media rights, resale/transfer restrictions, NFT/tokenized representations, domain rights, account-bound rights, physical/digital linkage, inheritance, succession, and evidence of entitlement.

### 3.27 Recovery, Succession, Inheritance, and Exit Strain

Cover lost credentials, locked accounts, unavailable providers, deceased users, organizational succession, emergency access, delegated recovery, domain recovery, wallet recovery, device loss, service retirement, vendor shutdown, and migration after failure.

Recovery must be explicit authority plus evidence, never a hidden privilege-escalation path.

### 3.28 Safety, Fraud, Abuse, and Social-Engineering Strain

Cover phishing, impersonation, scams, fraudulent transactions, fake support, malicious links, social engineering, account recovery abuse, business-email compromise, bot abuse, fake reviews, synthetic identities, coordinated manipulation, and malicious automation.

### 3.29 Governance, Moderation, and Dispute Strain

Cover content moderation, marketplace disputes, account suspension, appeals, evidence submission, policy enforcement, conflict resolution, false positives, false negatives, and human escalation.

### 3.30 Cost, Resource, and Economic-Externality Strain

Cover hidden fees, data usage, bandwidth, compute consumption, storage growth, energy use, egress, transaction fees, cancellation penalties, time cost, attention cost, opportunity cost, environmental cost, and cross-provider cost transfer.

### 3.31 Interoperability and Protocol-Translation Strain

Cover semantic mismatch, schema mismatch, identity mismatch, authorization translation, capability translation, media compatibility, naming collisions, event ordering, protocol versioning, and provider-specific extensions.

External standards should be bridged rather than duplicated. OMNII preserves their semantics, provenance, and authority boundaries while mapping them into the common layer.

### 3.32 Observability, Audit, and Evidence Strain

Cover missing logs, disconnected audit trails, unverifiable timestamps, incomplete event history, lost evidence, provider-only logs, retention mismatches, inconsistent identifiers, inability to reconstruct incidents, and evidence that cannot travel with the object or relationship.

### 3.33 Environmental, Physical, and Cyber-Physical Strain

Cover IoT devices, sensors, vehicles, buildings, machines, physical access, geolocation, real-world service delivery, asset custody, maintenance, telematics, offline/online boundaries, and physical consequences of digital instructions.

### 3.34 Public-Service and Institutional Strain

Cover government portals, education, health-adjacent workflows, licensing, permits, registrations, taxes, public records, institutional identities, public procurement, service queues, citizen communications, and cross-agency handoffs.

### 3.35 Temporal and Lifecycle Strain

Cover creation, activation, use, renewal, update, suspension, expiration, migration, archival, recovery, restoration, destruction, and post-destruction evidence/obligations.

No consequential object is complete without a lifecycle model and exit behavior.

## 4. Cross-Cutting Automatic Checks

Where technically feasible and appropriate, the ecosystem should continuously detect:

- stale credentials, certificates, domains, dependencies, subscriptions, permissions, and policies;
- expiring or failed renewals;
- material version/configuration changes;
- unexpected provider behavior;
- broken links and missing references;
- dependency degradation;
- excessive privilege or authority drift;
- unusual payment or transaction activity;
- duplicate/replayed actions;
- missing event/evidence/provenance links;
- portability defects;
- broken accessibility requirements;
- contradictory state;
- unresolved obligations/liabilities;
- anomalous agent activity;
- insecure or unverified external inputs;
- suspicious account/device/session changes;
- policy/terms changes requiring human attention;
- material changes in pricing, subscription, entitlement, rights, or service availability;
- ad/engagement events that violate declared consent or policy;
- unsupported or incompatible representations;
- provider, protocol, certificate, DNS, routing, or service health failures.

Checks must generate attributable events and evidence where they materially affect state or decisions.

## 5. Human Attention Budget

The ecosystem should distinguish between:

`observe silently → notify → recommend → request confirmation → require human authorization → block → escalate`

The goal is not to create notification noise. It is to surface only the information necessary to preserve human control, safety, value, continuity, compliance, and recovery.

## 6. Security Boundary

Every external object, request, file, message, webhook, credential, tool result, provider response, media item, model output, and imported record is untrusted until the required identity, integrity, provenance, risk, authority, and policy checks succeed.

OWASP's current web-app guidance continues to emphasize broken access control, misconfiguration, software supply chain, cryptographic failures, injection, insecure design, authentication, integrity, logging/alerting, and exceptional conditions; the API project separately emphasizes API-specific authorization, inventory, resource, and unsafe-consumption risks. citeturn791938search3turn791938search10

## 7. No Absolute Security Claim

OMNII shall not claim that all vulnerabilities or exploits can be made impossible. The governing objective is to reduce attack surface and unsafe behavior, constrain authority, isolate failures, detect anomalies, preserve evidence, contain damage, recover safely, and continuously improve against newly discovered failure modes.

The security posture is:

`prevent → validate → minimize privilege → isolate → detect → contain → preserve evidence → recover → learn → harden`

## 8. No New Competing Primitive

This coverage law does not authorize creation of:

- a second identity system;
- a second authority system;
- a second continuity root;
- a second universal event system;
- a parallel ledger;
- a provider-owned canonical truth;
- a standalone "internet strain" database that becomes a competing source of truth;
- product-specific substitutes for the common layer.

Catalogs and conformance documents are reference/control artifacts. Canonical state remains represented through existing ecosystem primitives.

## 9. Living Coverage

Internet strain coverage must evolve as standards, attacks, business models, accessibility requirements, protocols, devices, AI agent patterns, laws, and real-world workflows change.

Newly observed strain must first be mapped to existing canonical dimensions. A new primitive is justified only where the existing constitutional model demonstrably cannot represent the required semantic distinction, and such a change requires constitutional governance.

## 10. Final Assertion

The body of HAPi World is intended to absorb recurring internet friction and failure rather than forcing each product to solve the same problem independently.

Products, agents, services, institutions, and human workflows are fruits of that body. They inherit its laws, security posture, evidence model, authority model, continuity, portability, dependency awareness, and lifecycle controls.
