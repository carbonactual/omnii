# OMNII Internet Gap and Loophole Register

Status: Canonical risk/coverage register

This register turns recurring internet failures into explicit ecosystem review targets. It is a living register, not a new object model.

## Review lenses

Every internet-connected capability is reviewed through:

1. Identity — who/what is involved?
2. Authority — who may cause the action?
3. Intent — what was meant?
4. Capability — what can technically be done?
5. Policy — what constrains it?
6. State — what is true before and after?
7. Event — what happened?
8. Evidence — what proves it?
9. Provenance — where did the information/action originate?
10. Dependency — what else must remain available?
11. Trust — why should the input/provider/result be trusted?
12. Continuity — what survives failure or provider exit?
13. Portability — can meaning and state move?
14. Settlement — what was exchanged/resolved?
15. Liability — who bears consequences?
16. Lifecycle — what happens next, including closure?
17. Human usability — can a real person understand and complete it?
18. Security — what happens under adversarial conditions?

## Current gap classes

### G01 — Account fragmentation
Users accumulate isolated accounts, identifiers, credentials and recovery mechanisms. Desk must map them without replacing provider identities.

### G02 — Authority fragmentation
Provider permissions do not necessarily correspond to the user's actual intended authority. Desk must expose scope, expiry, delegation and revocation.

### G03 — Hidden recurring obligations
Subscriptions can exist across websites, app stores, bundles, cards and intermediaries. Discovery and cancellation must verify external state, not merely UI state.

### G04 — Change blindness
Software, prices, policies, permissions, domains, certificates and dependencies change continuously. Every material change must become observable state/event/evidence where detectable.

### G05 — Review unreliability
Reviews can be manipulated, stale, biased or disconnected from verified transactions. Review signals must retain provenance and uncertainty.

### G06 — Portability theater
A downloadable archive is not necessarily a portable system. Relationships, authority, provenance, obligations, history and dependencies must be considered.

### G07 — Agent authority drift
AI agents may retain credentials or capability after a human's purpose changes. SEAL/authority must be re-evaluated continuously.

### G08 — Automation without closure
Automations often execute an action but do not verify the resulting external state. Consequential automation requires postcondition verification.

### G09 — Notification overload
More monitoring can make users less safe if everything becomes an alert. Desk needs deduplication, severity, grouping, escalation and quiet-period semantics while preserving events.

### G10 — Provider dependency opacity
Users rarely know which accounts, domains, services, payment methods and identity providers depend on one another. Dependency mapping must be reconstructable.

### G11 — Recovery asymmetry
The easiest recovery path can be weaker or broader than the original authentication path. Recovery must have explicit authority, assurance, evidence and scope.

### G12 — Data lineage loss
Copies and exports often lose origin, transformations, permissions and downstream dependencies. Provenance must survive supported transformations.

### G13 — Transaction ambiguity
Authorization, capture, settlement, refund and final reconciliation are frequently treated as one event. They must remain distinguishable.

### G14 — Concurrency and replay
Retries, webhooks, duplicate submissions and race conditions can produce multiple real-world effects from one intent. Idempotency and causal evidence are required.

### G15 — Offline divergence
Devices can act without connectivity. Reconnection must reconcile local state with authoritative state and preserve conflicts rather than silently overwriting them.

### G16 — Accessibility dead ends
Authentication, cancellation, consent, recovery and security controls can be inaccessible even when the main interface is accessible. Critical journeys must be tested end-to-end.

### G17 — Dark-pattern friction
Signup, consent, payment and cancellation flows can manipulate user choices. Desk should surface material friction and provide transparent state rather than reproduce manipulative interaction patterns.

### G18 — Search/recommendation opacity
Ranking can determine what users see without exposing provenance or user-controlled criteria. Recommendations must remain distinguishable from verified facts.

### G19 — Security boundary mismatch
Browser, API, cloud, agent and provider boundaries may have different assumptions. External input remains untrusted until validated against the relevant authority and policy.

### G20 — Supply-chain transitivity
A trusted application may depend on untrusted or compromised packages, models, plugins, tools, domains or providers. Dependency provenance and version state must be visible.

