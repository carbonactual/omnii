# OMNII Mission Execution Gate

Mission Intelligence is an execution prerequisite, not a report generated after execution.

## Required sequence

`REQUEST → DISCOVER → ASSEMBLE TEAM → ASSESS MISSION → AUTHORITY/CONSENT → EXECUTE`

The assessment must establish:

- required capability coverage
- required SWIRM coverage
- dependency completeness and ordering
- conflict absence
- required authority references
- human approval requirements
- deterministic execution order

## Gate semantics

`ready` permits the request to proceed to subsequent authorization/execution controls.

`incomplete` means a required condition remains unresolved, including required human approval.

`blocked` means a hard prerequisite failed and the execution adapter must not be called.

Mission readiness never becomes authority. A `ready` assessment cannot grant a capability, approve value movement, or override SealGrant, `CANON.md`, policy, or any higher-order control.

## No bypass

The reusable execution controller enforces the gate. Product routes and specialist engines may add stricter controls, but they must not bypass this prerequisite for consequential execution.

A mission assessment is evidence attached to execution context so that the system can later establish what was known and verified before action.
