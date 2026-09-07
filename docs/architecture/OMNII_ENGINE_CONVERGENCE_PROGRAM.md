# OMNII Engine Convergence Program

**Status:** Active build program
**Baseline:** `main`
**Mode:** Parallel workstreams; each engine is internally built sequentially and verified before integration.

## Architectural rule

All approved engines are developed concurrently as independent workstreams. No workstream may redefine constitutional authority, create a competing canonical ledger/event store, fork universal semantics, or hard-code provider-specific authority.

Each workstream MUST:

1. consume existing canonical objects, relationships, registries, authority, policy, capability, execution, event and audit boundaries;
2. prefer extension/hardening of existing runtime modules over duplicate engines;
3. define a typed contract before consequential implementation;
4. include deterministic tests for normal, boundary, failure, replay/idempotency and authorization behavior;
5. add durable Supabase migration/RPC boundaries when state changes require database atomicity;
6. preserve provenance, evidence, lifecycle and recovery semantics;
7. remain provider-independent and globally composable;
8. expose reusable capability rather than product-specific constitutional logic.

## Active workstreams

| Workstream | Purpose | Primary existing substrate |
|---|---|---|
| Event | Canonical event envelope, append, replay, causality and idempotency | `omnii_events`, runtime signals |
| Composition | Intent-to-capability composition and productization | composition/conformance runtime |
| Experience | Governed experience/UI compilation and design-system output | experience/design-system scopes |
| Agent Control | Agent identity, authority, tools, memory access, coordination | agent/authority runtime |
| Data & Memory | Ingestion, provenance, quality, context, retrieval, memory and portability | persistence/context/evidence |
| Execution & Integration | Reliable software/human/machine/API execution | execution/integration runtime |
| Evaluation & Assurance | Evidence-backed testing, simulation, security, accessibility, release gates | quality/evaluation/assurance |
| Deployment & Lifecycle | Environment, release, scaling, rollback, recovery and retirement | lifecycle/deployment runtime |
| Observability & Pulse | traces, metrics, anomaly handling, feedback, Pulse and learning | audit/telemetry/feedback/economic runtime |
| Management | Sensing through planning, decision, allocation, execution, assurance and learning | management runtime |
| Registry & Capability | CVE, universal capability registration, qualification and conformance | registry runtime |
| IO / Tokenization / ASH | value movement, minting, rights, tokenization and assurance | IO/Pulse/tokenization/ASH runtime |
| Economic / Liability / Value | inverted economics, liabilities/assets, cost/value, outcomes | economic composition/value runtime |
| ASH Security & Trust | trust, assurance, integrity, risk and security boundaries | ASH/security/evidence |
| Global Discovery Intelligence | matching, discovery, sourcing, opportunity and ranking | graph/registry/global scopes |
| Research & Knowledge | research, evidence synthesis, knowledge and epistemic integrity | epistemic/research runtime |
| Invariant & Conformance | constitutional invariants and ecosystem conformance | invariant/conformance runtime |
| Graph & Relationship | universal graph traversal, relationship integrity and dependency reasoning | graph/relationship runtime |
| Workflow & Process | governed workflows, task queue, progression, worker and recovery | workflow/process runtime |
| Education / Institute | learning, credentials, certification, labs, badges and capability development | InstituteGPT + capability registry |
| Movement / Charter | universal movement, journey, routing, certification and recovery | movement/Charter/NAB runtime |
| Settlement / Ledger | lawful settlement, ledger boundaries, reconciliation and financial/value recording | ledger/IO/reconciliation runtime |
| Resource & Capacity Exchange | idle, available, reserved and future capacity discovery/exchange | capability/resource/runtime |
| Verification & Trust Intelligence | evidence-based claims, credentials, quality and performance verification | evidence/verification runtime |
| Opportunity & Sourcing | latent value discovery and fulfillment-path sourcing | global opportunity/sourcing scopes |
| Finance / Trade / Procurement | lawful funding, market access, trade, procurement and regulatory intelligence | economic/global coordination scopes |

## Integration rule

Workstreams may be integrated in any order. Integration is a separate conformance step that proves contracts compose without semantic duplication.

## Completion standard

An engine is not considered complete merely because implementation exists. It must have a canonical contract, runtime implementation, durable persistence boundary where required, tests, security/authority controls, recovery semantics, documentation, and verified CI evidence.
