# OMNII TRANSITION ENGINE

Determines whether a requested state transition is valid, authorized, compatible, and safe.

## Evaluation
`current state + event + actor + authority + policy + preconditions → transition decision`

Transitions declare preconditions, effects, resulting state, emitted events, compensation/recovery behavior, and required authority.

## Invariants
No transition may silently bypass lifecycle rules. Rejected transitions are observable. Side effects occur only after authorization and validation.