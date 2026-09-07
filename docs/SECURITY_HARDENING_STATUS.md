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
- Nineteen previously unrestricted authenticated `ALL` policies were reviewed: sensitive economic, settlement, reconciliation, valuation, benchmark, quality and completeness state is now backend-only; open-world reference/graph data is authenticated read-only pending governed write APIs.
- Core control tables for agents, authorities, executions, execution controls, ledger, process state/tasks and CVE/control findings no longer grant direct API-role table access; governed functions/workers remain the execution path.
- The live `stream-event` and `recompute-stream-aggregates` Edge Functions were brought under repository source control and upgraded to version 2 with bounded request sizes, strict input parsing, temporal/window validation, and fail-closed backend configuration.
- The repository security scanner now detects embedded secret material rather than treating legitimate environment-variable names as secrets.
- Transport compliance and credential write policies now require an actually issued, active, non-expired authority record; matching `auth.uid()` alone is insufficient.
- Authenticated profile editing is limited to display/contact metadata; `active_role`, public identity reference and deletion state remain backend-controlled.
- The repository migration filenames for the PostGIS, stream-aggregation, trigger-function, tokenization, broad-policy, core-control, authority-binding and profile-role controls match the live Supabase migration ledger where those controls have been synchronized.

## Explicit outstanding security gates

### Application-role RLS policy design

Backend-owned tables intentionally do not expose direct API writes. Application-role RLS behavior remains unresolved where a policy requires an authoritative identity-to-authority mapping that has not yet been seeded for a production tenant.

`public.spatial_ref_sys` remains a provider-managed PostGIS table with RLS disabled. Enabling RLS without a provider-compatible policy would risk breaking PostGIS behavior and is therefore not auto-applied.

### Managed PostGIS boundary

PostGIS 3.3.7 is installed in `public` and is non-relocatable on the current hosted instance. The three `public.st_estimatedextent` overloads are managed extension functions. Repository/live revoke attempts are retained as defense-in-depth, but Supabase reasserts the grants, so the exposure cannot be honestly marked closed from the application migration layer alone.

Required provider-boundary action: use the supported Supabase/PostGIS extension-management path to relocate or otherwise restrict the managed extension, then re-run the security advisor and direct privilege checks.

### API-key migration

A modern publishable key is present alongside an enabled legacy anon key. The legacy key is not disabled yet because all external consumers have not been independently inventoried and migrated. No secret value is stored in this record.

The remaining live Edge Functions still read the legacy service-role environment variable. Supabase's current migration guidance recommends moving Edge Functions to the modern secret-key environment and retiring the legacy service-role key after consumer migration. This is a controlled next-stage migration, not an implicit assumption that the legacy credential can be removed immediately.

### Performance cleanup

The current performance advisor reports numerous unused indexes. These remain informational until workload evidence demonstrates they are safe to remove; blanket deletion is not part of this hardening pass.

### Control-plane CI

Control Plane Conformance and the full CI suite both succeeded on the immediately preceding verified hardening head. Subsequent repository hardening commits have advanced the branch, so the latest head must complete a fresh CI run before being called fully green.

This record prevents unresolved security and provider exceptions from being mistaken for invisible or completed controls.
