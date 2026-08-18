# OMNII Authority Runtime

## Purpose

`AuthorityRuntime` is the executable boundary between governance-issued authority and consequential runtime authorization. It materializes the existing authority contract; it does not create a new constitutional authority model.

```text
Governance / human / institution
        ↓
AuthorityRuntime.issue / delegate
        ↓
Delegated Authority
        ↓
validate / authorizeAction
        ↓
Capability
        ↓
Execution
```

## Invariants

- Capability does not imply authority.
- Intelligence does not imply authority.
- Orchestration does not imply authority.
- ABBA cannot issue or mint authority.
- Agents cannot issue, revoke, or suspend governance authority.
- A delegate must possess the parent authority being delegated.
- `delegated_scope ⊆ parent_scope`.
- `delegated_capabilities ⊆ parent_capabilities`.
- delegated resource constraints cannot exceed parent resource constraints.
- delegated context cannot exceed parent context.
- delegated expiry cannot exceed parent expiry.
- Revoked, suspended, or expired authority cannot authorize consequential actions.
- Authority mutations are version protected and idempotent where a key is supplied.
- Consequential authority decisions emit immutable runtime events through the existing `EventStore`.

## Persistence

Authority records use the existing `PersistencePort` and the `authorities` persistence collection. The memory adapter provides deterministic contract semantics. The Supabase adapter maps the collection to `omnii_authorities` and uses narrowly scoped PostgreSQL functions for issuance, revocation, and suspension.

PostgreSQL RLS is enabled without broad authenticated policies. This preserves the existing server-side security boundary until an application identity model is authoritative enough to define narrower policies.

## ABBA boundary

ABBA remains an orchestrator. Its authority path remains:

`ABBA → AuthorityBroker → delegated authority → AgentRuntime → capability → execution`.

`AuthorityRuntime` explicitly rejects ABBA as an issuer and rejects authority-bearing agents as issuers/delegators.
