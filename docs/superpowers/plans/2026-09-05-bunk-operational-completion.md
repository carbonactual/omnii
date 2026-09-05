# BUNK Whole-Ecosystem Operational Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert BUNK from a documented/live-data product surface into a governed operational loop that consumes the whole OMNII ecosystem, with TIP invoked specifically for economic activity.

**Architecture:** BUNK remains a downstream product composition over OMNII's universal identity, authority, graph, registries, evidence, persistence, workflows, agents, events, intelligence, security and operating context. TIP is one foundation tool within that ecosystem and is the canonical route for BUNK economic actions; it is not BUNK's sole dependency. The build uses existing OMNII form, registry, workflow and persistence primitives and adds only BUNK-specific orchestration where needed.

**Tech Stack:** TypeScript, existing `packages/omnii-runtime`, Next.js web app, PostgreSQL/Supabase, existing OMNII forms/registries/workflows, Vitest/node test infrastructure where available.

**Spec:** `docs/superpowers/specs/2026-09-05-bunk-operational-completion-design.md`

## Global Constraints

- BUNK consumes the whole OMNII ecosystem; TIP is the economic foundation tool for BUNK economic actions.
- Do not create a second universal identity, authority/SEAL issuer, universal graph, registry ontology, persistence/Vault, canonical ledger, or canonical economic ontology.
- Intelligence and ABBA may recommend, classify, match or route but cannot grant authority.
- Form submission is not approval; verification is not ownership; listing is not title; representation is not legal fact.
- Every consequential transition carries identity/context, provenance/evidence, authority where required, and an auditable outcome.
- External land/title, regulated finance, insurance, licensed-professional and government integrations remain explicit integration boundaries.
- Prefer reuse of existing OMNII capabilities and canonical tables before adding new persistence.

---

### Task 1: Establish BUNK Whole-Ecosystem Capability Map

**Files:**
- Create: `packages/omnii-runtime/src/bunk-ecosystem-capability-map.ts`
- Test: `packages/omnii-runtime/tests/bunk-ecosystem-capability-map.test.ts`
- Modify: `packages/omnii-runtime/src/index.ts`

**Interfaces:**
- Produces `BunkEcosystemCapabilityFamily`, `BunkEcosystemCapability`, `BUNK_ECOSYSTEM_CAPABILITIES`, `assertBunkEcosystemCapabilityUse`.
- Capability families must include `IDENTITY`, `AUTHORITY`, `REGISTRY`, `EVIDENCE`, `PERSISTENCE`, `WORKFLOW`, `AGENT`, `INTELLIGENCE`, `EVENTS`, `SECURITY`, `OPERATING_CONTEXT`, `ECONOMICS`, `DISCOVERY`, and `INTEGRATION`.
- `ECONOMICS` must identify `TIP` as the canonical economic tool while all other families remain OMNII ecosystem capabilities.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import {
  assertBunkEcosystemCapabilityUse,
  BUNK_ECOSYSTEM_CAPABILITIES,
} from "../src/bunk-ecosystem-capability-map";

