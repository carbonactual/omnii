# OMNII Continuity Fabric Binding

**Status:** Canonical architecture contract
**Authority:** Derived from `CANON.md` §14.10
**Purpose:** Define continuity as a cross-cutting property of existing OMNII primitives rather than introduce a competing continuity primitive.

## 1. Core rule

Continuity is the ability of a canonical object, entity, relationship, authority context, value position, service or workflow to remain identifiable, attributable, reconstructable and recoverable across failure, replacement, migration, suspension, provider change, device loss, credential loss and lifecycle transition where lawful and applicable.

Continuity is **not** a new root object, identity, registry, storage system, authority system, or provider account.

## 2. Existing primitive binding

| Continuity concern | Existing canonical primitive | Contract |
|---|---|---|
| Persistent identity | `# / HASH` | Preserve canonical subject identity and human↔intelligence association without collapsing authority. |
| Human authority | `SEAL` | Preserve consent, attestation, approval, scope, delegation and revocation context. |
| Canonical anchor | `ROOT` | Preserve durable verified identity/state context and root lineage. |
| Canonical state | Canonical Object / State | Preserve authoritative condition and meaningful lifecycle transitions. |
| Change reconstruction | `EVENT / TRACEABILITY` | Preserve material transitions, actors, authority, context, outcomes and evidence references. |
| Protected preservation | `VAULT` | Preserve critical state, evidence and recoverable material under applicable access policy. |
| Residual/security lineage | `ASH` | Preserve attributable residual, waste, security and recovery lineage where applicable. |
| Governed restoration | `PHOENIX` | Execute authorized restoration/recovery/response workflows; restoration never creates new authority. |
| Current reality | `ACTUAL` | Present current operational state without becoming a competing canonical truth. |
| Discoverable projection | `ATLAS` | Expose governed maps, dependencies and public/discoverable projections from canonical state. |
| Crossing/handoff/settlement | `I/O` | Preserve boundary transitions, movement, handoff and settlement semantics. |

## 3. Continuity invariant

For every continuity-critical object:

`canonical identity + authority + state + evidence + lineage + dependencies + viable recovery/exit path`

must remain reconstructable to the degree required by its risk and purpose.

A provider's internal account, database row, session, device credential or export is evidence/implementation state, not the continuity root.

## 4. Failure handling

A continuity event may be caused by:

- provider outage;
- account suspension or lock;
- device loss or replacement;
- credential/passkey/authenticator loss;
- DNS or hosting failure;
- repository/cloud/service replacement;
- organizational administrator transition;
- AI-agent compromise or revocation;
- payment/settlement interruption;
- product retirement;
- provider migration;
- data corruption;
- security incident;
- lawful governance transition.

The ecosystem response is to preserve the canonical record, determine current authority, reconstruct last-known-good state, identify dependencies, protect evidence, and execute the permitted recovery/handoff path.

## 5. Recovery is not reset

A provider reset may replace a credential or local access mechanism. Ecosystem continuity recovery must instead reconnect the authorized actor to the existing canonical object and its preserved lineage.

No recovery action may:

- create unbounded authority;
- erase prior authority history;
- conceal material state changes;
- discard evidence necessary for reconstruction;
- replace canonical identity with a provider-specific recovery identity;
- bypass higher-level human or constitutional authority.

## 6. Portability binding

When an object leaves or changes providers, continuity requires preservation of material:

- identity;
- schema and semantics;
- relationships;
- authority/delegation state;
- configuration;
- provenance;
- dependencies;
- lifecycle state;
- evidence;
- obligations/liability;
- value/settlement context;
- handoff and successor information.

Byte export alone is insufficient where these elements are necessary to continue operation.

## 7. Provider-neutral continuity

Adapters may translate provider-specific mechanisms into canonical state, evidence and events. Adapters may never become the sole authoritative representation of continuity.

Provider replacement should be a mapping and handoff problem, not an identity recreation problem.

## 8. AI and agent continuity

For every consequential agent action, continuity preserves:

`principal → delegation chain → capability → intent/context → provider/tool path → action → result → evidence → liability`

Revoking an agent does not erase the principal's history. Replacing an agent does not erase the principal's authority lineage.

## 9. Continuity test

A design is conformant only when the team can answer:

1. What canonical object survives the failure?
2. What proves who currently has authority?
3. What was the last verified state?
4. What events/evidence reconstruct the transition?
5. What dependencies failed or changed?
6. What existing primitive preserves the protected state?
7. What authorized recovery or handoff path exists?
8. What must remain portable after provider replacement?
9. What liabilities, obligations and value positions survive the transition?
10. Can the action be reconstructed without inventing a second truth?

Failure to answer these questions is a continuity-conformance failure.