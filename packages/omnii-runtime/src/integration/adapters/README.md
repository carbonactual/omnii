# Interoperability adapter boundary

This directory contains replaceable implementations of the OMNII integration contracts.

Resolver adapters:

- DID: method-driver based; no single DID method is constitutional.
- ENS: name/resolver records are returned as untrusted resolution evidence until verified.
- HNS: DNS-compatible decentralized naming is represented through the same resolver result.
- DNS: ordinary and DNSSEC-aware resolution can share the adapter contract.

Protocol adapters:

- MCP
- A2A
- API
- SDK
- CLI
- WEB
- LOCAL

Adapters normalize external behavior into OMNII contracts. They do not grant authority, mutate `#` identity semantics, or decide Index membership.

Production implementations may use free/open-source, self-hosted, or open-standard components. Commercial hosted services remain optional adapters.
