# OMNII EVENT ROUTING

Routes registered events to eligible consumers, workflows, projections, agents, and services.

## Routing Decision
`event type/version + subscription + policy + scope + capability + consumer health → route`

Routing preserves event identity, causation, correlation, provenance, and ordering guarantees. Unauthorized consumers are not eligible merely because they can technically receive a message.

## Failure
Retries, backoff, dead-letter/quarantine, and replay are explicit runtime states.