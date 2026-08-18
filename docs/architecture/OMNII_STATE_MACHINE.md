# OMNII STATE MACHINE

Universal state is explicit and lifecycle-aware.

## Model
`Event → State Evaluation → Transition Decision → New State → Event`

Every canonical object declares valid lifecycle states and transitions. State is not inferred solely from the latest UI or command.

## Safety
Invalid transitions are rejected or escalated. Concurrent transitions require conflict detection. State changes preserve causation, authority, and provenance.