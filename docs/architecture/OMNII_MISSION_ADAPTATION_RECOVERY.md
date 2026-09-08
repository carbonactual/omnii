# OMNII Mission Adaptation & Recovery

**Status:** Implemented as a reusable runtime capability.

## Purpose

Mission Intelligence establishes whether a selected team is structurally ready. Mission Adaptation & Recovery handles change after that assessment when a participant becomes unavailable, suspended, revoked, or otherwise fails.

The recovery layer does **not** create authority, enlarge scope, or convert readiness into permission.

## Recovery law

`OBSERVE FAILURE → MARK MEMBER UNAVAILABLE → REASSESS → SELECT SAFE REPLACEMENT → REASSESS → CONTINUE OR HALT`

A replacement is admissible only when it is active, does not conflict with the remaining team, has resolvable dependencies, and does not require an authority reference absent from the mission definition.

Replacement selection is deterministic: maximize recovery of currently missing required capabilities, then resolve ties by stable member identifier.

A failure is tolerated when redundant coverage means the mission remains `ready` or `incomplete`. A failed member is never silently retained as executable.

If no safe replacement restores the mission's structural requirements, recovery halts with an explicit reason. The system does not improvise a broader team or authority boundary to preserve throughput.

## Continuity invariants

- Failed or unavailable members cannot execute.
- Recovery preserves the original mission objective.
- Recovery cannot widen `authorityRefs`.
- Human approval requirements remain `incomplete` until separately satisfied.
- Adaptation produces lineage: failed member, replacement, recovered capabilities, and resulting assessment are explicit.
- Recovery never bypasses `executeGoverned`; the final execution boundary still requires a ready Mission Assessment.
- Deterministic recovery prevents drift caused by candidate ordering.

## Relationship to the canonical execution chain

`OBJECTIVE → TEAM / AUTO-TEAM → MISSION INTELLIGENCE → MISSION ADAPTATION (when needed) → MISSION PLAN → AUTHORITY / APPROVAL → GOVERNED EXECUTION → OBSERVE → OUTCOME → LEARNING`

Mission Adaptation is therefore a continuity mechanism, not an alternative execution path.
