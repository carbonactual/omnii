# OMNII Product Surface Conformance Matrix

| Requirement | Contract / core artifact | Actual product | Exemptions |
|---|---|---|---|
| Canonical identity | Inspectable | Required | Source-only governance repos |
| Canonical URL | Optional reference | Required | Internal non-product contracts |
| Responsive mobile/desktop body | Not applicable | Required | Non-product infrastructure |
| Web app manifest | Not applicable | Required when web installation is claimed | Products that deliberately declare browser-only delivery |
| Deep links | Not applicable | Required | Non-product infrastructure |
| Authentication/authorization/approval separation | Required | Required | None |
| Update provenance | Required for changing source | Required for product releases | Immutable documents may use repository provenance |
| Offline/cache semantics | Not applicable | Required when offline/cache is used | None |
| Notification/background authority | Not applicable | Required when those capabilities are used | None |
| Exit/revocation/residual-state explanation | Required | Required | None |
| Provider portability | Required | Required where provider state is consumed | None |
| CI conformance | Required | Required | None |

## Product classes

### Class A — Product

A human/agent-facing ecosystem product. Must conform fully.

### Class B — Product infrastructure

A service/runtime that directly supports a product. Must preserve canonical identity, authority, provenance, continuity, and CI; installability is required only where it is itself presented as a user-facing product.

### Class C — Contract / constitutional infrastructure

CANON, schemas, registries, law documents, source-only governance repositories, control-plane repositories, CI-only artifacts. These remain inspectable infrastructure and are exempt from app-installability requirements.

## Required product evidence

A conforming Class A product should be able to show, through source or runtime evidence:

`canonical product identity → install/open path → current version → requested capability → authority → user approval where required → execution → result → evidence → update/revalidate → exit`

The matrix is a coverage device, not a second canonical registry.
