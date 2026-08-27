# OMNII Institutional Fabric Conformance

**Status: CANONICAL CONTROL CONTRACT**

This document binds the institutional registry, forms, workflows and automation atlases into one reusable operating fabric.

## Required chain

`identity → institution → registry → form → submission → case → workflow → task/SLA → policy/automation → execution → state/event → evidence/log → decision → reconciliation → payment/finance → audit/compliance → Pulse/Value → continuity`

## Coverage

An institutional deployment may compose these primitives for government, regulators, agencies, schools, universities, clubs, associations, NGOs, companies, financial institutions, security organisations, defence organisations, research bodies and physical operations.

## Required controls

Every deployment must account for identity, authority, provenance, permissions, separation of duties, data classification, lifecycle, audit, evidence, error/exception handling, reconciliation, backup/recovery and handoff.

## Gap detection

The fabric must be capable of detecting at least: duplicate identity, duplicate submission, orphan record, orphan payment, missing evidence, expired authority, expired credential, unauthorized change, skipped workflow step, stuck task, SLA breach, privilege conflict, segregation-of-duty conflict, data mismatch, integration failure, failed execution, partial completion, unclosed case, unexplained financial variance and unsupported state transition.

## Reuse rule

A deployment must prefer existing shared registries, forms, workflows and automations. New implementation is justified only when configuration/composition cannot express the requirement. Repeated domain patterns should be promoted back into reusable capabilities.

## Handoff

A deployment must be exportable as versioned core, modules, domain configuration, data, forms, workflows, automations, integrations, security/privacy settings, operations documentation, tests/evidence and exit/migration information.

## Authority boundary

Technical infrastructure does not grant legal or institutional authority. High-consequence actions remain bounded by the institution's lawful authority, policy and human approval requirements.
