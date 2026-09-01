# Transport Certification & Tokenization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the existing OMNII transport certification layer with standards-aware identity, credential, provenance, asset-passport, software-state, tokenization, and future/autonomy verification states without creating competing transport semantics.

**Architecture:** Extend the existing `TransportCertificationRuntime` and catalog over the canonical OMNII persistence boundary. Certification records distinguish source/issuer, verification method, evidence, lifecycle and jurisdiction from product status. Tokenization is represented as a governed lifecycle state and reference, not as an assertion that a regulated security or public asset has been issued.

**Tech Stack:** TypeScript, Node test runner, existing OMNII runtime persistence, W3C VC/DID concepts, vehicle cybersecurity/software-update evidence, digital-product/battery-passport concepts, Nigerian digital-asset regulatory classification.

**Spec:** `docs/superpowers/specs/2026-09-01-charter-canonical-journey-runtime-design.md`

## Global Constraints

- Existing OMNII canonical transport semantics remain authoritative.
- Certification records must preserve provenance, authority, evidence, lifecycle and auditability.
- Tokenization must never imply legal ownership, security status, custody or investor rights without an applicable issuer/jurisdiction/authority record.
- External standards are interoperable references, not claims that OMNII itself is the issuing authority.
- Future technologies use explicit maturity states: operational, pilot, ready, emerging, research, vision.
- Existing CHARTER, NAB, Fleet, Logistico and movement boundaries remain unchanged.

---

## Tasks

- [ ] Add a failing test for standards-aware certification metadata.
- [ ] Add a failing test for evidence/provenance and verification-method records.
- [ ] Add a failing test for tokenization lifecycle states and regulatory/jurisdiction metadata.
- [ ] Add a failing test for future/autonomy certification states and human-oversight metadata.
- [ ] Extend certification runtime types and persistence records minimally to satisfy the tests.
- [ ] Extend the canonical transport catalog with VC/DID, asset passport, software/cybersecurity, tokenization and autonomy verification profiles.
- [ ] Add documentation mapping the implementation to W3C VC/DID, mobile driving licence, EU battery/product-passport, UNECE software-update/cybersecurity, IMO autonomous-ship, and Nigerian digital-asset concepts.
- [ ] Export the new certification schema/runtime helpers from the OMNII runtime package.
- [ ] Run focused runtime tests and package typecheck.
- [ ] Inspect the diff and verify no transport ontology was duplicated or redefined.
