# Carbon Actual Capability, Swarm and Team Contracts

**Status:** Canonical kernel contract

## Capability

A Capability is an outcome-oriented ability exposed through a stable contract.

Minimum contract:

```yaml
capability_id: stable identifier
name: human-readable name
version: contract version
purpose: outcome it provides
inputs: []
outputs: []
preconditions: []
postconditions: []
constraints: []
quality_metrics: []
required_resources: []
authority_requirements: []
safety_requirements: []
provenance_requirements: []
interfaces: []
implementations: []
```

A capability contract is independent of its provider. This is what makes substitution possible.

## Swarm

A Swarm groups implementations that can satisfy the same or related capability contract.

Minimum contract:

```yaml
swarm_id: stable identifier
capability_refs: []
members: []
selection_policy: policy reference
evaluation_policy: policy reference
benchmark_refs: []
compatibility_matrix: reference
fallback_policy: reference
learning_policy: reference
status: active
```

Each member receives an evaluation record containing:

- capability fit
- quality
- reliability
- latency
- cost
- privacy
- security
- openness
- interoperability
- maturity
- provenance
- resource demand
- failure modes
- contextual suitability

No member is permanently preferred merely because it entered first.

## Team

A Team is a composition of capabilities selected to accomplish an objective.

Minimum contract:

```yaml
team_id: stable identifier
objective: desired outcome
capability_requirements: []
member_refs: []
role_assignments: []
authority: reference
workflow: reference
resources: []
constraints: []
success_metrics: []
exit_conditions: []
```

Members may be humans, AI agents, models, organizations, tools, services, machines or physical resources.

## Team formation

```text
OUTCOME
  ↓
CAPABILITY DECOMPOSITION
  ↓
SWARM DISCOVERY
  ↓
EVALUATION
  ↓
SELECTION / COMBINATION / SUBSTITUTION
  ↓
TEAM
  ↓
WORKFLOW
```

## Runtime adaptation

A Team may substitute a member when the capability contract remains satisfied and authority/policy permit substitution.

Examples:

- provider outage
- cost threshold exceeded
- latency threshold exceeded
- security policy changed
- better capability becomes available
- physical resource unavailable

The substitution is recorded in provenance and Pulse.

## Learning loop

Team outcomes update capability evaluations and Swarm intelligence. Learning must not silently rewrite historical records.

## Human participation

Where a workflow requires human judgment, the Team contract must represent the human role explicitly. Automation cannot erase a required human authority boundary.

## Future capability classes

The contract is entity-agnostic. New forms of intelligence, biological capability, robotics, autonomous organizations or other future participants may implement capabilities if they satisfy the applicable identity, authority, safety, provenance and governance requirements.
