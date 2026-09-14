# Identity, Naming & Resolution Mesh v1

DID, ENS, HNS, DNS and generic URI/name systems are complementary identifier and resolution mechanisms. None automatically confers SEAL authority.

## Sequence

`DISCOVER -> RESOLVE -> VERIFY -> CORRELATE -> PROVE -> AUTHORIZE -> INTEGRATE`

Resolution, verification, correlation, proof and authorization remain separate results with their own evidence. Uncertainty is preserved through `correlated`, `ambiguous`, `conflicted`, `stale`, `revoked`, and `uncorrelated` outcomes.

DID method drivers are replaceable. ENS adapters may expose forward/reverse/text/content/wildcard/DNS-linked records. HNS remains a DNS-compatible decentralized naming rail. DNS/DNSSEC remains an Internet compatibility rail. Adapters normalize results into the same OMNII resolution contract.

A name resolving to a record does not prove control of that subject, and a verified identifier does not grant constitutional authority.
