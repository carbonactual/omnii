# CHARTER — Availability, Workforce & Recovery Engine

**Status:** Canonical Charter build specification  
**Domain:** Universal transport / movement  
**Boundary:** Charter orchestrates movement; IO owns value movement.

## Objective

Make movement executable by resolving the complete operational tuple:

> **What can move + where + when + condition + capacity + who can operate it + authority + infrastructure + recovery path.**

## Availability

Availability is contextual, not a simple boolean. A capability may be available for one journey and unavailable for another because of location, capacity, qualifications, authority, condition, timing, route or infrastructure constraints.

```text
DISCOVERABLE
 → ELIGIBLE
 → AVAILABLE
 → RESERVED
 → ASSIGNED
 → ACTIVE
 → COMPLETED
```

Exceptions use canonical OMNII state/event semantics.

## Operational matching

A movement request can be matched against:

- location and position;
- time window;
- movement mode;
- capacity;
- capability;
- condition/readiness;
- accessibility;
- passenger/cargo constraints;
- operator qualifications;
- authority/permissions;
- infrastructure compatibility;
- route/network constraints;
- environmental conditions;
- handoff compatibility;
- evidence confidence.

## Workforce

Movement execution may require people with verified identity, skills, training, certification, authority and current availability.

Examples include:

- drivers;
- chauffeurs;
- pilots;
- cabin crew;
- captains and maritime crew;
- mechanics;
- engineers;
- dispatchers;
- marshals;
- loaders/handlers;
- instructors;
- inspectors;
- medical/emergency personnel;
- recovery specialists;
- specialized operators.

HR, employment, training and credential semantics remain canonical OMNII capabilities. Charter composes their movement requirements.

## Recovery

Every executable journey should have an exception strategy appropriate to its risk and context.

```text
INCIDENT
 ↓
DETECT
 ↓
LOCATE
 ↓
ASSESS / DIAGNOSE
 ↓
SAFE STATE
 ↓
FIND RECOVERY CAPABILITY
 ↓
MATCH PERSONNEL / EQUIPMENT
 ↓
DISPATCH
 ↓
RECOVER / REPAIR / SUBSTITUTE
 ↓
RECOMPOSE JOURNEY
 ↓
RESUME OR COMPLETE
```

Recovery may use tow trucks, mobile mechanics, spare parts, tools, rescue equipment, replacement vehicles, alternative public transport, commercial providers, authorized government resources or other suitable movement capabilities.

## Maintenance and DIY escalation

Charter can represent the operational workflow from self-help to professional intervention:

```text
SYMPTOM
 → BASIC CHECK
 → SAFE DIY ACTION
 → DIAGNOSIS
 → SPECIALIST REQUIRED?
 → PARTS / TOOLS
 → MOBILE REPAIR / WORKSHOP
 → TEST
 → RETURN TO SERVICE
```

Safety and authority constraints determine when self-service must stop and professional intervention is required.

## Condition and readiness

Movement assets can expose condition/readiness information such as:

- operational;
- restricted;
- degraded;
- inspection due;
- maintenance;
- repair;
- recovery;
- unavailable;
- retired;
- unknown.

The registry must preserve provenance and evidence for condition claims.

## Capacity

Capacity may include:

- passenger capacity;
- seating/accessibility capacity;
- cargo volume;
- payload mass;
- towing capability;
- range/endurance;
- specialist equipment capacity;
- crew requirements.

Capacity is contextual and must not be treated as a universal static number where configuration or operating conditions change it.

## Handoff

A journey may hand off between operators, vehicles, infrastructure and modes. Handoffs must preserve:

- journey identity;
- leg relationship;
- custody/responsibility state;
- passenger/cargo requirements;
- timing;
- evidence;
- authority context;
- next-leg compatibility.

## Product extraction

These capabilities can be packaged into products such as roadside recovery, fleet operations, specialist dispatch, maintenance networks, accessible mobility and door-to-door movement without creating new canonical primitives.

## Boundary invariants

- Identity remains canonical OMNII.
- Authority remains canonical OMNII.
- Workforce identity/credentials remain canonical OMNII.
- Asset identity/lifecycle remains canonical OMNII.
- Economic/value movement remains **IO**.
- Charter owns the movement context, matching, orchestration and recovery composition.

## Architectural invariant

> **A movement is executable only when its required capability, people, authority, infrastructure, timing and recovery conditions can be composed and evidenced.**