### G21 — AI context poisoning
Untrusted documents, websites, tool responses and messages can contain instructions. Content must not silently become governing authority.

### G22 — Unsafe output handling
Generated text, code, URLs, commands, structured arguments or decisions may be malformed or malicious. Output must be treated as data until independently validated.

### G23 — Privacy secondary-use drift
Data collected for one purpose can be reused for another. Purpose, consent, sharing and retention state must remain observable where technically/legal context permits.

### G24 — Ad attribution ambiguity
Exposure, click, conversion and purchase are different events. The ecosystem must not collapse them into a single claim of user intent.

### G25 — Domain/control-plane fragility
Domains, DNS, certificates, registrars and routing form a critical dependency chain. Desk must monitor renewal, transfer, DNS, certificate and routing state.

### G26 — Provider exit failure
A provider may offer export but not migration, or migration but not semantic continuity. Exit readiness must be assessed before failure.

### G27 — Policy-version drift
A user may have accepted version N while provider operates version N+1. Historical policy and acknowledgement must remain reconstructable.

### G28 — Human escalation gap
Automated systems can dead-end disputes and appeals. Human escalation is an explicit capability where available and must be tracked as part of lifecycle state.

### G29 — Evidence expiration
Logs, receipts, screenshots, emails and provider records may expire. Important evidence should be preserved or referenced before the retention boundary where lawful and authorized.

### G30 — Destructive-action ambiguity
Deletion, cancellation, revocation, shutdown and transfer can have irreversible consequences. High-impact actions require explicit scope, confirmation policy, evidence and postcondition checks.

### G31 — Cross-provider semantic mismatch
Equivalent labels can mean different things across providers. Adapters must map semantics explicitly and preserve unmapped provider-specific information.

### G32 — Resource/economic abuse
Unlimited retries, storage, compute, messaging or agent actions can cause financial and availability harm. Budget, rate, quota and liability controls are required.

### G33 — Cascading failure
An outage in one provider can cause retries and failures elsewhere. Dependency-aware circuit breaking, queueing, backoff and reconciliation are required.

### G34 — False health
A local check can say "healthy" while an external dependency is broken. Health must include dependency and user-impact context.

### G35 — Stale capability
A technically available tool may no longer be appropriate because policy, purpose, trust, cost or authority changed. Capability must be re-evaluated at execution time for consequential actions.

### G36 — Invisible manual intervention
Support/admin intervention can change state without appearing in ordinary user history. Privileged changes require traceable principal, authority, reason and evidence where the provider exposes it.

### G37 — Lifecycle orphaning
Closing an account can leave domains, subscriptions, payment methods, agents, files, licenses or obligations behind. Closure requires dependency reconciliation.

### G38 — Recovery orphaning
A user may recover an account but lose access to downstream services because recovery factors were not propagated. Recovery dependencies must be visible.

### G39 — Consent fatigue
Repeated consent dialogs can train users to approve without understanding. The ecosystem should expose durable policy state and material changes instead of maximizing prompt frequency.

### G40 — Notification-to-action confusion
A notification is not authorization. Alerting must never silently convert into execution.

## External standards and review sources

The register is informed by current external guidance including NIST SP 800-63-4 for identity proofing/authentication/federation and recovery; NIST CSF 2.0 for Govern/Identify/Protect/Detect/Respond/Recover; OWASP API security risks; OWASP GenAI/LLM risks; WCAG 2.2; ICANN transfer policy; and consumer recurring-payment/cancellation guidance. citeturn0search0turn0search16turn1search1turn0search3turn0search17turn1search2turn0search14turn0search13

These sources are references, not constitutional authorities. Their applicable concepts are mapped into OMNII dimensions and provider adapters.

## Review cadence

Coverage review should occur when:

- a new internet protocol or major platform capability appears;
- a new recurring failure mode is observed;
- a security standard changes materially;
- a provider introduces a new account, permission, billing, API or export behavior;
- Desk discovers an unmapped dependency;
- an incident exposes a missing event/evidence/provenance link;
- portability testing reveals semantic loss;
- user feedback exposes a workflow dead end;
- a new AI/agent capability introduces a previously unbounded side effect.

The expected response is to extend the catalog, mappings, tests or adapters before inventing a competing primitive.
