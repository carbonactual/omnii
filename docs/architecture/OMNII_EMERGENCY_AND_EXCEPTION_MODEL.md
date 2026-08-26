# OMNII Emergency and Exception Model

**Status: CANONICAL — universal operational hardening**

## Purpose

Real systems encounter conditions that were not part of the original plan. OMNII therefore treats emergency and exception handling as compositions of existing semantics rather than as ad-hoc application logic.

## Emergency composition

An emergency is a situation requiring accelerated response under defined authority and safety constraints.

Conceptual flow:

`detect → classify → alert → authority check → assign responders → allocate resources → execute → communicate → stabilize → evidence → report → review`

Emergency compositions MUST preserve attribution, authority, time, location/context, resource allocation, state changes and evidence.

## Escalation

Escalation MAY be triggered by:

- severity;
- timeouts;
- capacity exhaustion;
- uncertainty;
- authority limits;
- resource failure;
- safety thresholds;
- unresolved cases.

Escalation routes must identify responsible roles, available alternatives and termination/review conditions.

## Override

Emergency override may accelerate permitted execution but MUST NOT silently create constitutional authority. Override authority, scope, reason, duration and post-event review remain explicit.

## Exception lifecycle

`detected → classified → contained/handled → resolved → evidenced → reviewed → learned`

## Unknown situation

Where classification is uncertain, the system SHOULD preserve the raw observation, gather minimal required context, avoid unsafe assumptions, route to authorized human decision-makers when necessary and create an evidence-bearing temporary handling composition.

## Recovery and continuity

Recovery may include restoring state, reconciling records, notifying affected parties, replacing unavailable resources, re-running failed workflow steps and recording lessons for future cycles.

Recovery MUST preserve provenance; it must not erase the fact that the original exception occurred.
