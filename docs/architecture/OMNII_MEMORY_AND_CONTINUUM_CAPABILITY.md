# OMNII Memory + Continuum Capability

**Status:** Canonical reusable capability contract
**Source heritage:** Carbon Actual legacy Continuum remember/recall implementation, reconciled with OMNII canonical evidence, authority, provenance and lifecycle semantics.

## Purpose

Memory gives the ecosystem durable contextual continuity without confusing storage with truth.

A memory record is a governed representation of information retained for future contextual use. It is not automatically authoritative merely because it is stored.

## Canonical memory lifecycle

```text
capture
→ normalize
→ identity/context resolution
→ provenance
→ authority/consent evaluation
→ classification
→ persistence
→ indexing
→ recall
→ contextualization
→ evidence assessment
→ audit
→ retention/expiry/archive
```

## Memory envelope

A canonical memory signal may contain:

- source
- identity/subject reference
- layer/context
- type
- title
- content/payload
- tags
- metadata
- route
- seal/consent state
- provider reference
- timestamp
- provenance
- lifecycle
- confidence/uncertainty
- retention policy

These fields preserve the useful semantics found in the legacy Continuum memory path while making authority and uncertainty explicit.

## Authority boundary

Stored memory is not authority.

A recalled memory may be:

- verified evidence;
- an observation;
- a user-provided statement;
- a derived inference;
- a plan;
- a preference;
- an unresolved claim;
- a historical record;
- or unknown/unverified material.

The system must preserve that distinction and never silently promote an inference into fact or authority.

## Provider independence

Memory must be storage-provider neutral. Supabase, filesystems, vector stores, graph stores, object stores, external knowledge bases, encrypted vaults and future systems are adapters.

The constitutional contract is the memory envelope and lifecycle, not the storage technology.

## Agent use

ABBA and other agents may recall memory only within their authorized context. Retrieval should be relevance- and purpose-aware, with privacy minimization and selective disclosure.

Agent memory must not become an invisible authority channel.

## Continuum relationship

Memory supports continuity across:

`Root → Actual → Becoming → Atlas`

It allows previous encounters, evidence, commitments, outcomes and context to inform later action without freezing the entity into its past state.

## Security and privacy

Memory requires:

- least-privilege access;
- consent and legal basis where applicable;
- provenance;
- encryption/custody appropriate to sensitivity;
- selective disclosure;
- retention and deletion policy;
- auditability;
- revocation where possible;
- separation of private memory from public Atlas expression.

## Canonical implementation direction

The existing `omnii_abba_memory_records` and related OMNII evidence structures are canonical implementation substrates. Legacy direct-write endpoints are references and migration targets, not parallel canonical persistence paths.
