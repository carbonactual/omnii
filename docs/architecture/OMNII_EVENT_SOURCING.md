# OMNII EVENT SOURCING

Event sourcing preserves consequential state history as an ordered or causally related stream of immutable events from which governed projections may be derived.

## Contract
`event → validate → append → publish → project → verify`

Commands remain distinct from events. Corrections append new events. Projections are rebuildable where their source stream and retention policy permit.

## Invariants
The event stream is evidence of recorded occurrence, not proof that an external world state is truthful. External observations retain source and confidence/provenance metadata.