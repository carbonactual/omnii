# OMNII Hardening Gates

**Status: CANONICAL HARDENING CONTROL — 2026-09-05**

Every addition to OMNII or to a downstream product must pass these gates.

## Gate 1 — Classification
Every addition declares exactly one architectural class:
`constitutional/core | reusable capability | domain module | product | institutional configuration | integration adapter | presentation | reference/speculative`
Every governed object also declares a scope horizon: `OLD | NOW | FUTURE | EMERGING | UNKNOWN_ALIEN`.

## Gate 2 — Canonical semantics
A change MUST reuse the canonical object envelope, relationship/dependency semantics and authority model. A second universal object graph, dependency graph or authority issuer is prohibited.

## Gate 3 — Authority
Consequential actions MUST resolve:
`identity → authority → policy → capability → resource → dependency → execution`.
ABBA, agents, services and capabilities cannot self-authorize. Human/legally required consent cannot be replaced by optimization.

## Gate 4 — Time and reality
`ACTUAL`, `HISTORICAL`, `OBSERVED`, `PLANNED`, `COMMITTED`, `SIMULATED`, `POSSIBLE`, `PROBABLE`, `PREFERRED`, `REJECTED` and `UNKNOWN` are distinct states. FUTURE, SIMULATED and UNKNOWN information cannot be silently promoted to ACTUAL.

## Gate 5 — Provenance and evidence
Consequential claims and state changes SHOULD carry provenance and temporal validity. Evidence can support a claim but does not become authority by itself.

## Gate 6 — Unknown / alien safety boundary
Unknown, novel, synthetic or extraterrestrial candidates are accepted as data/model objects only through provisional classification. They receive no inferred trust, intent, consent or authority merely from observed capability, simulation or naming.

## Gate 7 — Economic integrity
Anything that can hold value, obligation, ownership/custody, rights, access, capacity or reputation can be represented by the canonical value/relationship model. Tokenization does not create truth, ownership or authority by itself.

## Gate 8 — Provider independence
Cloud, model, database, event, workflow, identity and payment providers are replaceable adapters. No vendor implementation may become a constitutional dependency.

## Gate 9 — Product isolation
Products consume OMNII. They may extend domain contracts and configurations, but they cannot redefine constitutional primitives. Reference implementations are evidence-producing deployments, not new foundations.

## Gate 10 — Verification
A change is not production-ready merely because the contract exists. It requires executable tests, CI evidence, deployment evidence and operational observability appropriate to its risk. Unverified claims remain explicitly unverified.

## Gate 11 — Reuse before invention
Resolve requirements in this order:
`reuse → configure → compose → extend domain contract → create shared capability → constitutional amendment`.
The last step requires evidence that existing semantics are genuinely insufficient.

## Gate 12 — Reversibility and lineage
Schema, policy, authority and economic changes must be versioned and traceable. Migration and lifecycle operations must preserve provenance and support controlled rollback/recovery where technically possible.

## Conformance statement
**OMNII is universal because new reality can be represented without forcing new constitutional primitives. It is hardened because novelty cannot bypass identity, authority, provenance, time, evidence, policy, execution or audit boundaries.**
