# OMNII QUERY MODEL

A query requests information or a derived view without itself changing governed state.

## Contract
Query identity, requester, target scope, query type/version, constraints, authorization context, consistency requirement, correlation, and provenance.

## Runtime
`validate → authorize/read policy → resolve → execute/read → return result + evidence metadata`.

Queries must not smuggle side effects into read semantics. Results state their freshness, consistency, and evidence limitations.