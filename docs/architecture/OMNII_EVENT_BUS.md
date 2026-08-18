# OMNII EVENT BUS

Universal event transport connecting objects, agents, workflows, services, and systems.

## Contract
The bus transports registered event schemas with identity, type, version, causation/correlation, provenance, ordering metadata, and delivery status.

## Delivery
Support durable publication, subscription, acknowledgement, retry, dead-letter/quarantine, replay where permitted, and consumer isolation.

## Invariant
Transport does not change event meaning. Delivery is not execution. Consumers must remain idempotent where replay is possible.