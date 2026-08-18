# OMNII TRANSACTION ENGINE

Coordinates atomic or compensatable multi-step changes across governed resources and state.

## Contract
A transaction declares participants, intent, authority, preconditions, effects, isolation expectations, commit criteria, and compensation/recovery behavior.

## Flow
`prepare → validate → authorize → execute → verify → commit` or `compensate/rollback → record`.

Transactions must not claim atomicity where underlying systems cannot provide it; distributed outcomes remain explicit and auditable.