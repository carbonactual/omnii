# OMNII Universal Event & Evidence Contract

A Universal Event records a material occurrence that may change canonical state, authority, relationships, value, provenance, security, lifecycle or continuity.

## Core event envelope

Required:

`id`, `type`, `subject`, `actor`, `action`, `occurred_at`, `provenance`.

Recommended when applicable:

`object`, `principal`, `authority`, `delegation_chain`, `intent`, `context`, `previous_state`, `new_state`, `result`, `evidence`, `dependencies`, `settlement`, `liability`, `confidence`, `metadata`.

## Reconstruction rule

A material state transition should be reconstructable from the event chain without relying on undocumented UI assumptions.

## Evidence rule

Evidence references identify the source or attestation supporting the event. Evidence does not automatically become constitutional truth; reconciliation and assurance policy still apply.

## Privacy rule

Events and evidence must minimize unnecessary sensitive disclosure while preserving enough information to establish accountability and reconstruct material state.

## Delegation rule

For agent-mediated actions, preserve the originating principal and all meaningful delegation hops.

## Provider rule

A provider event may be ingested as source evidence, but the canonical system must distinguish provider-reported state from reconciled ecosystem state.
