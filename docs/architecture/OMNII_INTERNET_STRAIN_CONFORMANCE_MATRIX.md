# OMNII Internet Strain Conformance Matrix

| Coverage requirement | Existing primitive/boundary | Required behavior | Evidence/check |
|---|---|---|---|
| Identity survives provider/account changes | `# / HASH`, Identity | Preserve canonical identity independently from provider credentials | identity continuity check |
| Human authority remains explicit | `SEAL`, Authority | Scope, delegate, expire, revoke | authority-chain check |
| Canonical state is reconstructable | Canonical Object/State | Record material transitions | state/event reconciliation |
| Material change is attributable | `EVENT / TRACEABILITY` | Preserve actor, principal, authority, intent, context, result | event completeness check |
| Evidence survives integration | Evidence/Provenance | Carry material lineage across providers | provenance continuity check |
| Provider failure is survivable | `VAULT`, `ASH`, `PHOENIX` | Preserve verified state and recovery path | continuity drill |
| Current reality is exposed | `ACTUAL / ATLAS` | Separate operational reality from canonical truth | projection consistency check |
| Boundary crossing is governed | `I/O` | Constrain transfers, settlement, handoff | boundary/policy check |
| Subscriptions are cancellable and observable | Intent, Policy, State, Settlement, Lifecycle | Track trial, renewal, charge, pause, change, cancel, refund, expiry | subscription lifecycle test |
| Updates cannot silently alter authority/state | State, Event, Dependency | Detect version/config/dependency changes | update-impact check |
| Ads remain attributable interactions | Event, Evidence, Policy, Settlement | Record exposure/engagement semantics and consent context | ad event policy check |
| External APIs remain untrusted | Capability, Policy, Provenance | Validate auth, schema, source, replay, rate, output | integration security test |
| Agent actions remain bounded | Identity, SEAL/Authority, Capability, Intent, Event | Preserve principal and delegation chain | agent authorization test |
| Portability includes semantics | Portability, Dependency, Provenance | Export relationships, authority, state, evidence, dependencies where applicable | migration round-trip test |
| Accessibility is a system property | Capability, Policy, State | Conform to applicable WCAG requirements and preserve content semantics | automated + human accessibility tests |
| Recovery cannot escalate privilege | Authority, Evidence, Event | Recovery path is explicit and auditable | recovery escalation test |
| Dependencies are visible | Dependency | Record provider/protocol/resource relationships | dependency graph integrity check |
| Trust can expire/revoke | Trust, Lifecycle | Carry source, scope, time, evidence, status | trust freshness check |
| Liability does not disappear across hops | Liability, Relationship, Event | Preserve responsibility chain through integrations | liability-chain reconciliation |
| Human attention is controlled | Policy, Intent, Lifecycle | Classify silent notice vs alert vs confirmation vs block/escalation | notification policy test |
| Security failures are bounded | Security law, Authority, Capability, Policy | prevent → validate → minimize privilege → isolate → detect → contain → preserve evidence → recover → learn → harden | security regression suite |

## Conformance rule

A product conforms only when it consumes the common-layer semantics instead of implementing isolated substitutes. Passing a provider-specific checklist does not establish ecosystem conformance by itself.

## Continuous review

Conformance review must include ordinary successful paths, provider failure, stale state, partial failure, unauthorized activity, recovery, migration, cancellation, expiration, and cross-provider handoff—not only the happy path.
