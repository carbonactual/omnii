# Integration-First Universal Interoperability Fabric v1

## Constitutional role

Integration is a first-class OMNII capability. OMNII defines the universal contracts and invariants for connecting identities, names, capabilities, protocols, providers, agents, services, data sources, devices, and external systems. External systems remain independently governed and cannot redefine OMNII semantics or human authority.

The implementation boundary is `packages/omnii-runtime/src/integration/`.

## Non-conflations

- `#` is the HAPI↔AI identity bridge; it is not authority.
- SEAL is explicit, scoped, revocable, attributable, and auditable human authority.
- Resolution does not grant trust.
- Verification does not grant authority.
- Provider identity does not define capability identity.
- MCP, A2A, API, SDK, CLI, WEB, and LOCAL are replaceable execution rails.
- `MINT != TOKENIZE`.
- `MINT -> TERMINAL`.
- `TOKENIZE -> INDEX`.

## Integration lifecycle

An integration is a governed relationship between a source and target. The lifecycle is:

`DISCOVERED -> IMPORTED -> QUARANTINED -> TESTING -> ADMITTED -> ACTIVE`

with explicit `DEGRADED`, `REVOKED`, and `DEPRECATED` states. Revocation cannot silently return to active status.

## Identity and naming

DID, ENS, HNS, DNS, and generic URI/name systems are complementary identifiers and resolution mechanisms. They are never treated as interchangeable identity or authority systems merely because they resolve to related records.

Required sequence:

`DISCOVER -> RESOLVE -> VERIFY -> CORRELATE -> PROVE -> AUTHORIZE -> INTEGRATE`

`RESOLVE -> TRUST` is prohibited.

## Capability fabric

A capability has a provider-independent `capabilityId` and may expose multiple implementations. Implementations may differ by provider, protocol, version, jurisdiction, data boundary, quality, latency, cost/value, and trust status.

External capabilities begin in quarantine and pass evidence-backed license, security, SBOM, provenance, sandbox, capability, Pulse, policy, and—when required—SEAL gates before admission.

## Routing

Default protocol preference is:

| Intent | Preferred rail |
|---|---|
| Deterministic | CLI |
| Structured tool/data | MCP |
| Agent delegation | A2A |
| Direct service | API |
| Embedded performance | SDK |
| Browser/external world | WEB |
| Private/edge | LOCAL |

The router may override defaults using authority, privacy, availability, trust, value, latency, cost, data boundary, and jurisdiction. Unsafe candidates are excluded and `no-safe-route` is a valid result.

## Accountability

Integration outcomes are normalized into Proof/evidence and Pulse feedback. Meaningful feedback is minted and routed to Terminal. Minting does not itself tokenize the result or grant Index membership. Failed integrations remain accountable and may stop at Terminal.

Consumed value remains visible to the existing accounting/settlement/ASH lifecycle rather than disappearing because execution failed.

## Provider neutrality and free/open core

The constitutional layer does not require a commercial hosted provider. Open standards, self-hostable software, and replaceable adapters are preferred. Commercial services may exist only as optional adapters with equivalent replacement contracts.

## Durability

The fabric is stateless by default. Durable workflows, registries, event buses, secret stores, workload identity, policy engines, and observability systems are implementations behind replaceable interfaces.

## Safety

Phoenix is limited to defensive containment and recovery. Integration logic may revoke credentials, quarantine data, disable an adapter, block a route, preserve evidence, notify authority, and recover. It must not penetrate, sabotage, or destroy external systems.
