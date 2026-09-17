# OMNII Internet Recycle Bin

**Status:** canonical technical contract.

## Purpose

The Internet Recycle Bin is the cross-cutting digital exit and disposition lifecycle for objects and related digital state that is deactivated, removed, revoked, expired, abandoned, superseded or otherwise no longer active.

It is **not** a new identity, ownership, authority, ledger, storage, registry or constitutional root primitive. It composes existing OMNII object, relationship, authority, event, evidence, provenance, dependency, continuity, Ash and Phoenix semantics.

## Core rule

> Delete is a disposition instruction; it is not proof that every copy, derivative, dependency or permission has disappeared.

An object is not considered fully exited merely because its active reference is gone. Exit requires determination of remaining state, dependencies, copies, rights, retention requirements, recoverability and final disposition.

## Canonical lifecycle

```text
ACTIVE
  -> DEACTIVATED
  -> DISPOSITION REQUESTED
  -> DEPENDENCY / COPY RESOLUTION
  -> recoverable | revoked | expired | orphaned
     | quarantined | preserved | archived | suppressed
  -> PURGABLE
  -> PURGED
```

`unknown` is valid when classification or dependency discovery is incomplete. Unknown state must not be silently treated as trusted, owned, authorized or safe to destroy.

## Disposition states

| State | Meaning |
| --- | --- |
| `active` | Operationally usable state. |
| `deactivated` | Removed from normal active use without completing disposition. |
| `disposition_requested` | An authorized lifecycle action has been requested. |
| `recoverable` | Restoration remains possible. |
| `revoked` | Previously granted access or authority is no longer valid. |
| `expired` | Validity period has ended. |
| `orphaned` | Detached from its expected owner, parent or relationship. |
| `quarantined` | Isolated pending security, trust or operational determination. |
| `preserved` | Retained because evidence, legal, policy, safety or other governing requirements prevent destruction. |
| `archived` | Intentionally retained outside active use. |
| `suppressed` | No longer exposed or operationally used while underlying copies may remain temporarily. |
| `purgable` | All known blocking retention/dependency conditions permit irreversible destruction. |
| `purged` | Destruction has been completed and the disposition outcome is evidenced. |
| `unknown` | Current disposition cannot yet be reliably classified. |

## Dependency-aware disposition

Disposition follows relationships, not merely the primary object. Relevant related state may include:

- versions and historical revisions;
- references and ownership/representation relationships;
- replicas, caches, backups and archives;
- thumbnails, previews, OCR, transcripts, embeddings and other derivatives;
- credentials, sessions, permissions, tokens and delegated access;
- subscriptions, recurring instructions and financial obligations;
- API integrations, webhooks and external provider relationships;
- public projections, indexes and search representations;
- AI memory, agent configuration and tool-state derivatives; and
- evidence, audit records and continuity material.

A provider may implement these mechanisms differently, but the semantic disposition and evidence must remain portable.

## Recovery

Recovery may restore an object, reconstruct it from preserved state, replace a failed provider, or hand the object to another compatible environment. Recovery does not grant new authority merely because material was recoverable.

Restoration must preserve, or explicitly re-establish, the principal, identity, authority scope, provenance, dependencies, lifecycle history and liability context required by the canonical object.

## Retention and preservation

Retention is distinct from active use. Preservation can block purge while allowing operational access to remain revoked or suppressed.

A retention condition should identify its reason, authority/policy basis where applicable, evidence reference and review/expiry point when one exists.

## Purge

Permanent destruction is a material lifecycle event. A purge is not complete merely because the primary storage record disappeared. The system should account for known copies, derivatives, dependencies and provider-side deletion outcomes to the extent the adapter can observe them.

Where cryptographic erasure, physical destruction, provider-side garbage collection or another specialized mechanism is used, that mechanism remains an implementation adapter. OMNII records the semantic result and evidence rather than adopting the mechanism as a constitutional primitive.

## Relationship to existing primitives

The Internet Recycle Bin binds into the existing lifecycle:

`# / HASH → SEAL → ROOT → canonical state → EVENT / TRACEABILITY → VAULT → ASH → PHOENIX → ACTUAL / ATLAS → I/O`

- **ASH** remains the retained classification space for residual, failed, unknown, unreconciled or security-relevant output; the Recycle Bin does not replace it.
- **PHOENIX** remains the governed response mechanism for harmful, fraudulent, unauthorized or security-nonconforming conditions.
- **VAULT** remains protected preservation/storage for critical recoverable material.
- **TRACEABILITY/EVENT** records material disposition transitions and evidence.
- **CONTINUITY** ensures recovery, replacement, migration, replay/rebuild and exit can survive provider failure.
- **ACTUAL / ATLAS** remain projections and operational/public views, not sources of disposal authority.

## Universal disposition event

A material disposition transition should preserve:

`who → for whom → authority → intent → requested action → subject → dependencies → copies/derivatives → policy/retention → execution → result → evidence → remaining access → next state → exit/purge outcome`

The disposition schema is `omnii://schemas/digital-disposition/v1`.

## Product boundary

Actual ecosystem products may expose an installable user-facing Recycle Bin/Recovery experience. Constitutional and contractual infrastructure remains inspectable infrastructure; it is not required to become an installable product merely because the product surface exposes its lifecycle.

## Non-negotiable invariants

1. Identity is not authority.
2. Deletion is not ownership transfer.
3. Revocation is not destruction.
4. Suppression is not erasure.
5. Retention is not active use.
6. Recovery is not permission escalation.
7. A provider's deletion API is not the canonical semantic model.
8. Unknown state is not permission to destroy.
9. Destruction is auditable.
10. Exit preserves portability and semantic provenance where technically and legally possible.
