# CAPABILITY

**Status: CANONICAL CONSTITUTIONAL KERNEL**

## Purpose
Capability defines what a Being, agent, organization, service or object can perform, provide or expose, while preserving the distinction between ability and authority.

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
3. Invocation is bounded by scope, constraints, policy and lifecycle.
4. Capability changes and invocations are auditable.
5. A capability cannot silently expand its own authority.
6. Compound capabilities expose their constituent capabilities and constraints.

## Inputs
Identity, declared ability, evidence, credentials, authority grants, constraints, context and resource requirements.

## Outputs
Capability definition/state, authorization result, invocation interface, denial or escalation result and provenance.

## Lifecycle
`Declared → Verified → Granted → Available → Invoked → Suspended/Revoked → Retired`

## Dependencies and Relationships
Capability belongs to or is delegated to Identity; is evidenced by Knowledge and Trust; enables Execution; consumes Resource; participates in Composition; and may be coordinated through Relationship and ABBA.

## Composition Rules
Capabilities may be composed into compound capabilities. A compound capability must retain constituent capabilities, authorization boundaries, required resources, input/output contracts and failure semantics.

## Implementation Contract
A registered capability must have stable identity, type/version, provider/owner, scope, required authority, inputs, outputs, resource requirements, constraints, lifecycle and invocation/audit contract. Discovery must not imply authorization.

## ABBA
ABBA may discover, match, recommend, compose, invoke, monitor and revoke capability use where authorized. ABBA must never infer unrestricted authority from capability availability.
