# OMNII Meta-Ontology Implementation

**Status: CANONICAL**

## Purpose

The meta-ontology is the constitutional mechanism by which OMNII can represent a thing, relationship, capability, resource, event, phenomenon, namespace, participant or economic instrument that was not known when the kernel was authored.

## Rules

1. Unknown is representable.
2. Classification is provisional until evidence supports promotion.
3. New types extend the kernel; they do not replace it.
4. Historical records are immutable in meaning; later knowledge supersedes rather than rewrites them.
5. Every extension has provenance, status and lifecycle.
6. Extensions can introduce schema, capabilities and relationships.
7. Extensions must remain composable with identity, knowledge, causality, scenario, value, trust, execution and continuity.
8. No extension may silently grant authority.
9. A name or token may identify or represent an extension but is not the underlying reality.
10. Products consume extensions as capabilities; products do not become constitutional authorities.

## Lifecycle

`unknown -> observed -> provisional -> candidate -> emerging -> canonical`

Alternative terminal or parallel states are `disputed`, `superseded`, and `retired`.

A transition must carry a reason and may carry evidence references. Supersession preserves the prior definition for historical interpretation.

## Open-world composition

An extension may define:

- a new participant or species;
- a new intelligence or cognition model;
- a new identity or namespace mechanism;
- a new resource or value dimension;
- a new capability or function;
- a new relationship type;
- a new event or phenomenon;
- a new communication protocol;
- a new environment or habitat;
- a new technology;
- a new economic instrument or settlement rail.

These are examples, not a closed enumeration.

## Safety boundaries

Meta-ontology does not infer legal rights, ownership, authority, consent, truth, species status, intelligence, personhood, or economic value merely from registration. Those remain governed by the applicable constitutional kernels, evidence and policy.

## Runtime contract

`packages/omnii-runtime/src/meta-ontology-runtime.ts` provides registration, lifecycle transition and schema-extension primitives. The runtime deliberately accepts unknown classes and does not require a hard-coded taxonomy.
