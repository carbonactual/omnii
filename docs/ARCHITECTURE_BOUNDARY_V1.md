# OMNII Boundary and BUNK Extraction v1

OMNII is the constitutional/universal ecosystem architecture and kernel. It is not the BUNK product and it is not the OMNI product.

## OMNII retains

- universal ontology and entities;
- relationship and dependency semantics;
- identity and authority contracts;
- universal capability/composition contracts;
- Value/Pulse/Proof/Actual contracts;
- IO and settlement contracts;
- Terminal → curation → optional tokenization → Index lifecycle contracts;
- Ash/Phoenix/no-waste lifecycle contracts;
- Root/Index/Vault/ATLAS/SEAL/Continuum contracts;
- horizon safety and future-state rules;
- provider-neutral integration contracts.

## Minting versus tokenization

OMNII defines the distinction as constitutional:

```text
MINT
  ↓
TERMINAL
  ↓
CURATION / ELIGIBILITY / RECOGNITION
  ↓
TOKENIZATION
  ↓
INDEX
```

Minting establishes accountable identity/provenance for a feedback or ecosystem object and routes the minted object to Terminal. A minted object may stop at Terminal without becoming Index value.

Tokenization is explicit and subsequent. Only tokenized objects enter the Index. Therefore:

```text
MINT != TOKENIZE
MINT -> TERMINAL
TOKENIZE -> INDEX
```

This applies equally to useful and unsuccessful operations. A timeout, network failure, inaccessible resource, or other failed discovery can consume value, produce minted feedback, and stop at Terminal. Minting does not retroactively make the failed result useful or tokenized. Value consumed by the attempt remains subject to the existing accounting, Proof, settlement, and ASH/no-waste contracts.

## OMNII does not retain as constitutional ownership

BUNK-specific product ontology, property workflows, listings, tenancy, inspection operations, BUNK roles, BUNK APIs, BUNK UX and BUNK-specific operational persistence are product concerns.

## BUNK extraction

The existing BUNK material in this repository is the source inventory for standalone extraction. It includes BUNK documentation, product manifests, property ontology, product roles, outcome projection, operational flow, product extensions and BUNK-specific migrations.

The target is `B3C0M1NG/BUNK` once repository creation is available. Until then, this branch records the exact extraction boundary without deleting historical OMNII source material.

## Required dependency direction

`BUNK → OMNII contracts`

`BUNK → ABBA capabilities`

`BUNK → HAPI/HAPI World capabilities`

`BUNK → IO/Value/Proof/Pulse/Actual/SEAL`

No reverse dependency from OMNII constitutional code into BUNK product internals is permitted.
