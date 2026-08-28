# Institutional Finance, Opportunity, Integrity & Conformance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the reusable OMNII institutional fabric with finance/commerce, opportunity/workforce, digital-integrity/security, and cross-system conformance capabilities that can be composed into government, agency, school, club, nonprofit, defence, election, regulator and private-enterprise deployments.

**Architecture:** Preserve the 28 constitutional registries as authoritative domains. Add reusable logical registries, catalogs, workflows, automations and deployment contracts above them, linked through the existing institutional runtime. Keep institutional law, authority, local data and policy at the configuration/domain boundary and keep providers replaceable behind adapters.

**Tech Stack:** Supabase/Postgres migrations, existing OMNII runtime tables/contracts, Markdown canonical architecture documents, GitHub main branch, existing RLS/security conventions.

**Spec:** `docs/architecture/OMNII_INSTITUTIONAL_REGISTRY_ATLAS.md`, `docs/architecture/OMNII_INSTITUTIONAL_CAPABILITY_CATALOG.md`, `docs/architecture/OMNII_INSTITUTIONAL_OPERATING_SYSTEM.md`, `docs/architecture/OMNII_REUSABLE_INSTITUTIONAL_COMPOSITION.md`.

## Global Constraints

- Constitutional registry source of truth remains the existing 28-registry model.
- New institutional registries are logical registries, projections or domain packs unless a genuine new constitutional state class is proven.
- Every executable capability requires identity, authority, policy, provenance, evidence, audit and lifecycle boundaries where applicable.
- High-consequence legal, financial, employment, safety and access actions preserve required human/institutional approval boundaries.
- Provider integrations remain replaceable and portable; no vendor becomes a constitutional dependency.
- Supabase DDL must be applied through migrations and protected by appropriate RLS policies.
- Every deployment must remain exportable and handoffable.

---

### Task 1: Institutional Finance & Commerce Atlas

**Files:**
- Create: `docs/architecture/OMNII_INSTITUTIONAL_FINANCE_COMMERCE_ATLAS.md`
- Modify: `docs/architecture/OMNII_INSTITUTIONAL_COMPOSITION_INDEX.md`
- Test: Supabase catalog integrity queries

**Interfaces:**
- Consumes: existing Value, Ledger, Settlement, Registry, Workflow and Execution contracts.
- Produces: reusable finance/payment/subscription/procurement/commerce registry and workflow definitions.

- [ ] **Step 1: Define the reusable registry and object families**

Include budgets, funds, allocations, commitments, invoices, receivables, payables, payments, receipts, refunds, subscriptions, dues, grants, procurement, supplier, quotation, solicitation, purchase order, contract, settlement and reconciliation.

- [ ] **Step 2: Define the universal finance lifecycle**

`need → quote/budget → commitment → authorization → execution → invoice → validation → payment → reconciliation → settlement → reporting → audit`

- [ ] **Step 3: Define subscription and recurring-payment lifecycle**

`offer → signup → eligibility → authorization → billing schedule → charge → receipt → renewal → pause/cancel → refund/settlement → audit`

- [ ] **Step 4: Define financial-control gaps**

Cover duplicate payment, unmatched invoice, unauthorized approver, split-payment anomalies, budget overrun, orphan transaction, stale commitment, failed settlement and reconciliation mismatch.

- [ ] **Step 5: Add the Atlas and update the canonical index**

- [ ] **Step 6: Verify catalog terms and references**

Run Supabase integrity queries against the related registry/capability tables.

- [ ] **Step 7: Commit Task 1**

Commit message: `Add institutional finance and commerce atlas`

---

### Task 2: Opportunity, Workforce, Promotion & Deployment Atlas

**Files:**
- Create: `docs/architecture/OMNII_INSTITUTIONAL_OPPORTUNITY_WORKFORCE_ATLAS.md`
- Modify: `docs/architecture/OMNII_INSTITUTIONAL_COMPOSITION_INDEX.md`
- Test: Supabase catalog integrity queries

**Interfaces:**
- Consumes: Person, Institution, Capability, Authority, Form, Workflow, Execution, Value and Continuity contracts.
- Produces: reusable opportunity, recruitment, qualification, promotion, transfer, posting and deployment compositions.

- [ ] **Step 1: Define opportunity families**

Tenders, grants, scholarships, jobs, vacancies, contracts, partnerships, memberships, investment opportunities, service opportunities, sponsorships and referrals.

- [ ] **Step 2: Define workforce lifecycle**

`vacancy → application → screening → assessment → interview → recommendation → approval → appointment → onboarding → performance → progression → separation`

- [ ] **Step 3: Define promotion lifecycle**

`eligibility → qualification → service/performance evidence → vacancy/establishment → recommendation → authority → approval → effective date → notification → audit → appeal`

- [ ] **Step 4: Define deployment lifecycle**

`readiness → assignment → authorization → logistics → deployment → execution → status → relief/return → debrief → evidence → expenditure reconciliation → closeout`

- [ ] **Step 5: Define training/credential/availability linkage**

Connect capability, credential, training, roster, shift, availability and assignment without duplicating canonical person/resource state.

- [ ] **Step 6: Add Atlas and update index**

- [ ] **Step 7: Verify and commit Task 2**

Commit message: `Add institutional opportunity workforce atlas`

---

### Task 3: Digital Infrastructure Integrity & Cyber Governance Atlas

**Files:**
- Create: `docs/architecture/OMNII_INSTITUTIONAL_DIGITAL_INTEGRITY_ATLAS.md`
- Modify: `docs/architecture/OMNII_INSTITUTIONAL_COMPOSITION_INDEX.md`
- Test: Supabase integrity and security metadata queries

