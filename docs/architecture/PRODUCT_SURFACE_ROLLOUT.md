# Ecosystem Product Surface Rollout

Every actual ecosystem product is expected to inherit `OMNII_INSTALLABLE_PRODUCT_SURFACE_LAW`.

## Product checklist

Before a product is promoted as a user-facing build, verify:

1. canonical product identity and URL
2. one shared product body for mobile and desktop
3. responsive navigation and interaction model
4. web manifest when installation is supported
5. secure launch and least-privilege permissions
6. deep links into governed state
7. authentication ≠ authorization ≠ approval ≠ execution
8. update provenance and authority revalidation
9. offline/cache behavior cannot create fresh authority or settlement
10. push/background behavior is explicitly authorized
11. continuity survives update/reinstall within policy
12. exit/revocation/uninstall explain residual state
13. accessibility and device adaptation are tested
14. provider adapters remain replaceable
15. CI validates the product-surface manifest/contract

## Product classes excluded from app-installability

Contracts, CANON, schemas, registries, source-only governance repositories, control-plane repositories, and CI-only artifacts are infrastructure. They remain directly inspectable and are not forced into an app shell.

## Shared-shell principle

Do not rebuild a product as a separate native app to solve a presentation problem. First expose the canonical product body through responsive web and installable-web mechanisms. Native wrappers or platform-specific adapters may be added only when they provide capabilities that the web delivery cannot reliably provide; they remain adapters around the same product semantics.

## Financial product extension

Products that request or consume Open Bank capacity must expose purpose, authority, policy, allocation, execution, evidence and settlement context without turning a technical credential into broader spending authority.
