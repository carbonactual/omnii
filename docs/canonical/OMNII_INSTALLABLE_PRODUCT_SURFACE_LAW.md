# OMNII Installable Product Surface Law

## Status
Canonical cross-cutting product conformance law.

## 1. Purpose

Every actual Carbon Actual ecosystem product should behave like a web-native application rather than a collection of disconnected pages or separate mobile/desktop rebuilds. The product has one canonical body and may expose that body through browser, installed PWA mode, desktop/mobile wrappers, or other adapters.

This law applies to products that humans or agents use as products. It does **not** require constitutional contracts, canonical law, schemas, registries, source-only repositories, CI/control-plane repositories, or other governance artifacts to become installable applications.

## 2. Product boundary

`Product ≠ Constitution`

A product is a usable participant-facing or operational surface. A contract is a source-of-truth or governance artifact. Product packaging must never become a new authority layer or a competing canonical meaning.

## 3. Product lifecycle

`discover → inspect → install → launch → authenticate → authorize → use → update → revalidate → pause → uninstall → recover/exit`

Every material lifecycle change remains attributable and reconstructable through existing identity, authority, state, event, provenance, continuity, and exit semantics.

## 4. Required product properties

A conforming product MUST provide, where the platform supports the capability:

1. canonical product identity
2. canonical URL and deep-link targets
3. responsive mobile and desktop layout from the same product body
4. versioned product release and update provenance
5. web application manifest when installable web delivery is claimed
6. secure transport and least-privilege browser/device permissions
7. explicit install, open, launch and uninstall semantics
8. authentication distinct from authorization and approval
9. session continuity without silently expanding authority
10. predictable back/forward/deep-link behavior
11. accessible controls and content
12. explicit online/offline and cached-state semantics
13. notification/background-work authorization where applicable
14. safe update/revalidation behavior
15. recovery, revocation and exit behavior
16. residual-state disclosure for storage, caches, credentials, notifications and local artifacts where applicable
17. provider portability and preservation of governed state/evidence
18. automated conformance checks in CI

## 5. Standard implementation adapters

The following are permitted implementation mechanisms, not constitutional primitives:

- Web App Manifest
- service workers
- Cache Storage and IndexedDB
- browser storage
- Web Push/Notifications
- WebAuthn/passkeys
- OAuth/OIDC
- HTTPS/TLS/PKI
- payment provider APIs
- native wrappers/app stores
- platform share/deep-link mechanisms
- browser/device APIs

A product may use these mechanisms without transferring canonical meaning or authority to the browser, wrapper, provider, or store.

## 6. Security and authority invariants

- Authentication is not authorization.
- Authorization is not approval.
- Approval is not execution.
- Capability is not permission.
- A browser/device grant cannot create broader constitutional authority.
- Installation cannot create ownership.
- Uninstall cannot silently imply deletion of all server-side state.
- Offline cache cannot silently create fresh authority or settlement.
- Service-worker/background execution cannot expand scope beyond the existing authorization model.
- A provider outage cannot destroy continuity or evidence.

## 7. Responsive and shared-body invariant

Mobile, tablet, desktop, installed mode, and future wrappers MUST resolve to the same canonical product identity and governed backend/state model unless an explicit constitutional boundary says otherwise. A product may adapt navigation, density, input, layout, or capability exposure by device, but may not silently fork semantics.

## 8. Product manifest contract

A product may declare a machine-readable manifest containing at minimum:

- `product_id`
- `canonical_url`
- `version`
- `launch_url`
- `scope`
- `display_mode`
- `installability`
- `supported_surfaces`
- `deep_links`
- `permissions`
- `update_policy`
- `continuity_policy`
- `exit_policy`

The manifest is a product conformance artifact. It is not a replacement for canonical identity, authority, state, event, or policy models.

## 9. Continuity

Installed and browser launches MUST preserve the existing continuity chain:

`# / HASH → SEAL → ROOT → canonical state → EVENT / TRACEABILITY → VAULT → ASH → PHOENIX → ACTUAL / ATLAS → I/O`

Products consume and expose this continuity; they do not create a competing continuity root.

## 10. Exit

Users/principals must be able to understand:

- what will stop on uninstall/sign-out/revocation
- what server-side state remains
- what local state remains
- which subscriptions/obligations remain active
- which credentials/permissions remain active
- how to revoke or terminate continuing authority
- how data/evidence can be exported or preserved where policy requires

## 11. Conformance

A product is non-conforming when it requires separate semantic implementations for mobile and desktop, hides material authorization changes in installation/update behavior, silently broadens authority through browser/device capabilities, or makes exit/recovery impossible to explain.

Conformance is validated by the shared product-surface schema, validator, product manifest, and repository CI. Product-specific constraints may be stricter but must not contradict this law.
