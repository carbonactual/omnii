# OMNII Authority Persistence

## Canonical durable record

The authority contract is persisted in `omnii_authorities`.

The table preserves:

- identity and version
- subject and issuer
- scope and capabilities
- resource/context constraints
- issuance and expiry
- revocation state
- parent authority identity
- provenance
- idempotency key
- lifecycle timestamps

## Durable operations

`omnii_authority_issue` provides idempotent durable issuance. A repeated idempotency key returns the existing authority; a unique-key race is reconciled inside the PostgreSQL function.

`omnii_authority_revoke` requires the expected version and atomically advances the version while marking the authority revoked.

`omnii_authority_suspend` requires the expected version and atomically advances the version while marking the authority suspended.

The runtime does not claim generic PostgreSQL transaction semantics. These named functions are the explicit durable boundaries.

## Security boundary

RLS is enabled on `omnii_authorities`. No broad `authenticated` policies are introduced because the repository does not yet establish a sufficiently authoritative application identity-to-authority mapping for safe database-side policy definitions.

The existing service-side authority boundary therefore remains explicit: application code must obtain a governance authority and present it to `AuthorityRuntime`; persistence alone does not confer authority.

## Verification

Migration `0005_omnii_authority_boundary.sql` has been applied to the canonical Supabase project `fomkrgrsqakabftymbjn` during this hardening pass. Live verification demonstrated durable issuance, idempotent repeat issuance, revocation/version advancement, and stale-version rejection. Runtime TypeScript/CI execution evidence is separate and must not be inferred from database execution.
