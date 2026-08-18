# OMNII Single-Repository Composition Model

**Status: CANONICAL ARCHITECTURAL POLICY**

OMNII is one ecosystem repository containing the universal operating environment, its constitutional substrate, reusable primitives, runtime, integrations, agents, services and product/world compositions.

## One place

The repository is not a collection of independent product architectures. It is one governed environment with explicit internal boundaries.

```text
OMNII repository
├── constitutional substrate
├── universal primitives and schemas
├── registries and graph
├── runtime and execution
├── identity / authority / trust
├── value / ledger
├── events / memory / knowledge
├── ABBA and agent fabric
├── integrations and adapters
└── product/world compositions
    ├── BUNK
    ├── HAPI
    ├── NGIN
    └── future compositions
```

## Nothing is wasted

Existing assets are preserved by value and provenance. An artifact may become canonical infrastructure, a reusable primitive, a product composition, an adapter, a compatibility layer, a migration source, a test/evidence fixture, or historical provenance. Supersession does not imply deletion unless explicitly governed.

## Boundary rule

The fact that products live inside the repository does not make product-specific semantics constitutional. Universal primitives remain universal; compositions specialize and assemble them.

## Reconciliation rule

When two parts of the ecosystem solve the same universal problem, prefer one canonical primitive plus adapters/compositions over parallel foundational systems.

## Emergence rule

A new product is primarily an assembly operation:

`intent + canonical objects + relationships + capabilities + resources + workflows + policy + interface = composition`

A product may introduce genuinely new domain concepts, but it must register them against the universal substrate and must not silently fork canonical identity, graph, authority, event, value or execution semantics.

## ABBA

ABBA is the master intelligence/orchestration layer across the environment. It composes and coordinates the system but remains constrained by constitutional authority, policy, capability and audit boundaries.
