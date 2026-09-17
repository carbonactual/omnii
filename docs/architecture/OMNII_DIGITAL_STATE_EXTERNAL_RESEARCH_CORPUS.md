# OMNII Digital State Transparency — External Research Corpus

This register records external standards and guidance that informed the digital-state coverage. They remain references/adapters, not OMNII constitutional primitives.

## Identity and credentials

- NIST SP 800-63-4 (2025) covers identity proofing, authentication, federation, authenticators, lifecycle management, privacy and customer-experience considerations. It also adds controls concerning injection/forged media, syncable authenticators and subscriber-controlled wallets. See: https://csrc.nist.gov/pubs/sp/800/63/4/final
- W3C WebAuthn Level 3 exposes credential backup eligibility/state, discoverable credentials, hybrid transport, multiple credentials and credential-loss/key-mobility concerns. See: https://www.w3.org/TR/webauthn-3/
- W3C Credential Management describes browser credential stores, user mediation, silent versus mediated credential access, origin confusion and user control over credential storage. See: https://www.w3.org/TR/credential-management-1/
- W3C DID Core defines verification relationships, capability invocation/delegation, service endpoints, key rotation/revocation and recovery concerns. See: https://www.w3.org/TR/did-core/
- W3C Verifiable Credentials Data Model 2.0 defines issuer/holder/verifier flows and selective or unlinkable disclosure. See: https://www.w3.org/TR/vc-data-model/

## Browser and storage state

- ICO 2026 Storage and Access Technologies guidance covers cookies, tracking pixels, link decoration/navigation tracking, web storage, fingerprinting, scripts and tags across browsers, apps and connected devices.
  See: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-storage-and-access-technologies/
- W3C Permissions defines browser permission states, user choice, permission lifetimes and automatic return to default after expiry.
  See: https://www.w3.org/TR/permissions/
- W3C Service Workers defines origin-isolated CacheStorage and explicitly notes that application caches do not automatically expire or update when service-worker code changes; applications must manage cache versions and deletion.
  See: https://www.w3.org/TR/service-workers/
- Chrome's CHIPS documentation shows that cookies can be partitioned by top-level site and that storage partitioning affects cross-site state.
  See: https://developer.chrome.com/blog/new-in-chrome-114
- Chrome bounce-tracking material illustrates stateful redirects in which cookies, localStorage and IndexedDB can be accessed even when the user may not realize a tracker was visited.
  See: https://developer.chrome.com/blog/bounce-tracking-mitigations-dev-trial/

## Tracking and privacy signals

- W3C DNT documents explicit user tracking-preference expression and warns against silently treating vendor/network choice as the user's preference. It is a historical Working Group Note and should not be treated as a current universal enforcement mechanism.
  See: https://www.w3.org/TR/tracking-dnt/
- Global Privacy Control provides a standardized browser/device signal intended to communicate user privacy preferences, including requests concerning sale/share and cross-context targeted advertising.
  See: https://globalprivacycontrol.org/

## Web/application security

- OWASP Top 10:2025 includes broken access control, security misconfiguration, software supply chain failures, cryptographic failures, injection, insecure design, authentication failures, software/data integrity failures, logging/alerting failures and mishandling of exceptional conditions.
  See: https://top10.owasp.org/2025/
- OWASP API Security Top 10 covers object/property/function authorization, unrestricted resource consumption, business-flow abuse, SSRF, inventory management and unsafe API consumption.
  See: https://api-security.owasp.org/editions/2023/en/0x00-header/
- OWASP GenAI/LLM guidance identifies prompt injection, including indirect injection through external documents and web content, as a material agent risk.

## User-interface, advertising and reviews

- EU Digital Services Act materials address ad transparency, recommender-system transparency, verified sellers and dark patterns.
  See: https://digital-strategy.ec.europa.eu/en/policies/digital-services-act
- FTC's Consumer Reviews and Testimonials Rule addresses fake/false reviews, compensation conditioned on sentiment, undisclosed insider relationships and controlled review sites.
  See: https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
- FTC negative-option materials include recurring-payment and cancellation concerns and the 2026 review/implementation context around click-to-cancel requirements.
  See: https://www.ftc.gov/legal-library/browse/rules/negative-option-rule

## Architectural interpretation

The corpus demonstrates that the human's digital environment contains materially important state both above and below the conventional application data model. OMNII therefore treats hidden state, explanation, provenance, authority, user mediation, persistence, expiry, revocation and exit as cross-cutting concerns expressed through the existing universal dimensions.
