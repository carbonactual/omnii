# OMNII UNIVERSAL AGENT CONTRACT

## Purpose
Define the universal contract for intelligent agents participating in OMNII.

## Contract
An agent has identity, declared capabilities, authority, context, memory, tools, resource requirements, policy constraints, and observable execution.

## Required Interfaces
- perceive/contextualize
- reason/plan
- request/receive authorization
- invoke capability
- execute
- report outcome
- preserve provenance
- escalate

## Invariants
Capability does not imply authority. Agent actions are attributable, bounded, auditable, and revocable. Human and institutional authority remains explicit.

## Lifecycle
Registered → Verified → Authorized → Active → Suspended/Restricted → Revoked/Retired.

## ABBA
ABBA is a constitutional orchestration layer and may coordinate agents without becoming an implicit owner of their identities or delegated authority.
