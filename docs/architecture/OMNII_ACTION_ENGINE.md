# OMNII ACTION ENGINE

The action engine turns an authorized request into a concrete executable operation.

## Contract
Action = subject + intent + capability + target/resource + authority + constraints + expected effects.

## Flow
`validate → authorize → prepare → execute → observe → commit/compensate → record`

Commands do not prove execution; execution produces events and state evidence.