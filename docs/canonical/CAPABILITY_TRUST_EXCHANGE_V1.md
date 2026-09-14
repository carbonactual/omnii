# Capability Trust Exchange v1

External capabilities enter quarantine. Admission is ordered evidence exchange:

`DISCOVER -> IMPORT -> QUARANTINE -> LICENSE -> SECURITY -> SBOM -> PROVENANCE -> SANDBOX -> CAPABILITY TEST -> PULSE TEST -> POLICY -> SEAL (when required) -> ADMIT`

Trust is a runtime state, not an identity property. Version changes, proof failures, security findings, schema incompatibility or stale evidence may require re-testing, degradation, revocation or deprecation.

Provider-neutral implementations may use replaceable OPA/Cedar-style policy, SPIFFE/SPIRE workload identity, OpenBao-compatible secrets, Sigstore/Cosign signing and in-toto provenance. These are implementation adapters, never constitutional truth.
