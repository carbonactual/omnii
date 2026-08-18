# OMNII / BUNK Repository Boundary

**Status: CANONICAL**

This repository is named `carbonactual/omnii` and contains the OMNII architectural corpus together with the active BUNK product implementation.

## Boundary

**OMNII owns:** constitutional semantics, universal object/relationship/dependency contracts, authority boundaries, runtime contracts, cross-cutting governance/security/audit rules, and universal composition rules.

**BUNK owns:** property, listing, inspection, tenancy, maintenance, finance references, CRM and property operations. These are product-specific compositions and may not redefine OMNII primitives.

## Dependency direction

```text
OMNII contracts / substrate
        ↓
shared adapters and product contracts
        ↓
BUNK implementation
```

The reverse dependency is forbidden: OMNII constitutional law must never require BUNK.

## Repository identity decision

The coexistence is intentional for the current repository state. Renaming the repository or changing the BUNK package name would not repair the architectural issue and would create unnecessary product migration risk. The minimum correction is explicit boundary enforcement and canonical-source precedence.

## Historical Carbon Actual material

Older `CARBON_ACTUAL_*` architecture files are retained as provenance/reference material. They are not authoritative when they conflict with the canonical OMNII documents under `docs/constitution/` and `docs/architecture/`.
