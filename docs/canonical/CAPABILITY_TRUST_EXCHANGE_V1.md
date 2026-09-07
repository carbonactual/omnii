# Capability Trust Exchange v1

External capabilities are never trusted merely because they were discovered or resolved. Admission is an ordered evidence exchange.

## Admission sequence

`DISCOVER -> IMPORT -> QUARANTINE -> LICENSE -> SECURITY -> SBOM -> PROVENANCE -> SANDBOX -> CAPABILITY TEST -> PULSE TEST -> POLICY -> SEAL (when required) -> ADMIT`

The initial external state is quarantine. Each gate records evidence. Failure keeps the capability outside the admitted set; high-risk security findings can move an existing integration to degraded or revoked state.

## Trust model

Trust is a runtime state, not an identity property. A provider can remain identified while its implementation becomes degraded, stale, incompatible, revoked, or deprecated.

Recommended replaceable implementation families include OPA/Cedar-style policy evaluation, SPIFFE/SPIRE workload identity, OpenBao-compatible secret storage, Sigstore/Cosign signing, and in-toto provenance. These are adapters; OMNII does not embed a provider as constitutional truth.

## Capability identity

Capability identity is independent of provider identity. One conceptual capability may have local, remote, API, MCP, A2A, CLI, SDK, or web implementations. Selection is routed by context and evidence rather than by provider popularity.

## Continuous trust

Admission is not permanent trust. Version changes, proof failures, security events, schema incompatibility, or evidence staleness may require re-testing, degradation, revocation, or deprecation. Revoked integrations cannot silently return to active state.
