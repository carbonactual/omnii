# Protocol Selection Router v1

A capability is a conceptual object; protocols are interchangeable rails for reaching an implementation.

## Default preference

| Operating intent | Preferred protocol |
|---|---|
| deterministic | CLI |
| structured-tool-data | MCP |
| agent-delegation | A2A |
| direct-service | API |
| embedded-performance | SDK |
| browser-external-world | WEB |
| private-edge | LOCAL |

These are defaults, not authority. The router ranks safe candidates using capability fit, authority satisfaction, privacy, availability, trust, value, latency, cost, data-boundary compatibility, and jurisdiction.

## Safety rule

Unsafe, unauthorized, or materially incompatible candidates are removed before ranking. When no safe route remains, the decision is `no-safe-route`; the router must not silently fall back to an unsafe or merely popular provider.

## Replaceability

A single capability may expose several implementations through different protocols. Products consume the capability and route decision rather than binding constitutional semantics to MCP, A2A, an API vendor, a model provider, or any other single rail.

## Stateless default

Protocol adapters should be stateless by default. Streaming, durable workflows, local execution, and provider-specific state are explicit implementation capabilities rather than hidden assumptions in the universal contract.
