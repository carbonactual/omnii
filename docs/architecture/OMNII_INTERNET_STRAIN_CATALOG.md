# OMNII Internet Strain Catalog

This catalog is a practical inventory of recurring internet friction, failure, abuse, ambiguity, and lifecycle problems covered by the Internet Strain Coverage Law.

| Domain | Examples of strain | Canonical dimensions exercised |
|---|---|---|
| Identity & accounts | duplicate identity, account lockout, takeover, lost MFA, recovery | Identity, Authority, Trust, Continuity, Lifecycle |
| Authority & delegation | excessive grants, confused deputy, revoked access, agent delegation | Authority, Capability, Policy, Event, Liability |
| Discovery & search | stale index, dead links, opaque ranking, duplicate results | Intent, State, Evidence, Provenance, Lifecycle |
| Knowledge & content | misinformation, stale facts, manipulated media, missing context | Evidence, Provenance, Trust, Event, Lifecycle |
| Communication | spam, spoofing, delivery failure, thread fragmentation | Identity, Relationship, Event, Evidence, Trust |
| Subscriptions & recurring obligations | trials, renewals, failed billing, cancellation, proration, expiry | Intent, Policy, State, Settlement, Liability, Lifecycle |
| Updates & changes | patches, version drift, dependency updates, breaking changes, rollback | State, Dependency, Event, Evidence, Continuity |
| Security & exploitation | access control, injection, supply chain, crypto, logging, API abuse | Identity, Authority, Capability, Policy, Event, Evidence, Trust |
| AI & agents | prompt injection, tool misuse, excessive agency, poisoned context | Principal/Identity, Authority, Capability, Intent, Evidence, Liability |
| Privacy & consent | tracking, profiling, secondary use, retention, withdrawal | Identity, Policy, Evidence, Trust, Lifecycle |
| Advertising & attention | targeting, ad exposure, measurement, sponsored content, click fraud | Intent, Policy, Event, Evidence, Settlement, Liability |
| Payments & finance | failed payment, duplicate charge, refund, chargeback, reconciliation | Authority, State, Settlement, Evidence, Liability |
| Commerce & services | discovery, stock, fulfillment, return, warranty, dispute | Relationship, State, Dependency, Settlement, Liability |
| Portability & switching | export, semantics, egress, migration, vendor lock-in | Dependency, Continuity, Portability, Lifecycle |
| DNS & naming | domain renewal, transfer, DNSSEC, certificate, propagation | Identity, Authority, Dependency, Trust, Continuity |
| APIs & integrations | schema drift, auth, rate limit, retries, webhooks, replay | Capability, Policy, State, Event, Provenance |
| Files & media | malware, formats, codecs, metadata, streaming, rights | Evidence, Provenance, Dependency, Trust, Lifecycle |
| Devices & browser | compatibility, session drift, permissions, local state, offline | Identity, Capability, State, Continuity |
| Accessibility | disability barriers, cognitive load, keyboard, captions | Intent, Capability, Policy, State |
| Localization | language, timezone, units, currency, geography | Context, State, Policy, Lifecycle |
| Availability & dependencies | outages, cascading failure, quota, latency, provider failure | Dependency, State, Continuity, Event, Evidence |
| Synchronization & concurrency | stale state, race, duplicate actions, offline edits | State, Event, Provenance, Dependency |
| Human administration | forms, repeated verification, approvals, reminders, reconciliation | Intent, Relationship, State, Event, Evidence |
| Trust & reputation | reviews, certificates, reputation, revocation | Trust, Evidence, Provenance, Lifecycle |
| Legal & policy | terms changes, consent, jurisdiction, policy version | Policy, Evidence, Provenance, Lifecycle |
| Rights & digital assets | ownership, license, entitlement, inheritance, transferability | Identity, Relationship, Authority, Provenance, Lifecycle |
| Recovery & succession | lost credentials, inheritance, emergency access, provider shutdown | Authority, Evidence, Continuity, Portability, Lifecycle |
| Fraud & abuse | phishing, impersonation, scams, synthetic identities, bot abuse | Identity, Authority, Trust, Event, Liability |
| Moderation & disputes | suspension, appeals, evidence, false positives | Policy, State, Evidence, Authority, Lifecycle |
| Cost & resource strain | hidden fees, data use, compute, storage, energy, attention | Intent, Dependency, Settlement, Liability, Pulse |
| Interoperability | semantic mismatch, identity mapping, version mismatch | Relationship, Capability, Provenance, Portability |
| Audit & evidence | missing logs, retention gaps, disconnected trails | Event, Evidence, Provenance, Continuity |
| Physical/cyber-physical | IoT, sensors, vehicles, access, physical consequences | Entity, Relationship, Capability, Event, Liability |
| Institutional/public service | government, education, licensing, permits, queues | Identity, Authority, Relationship, Policy, Lifecycle |
| Lifecycle | creation, renewal, suspension, expiry, migration, destruction | State, Event, Continuity, Lifecycle |

## Required treatment

Each strain is addressed by reusing the existing universal body. A product may add domain behavior, UI, policy, or adapter logic, but it may not silently create another truth, identity, authority, ledger, continuity root, or event semantics.

The catalog is deliberately broader than the OWASP security lists. Security is one cross-cutting domain; it does not subsume subscriptions, accessibility, portability, human workflow, payment, advertising, update, or lifecycle problems.

The catalog should remain living and be expanded when newly observed internet failure modes cannot be adequately represented by the existing dimensions or when an external standard introduces a material interoperability concern.
