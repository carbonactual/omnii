# Identity, Naming & Resolution Mesh v1

OMNII treats identity, naming, resolution, verification, correlation, proof, and authority as separate stages.

## Supported families

- **DID**: decentralized identifiers and method-specific resolution/control relationships. Method implementations are drivers, not constitutional definitions.
- **ENS**: decentralized names and resolvers, including forward/reverse records, text/content records, wildcard resolution, and DNS-linked records where supported by an adapter.
- **HNS**: decentralized, DNS-compatible naming and provable resource resolution through replaceable resolver adapters.
- **DNS**: compatibility and Internet naming rail, with DNSSEC-aware evidence when available.
- **URI/name**: generic external references retained when no stronger namespace is appropriate.

A name resolving to a record does not prove control of the referenced subject. A DID, ENS name, HNS name, DNS name, or URI does not automatically confer SEAL authority.

## Resolution sequence

`DISCOVER -> RESOLVE -> VERIFY -> CORRELATE -> PROVE -> AUTHORIZE -> INTEGRATE`

Each stage has its own result and evidence. An adapter must return uncertainty explicitly instead of upgrading an unresolved or stale result into trust.

## Correlation

Correlation is evidence-based. Matching strings, addresses, labels, or display names are insufficient on their own. The model supports `correlated`, `ambiguous`, `conflicted`, `stale`, `revoked`, and `uncorrelated` outcomes so the fabric can preserve uncertainty instead of forcing a false join.

## Adapter boundary

Each namespace is implemented through a replaceable resolver/verification driver. Drivers return the same OMNII resolution result shape and evidence references. Network access, blockchain access, wallet control, DNSSEC validation, and third-party APIs remain implementation concerns.

## Authority

`#` remains the HAPI↔AI identity relationship. SEAL remains human authority and must be separately present wherever policy requires explicit human authorization.
