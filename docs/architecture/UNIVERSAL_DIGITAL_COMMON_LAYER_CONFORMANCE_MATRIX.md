# Universal Digital Common Layer Conformance Matrix

| Canonical concern | Constitutional law | Schema / contract | Runtime proof | Desk consumption | External integration |
|---|---|---|---|---|---|
| Identity | `CANON.md` §14.1 | canonical object `identity` | canonical identity validation | participant/object reference | maps provider IDs/aliases |
| Authority | §14.1–14.3 | `authority`, delegation chain | authority/conformance validators | consequential action gate | OAuth/WebAuthn/DID/VC/etc. adapters |
| Capability | §14.4 | capability references | capability registry/conformance | consumes registered capabilities | API/MCP/A2A/provider capabilities |
| Intent | §14.5 | `intent` | intent/command distinction checks | workflow intent | maps user/API intent into canonical context |
| State | §14.6 | `state`, `lifecycle` | state transition checks | transaction/workflow state | translates provider state |
| Event | §14.7 | Universal Event | event reconstruction | material Desk transitions | provider events as evidence |
| Evidence | §14.7 | `evidence` | evidence presence/lineage | transaction evidence | signed/provider evidence |
| Provenance | §14.8 | `provenance` | lineage checks | source/provider provenance | adapter source mapping |
| Dependency | §14.9 | `dependencies` | dependency conformance | continuity view | cloud/DNS/payment/API/provider graphs |
| Continuity | §14.10 | `continuity` | recovery/last-known-good checks | recovery/handoff | failover/provider replacement |
| Portability | §14.11, §14.15 | `portability`, lifecycle exit | export/exit conformance | Desk handoff/export | provider migration |
| Trust | §14.13 | `trust` | evidence/status checks | trust context | PKI/DNSSEC/VC/attestations |
| Settlement | §14.14 | `settlement` | reconciliation checks | exchange/finance workflows | payment/ledger rails |
| Liability | §14.14, §14.16 | `liability` + event principal | delegation/liability chain | accountable transaction | agent/payment/provider chain |
| Lifecycle | §14.6, §14.15 | `lifecycle` | lifecycle invariants | offer/order/service state | provider object lifecycle mapping |
| Provider neutrality | §14.12, §14.17 | Integration Adapter contract | adapter/conformance checks | provider adapters only | ordinary internet remains usable |

The matrix is an anti-duplication contract: a new product implementation must attach to an existing row or demonstrate a constitutional amendment is required.
