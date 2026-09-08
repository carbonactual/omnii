# OMNII Mission Intelligence

**Status:** Canonical architecture contract

## Purpose

Mission Intelligence evaluates an assembled TEAM before execution. A TEAM is a composition of selected members; Mission Intelligence determines whether that composition is actually ready for the requested mission.

## Chain

```text
REQUESTED OBJECTIVE
        ↓
AUTO-TEAM / TEAM
        ↓
MISSION INTELLIGENCE
        ↓
coverage
+ swirm coverage
+ dependencies
+ conflicts
+ authority requirements
+ human approval
+ execution order
        ↓
READY | INCOMPLETE | BLOCKED
        ↓
MISSION PLAN
        ↓
GOVERNED EXECUTION
```

## Readiness rules

A mission is **blocked** when any required capability or SWIRM is uncovered, a dependency is missing, a dependency cycle exists, selected members explicitly conflict, or a member requires authority without a declared authority reference.

A mission is **incomplete** when structural readiness exists but human approval is required before consequential execution.

A mission is **ready** only when structural requirements are satisfied and no approval gate remains unresolved.

Warnings do not grant readiness. Recommendations do not grant authority.

## Dependency semantics

`dependsOn` expresses execution prerequisites between TEAM members. Mission Intelligence uses deterministic topological ordering and fails closed on missing dependencies or cycles.

## Conflict semantics

`conflictsWith` expresses an explicit incompatibility. Conflicts are evaluated only when both members are present in the TEAM; symmetrical declarations are normalized into one conflict finding.

## Authority semantics

`authorityRequired=true` declares that the member cannot participate in consequential execution without an attached authority reference. Mission Intelligence checks the presence of the reference; the canonical authority runtime remains responsible for validating its legal/constitutional validity.

## Human approval

`humanApprovalRequired=true` never becomes an automatic authorization. Mission readiness becomes `incomplete` until the existing human authority/SEAL workflow resolves the requirement.

## Safe stop

Mission execution should preserve the TEAM execution behavior already established: ordered members, per-member outcomes, stop on blocking failure, and provenance back to each member's originating SWIRM.

## ABBA role

ABBA owns the orchestration decision loop:

`objective → TEAM → mission assessment → mission plan → authority/approval → execution → observation → outcome → learning`.

ABBA may explain, compare, select, compose, plan, monitor and escalate. It does not mint authority, replace human authority, or convert a mission assessment into permission.

## Open-world behavior

Unknown domain requirements remain explicit missing coverage rather than being invented. New capabilities and SWIRMs can be introduced and evaluated without changing the Mission Intelligence contract.

## Reuse rule

Mission Intelligence is reusable across transport, education, property, finance, media, government, enterprise, household, agent and future domain missions. Product-specific code supplies domain members and constraints; the readiness machinery stays common.
