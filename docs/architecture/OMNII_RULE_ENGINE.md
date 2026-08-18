# OMNII RULE ENGINE

Evaluates explicit constitutional and operational rules.

Rules declare scope, precedence, predicates, effects, authority requirements, conflicts, exceptions, and evidence requirements.

## Invariants
Rules must not silently contradict higher-order rules. Deterministic rules produce deterministic decisions. Rule versions are immutable once active; changes create new versions.