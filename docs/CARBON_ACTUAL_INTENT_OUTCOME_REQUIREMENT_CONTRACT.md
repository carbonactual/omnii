# Carbon Actual Intent, Outcome, Requirement and Constraint Contract

**Status:** Canonical kernel contract

Carbon Actual must distinguish what someone wants, what success means, what is required to achieve it, and what limits action.

## Intent

Intent represents the declared or inferred purpose behind an action or request.

Intent must retain its source and confidence. An inferred intent must never be silently represented as user-declared intent.

## Outcome

Outcome represents the measurable state sought or produced.

An outcome may be:

- requested
- planned
- attempted
- achieved
- partially achieved
- failed
- disputed
- unknown

## Requirement

A requirement describes what must be available or true for an outcome or capability to be valid.

Examples include resources, qualifications, permissions, safety conditions, dependencies and time windows.

## Constraint

A constraint limits acceptable action or outcome.

Constraints can arise from:

- human preference
- authority
- law/regulation
- safety
- resources
- budget/value
- time
- environment
- technical capability
- organizational policy
- ethics/governance

## Dependency

A dependency identifies another object, capability, resource, relationship or condition needed by an action.

## Opportunity

An opportunity is a contextually relevant possibility that may improve an entity's state or advance an intended outcome.

Opportunity is not obligation.

## Curation

Curation maps:

```text
CURRENT STATE
+ INTENT
+ CAPABILITIES
+ REQUIREMENTS
+ CONSTRAINTS
+ OPPORTUNITIES
+ RELATIONSHIPS
        ↓
POSSIBLE NEXT ACTIONS
```

The system may rank or explain options but should preserve the user's/authorized actor's decision boundary.

## ABBA orchestration boundary

ABBA may discover, evaluate, compose and orchestrate capabilities within declared authority and policy. It must not manufacture authority from intent alone.

## KPI relationship

Outcome definitions become the basis for KPI selection. KPIs should measure progress toward meaningful outcomes rather than merely counting activity.
