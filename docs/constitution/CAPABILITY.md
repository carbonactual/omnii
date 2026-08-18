# CAPABILITY

## Purpose
Capability defines what a Being, agent, organization, service, or object is able and authorized to do.

## Canonical Objects
- Capability
- Permission
- Skill
- Function
- Interface
- Tool
- Authority grant
- Constraint
- Credential

## Invariants
1. Capability is distinct from authority: ability does not imply permission.
2. Capabilities are attributable to an identity or governed object.
3. Capability invocation is bounded by scope, constraints, and lifecycle.
4. Capability changes are auditable.
5. A capability cannot silently expand its own authority.

## Inputs
Identity, declared ability, evidence, credentials, authority grants, constraints, context, and resource requirements.

## Outputs
A capability definition, capability state, invocation permission, execution interface, or denial/escalation result.

## Lifecycle
Declared → Verified → Granted → Available → Invoked → Suspended/Revoked → Retired.

## Relationships
Capability belongs to or is delegated to an Identity; is evidenced by Knowledge and Trust; enables Execution; consumes Resource; participates in Composition; and may be coordinated through Relationship and ABBA.

## Dependencies
BEING → IDENTITY → KNOWLEDGE → TRUST → CAPABILITY → EXECUTION; RESOURCE constrains realizability.

## Composition Rules
Capabilities may be composed into compound capabilities. Compound capabilities must expose constituent capabilities, authorization boundaries, required resources, and failure semantics.

## ABBA
ABBA may discover, match, recommend, invoke, compose, monitor, and revoke capability use where authorized. ABBA must not infer unrestricted authority from capability availability.
