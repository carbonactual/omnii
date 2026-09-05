# OMNII Runtime Substrate Wave — 2026-09-05

## Scope
This continuation wave extends the repository-estate consolidation from product boundaries into reusable provider-independent runtime capabilities.

## Product surfaces tightened

- Open Ballot: simulation-only civic boundary with explicit authority and evidence semantics.
- HAPI World Nexus: canonical communication and relationship adapters with input validation and no implicit authority.
- HAPI World: machine-readable native autonomous-world boundary, including governed human-world crossings and post-human continuity.
- BKLIT UI: presentation boundary that never creates canonical state and routes consequential actions to canonical runtime checks.

## Shared runtime packages strengthened

### `packages/omnii-agents`
- planning
- coordination
- evaluation
- lifecycle

Planning never implies execution. Coordination never grants authority. Evaluation only produces feedback. Lifecycle transitions are explicit and bounded.

### `packages/omnii-workflow`
- forms → intents
- process lifecycle
- tasks
- worker completion/escalation
- automation triggers
- registry registration/discovery

Workflow state changes remain distinct from execution authority and evidence.

### `packages/omnii-knowledge`
- durable memory
- uncertainty-aware assertions
- evidence/provenance
- Atlas representation
- ecological design genealogy

Atlas remains a governed representation rather than operational truth. Evidence remains distinct from authority.

### `packages/omnii-economics`
- value vectors
- Pulse feedback
- tokenization representation
- market offers/trades
- settlement evidence
- investment exposure

The economic layer distinguishes value, price/valuation, representation, rights/ownership, position, settlement and authority. Tokenization does not create ownership or authority; investment records do not guarantee return.

### `packages/omnii-common`
- executable estate-wide boundary gate
- Common Layer exports now expose the gate directly.

## Canonical machine-readable registries

- `data/canonical/product-boundary-registry.json`
- `data/canonical/agent-tooling-capability-harvest.json`
- `data/canonical/universal-trade-investment-inventory.json`
- `omnii-hapi-world-boundary.json` in `carbonactual/hapi-world`

## Verification

A local contract-level Node harness exercised the new reusable agent, workflow, economics and knowledge logic: **13 assertions passed**.

The Open Ballot and HAPI World Nexus tests were written into their repositories. Full repository CI was not run from this environment. Remote CI/deployment status is therefore not claimed as green unless observed through GitHub checks.

## Architectural result

The estate is moving toward:

`OMNII Core → Common Layer → Runtime → HAPI World → Product/Institutional Composition → Provider Adapters`

with source provenance preserved and provider/framework repositories remaining replaceable implementation choices.
