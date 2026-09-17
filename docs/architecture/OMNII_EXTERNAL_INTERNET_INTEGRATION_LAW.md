# OMNII External Internet Integration Law

The ecosystem intentionally integrates with the ordinary internet while refusing to treat ordinary internet boundaries as constitutional boundaries.

## Provider / protocol rule

External systems are adapters, transports, authorities or evidence sources according to their role. They are not automatically canonical truth.

Supported integration families include, where useful:

- DNS / DNSSEC and domain registries;
- TLS / PKI / certificate systems;
- WebAuthn / passkeys / authenticators;
- OAuth and delegated API authorization;
- DIDs / Verifiable Credentials and related trust systems;
- ENS / HNS and other naming layers;
- HTTP APIs, webhooks and event streams;
- MCP / A2A and agent/tool protocols;
- Git repositories and software supply-chain systems;
- cloud, hosting, databases and observability providers;
- payment, banking, settlement and financial networks;
- messaging, media and social systems;
- government/institutional registries;
- physical devices, sensors and infrastructure.

## Adapter contract

An adapter must declare:

`provider, protocol, external_identity, capability, authority_required, data_exchanged, evidence, events, dependencies, failure_behavior, replacement, exit, rate/cost limits, provenance`.

An adapter may translate provider semantics but may not silently change canonical meaning.

## Account boundary rule

A provider account is an access/control surface, not the canonical identity of the represented person, organization, asset, service or relationship.

## State reconciliation rule

Provider-reported state is source material. Canonical state is established by reconciliation under the applicable authority, provenance, evidence and policy rules.

## Failure rule

Timeout, outage, lock, suspension, credential loss, quota exhaustion, provider policy action or dependency failure must not be misreported as canonical deletion or successful completion.

## Exit rule

Where a provider relationship is replaceable, the adapter must expose the portable semantic state required for a lawful handoff or migration rather than only a vendor-specific export.

## Integration principle

The ecosystem therefore remains compatible with the normal internet while operating above it:

`ordinary protocol/provider → adapter → canonical object/event/authority/state → ecosystem composition`
