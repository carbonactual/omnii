# OMNII Constitutional Reconciliation

**Status:** CANONICAL AUDIT RECORD — Phase 1–40 reconciliation

## Evidence classes
- **SOURCE-DERIVED:** directly evidenced by repository files, manifests, source, or Git history.
- **INFERENCE:** conclusion drawn from multiple repository facts.
- **UNVERIFIED:** cannot be proven from the connected GitHub repository alone.

## Repository identity

**SOURCE-DERIVED:** the GitHub repository is `carbonactual/omnii`, but its active application surface is BUNK: the root README calls it the active BUNK product repository and `package.json` is named `bunk`. The web application, Supabase migrations, and product schemas are BUNK-specific.

**SOURCE-DERIVED:** the repository also contains an extensive OMNII constitutional/architecture corpus and executable Phase 21–40 reference packages.

**RECONCILIATION:** both concepts legitimately coexist in this repository, but they must occupy different architectural layers:

```text
OMNII
  Constitutional operating-environment architecture
        ↓
  Universal contracts / runtime boundaries
        ↓
  Ecosystem, institution, territory and future-world compositions
        ↓
BUNK
  Product-specific implementation/reference application
```

BUNK is **not** a constitutional dependency of OMNII. BUNK may consume OMNII contracts. OMNII must remain implementable without BUNK.

## Constitutional source of truth

`docs/constitution/` is the canonical constitutional directory. The root `constitution/README.md` is retained only as a compatibility pointer and must not define competing constitutional law.

`docs/architecture/` is the canonical architecture directory. Historical Carbon Actual documents remain provenance/reference material and are not authoritative where they conflict with the OMNII canonical documents.

## Canonical kernel set

The Phase 1–40 audit preserves the existing 14-kernel sequence rather than expanding it:

BEING → IDENTITY → KNOWLEDGE → MOTION → VALUE → TRUST → RELATIONSHIP → INTENT → EXECUTION → CAPABILITY → RESOURCE → COMPOSITION → CONTINUITY → INTEGRATION

Governance, security, orchestration/ABBA, economics, audit, observability and resilience are **cross-cutting constitutional/runtime controls**, not additional foundational kernels.

## Canonical object rule

An OMNII object is an identifiable, typed, governed participant in the universal graph. Its universal envelope is identity, type, version, lifecycle, provenance, authority context, attributes, relationships, dependencies, capabilities, resources, timestamps and extensions.

Domain objects such as Person, Organization, Product, Service, Territory, Ecosystem, Agent and World are compositions/extensions of the canonical object contract. They do not redefine it.

## Canonical relationship rule

The universal relationship is an addressable typed edge/object:

`source → relationship(type, authority, provenance, lifecycle, temporal validity) → target`

Dependency, ownership, membership, trust, delegation, communication, composition and governance are distinct relationship semantics. They are not interchangeable aliases.

## Canonical dependency rule

Constitutional dependency is distinct from ordinary graph relationship. Foundational kernels may not depend on products, agents, or BUNK. ABBA orchestrates authorized use of the substrate but is not a prerequisite for Being or Identity.

## ABBA

ABBA is master intelligence/orchestration, not sovereign authority. Capability ≠ authority; intelligence ≠ authority; orchestration ≠ ownership; planning ≠ execution. ABBA operates only through delegated authority, explicit capabilities, scoped resources, policy, audit and revocation.

## Phase 21–40 implementation classification

The repository contains Phase 21–40 source files, but these packages do not have individual package manifests and are not independently declared workspace packages. Therefore they are **reference implementations / architectural executable specimens**, not proven production runtime services.

Phase 21 is the strongest reference implementation: it has a README, typed runtime, lifecycle, authority/context checks, capability/resource checks, cross-ecosystem agreements and auditable events. Later phases are smaller reference kernels. Phase 27 has no corresponding package or commit in the repository and is therefore a **P0/P1 evidence gap**, not a fabricated missing implementation.

Phase 31–40 remain behind the universal runtime boundary. They may consume canonical objects, relationships, authority, events and governance; they may not redefine them.

## Phase 40 reconciliation

`packages/phase40-universal-civilization/index.ts` defines its own `CivilizationNode` and `CivilizationRelation`. This is classified as **reference/future implementation**, not a second constitutional graph. It must be interpreted as an adapter/view over the canonical OMNII object and relationship model. Its `governed` flag is an implementation guard, not the complete constitutional authority model.

## Non-negotiable outcome

No Phase 21–40 package is permitted to become a hidden foundational dependency. The constitutional substrate remains Phase 1–20 contracts plus the canonical runtime boundaries. Later phases are composed capabilities and horizons.