**Interfaces:**
- Consumes: Infrastructure, Asset, Identity, Authority, Provenance, Communication, Event, Security and Continuity contracts.
- Produces: digital asset, access, deployment, change, vulnerability, incident, vendor and recovery governance compositions.

- [ ] **Step 1: Define digital asset registry families**

Domains, subdomains, websites, applications, APIs, certificates, DNS records, servers, databases, storage, repositories, software licenses, deployments and releases.

- [ ] **Step 2: Define access/authority records**

Administrator, privileged account, trusted device, service account, deployment permission, publishing right, break-glass access and revocation.

- [ ] **Step 3: Define integrity monitoring lifecycle**

`inventory → baseline → monitor → detect → classify → contain → investigate → remediate → verify → close → learn`

Detect unauthorized content, SEO spam, suspicious redirects, credential misuse, unexplained deployment, domain changes, stale assets and unowned subdomains.

- [ ] **Step 4: Define vendor and supply-chain accountability**

Link vendor, contract, access scope, hosted asset, service level, security obligations, incidents, exit strategy and handoff package.

- [ ] **Step 5: Define backup/recovery/continuity evidence**

Backups, restore tests, recovery objectives, recovery events, failover, rollback and operator handoff.

- [ ] **Step 6: Add Atlas and update index**

- [ ] **Step 7: Verify and commit Task 3**

Commit message: `Add institutional digital integrity atlas`

---

### Task 4: Cross-System Conformance, Gap Detection & Handoff

**Files:**
- Create: `docs/architecture/OMNII_INSTITUTIONAL_CONFORMANCE_ATLAS.md`
- Modify: `docs/architecture/OMNII_INSTITUTIONAL_COMPOSITION_INDEX.md`
- Test: Supabase conformance queries and existing CVE/completeness tables

**Interfaces:**
- Consumes: all existing registry, form, workflow, automation, execution, event, evidence, reconciliation, value, audit and continuity contracts.
- Produces: conformance matrix, gap/loophole categories, orphan detection, completeness tests and deployment handoff contract.

- [ ] **Step 1: Define cross-system link invariants**

Every consequential action should resolve to actor, authority, intent/request, workflow/case where applicable, execution, event, evidence, resulting state and audit trail.

- [ ] **Step 2: Define orphan/duplication checks**

Detect orphan registry records, orphan forms, orphan tasks, orphan payments, orphan assets, duplicate identities, duplicate submissions, duplicate financial events and conflicting source-of-truth records.

- [ ] **Step 3: Define authorization loophole checks**

Expired authority, unauthorized signer, self-approval, incompatible roles, privilege escalation, missing approval, skipped workflow step, undocumented override and excessive access scope.

- [ ] **Step 4: Define operational completeness checks**

Stale cases, missed SLAs, failed notifications, unhandled exceptions, missing evidence, unreconciled transactions, untested backups, unowned assets, unpatched digital assets and missing exit paths.

- [ ] **Step 5: Define deployment/handoff artifact contract**

`core + modules + domain pack + configuration + data + forms + workflow versions + automations + integrations + security/privacy + tests/evidence + monitoring + backup/recovery + exit/migration`

- [ ] **Step 6: Add conformance Atlas and update index**

- [ ] **Step 7: Verify against CVE/completeness structures and commit Task 4**

Commit message: `Add institutional conformance and handoff atlas`

---

### Task 5: Supabase Atlas Runtime & Security Hardening

**Files:**
- Create: `supabase/migrations/<timestamp>_institutional_finance_opportunity_integrity_conformance.sql`
- Modify: Supabase catalog tables only through migration
- Test: SQL integrity queries, migration list, security advisors

**Interfaces:**
- Consumes: existing `omnii_registries`, `omnii_objects`, `omnii_workflows`, `omnii_executions`, `omnii_events`, `omnii_audit`, `omnii_reconciliations`, CVE/completeness structures.
- Produces: versioned catalog rows for the new reusable institutional modules and cross-links.

- [ ] **Step 1: Check current catalog rows and avoid duplicate identifiers**

- [ ] **Step 2: Add reusable module/capability metadata**

- [ ] **Step 3: Add cross-link metadata for finance → opportunity → integrity → conformance**

- [ ] **Step 4: Add or strengthen RLS policies for the new catalog tables/rows**

- [ ] **Step 5: Add indexes supporting registry, module, lifecycle and lookup queries**

- [ ] **Step 6: Verify migration and row counts**

- [ ] **Step 7: Run security/performance advisors**

- [ ] **Step 8: Commit migration**

Commit name: `institutional_finance_opportunity_integrity_conformance`

---

### Task 6: Whole-System Verification & Canonical Index Update

**Files:**
- Modify: `docs/architecture/OMNII_INSTITUTIONAL_COMPOSITION_INDEX.md`
- Test: GitHub repository checks; Supabase migration list, catalog counts and advisors

- [ ] **Step 1: Verify GitHub main contains all new Atlas documents**

- [ ] **Step 2: Verify Supabase migration is applied**

- [ ] **Step 3: Verify no duplicate logical registry/capability identifiers were introduced**

- [ ] **Step 4: Verify all new modules have authority, provenance, lifecycle and replacement/handoff requirements**

- [ ] **Step 5: Verify all new workflows have failure/exception paths**

- [ ] **Step 6: Verify all high-consequence actions preserve approval boundaries**

- [ ] **Step 7: Record remaining security advisories honestly**

- [ ] **Step 8: Final commit**

Commit message: `Complete institutional fabric finance opportunity integrity conformance`
