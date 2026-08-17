# Carbon Actual Integration Contract

**Status:** Canonical kernel contract

Integration is a constitutional value. Carbon Actual should integrate existing capability wherever doing so is safer, faster, more open, more economical or more useful than rebuilding it.

## Adapter principle

External providers are adapters, not constitutional dependencies.

```text
Carbon Actual Capability Contract
          ↓
     Integration Adapter
          ↓
External API / SDK / MCP / Agent / Blockchain / Ledger / Hardware / Service
```

## Adapter requirements

Every adapter declares:

- provider identity
- protocol
- capability mappings
- authentication method
- permissions requested
- data read
- data written
- data retained
- rate limits
- costs
- failure modes
- provenance behavior
- security requirements
- privacy behavior
- portability/export behavior
- replacement alternatives

## Open-first integration preference

When appropriate, evaluate:

- open source
- free/open alternatives
- open standards
- white-label options
- decentralized protocols
- self-hosted options
- replaceable commercial services
- SDKs and APIs

This is a preference, not a blind rule. Security, reliability, legal requirements, performance and total cost remain part of evaluation.

## Identity interoperability

Identity integrations may include decentralized identifiers, naming systems, domain systems, credentials and conventional account systems. They must map into the Carbon Actual identity/authority model without making an external provider the source of constitutional authority.

## Data minimization

Adapters exchange the minimum data required for the capability. External access does not imply access to Root, Vault or private HASH information.

## Failure and replacement

An adapter failure must not corrupt the canonical object model. Capability-level fallback can select another Swarm member where policy permits.

## Provenance

Imported facts, external actions and provider responses must remain distinguishable from native Carbon Actual observations.

## Physical integration

The same contract applies to vehicles, machines, buildings, IoT devices, robots, human service providers and physical infrastructure. Physical adapters must include safety and authority constraints.

## Integration registry

Every adapter is registered with its capability mappings, status, versions and alternatives. Provider changes should therefore be migrations of adapters rather than rewrites of products.
