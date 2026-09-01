drop policy if exists operating_context_owner_insert on public.omnii_operating_contexts;
create policy operating_context_owner_insert on public.omnii_operating_contexts for insert to authenticated with check (subject_id = ((select auth.uid()))::text);

alter policy authenticated_read_institutional_forms on public.omnii_institutional_forms using (lifecycle = 'active');
drop policy if exists nasc_public_active_institutional_forms on public.omnii_institutional_forms;
create policy nasc_public_active_institutional_forms on public.omnii_institutional_forms for select to anon using (lifecycle = 'active');

-- Merge owner/reviewer SELECT semantics into one policy; reviewer write remains command-specific.
drop policy if exists transport_compliance_owner_read on public.omnii_transport_compliance_cases;
drop policy if exists transport_compliance_reviewer_write on public.omnii_transport_compliance_cases;
create policy transport_compliance_read on public.omnii_transport_compliance_cases for select to authenticated using ((subject_id = ((select auth.uid()))::text) or (authority_ref = ((select auth.uid()))::text));
create policy transport_compliance_reviewer_write on public.omnii_transport_compliance_cases for insert to authenticated with check (authority_ref = ((select auth.uid()))::text);
create policy transport_compliance_reviewer_update on public.omnii_transport_compliance_cases for update to authenticated using (authority_ref = ((select auth.uid()))::text) with check (authority_ref = ((select auth.uid()))::text);
create policy transport_compliance_reviewer_delete on public.omnii_transport_compliance_cases for delete to authenticated using (authority_ref = ((select auth.uid()))::text);

-- Merge credential SELECT semantics while preserving issuer-only mutations.
drop policy if exists transport_credentials_issuer_write on public.omnii_transport_credentials;
drop policy if exists transport_credentials_owner_read on public.omnii_transport_credentials;
create policy transport_credentials_read on public.omnii_transport_credentials for select to authenticated using ((subject_id = ((select auth.uid()))::text) or (issuer = ((select auth.uid()))::text));
create policy transport_credentials_issuer_insert on public.omnii_transport_credentials for insert to authenticated with check (issuer = ((select auth.uid()))::text);
create policy transport_credentials_issuer_update on public.omnii_transport_credentials for update to authenticated using (issuer = ((select auth.uid()))::text) with check (issuer = ((select auth.uid()))::text);
create policy transport_credentials_issuer_delete on public.omnii_transport_credentials for delete to authenticated using (issuer = ((select auth.uid()))::text);

-- Keep one canonical copy of duplicate indexes.
drop index if exists public.omnii_mint_issuances_underlying_idx;
drop index if exists public.idx_token_identifiers_representation;
