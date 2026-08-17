# Carbon Actual Resource, Capacity, Availability, Allocation & Scheduling Contract

**Status:** Canonical kernel contract

Carbon Actual must distinguish what exists, what it can do, how much of it is available, who may use it, and when it should be allocated.

## Resource

A Resource is anything that can be consumed, reserved, assigned, transformed, maintained or otherwise contribute to an outcome.

A Resource may be:

- a human contribution
- intelligence
- hardware
- software/service capacity
- money/value
- energy
- data
- space
- time
- material
- infrastructure
- institutional capacity
- future/unknown resource classes

Resource is a role, not a physical/digital category.

## Capacity

Capacity describes the amount or level of capability a participant/resource can provide under stated conditions.

Capacity may be:

- instantaneous
- maximum
- sustainable
- remaining
- reserved
- committed
- degraded
- recoverable

Capacity must not be confused with capability. A participant may have a capability but insufficient capacity to execute it now.

## Availability

Availability describes whether a resource or capability can actually be accessed during a specified context and time window.

```text
CAPABILITY ≠ CAPACITY ≠ AVAILABILITY ≠ AUTHORITY
```

Something may be capable but unavailable, available but unauthorized, or authorized but lacking sufficient capacity.

## Allocation

Allocation assigns available capacity/resources to an objective while respecting authority, constraints, priorities and value.

Allocation considers:

- objective
- urgency
- capability fit
- capacity
- availability
- authority
- constraints
- dependencies
- cost/value
- risk
- fairness/equity policy
- continuity requirements
- opportunity cost

## Reservation

A reservation temporarily commits availability without necessarily consuming the resource.

Reservations have owner/authority, scope, time window, conditions and expiration.

## Scheduling

Scheduling creates an ordered or time-bounded execution plan from requirements, resources, dependencies, availability and constraints.

Scheduling must support:

- deadlines
- recurring work
- dependencies
- priorities
- parallel execution
- resource conflicts
- substitutions
- cancellation
- rescheduling
- emergency override under authority

## Matching

Matching connects an outcome requirement with suitable capability/resource implementations.

```text
OUTCOME
  ↓
REQUIREMENTS
  ↓
CAPABILITY MATCH
  ↓
SWARM
  ↓
CAPACITY + AVAILABILITY
  ↓
AUTHORITY + CONSTRAINTS
  ↓
ALLOCATION
  ↓
SCHEDULE
  ↓
TEAM / WORKFLOW
```

## Substitution

If an allocated implementation becomes unavailable or unsuitable, the system may select another implementation from the relevant Swarm when the capability contract remains satisfied.

Substitution must preserve safety, authority and provenance.

## Resource lifecycle

```text
identified → available → reserved → allocated → consumed/used → released/returned → maintained/replenished → retired
```

Not every resource follows every state.

## Scarcity

Scarcity is represented explicitly. The system should not assume unlimited resources.

Scarcity can affect Value, allocation priority, scheduling and opportunity cost.

## Maintenance

Capacity can change through utilization, degradation, maintenance, replenishment and replacement. This provides the universal connection to Spare.

## Human capacity

Human capability and capacity must account for consent, wellbeing, availability, qualification, role, workload and applicable safeguards. Human beings are not merely interchangeable units of labor.

## Intelligence capacity

Intelligence capacity may include inference, reasoning, memory, tool access, context window, compute, autonomy limits, model specialization, budget and authorization.

## Hardware capacity

Hardware capacity may include compute, storage, power, transport, mechanical capability, sensor availability, actuator availability and condition.

## Software capacity

Software/service capacity may include concurrency, quota, throughput, execution time, licensing constraints and dependency availability.

## Value and allocation

Allocation may use Value as an input, but Value must not become the sole allocation criterion where safety, rights, law, human welfare or governance impose stronger constraints.

## Continuity

Critical resources should support redundancy, fallback, recovery and continuity planning where appropriate.

## Universal rule

Products must reuse this contract rather than creating separate resource, booking, scheduling, inventory, workforce, compute or maintenance foundations for each product branch.
