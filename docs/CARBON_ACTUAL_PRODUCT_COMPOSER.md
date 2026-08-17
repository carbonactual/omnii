# Carbon Actual Universal Product Composer

**Status:** Canonical design

## Purpose

Turn a request into a curated, reusable Carbon Actual system without rebuilding common capabilities.

## 1. Input

A request may be:

- product
- service
- contract
- organization
- government capability
- physical deployment
- human task
- AI task
- machine task
- infrastructure
- partnership
- opportunity
- maintenance need

The input is converted into an **Outcome Specification**.

## 2. Composition pipeline

```text
REQUEST
  ↓
OUTCOME SPECIFICATION
  ↓
CAPABILITY DECOMPOSITION
  ↓
UNIVERSAL OBJECT RESOLUTION
  ↓
SWARM DISCOVERY
  ↓
BENCHMARK / EVIDENCE / FIT
  ↓
CURATION
  ↓
TEAM COMPOSITION
  ↓
WORKFLOW COMPOSITION
  ↓
INTEGRATION / ADAPTER SELECTION
  ↓
AUTHORITY + CONSENT + SECURITY
  ↓
VALUE / ECONOMIC DESIGN
  ↓
DEPLOYMENT
  ↓
PULSE
  ↓
VALUE / LIABILITY / ASSET ANALYSIS
  ↓
LEDGERS / SETTLEMENT
  ↓
LEARNING
  ↓
BECOMING
```

## 3. Capability decomposition

The Composer identifies required capabilities before selecting products or vendors.

Example:

```text
Transport management
 ├─ identity
 ├─ route registry
 ├─ vehicle registry
 ├─ driver capability
 ├─ scheduling
 ├─ payments
 ├─ communication
 ├─ maintenance
 ├─ Spare
 ├─ safety
 ├─ government reporting
 ├─ analytics
 └─ human operations
```

The capabilities are then drawn from existing Carbon Actual primitives and Swarms.

## 4. Swarm selection

For each capability the Composer asks:

- Does Carbon Actual already provide it?
- Which Swarms contain candidates?
- What evidence exists?
- What is the best fit for this context?
- Can multiple candidates work together?
- Is an open/free/open-source/white-label alternative preferable?
- What is the exit/substitution path?
- What are the security/privacy implications?
- What is the lifecycle cost?

The Composer must not select by popularity alone.

## 5. Team formation

The Composer creates a Team with explicit roles:

```text
Role
Capability
Member
Authority
Inputs
Outputs
Dependencies
Constraints
Success criteria
Fallback
```

A Team may be human, AI, machine or hybrid.

## 6. Workflow

A workflow defines how Team members interact.

Workflow primitives include:

- trigger
- condition
- task
- decision
- approval
- delegation
- parallel execution
- sequence
- retry
- timeout
- escalation
- compensation
- audit
- completion

## 7. Integration

Integration uses adapters. The product contract depends on the capability interface, not a particular provider.

Provider substitution must be possible without redesigning the product wherever technically feasible.

## 8. Physical execution

The Composer must ask whether the outcome requires:

- human action
- location
- vehicle
- machine
- robot
- hardware
- material
- building
- physical delivery
- maintenance
- inspection
- social interaction

A digital workflow is never assumed to be sufficient.

## 9. Economic composition

Every build identifies:

- contributors
- beneficiaries
- resources consumed
- obligations
- ownership/rights
- settlement
- Value measurements
- Pulse measurements
- monetization opportunities
- residuals

Monetization must be derived from legitimate value creation, not from unnecessary extraction or surveillance.

## 10. Security composition

Every build receives security defaults:

- identity
- least privilege
- consent
- secrets/key management
- encryption
- provenance
- audit
- isolation
- abuse controls
- recovery
- Ash/Phoenix handling where relevant

## 11. Human-first decision

The Composer evaluates whether a task should be:

- human-led
- AI-led
- machine-led
- hybrid

Where humans can safely and meaningfully perform the work effectively, the system should favor enabling human participation rather than replacing it solely for automation.

## 12. Output

The Composer produces a **Branch Specification** containing:

- purpose
- objects
- capabilities
- Swarms
- Team
- workflows
- integrations
- interfaces
- data model
- identity/authority
- security/privacy
- physical requirements
- economics
- ledgers
- KPIs
- Pulse measurements
- lifecycle
- deployment plan
- fallback/substitution plan

## 13. Reusability

Before creating anything new, the Composer searches the ecosystem capability registry.

A capability is created as a new universal primitive only if it is genuinely reusable across domains.

Otherwise it remains a branch-specific composition.

## 14. Continuous optimization

After deployment:

```text
Outcome
 ↓
Pulse
 ↓
Value
 ↓
Performance evidence
 ↓
Team evaluation
 ↓
Swarm update
 ↓
Composer improves
 ↓
Future builds improve
```

## 15. The LEGO rule

> **A product is a composition, not a new universe.**

The ecosystem becomes stronger as reusable capabilities accumulate.
