# SPOTIST — Ecosystem Conformance & Implementation Guardrails

**Status:** CANONICAL ECOSYSTEM IMPLEMENTATION CONTRACT
**Applies to:** SPOTIST product repository, consuming products, agents, APIs, workflows and integrations

## 1. Source of truth

The canonical semantic source for SPOTIST is maintained in OMNII.

Implementations MUST treat:

- `SPOTIST_CANONICAL_CAPABILITY.md`
- `SPOTIST_SEEK_ARCHITECTURE_V2.md`

as the authoritative semantic contract.

Product repositories MAY contain implementation details but MUST NOT redefine canonical meaning.

## 2. Compatibility targets

A conforming implementation should be able to represent at minimum:

- natural-language seeks;
- structured criteria and constraints;
- discovery sources;
- matches and leads;
- evidence and provenance;
- verification status;
- standing seeks;
- alerts/monitoring;
- compound seeks/missions;
- seeker/holder/provider relationships;
- handoffs;
- outcomes;
- history and corrections;
- authority/privacy constraints.

## 3. Source transparency

The system MUST distinguish:

- sources actually consulted;
- sources unavailable;
- sources not consulted;
- inferred information;
- user-provided information;
- externally asserted information;
- verified information.

The interface MUST NOT claim comprehensive discovery when source coverage was partial.

## 4. Result integrity

No result may silently change status from discovery to verification, identity, ownership, entitlement or authority.

User-facing language SHOULD clearly distinguish:

`Found` · `Possible` · `Lead` · `Verified` · `Conflicting` · `Historical` · `Unresolved`

## 5. Personalization controls

Personalization MUST be:

- permission-aware;
- explainable enough for the context;
- user-controllable;
- revocable;
- separable from objective evidence.

Historical behavior may inform relevance but MUST NOT become an immutable assumption.

## 6. Standing seek controls

Standing seeks MUST support:

- explicit activation;
- scope;
- source permissions;
- expiry/review;
- notification policy;
- pause/resume/cancel;
- audit history.

A standing seek must not silently become broader merely because additional sources become available.

## 7. Safety and authority

Sensitive seeks MUST route through applicable ecosystem authority, privacy, consent, safeguarding, evidence and policy controls.

No implementation may introduce unrestricted:

- surveillance;
- stalking;
- doxxing;
- private-record extraction;
- identity disclosure;
- consequential action without authority.

## 8. Economic separation

SPOTIST may discover economic opportunities but MUST NOT create a parallel ledger, wallet, settlement constitution, or competing economic authority.

Economic handoff remains compositional:

`SPOTIST → OMNI / relevant domain → I/O where applicable`

## 9. Intelligence separation

The product MUST NOT create an independent “SPOTIST AI” authority layer that competes with ABBA.

ABBA remains the ecosystem intelligence/orchestration layer.

SPOTIST remains the seek/discovery capability.

## 10. Commercial trust

Implementations MUST NOT fabricate:

- inventory;
- prices;
- availability;
- users;
- reviews;
- evidence;
- transaction history;
- opportunities.

Paid placement, sponsored relationships, provider fees or commercial priority MUST be disclosed and separated from evidence-based relevance where applicable.

## 11. Open-world rule

New seek categories MUST be representable without rewriting the constitutional core.

Product-specific taxonomies are local projections of the canonical open-world seek model.

## 12. Historical preservation

Historical SPOTIST sourcing models and internal identifiers may remain for compatibility.

Historical documents MUST NOT be treated as superseding the canonical universal SEEK semantics.

## 13. Consumer surfaces

A standalone SPOTIST product may provide a deliberately simple front door:

> **What are you looking for?**

Internal complexity SHOULD remain behind the interface.

The product may expose richer views for active seeks, evidence, missions, opportunities, saved discoveries, source coverage and outcomes.

## 14. Conformance test families

Future implementations should test at least:

### Natural-language tests
- vague seek;
- precise seek;
- compound seek;
- visual/document seek;
- ambiguous seek.

### Evidence tests
- conflicting sources;
- stale source;
- unverified lead;
- verified result;
- missing provenance.

### Standing-seek tests
- activation;
- alert;
- pause;
- resume;
- expiry;
- cancellation.

### Safety tests
- sensitive people seek;
- unauthorized private record request;
- consequential action without authority;
- regulated-domain handoff.

### Boundary tests
- SPOTIST invokes ABBA;
- DESK consumes SPOTIST;
- OMNI consumes SPOTIST;
- I/O remains separate;
- no duplicate identity/economic/authority primitives.

### Truthfulness tests
- no-result distinction;
- partial-source disclosure;
- no fabricated result;
- no fabricated availability;
- no hidden paid ranking.

## 15. Final implementation invariant

> **An implementation is correct when it makes the universal SEEK capability usable without narrowing its meaning, overstating discovery as truth, granting authority through search, or duplicating ecosystem primitives.**
