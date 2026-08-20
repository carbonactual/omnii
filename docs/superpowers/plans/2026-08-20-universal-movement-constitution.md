# Universal Movement Constitution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the runtime connection between Universal Movement, Charter, NAB, and Pilgrim so all movement products share one executable substrate and one journey identity.

**Architecture:** `MovementConstitutionRuntime` owns one shared persistence boundary and composes `CharterRuntime` and `NABRuntime` over the same ObjectRuntime/RelationshipRuntime state. Charter remains the execution/orchestration engine; NAB remains the trusted registry/evidence layer; Pilgrim is represented as a purpose-driven journey mode that reuses Charter planning and emits NAB biography/state evidence rather than creating a parallel movement primitive.

**Tech Stack:** TypeScript, existing `@omnii/runtime` ObjectRuntime, RelationshipRuntime, CharterRuntime, NABRuntime, PersistencePort, node:test-compatible tests already used by the repository.

**Spec:** `UNIVERSAL_MOVEMENT.md` and `docs/architecture/NAB_CHARTER_INTEGRATION.md`.

## Global Constraints

- Universal Movement remains the permanent movement abstraction; transport products are implementations/configurations of it.
- Charter is an orchestration product over Universal Movement and remains the execution boundary.
- NAB supplies reusable registry, capability, state, compliance, document, location and evidence context; feeds do not become authority by themselves.
- Pilgrim must remain purpose-driven and multi-stage while reusing the same movement substrate.
- Provenance, evidence references, confidence and timestamps remain explicit for NAB-derived state.
- Do not create product-specific duplicate movement primitives.

---

### Task 1: Add the shared movement constitution runtime

**Files:**
- Create: `packages/omnii-runtime/src/movement-constitution-runtime.ts`
- Modify: `packages/omnii-runtime/src/index.ts`
- Test: `packages/omnii-runtime/tests/movement-constitution-runtime.test.ts`

**Interfaces:**
- Consumes: `PersistencePort`, `CharterRuntime`, `NABRuntime`, `JourneyRequest`, `JourneyPlan`, `NABEvent`, `NABStateAssertion`.
- Produces: `MovementConstitutionRuntime`, `MovementJourneyMode`, `UniversalMovementRequest`, `UniversalMovementPlan`, `registerSubject`, `plan`, `recordEvent`, `recordState`, `journeyBiography`, `journeyState`.

- [ ] **Step 1: Write the failing tests**

Create tests proving that one runtime shares state across Charter and NAB; that `plan()` creates one journey identity with the selected mode; that Pilgrim plans through Charter rather than a second planner; and that movement events/state assertions are visible through the same journey biography/state queries.

- [ ] **Step 2: Run the movement runtime tests**

Run: `node --test packages/omnii-runtime/tests/movement-constitution-runtime.test.ts`
Expected: FAIL because the runtime and exported interfaces do not yet exist.

- [ ] **Step 3: Implement the minimal runtime**

Use one persistence adapter in the constructor, instantiate `CharterRuntime` with that adapter, and instantiate `NABRuntime` over `charter.objects` and `charter.relationships`. `plan()` delegates capability selection and executable planning to Charter, then annotates the resulting journey object with the Universal Movement mode/purpose metadata. `registerSubject()`, `recordEvent()`, and `recordState()` delegate to NAB against the same object graph.

- [ ] **Step 4: Run the focused tests**

Run: `node --test packages/omnii-runtime/tests/movement-constitution-runtime.test.ts`
Expected: PASS.

- [ ] **Step 5: Export the runtime**

Add `export * from "./movement-constitution-runtime";` to `packages/omnii-runtime/src/index.ts` and run the package build.

- [ ] **Step 6: Commit**

Commit message: `feat: add universal movement constitution runtime`

---

### Task 2: Lock Pilgrim as a movement mode, not a parallel engine

**Files:**
- Modify: `packages/omnii-runtime/src/movement-constitution-runtime.ts`
- Test: `packages/omnii-runtime/tests/movement-constitution-runtime.test.ts`
- Create: `docs/architecture/UNIVERSAL_MOVEMENT_CONSTITUTION.md`

**Interfaces:**
- Consumes: `MovementConstitutionRuntime.plan()`.
- Produces: explicit mode contract for `charter`, `pilgrim`, `social`, `commercial`, `emergency`, and `logistics` configurations without changing the Universal Movement primitive.

- [ ] **Step 1: Add failing mode assertions**

Test that Pilgrim preserves journey purpose, stages, optional service needs and non-commercial intent in the journey's attributes while still generating Charter-compatible executable legs.

- [ ] **Step 2: Implement mode metadata**

Add a finite `MovementJourneyMode` union and persist mode-specific metadata under the journey object without introducing separate Pilgrim movement entities or planners.

- [ ] **Step 3: Add the constitutional architecture document**

Document the runtime graph: `Need/Want -> Universal Movement -> Charter execution`, `NAB context/evidence -> planning/execution`, and `Pulse <- verified outcome`, with Pilgrim as a purpose-driven configuration over that graph.

- [ ] **Step 4: Run focused tests and build**

Run: `node --test packages/omnii-runtime/tests/movement-constitution-runtime.test.ts` and `npm --prefix packages/omnii-runtime run build`.
Expected: PASS for both.

- [ ] **Step 5: Commit**

Commit message: `docs: lock movement constitution and pilgrim composition`

---

### Task 3: Verify ecosystem invariants and existing movement behavior

**Files:**
- Test: existing `packages/omnii-runtime/tests/charter-runtime.test.ts`
- Test: existing `packages/omnii-runtime/src/nab-runtime.test.ts`
- Test: existing Charter operations, journey execution, multimodal graph, network and NAB tests already present in the repository.

**Interfaces:**
- Consumes: the new shared runtime without changing existing Charter/NAB contracts.
- Produces: evidence that existing movement subsystems remain compatible.

- [ ] **Step 1: Run Charter and NAB regression tests**

Run the repository's existing movement tests for Charter, NAB, journey execution, multimodal graph and network.
Expected: PASS.

- [ ] **Step 2: Run the TypeScript build**

Run: `npm --prefix packages/omnii-runtime run build`
Expected: PASS with no type errors.

- [ ] **Step 3: Commit**

Commit message: `test: verify universal movement integration invariants`

---

### Task 4: Land the constitutional connection on main

**Files:**
- Repository branch: `feat/universal-movement-constitution`

**Interfaces:**
- Consumes: completed runtime, tests, and architecture contract.
- Produces: merged canonical OMNII implementation.

- [ ] **Step 1: Review branch diff**

Compare `main...feat/universal-movement-constitution` and verify changes are limited to the movement connection, tests and constitutional documentation.

- [ ] **Step 2: Ensure CI evidence exists**

Inspect the resulting commit's workflow/status checks. Do not claim CI success without a successful check result.

- [ ] **Step 3: Merge to main**

Merge the branch using the repository's configured merge method after checks are green.
