# UNIVERSAL NAMING & RESOLUTION

**Status: CANONICAL CONSTITUTIONAL CONTRACT**

## Purpose

OMNII separates **identity**, **name**, **namespace**, **resolution**, **control**, **authority**, and **representation**.

A name is a human/machine-facing handle. A namespace defines the rules under which names are interpreted. A resolver maps a name to one or more identifiers, records, services or proofs. Resolution does not by itself establish identity, ownership, authority or truth.

## Canonical distinctions

```text
Name ≠ Identity
Namespace ≠ Identity System
Resolution ≠ Authentication
Resolution ≠ Authorization
Control ≠ Ownership
Ownership ≠ Custody
Name ≠ Authority
Address ≠ Person
Identifier ≠ Entity Reality
```

## Resolution Providers

OMNII may integrate multiple naming/resolution systems, including:

- DNS
- ENS
- Handshake / HNS
- DIDs and DID methods
- Verifiable credential/status resolvers
- enterprise namespaces
- local/community namespaces
- device/asset namespaces
- future decentralized or interspecies naming systems

ENS is a distributed, open and extensible naming system that can map human-readable names to addresses, other addresses, content hashes and metadata, and supports forward and reverse resolution. citeturn261174search1turn261174search4

Handshake is a decentralized naming protocol focused on managing a decentralized DNS root/TLD zone; it is designed to replace the root zone rather than DNS itself. citeturn747276search0turn747276search1

W3C DIDs provide decentralized identifiers for people, organizations, things, abstract entities and other subjects, with resolvable DID documents containing verification methods and services. citeturn261174search0turn261174search2

## OMNII Name Object

Every name record may contain:

```text
name
namespace
method
subject_id
resolution_target
resolver
forward_resolution
reverse_resolution
records
verification_methods
services
controller
manager
owner_reference
custodian_reference
jurisdiction
valid_from
valid_to
status
provenance
confidence
privacy_policy
```

## Forward and reverse resolution

OMNII supports both:

```text
Name → Subject / Identifier / Resource
Subject / Identifier → Primary / Associated Name
```

Reverse resolution must not imply that the name is the legal or canonical identity unless the applicable identity and authority contracts establish that fact.

ENS demonstrates this two-way pattern through forward name-to-address and reverse address-to-name relationships. citeturn261174search3turn261174search7

## Subnames and hierarchical naming

Names may form hierarchical structures:

```text
root
  ↓
namespace
  ↓
parent
  ↓
subname
  ↓
instance / service / role / location
```

Hierarchy may represent ownership, delegation, organizational structure, service discovery, territorial structure or contextual addressing. It must not be assumed to represent legal ownership unless explicitly defined.

ENS supports hierarchical subnames; Handshake has proposals for verifiable decentralized subdomains and external namespace resolution. citeturn261174search14turn747276search2turn747276search3

## Resolution failure and ambiguity

The ecosystem must represent:

- unresolved
- multiple resolutions
- stale resolution
- revoked resolution
- expired resolution
- conflicting resolution
- compromised controller
- namespace outage
- resolver outage
- censored resolution
- malicious resolution
- intentionally private resolution
- unknown namespace

A failed resolver must not delete or mutate the underlying OMNII identity.

## Namespaces as capabilities

Namespaces may expose capabilities such as:

```text
naming
addressing
service discovery
identity discovery
credential discovery
content discovery
payment routing
communication routing
human-readable addressing
machine routing
proof discovery
```

The namespace remains an implementation/integration capability under the OMNII Integration kernel.

## Privacy and safety

A name may be public while the underlying identity, location, credentials or resources remain protected. Reverse resolution should be policy-aware and consent-aware.

## Open-world requirement

OMNII MUST support namespaces not yet known to the system. New naming systems are registered as adapters with their syntax, resolution method, trust model, proof model, update semantics and authority boundary.
