# IO Universal Interaction Design

**Status:** APPROVED / CANONICAL DESIGN — 2026-09-06

## Goal

Make IO the universal interaction and occurrence layer of Carbon Actual: every meaningful action or interaction produced by a person, AI, agent, product, service, workflow, machine or system is representable as one canonical IO record, while domain products retain their own semantics.

## Core rule

> **Every action or interaction in the ecosystem is IO.**

IO is not merely money movement. Value movement is one important IO class. IO is the shared connective record for actions, exchanges, communications, decisions, execution, movement, registration, observations, lifecycle changes, settlement and other consequential or material interactions.

## Boundary model

- **Carbon Actual:** ecosystem.
- **OMNII:** the omnidirectional operating property of the ecosystem.
- **IO:** universal interaction/occurrence and movement record.
- **ABBA/Agents:** intelligence, planning and orchestration.
- **Authority/SEAL:** permission, consent and human/legal control.
- **Runtime:** deterministic execution, state transition and audit.
- **Ledger/Value/Pulse:** economic consequence, reconciliation and feedback.
- **Products:** domain-specific experiences and capabilities over the shared fabric.

IO records authority and authorization references; it does not create authority merely by being written.

## Canonical IO contract

Every IO record has these semantic groups:

1. **Identity:** globally unique IO id and schema version.
2. **Occurrence:** `occurred_at`, optional `completed_at`, status and kind.
3. **Actor/participants:** initiator, executor and participants, each by stable references.
4. **Action:** normalized action verb plus human-readable label when useful.
5. **Subject:** the entity/object/resource affected.
6. **Intent/context:** intent reference, context reference, jurisdiction, location and time where applicable.
7. **Governance:** authority and authorization references; no implicit permission.
8. **Causality:** parent/preceding IO ids and correlation id.
9. **Product/domain:** originating product, domain, capability and local reference.
10. **Inputs/outputs:** referenced resources, data, services, rights or other values entering/leaving the interaction.
11. **Value/economics:** optional value vectors, exchange references, settlement references and obligations.
12. **State:** before/after state references or explicit state transition metadata.
13. **Evidence/provenance:** evidence references, source and provenance metadata.
14. **Idempotency:** caller-supplied idempotency key for state-changing operations.
15. **Metadata:** extensible, non-authoritative product data.

## IO kinds

The canonical vocabulary is open-ended. Initial first-class kinds are:

`interaction`, `communication`, `request`, `offer`, `match`, `decision`, `authorization`, `execution`, `movement`, `service`, `exchange`, `transaction`, `settlement`, `registration`, `observation`, `evidence`, `lifecycle`, `system`, `incident`.

A product may introduce a domain-specific kind without creating a competing universal record model.

## Lifecycle

IO follows a minimal lifecycle:

`intent → proposed → authorized/accepted → executing → completed | failed | cancelled | reversed`

Not every interaction needs every state. Product lifecycles may add states while retaining these common meanings.

## Data-flow invariant

```text
participant / system
      ↓
   intent/context
      ↓
 authority + authorization
      ↓
 action / execution
      ↓
        IO
   ↙    ↓     ↘
 evidence  state  value
   ↘    ↓     ↙
 outcome / settlement
      ↓
    Pulse / learning
```

An IO may reference specialized records; specialized records must not become the only place where the interaction exists.

## Persistence

The canonical durable collection is `public.omnii_io_records`.

Required persistence properties:

- append-oriented occurrence history;
- immutable identity and occurrence provenance;
- unique idempotency boundary per source actor/product scope;
- indexed correlation, actor, subject, product, kind and time dimensions;
- JSONB extension fields without weakening canonical columns;
- explicit links to evidence, state transitions and economic/ledger records;
- product-neutral queryability.

Security remains subject to the existing authority and service-role policies. Clients do not gain write authority merely because IO is universal.

## Runtime rule

Every state-changing runtime operation MUST emit exactly one primary IO occurrence for the operation, with child IOs permitted for materially distinct sub-actions. Retried submissions using the same idempotency key MUST resolve to the original occurrence rather than creating a duplicate primary action.

Read-only access MAY emit IO when it is material, externally visible, audited, consented, billable or otherwise governed; internal implementation noise does not have to become an IO record.

## Product rule

Products such as BUNK, the Value/Exchange desk, CHARTER, Pilgrim, NAB, Management, InstituteGPT, NOUN BOT and future products compose through IO. A product can have its own tables and workflows, but the interaction that crosses a product/system boundary must be representable in the universal IO contract.

## No-loss rule

An interaction must not disappear when it crosses product, provider, protocol, organizational or physical/digital boundaries. Adapters translate transport; they do not redefine the interaction.

## No-overreach rule

IO must not become:

- a replacement for identity;
- a permission system;
- a ledger itself;
- a product-specific database;
- a graph that owns all domain semantics;
- an automatic claim of truth, ownership or legality.

IO is the connective occurrence layer.

## Success criteria

The implementation is complete for this phase when:

- a canonical IO constructor validates the contract;
- a runtime helper can wrap an action into one primary IO occurrence;
- duplicate idempotency submissions collapse to one occurrence;
- the common package exports the IO primitive;
- Supabase has a canonical persistence table and indexes;
- regression tests cover representative human, AI, system, value and cross-product interactions;
- ecosystem documentation states that every meaningful action/interaction is IO without collapsing domain boundaries.
