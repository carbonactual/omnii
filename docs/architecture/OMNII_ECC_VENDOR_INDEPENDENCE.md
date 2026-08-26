# OMNII Execution Coordination — Vendor Independence

**Status: CANONICAL HARDENING**

OMNII does not require an ECC product, platform or paid execution-coordination service.

The phrase **Execution Coordination Center (ECC)** is therefore removed as a required architectural dependency. The coordination function is decomposed into standard, replaceable capabilities:

- workflow execution;
- task scheduling;
- queues/event delivery;
- authorized workers/agents;
- IO/integration;
- policy and authority checks;
- state transitions;
- audit/evidence;
- ABBA orchestration where applicable;
- human intervention and escalation.

A future implementation MAY use a component named ECC as an internal convenience or adapter, but the constitutional architecture MUST NOT require it, and no paid/proprietary ECC vendor is permitted to become a hidden dependency.

The removal preserves functionality by composition rather than by reliance on a branded coordination product.
