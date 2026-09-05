# OMNII Product Runtime Binding Wave — 2026-09-05

## Scope
This wave binds four existing product implementations to canonical OMNII runtime semantics without flattening their domain behavior.

## RITES
Source: `carbonactual/RITES`

Binding:
- continuity intents map to OMNII intent semantics;
- agents are explicitly bounded operators and do not own underlying data or expand authority;
- consequential actions require an explicit authority reference and applicable consent/evidence.

Commits:
- `baa7715e9695d4251c23e7e36165b3081b166158` runtime contract
- `2bfc496a9bb66c1f7436c46f30a777b2329620d3` tests

## NOUN Student Bot
Source: `carbonactual/noun-student-bot`

Binding:
- student requests become OMNII intents;
- knowledge/course material is represented as evidence rather than authority;
- consequential outbound/campaign/official actions require explicit authority and human approval.

Commits:
- `4311797e4c398283cd38d7d93f7563eb8aa97df8` runtime contract
- `3a8881504fd4e4eb8872a04e2d1ab410551730df` tests

## Nigerian Cultural Atlas
Source: `carbonactual/nigerian-cultural-atlas`

Binding:
- cultural entities map to OMNII objects with identity, representation and provenance;
- demonstration data remains explicitly non-verified;
- publication requires active workflow state, verification and explicit authority.

Commits:
- `f59c2e109929e29c124d2d438886dfd2fdbaa97c` runtime contract
- `424d29f4c92ac3ad8c146a37cd2dd8c64e0c9e22` tests

## Direct Bank
Source: `carbonactual/direct-bank-app`

Binding:
- transfers map to OMNII transaction semantics;
- settlement maps to OMNII settlement/evidence semantics;
- consequential banking actions require authority plus maker/checker approval.

Commits:
- `9ff1ec7d53de970f2e9069daa98c4a3aa750ce10` runtime contract
- `4a7b0df66d508b5c5432832a7cbeca46ff442da7` tests

## Estate Conformance Gate
OMNII now contains an estate-wide validator for product capability composition and constitutional/authority boundary violations.

Commits:
- `5a136bcfb262b7fbfd5951d60d1efdaee39c1a5b` tests
- `93dd07800568b9b20ea85ecbb14d670c5c483de2` validator

## Verification
A focused local Node harness exercised the core boundary behaviors from all four product bindings and the estate validator: **9/9 tests passed**.

The full OMNII repository and all external product CI pipelines were not executed from this environment. Current deployment verification may also be affected by existing provider rate limits; provider status must not be interpreted as a code-test result.

## Architectural rule
These sidecar contracts are adapters/boundaries. They do not create a second constitutional kernel. Product-specific functions remain source-lineaged and specialized; shared semantics continue to live in OMNII Common Layer, OMNII runtime, authority controls, evidence/provenance, Pulse/value and HAPI World.
