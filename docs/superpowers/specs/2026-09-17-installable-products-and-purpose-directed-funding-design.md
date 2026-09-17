# Installable Products and Purpose-Directed Funding Design

## Status
Approved architectural design. Applies to ecosystem products, not constitutional/contracts infrastructure.

## Problem

The Carbon Actual ecosystem has a shared constitutional/runtime body and many product surfaces. Real products should behave like web-native apps: one canonical product body, responsive across mobile and desktop, directly launchable from a URL, installable when the platform supports installation, deep-linkable, updateable, recoverable, and removable without creating a second product implementation.

Open Bank additionally needs to make financial capacity useful for production and recurring obligations. A creator may need funds for a content mission, and a person may want a subscription paid repeatedly. The financial flow must direct authorized capacity into the intended activity while preserving identity, authority, intent, policy, evidence, settlement, liability, and exit.

## Architectural decision

The ecosystem will add two cross-cutting conformance laws rather than new constitutional primitives:

1. **Installable Product Surface Law** — every actual ecosystem product is an installable web-native product surface when technically applicable. Contracts, constitutions, manifests, source repositories, and other governance artifacts remain inspectable infrastructure and are not required to become apps.
2. **Purpose-Directed Financial Capacity Law** — Open Bank composes existing `Intent`, `Authority`, `Capability`, `Policy`, `State`, `Event`, `Evidence`, `Settlement`, `Liability`, and `Lifecycle` semantics to allocate financial capacity to a purpose, activity, merchant, supplier, subscription, mission, or milestone. It does not create a parallel money primitive.

## Product surface lifecycle

`discover → inspect → install → launch → authenticate → authorize → use → update → revalidate → pause → uninstall → recover/exit`

The product surface must preserve continuity across browser, installed mode, device changes, sessions, deep links, updates, provider changes, and uninstall/reinstall where the authority model permits.

## Product surface requirements

A conforming product must expose:

- canonical product identity and canonical URL
- version and update provenance
- responsive mobile/desktop behavior from one product body
- web app manifest where installation is supported
- secure-context requirements and least-privilege browser permissions
- install/open/deep-link semantics that resolve back to the canonical product
- explicit notification and background-work authority
- authentication, authorization, approval, and execution separation
- session continuity and safe recovery
- accessible information architecture and keyboard/screen-reader compatible controls
- offline/cache behavior that does not silently create stale authority or settlement state
- uninstall/revocation/exit semantics and residual-state explanation
- provider portability and evidence preservation
- product-specific tests/conformance checks in CI

PWA/Web APIs, browser storage, service workers, push, WebAuthn, OAuth, payment APIs, native wrappers, app stores, and provider services remain adapters and implementation mechanisms; they do not become constitutional semantics.

## Purpose-directed Open Bank flow

`request → purpose/intent → identity → authority/consent → eligibility → available capacity → policy/risk → allocation → constrained access → execution → evidence → ledger/settlement → reconcile → notify → learn/review → release/revoke/renew`

### Core distinctions

- balance is not capacity
- credit is not cash
- authorization is not disbursement
- earmark/allocation is not settlement
- access to a financial capability is not ownership of every underlying asset
- subscription authorization is not unlimited recurring authority
- provider access is not constitutional capability
- AI orchestration does not inherit authority merely by being the orchestrator

### Creator production example

A creator requests a content-production mission. Open Bank verifies identity and authority, evaluates eligibility and policy, creates a bounded allocation, and exposes only the capabilities needed for the mission. The allocation may settle directly to approved studios, equipment rental, transport, editors, hosts, media services, or other declared suppliers; support controlled reimbursements; or operate through an approved escrow/settlement route. Every material action records purpose, authority, supplier, amount/value, scope, evidence, state transition, settlement result, and residual obligations.

### Subscription example

A user authorizes a subscription purpose with merchant, product/service, amount/frequency bounds, start/end or review conditions, and revocation/renewal rules. Renewal is a new lifecycle event. Material changes to amount, merchant, scope, term, or risk must trigger revalidation or fresh approval according to policy. Failed renewal enters governed recovery rather than silently creating debt or repeating attempts without authority.

## Safety and regulatory boundary

Open Bank is financial infrastructure architecture and is not itself a banking licence. Regulated execution remains jurisdiction-gated and occurs through authorized providers/rails where required. The architecture must not imply a regulated permission merely because a technical connector exists.

## Success criteria

A product is conforming when a user can discover it from a canonical URL, install/open it as an app-like surface where supported, use the same underlying product body on mobile and desktop, deep-link into governed state, update without losing continuity, and exit/reinstall without ambiguity about residual state.

Open Bank is conforming when purpose-directed funding and recurring obligations can be represented as governed capacity and lifecycle flows without granting broader authority than the user or governing principal actually supplied.
