# OMNII Open-World Schema

**Status: CANONICAL IMPLEMENTATION SCHEMA**

The open-world schema persists the constitutional distinctions required to represent arbitrary scenarios without enumerating them.

## Reality / knowledge

`omnii_knowledge_assertions` stores observations, claims, inferences, hypotheses and simulations. Provenance and confidence are mandatory. Occurrence, observation, recording and effective time remain distinct.

## Causality

`omnii_causal_relations` stores typed relations including causes, contributors, enablers, preventers, triggers, correlations, intentions, hypotheses and disputed/unknown causes. Sequence alone is never persisted as proof of causation.

## Scenarios

`omnii_scenario_nodes` and `omnii_scenario_edges` represent actual, planned, hypothetical, simulated and counterfactual paths. Edges support sequence, branch, merge, reversal, dependency and feedback.

## Quality and completeness

`omnii_quality_assessments` stores eight independent quality dimensions. `omnii_completeness_gaps` records missing requirements rather than allowing a workflow to silently declare itself complete.

## No-silent-loss

`omnii_reconciliations` records expected vs actual results and requires an explicit exception for mismatches and a recovery record for recovered states.

## Security boundary

All new tables have RLS enabled. Authenticated access is explicit; service-role operations remain governed by the existing backend boundary. Public/anonymous access is not granted by default.

## Evolution

These tables are additive and intentionally reference OMNII objects by stable textual IDs rather than creating a second identity system. Future schema versions must preserve historical records and provide explicit mappings/supersession semantics.
