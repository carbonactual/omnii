# OMNII Security Hardening Status

**Status:** Canonical build-closeout record

## Verified

- The constitutional registry catalog contains exactly 28 registry records.
- All 28 registry records satisfy the registry conformance hardening report.
- Registry boundary, continuity and relationship policy metadata are present across all 28 records.
- CVE infrastructure is present and protected by the existing runtime/security boundary.
- `public.aggregate_stream_window(uuid, timestamptz, timestamptz, text)` is restricted to `service_role`; anonymous, authenticated and public execution are disabled.
- Trigger-only integrity functions are not directly executable by `public`, `anon` or `authenticated` roles.
- Direct API access to token representation, token identifier, token lifecycle-event and mint-issuance tables is disabled for `anon` and `authenticated`; backend/service-role access remains available.
- The repository migration filenames for the PostGIS, stream-aggregation, trigger-function and tokenization privilege controls match the live Supabase migration ledger where those controls have been synchronized.

## Explicit outstanding security gates

### Application-role RLS policy design

The runtime observability tables are intentionally backend-owned and their operational functions are not exposed to anonymous or authenticated roles. Application-role RLS behavior remains unresolved where a policy would depend on an authoritative identity-to-authority mapping.

`public.spatial_ref_sys` remains a provider-managed PostGIS table with RLS disabled. Enabling RLS without a provider-compatible policy would risk breaking PostGIS behavior and is therefore not auto-applied.

### Managed PostGIS boundary

PostGIS 3.3.7 is installed in `public` and is non-relocatable on the current hosted instance. The three `public.st_estimatedextent` overloads are managed extension functions. Repository/live revoke attempts are retained as defense-in-depth, but Supabase reasserts the grants, so the exposure cannot be honestly marked closed from the application migration layer alone.

Required provider-boundary action: use the supported Supabase/PostGIS extension-management path to relocate or otherwise restrict the managed extension, then re-run the security advisor and direct privilege checks.

### API-key migration

A modern publishable key is present alongside an enabled legacy anon key. The legacy key is not disabled yet because all external consumers have not been independently inventoried and migrated. No secret value is stored in this record.

### Performance cleanup

The current performance advisor reports numerous unused indexes. These remain informational until workload evidence demonstrates they are safe to remove; blanket deletion is not part of this hardening pass.

### Control-plane CI

A prior Control Plane Conformance run failed because the repository security scanner detected its own embedded legacy-key detection strings. The scanner was corrected to exclude its own source file from content scanning. The latest hardening commits have not yet produced a retrievable workflow run, so current CI is not represented as passing until GitHub reports a fresh successful run.

This record prevents unresolved security and provider exceptions from being mistaken for invisible or completed controls.
