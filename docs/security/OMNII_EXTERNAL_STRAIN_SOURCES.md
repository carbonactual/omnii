# OMNII External Internet-Strain Sources

This is a provenance-bearing reference list for continuously updating ecosystem coverage. Sources are external evidence/adapters, not constitutional truth.

| Source | Current material | Mapped strain domains | Review purpose |
|---|---|---|---|
| OWASP Top 10:2025 | Broken access control, misconfiguration, supply chain, crypto, injection, insecure design, authentication, integrity, logging/alerting, exceptional conditions | Security, APIs, supply chain, AI/integrations | Threat coverage |
| OWASP API Security | API authorization, inventory, resource consumption, SSRF, unsafe API consumption and related API risks | APIs, integrations, security | API threat coverage |
| NIST SP 800-63-4 | Identity proofing, authentication, authenticator lifecycle, federation, assertions | Identity, accounts, recovery, trust | Identity lifecycle coverage |
| W3C WCAG 2.2 | Testable accessibility requirements across web content and devices | Accessibility, UX, content, device/browser | Accessibility coverage |
| IETF Agent Identity Protocol draft | Agent identity, delegation, authorization, capability scoping, auditable multi-agent workflows | AI/agents, delegation, authority | Agent security/interoperability watch |
| ICANN Transfer Policy | Holder-authorized domain transfers and transfer process requirements | DNS, naming, portability, account/ownership | Domain continuity and switching |
| ICANN Registration Data Policy | Registrar/registry data handling and transfer fields | DNS, identity, privacy, provenance | Domain data lifecycle |
| EU Data Act | Provider switching, interoperability, data/metadata needed for switching | Portability, switching, cloud dependency | Anti-lock-in coverage |
| FTC negative-option / click-to-cancel material | Recurring-payment cancellation, consent, disclosures | Subscriptions, billing, lifecycle | Subscription friction coverage |

## Operating rule

When a source materially changes, the change should be mapped to the existing canonical dimensions first. New coverage does not automatically justify a new primitive.

External-source checks should distinguish authoritative standards/rules from drafts, guidance, commentary, and enforcement material. Drafts may inform design but must not silently become constitutional requirements.