describe("BUNK whole-ecosystem capability map", () => {
  it("exposes OMNII capabilities beyond TIP", () => {
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "IDENTITY")).toBe(true);
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "WORKFLOW")).toBe(true);
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "EVIDENCE")).toBe(true);
    expect(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "ECONOMICS" && c.provider === "TIP")).toBe(true);
  });

  it("rejects BUNK from claiming universal primitives", () => {
    expect(() => assertBunkEcosystemCapabilityUse({
      capability: "universal-identity",
      provider: "BUNK",
    })).toThrow(/universal identity/i);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-ecosystem-capability-map.test.ts`
Expected: FAIL because the module and assertion do not yet exist.

- [ ] **Step 3: Write the minimal implementation**

```ts
export type BunkEcosystemCapabilityFamily =
  | "IDENTITY" | "AUTHORITY" | "REGISTRY" | "EVIDENCE" | "PERSISTENCE"
  | "WORKFLOW" | "AGENT" | "INTELLIGENCE" | "EVENTS" | "SECURITY"
  | "OPERATING_CONTEXT" | "ECONOMICS" | "DISCOVERY" | "INTEGRATION";

export interface BunkEcosystemCapability {
  family: BunkEcosystemCapabilityFamily;
  capability: string;
  provider: "OMNII" | "TIP";
}

export const BUNK_ECOSYSTEM_CAPABILITIES: readonly BunkEcosystemCapability[] = [
  { family: "IDENTITY", capability: "identity", provider: "OMNII" },
  { family: "AUTHORITY", capability: "seal-and-authority", provider: "OMNII" },
  { family: "REGISTRY", capability: "registries-and-graph", provider: "OMNII" },
  { family: "EVIDENCE", capability: "proof-and-provenance", provider: "OMNII" },
  { family: "PERSISTENCE", capability: "vault-and-state", provider: "OMNII" },
  { family: "WORKFLOW", capability: "forms-workflows-tasks", provider: "OMNII" },
  { family: "AGENT", capability: "agents-and-routing", provider: "OMNII" },
  { family: "INTELLIGENCE", capability: "intelligence-and-matching", provider: "OMNII" },
  { family: "EVENTS", capability: "events-pulse-audit", provider: "OMNII" },
  { family: "SECURITY", capability: "security-consent-policy", provider: "OMNII" },
  { family: "OPERATING_CONTEXT", capability: "operating-context", provider: "OMNII" },
  { family: "ECONOMICS", capability: "trade-investment-finance-value-markets", provider: "TIP" },
  { family: "DISCOVERY", capability: "search-map-match", provider: "OMNII" },
  { family: "INTEGRATION", capability: "external-authority-connectors", provider: "OMNII" },
];

const FORBIDDEN_BUNK_CAPABILITIES = new Set([
  "universal-identity", "universal-authority", "universal-graph",
  "universal-registry-ontology", "universal-persistence", "canonical-ledger",
  "canonical-economic-ontology",
]);

export function assertBunkEcosystemCapabilityUse(input: { capability: string; provider: string }) {
  if (input.provider === "BUNK" && FORBIDDEN_BUNK_CAPABILITIES.has(input.capability)) {
    throw new Error(`BUNK cannot own ${input.capability}`);
  }
  return input;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-ecosystem-capability-map.test.ts`
Expected: PASS or an environment-only dependency failure documented without changing semantics.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/bunk-ecosystem-capability-map.ts packages/omnii-runtime/tests/bunk-ecosystem-capability-map.test.ts packages/omnii-runtime/src/index.ts
git commit -m "feat: map BUNK across whole OMNII ecosystem"
```

### Task 2: Build Governed BUNK Operational Orchestrator

**Files:**
- Create: `packages/omnii-runtime/src/bunk-operational-flow.ts`
- Test: `packages/omnii-runtime/tests/bunk-operational-flow.test.ts`
- Modify: `packages/omnii-runtime/src/index.ts`

**Interfaces:**
- Produces `BunkOperationalAction`, `BunkOperationalResult`, `resolveBunkOperationalAction`, `assertBunkOperationalAction`.
- Inputs include `propertyId`, `action`, `formSubmissionId`, optional `economicIntent`, optional `evidenceReferences`, optional `authorityReference`, optional `operatingContextId`.
- Output includes `nextState`, `requiredActions`, `eventType`, and `economicRoute` where present.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { resolveBunkOperationalAction } from "../src/bunk-operational-flow";

describe("BUNK operational flow", () => {
  it("routes non-economic property verification through OMNII workflow and authority", () => {
    const result = resolveBunkOperationalAction({
      propertyId: "property-1",
      action: "VERIFY_PROPERTY",
      formSubmissionId: "form-1",
      evidenceReferences: ["proof-1"],
      authorityReference: "seal-1",
      operatingContextId: "ctx-1",
    });
    expect(result.economicRoute).toBe("NONE");
    expect(result.requiredActions).toContain("REVIEW_EVIDENCE");
    expect(result.eventType).toBe("BUNK_PROPERTY_VERIFICATION_REQUESTED");
  });

  it("routes economic activity to TIP without making TIP the only dependency", () => {
    const result = resolveBunkOperationalAction({
      propertyId: "property-1",
      action: "MAKE_OFFER",
      formSubmissionId: "form-2",
      evidenceReferences: ["proof-2"],
      authorityReference: "seal-2",
      economicIntent: { capability: "TIP:TRADE", intentType: "PROPERTY_OFFER" },
    });
    expect(result.economicRoute).toBe("TIP");
    expect(result.requiredActions).toContain("ECONOMIC_REVIEW");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-operational-flow.test.ts`
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the minimal resolver**

```ts
export interface BunkOperationalAction {
  propertyId: string;
  action: string;
  formSubmissionId: string;
  evidenceReferences?: string[];
  authorityReference?: string;
  operatingContextId?: string;
  economicIntent?: { capability: string; intentType: string };
}

export interface BunkOperationalResult {
  nextState: string;
  requiredActions: string[];
  eventType: string;
  economicRoute: "NONE" | "TIP";
}

export function resolveBunkOperationalAction(input: BunkOperationalAction): BunkOperationalResult {
  if (!input.propertyId.trim()) throw new Error("propertyId is required");
  if (!input.formSubmissionId.trim()) throw new Error("formSubmissionId is required");
  if (!input.evidenceReferences?.length) throw new Error("evidence is required");

  const economic = Boolean(input.economicIntent);
  if (economic && input.economicIntent!.capability !== "TIP:TRADE") {
    throw new Error("BUNK economic actions must route through TIP");
  }

  if (economic) {
    return {
      nextState: "ECONOMIC_REVIEW",
      requiredActions: ["REVIEW_EVIDENCE", "ECONOMIC_REVIEW", "TIP_EXECUTION_WHEN_AUTHORIZED"],
      eventType: "BUNK_ECONOMIC_ACTION_REQUESTED",
      economicRoute: "TIP",
    };
  }

  return {
    nextState: "REVIEW",
    requiredActions: ["REVIEW_EVIDENCE", "AUTHORITY_CHECK"],
    eventType: input.action === "VERIFY_PROPERTY" ? "BUNK_PROPERTY_VERIFICATION_REQUESTED" : "BUNK_ACTION_REQUESTED",
    economicRoute: "NONE",
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-operational-flow.test.ts`
Expected: PASS or environment-only dependency limitation.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/bunk-operational-flow.ts packages/omnii-runtime/tests/bunk-operational-flow.test.ts packages/omnii-runtime/src/index.ts
git commit -m "feat: add governed BUNK operational flow"
```

### Task 3: Materialize Review and Verification Queue in Supabase

**Files:**
- Create: `supabase/migrations/20260905070000_bunk_operational_review_queue.sql`
- Create: `packages/omnii-runtime/tests/bunk-supabase-operational-contract.test.ts`

**Interfaces:**
- Add BUNK-specific `bunk_review_queue` and `bunk_action_outcomes` only because they represent product workflow state not currently owned by an existing OMNII table.
- Each queue row references OMNII form submission, property, evidence/provenance, optional authority, optional operating context and optional TIP reference.
- Add RLS and indexes; no policy may grant authority by virtue of queue membership.

- [ ] **Step 1: Write the failing contract test**

```ts
import { describe, expect, it } from "vitest";

describe("BUNK Supabase operational contract", () => {
  it("documents the required review/outcome tables", () => {
    const required = ["bunk_review_queue", "bunk_action_outcomes"];
    expect(required).toEqual(["bunk_review_queue", "bunk_action_outcomes"]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-supabase-operational-contract.test.ts`
Expected: FAIL only when coupled to the live schema introspection helper; otherwise the test acts as a structural specification.

- [ ] **Step 3: Create the migration**

```sql
create table if not exists bunk_review_queue (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  form_submission_id text,
  action_type text not null,
  status text not null default 'pending',
  priority text not null default 'normal',
  requester_id uuid references profiles(id),
  assigned_reviewer_id uuid references profiles(id),
  evidence_refs jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  authority_reference text,
  operating_context_id text,
  tip_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bunk_review_queue_status_idx on bunk_review_queue(status, priority, created_at);
create index if not exists bunk_review_queue_property_idx on bunk_review_queue(property_id, status);

create table if not exists bunk_action_outcomes (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references bunk_review_queue(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  outcome_type text not null,
  result text not null,
  authority_reference text,
  evidence_refs jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  tip_reference text,
  pulse_event_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists bunk_action_outcomes_property_idx on bunk_action_outcomes(property_id, created_at desc);

alter table bunk_review_queue enable row level security;
alter table bunk_action_outcomes enable row level security;

create policy "bunk_review_queue_self_or_staff" on bunk_review_queue
for select using (
  auth.uid() = requester_id
  or auth.uid() = assigned_reviewer_id
);

create policy "bunk_action_outcomes_self_or_staff" on bunk_action_outcomes
for select using (
  exists (
    select 1 from bunk_review_queue q
    where q.id = review_id
      and (auth.uid() = q.requester_id or auth.uid() = q.assigned_reviewer_id)
  )
);
```

- [ ] **Step 4: Apply and verify the migration**

Run through the connected Supabase project and verify both tables exist, RLS is enabled, and the policy predicates never grant `seal.decide` or any other authority.

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/20260905070000_bunk_operational_review_queue.sql packages/omnii-runtime/tests/bunk-supabase-operational-contract.test.ts
git commit -m "feat: add BUNK operational review and outcome persistence"
```

### Task 4: Connect BUNK Forms to Operational Queue

**Files:**
- Create: `apps/web/lib/bunk/operational-submit.ts`
- Modify: `apps/web/app/partner/properties/new/page.tsx`
- Modify: existing BUNK action forms/pages identified by repository search
- Test: `apps/web/lib/bunk/operational-submit.test.ts`

**Interfaces:**
- Produces `submitBunkOperationalForm(input)` returning `{ submissionId, reviewId, propertyId }`.
- Uses the shared `omnii_form_submissions` table for form persistence and `bunk_review_queue` for operational routing.
- Never directly changes published/verified/approved status from the browser.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { buildBunkOperationalSubmission } from "./operational-submit";

describe("BUNK operational form submission", () => {
  it("creates a form payload and review request without granting approval", () => {
    const result = buildBunkOperationalSubmission({
      propertyId: "property-1",
      actionType: "PROPERTY_INTAKE",
      requesterId: "user-1",
      payload: { name: "Example Property" },
      evidence: ["proof-1"],
    });
    expect(result.formStatus).toBe("submitted");
    expect(result.reviewStatus).toBe("pending");
    expect(result.grantsAuthority).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run apps/web/lib/bunk/operational-submit.test.ts`
Expected: FAIL because the builder is missing.

- [ ] **Step 3: Implement the builder and Supabase insert path**

The builder must create an OMNII form payload with product/provenance metadata and a corresponding review-queue payload. The server/browser submitter must check authentication, insert the form submission, insert the queue row, and never set any approval or verified status.

- [ ] **Step 4: Run the targeted test**

Run: `npx vitest run apps/web/lib/bunk/operational-submit.test.ts`
Expected: PASS or environment-only dependency limitation.

- [ ] **Step 5: Commit**

```bash
git add apps/web/lib/bunk/operational-submit.ts apps/web/lib/bunk/operational-submit.test.ts apps/web/app
git commit -m "feat: route BUNK forms into governed operations"
```

### Task 5: Connect Evidence → Review → SEAL → State Transition

**Files:**
- Create: `packages/omnii-runtime/src/bunk-verification-orchestration.ts`
- Test: `packages/omnii-runtime/tests/bunk-verification-orchestration.test.ts`
- Modify: relevant BUNK runtime exports
- Modify: relevant Supabase migration for safe transition RPCs if existing runtime requires database enforcement

**Interfaces:**
- Produces `evaluateBunkVerification`, `approveBunkVerification`, `rejectBunkVerification`.
- `evaluateBunkVerification` may return recommendations; only `approveBunkVerification` with an authorized SEAL may move consequential state.
- Outcome emits an OMNII event/Pulse-compatible record reference.

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, expect, it } from "vitest";
import { approveBunkVerification, evaluateBunkVerification } from "../src/bunk-verification-orchestration";

describe("BUNK verification orchestration", () => {
  it("keeps intelligence separate from authority", () => {
    const recommendation = evaluateBunkVerification({
      propertyId: "property-1",
      evidenceReferences: ["proof-1"],
      confidence: 0.95,
    });
    expect(recommendation.kind).toBe("RECOMMENDATION");
    expect(() => approveBunkVerification(recommendation, null)).toThrow(/authority/i);
  });

  it("accepts only an explicit authority reference for approval", () => {
    const recommendation = evaluateBunkVerification({ propertyId: "property-1", evidenceReferences: ["proof-1"], confidence: 0.95 });
    const result = approveBunkVerification(recommendation, { sealReference: "seal-1" });
    expect(result.status).toBe("VERIFIED");
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-verification-orchestration.test.ts`
Expected: FAIL because the orchestration module is missing.

- [ ] **Step 3: Implement the orchestration contract**

The recommendation records evidence references and confidence. The approval function requires a non-empty SEAL reference and returns a state transition plus event payload. It must not infer authority from confidence, role labels, or agent recommendations.

- [ ] **Step 4: Run the targeted tests**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-verification-orchestration.test.ts`
Expected: PASS or environment-only dependency limitation.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/bunk-verification-orchestration.ts packages/omnii-runtime/tests/bunk-verification-orchestration.test.ts
 git commit -m "feat: govern BUNK evidence verification and authority"
```

### Task 6: Wire Economic Actions to TIP While Preserving Whole-Ecosystem Composition

**Files:**
- Modify: `packages/omnii-runtime/src/bunk-operational-flow.ts`
- Modify: existing `bunk-economic-boundary.ts`
- Test: `packages/omnii-runtime/tests/bunk-operational-flow.test.ts`
- Update relevant Supabase operational queue migration if TIP references need persistence.

**Interfaces:**
- Economic path must use the existing `BunkTipEconomicRequest` / `assertBunkTipEconomicRequest` contract.
- Non-economic BUNK paths must continue without TIP.
- `economicRoute` is `TIP` only when an economic intent exists.

- [ ] **Step 1: Extend the failing tests**

```ts
it("allows BUNK to use OMNII workflow without TIP when the action is non-economic", () => {
  const result = resolveBunkOperationalAction({
    propertyId: "property-1",
    action: "BOOK_INSPECTION",
    formSubmissionId: "form-3",
    evidenceReferences: ["proof-3"],
  });
  expect(result.economicRoute).toBe("NONE");
});
```

- [ ] **Step 2: Run targeted tests and confirm the boundary**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-operational-flow.test.ts`
Expected: PASS after Task 2 integration.

- [ ] **Step 3: Bind economic requests to existing TIP contract**

The implementation must call `assertBunkTipEconomicRequest` for economic actions and reject any capability reference that does not identify TIP.

- [ ] **Step 4: Re-run targeted tests**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-operational-flow.test.ts`
Expected: PASS or environment-only dependency limitation.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/bunk-operational-flow.ts packages/omnii-runtime/src/bunk-economic-boundary.ts packages/omnii-runtime/tests/bunk-operational-flow.test.ts
 git commit -m "feat: route BUNK economic actions through TIP"
```

### Task 7: Wire Events, Pulse and Outcome Persistence

**Files:**
- Create: `packages/omnii-runtime/src/bunk-outcome-projection.ts`
- Test: `packages/omnii-runtime/tests/bunk-outcome-projection.test.ts`
- Create/modify: Supabase migration for event/outcome references if required by the existing schema.

**Interfaces:**
- Produces `projectBunkOutcome` and `BunkOutcomeProjection`.
- Outcome projection carries `propertyId`, `actionType`, `result`, `provenance`, `authorityReference`, optional `tipReference`, and an event/Pulse reference.

- [ ] **Step 1: Write failing tests**

```ts
it("projects a governed outcome with traceable provenance", () => {
  const result = projectBunkOutcome({
    propertyId: "property-1",
    actionType: "PROPERTY_VERIFICATION",
    result: "VERIFIED",
    authorityReference: "seal-1",
    evidenceReferences: ["proof-1"],
  });
  expect(result.pulseEventType).toBe("BUNK_PROPERTY_VERIFIED");
  expect(result.provenance.root).toBe("OMNII");
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-outcome-projection.test.ts`
Expected: FAIL because the projection module does not exist.

- [ ] **Step 3: Implement projection**

Produce an OMNII-compatible event/Pulse payload and an action-outcome persistence representation. Never write a canonical ledger record directly from BUNK.

- [ ] **Step 4: Run targeted tests**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-outcome-projection.test.ts`
Expected: PASS or environment-only dependency limitation.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/src/bunk-outcome-projection.ts packages/omnii-runtime/tests/bunk-outcome-projection.test.ts
 git commit -m "feat: project BUNK outcomes into OMNII events and Pulse"
```

### Task 8: Replace Remaining Demo-Only BUNK Operational Paths

**Files:**
- Modify: `apps/web/app/discover/page.tsx`
- Modify: `apps/web/app/properties/[slug]/page.tsx`
- Modify: `apps/web/app/page.tsx`
- Modify: any remaining BUNK pages using `packages/shared/src/demo-data.ts` for operational state
- Test: targeted route/data-loader tests where the repo already has a web test harness

**Interfaces:**
- Public discovery reads only published records from Supabase.
- Property detail reads one live property, live listing/status, visible verification, and permitted public evidence state.
- Mutating actions go through governed server paths.

- [ ] **Step 1: Search for demo-only operational dependencies**

Run: `git grep -n "demoProperties\|demoListings\|demo-data" -- apps/web`.
Expected: only fixture/test references remain after the task.

- [ ] **Step 2: Add a failing route-level data test**

Test that an unpublished property does not appear in public discovery and that a live published property is resolvable by slug.

- [ ] **Step 3: Implement live loaders**

Use the existing Supabase server client and shared schema. Preserve empty/error/loading/permission states. Do not fall back to fictional data in production routes.

- [ ] **Step 4: Run the targeted test/harness**

Use the repository's existing web test command; record any environment limitation.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app apps/web/lib
 git commit -m "feat: finish live BUNK operational data paths"
```

### Task 9: End-to-End Conformance and Supabase Live Verification

**Files:**
- Create: `packages/omnii-runtime/tests/bunk-end-to-end-conformance.test.ts`
- Create: `docs/architecture/BUNK_OPERATIONAL_COMPLETION_STATUS.md`

**Interfaces:**
- End-to-end conformance covers intake → review → evidence → authority → state → economic/non-economic routing → event/outcome.

- [ ] **Step 1: Write the end-to-end tests**

```ts
it("completes a non-economic inspection workflow without TIP", () => {
  // submit form -> queue -> assign/review -> outcome -> pulse
});

it("completes an economic offer workflow through TIP", () => {
  // submit form -> evidence -> authority -> TIP request -> outcome -> pulse
});

it("rejects a direct BUNK economic bypass", () => {
  // BUNK:TRADE must fail the TIP boundary
});
```

- [ ] **Step 2: Run the complete targeted suite**

Run: `npx vitest run packages/omnii-runtime/tests/bunk-*.test.ts`
Expected: PASS where dependencies are available; record exact failures rather than asserting success without execution.

- [ ] **Step 3: Query the connected Supabase project**

Verify the presence of the operational tables, BUNK registries/forms counts, RLS state and representative constraints. Verify no BUNK table claims to be a universal identity/authority/registry/persistence substitute.

- [ ] **Step 4: Update the operational completion status**

Record materialized, live-verified, CI-verified, and externally blocked items separately.

- [ ] **Step 5: Commit**

```bash
git add packages/omnii-runtime/tests/bunk-end-to-end-conformance.test.ts docs/architecture/BUNK_OPERATIONAL_COMPLETION_STATUS.md
git commit -m "docs: record BUNK operational completion evidence"
```

## Self-Review Checklist

- [ ] Every requirement in `2026-09-05-bunk-operational-completion-design.md` has a task.
- [ ] The capability map proves BUNK consumes OMNII capabilities beyond TIP.
- [ ] TIP appears only on economic paths.
- [ ] No new universal identity, authority, graph, registry ontology, persistence, or ledger is introduced.
- [ ] Forms are submissions, not approvals.
- [ ] Intelligence recommendations cannot exercise authority.
- [ ] Consequential state transitions have explicit evidence and authority references.
- [ ] Public routes do not depend on fictional demo data.
- [ ] Production verification claims distinguish live database evidence from unrun local tests and unobserved CI runs.
