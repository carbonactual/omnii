# Protocol Selection Router v1

A capability is a conceptual object; protocols are interchangeable rails for reaching an implementation.

Default preference: deterministic→CLI; structured tool/data→MCP; agent delegation→A2A; direct service→API; embedded performance→SDK; browser/external world→WEB; private/edge→LOCAL.

The router ranks safe candidates using capability fit, authority satisfaction, privacy, availability, trust, value, latency, cost, data-boundary compatibility and jurisdiction. Unsafe, unauthorized or materially incompatible candidates are excluded before ranking. When none remain, the result is `no-safe-route` rather than an unsafe fallback.

Protocol adapters are stateless by default; durable workflow, streaming and provider-specific state are explicit capabilities behind replaceable boundaries.
