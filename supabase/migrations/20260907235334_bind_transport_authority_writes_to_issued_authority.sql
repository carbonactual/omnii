create or replace function public.omnii_has_active_authority(p_subject text)
returns boolean
language sql
security definer
set search_path = pg_catalog, public
as $$
  select exists (
    select 1
    from public.omnii_authorities a
    where a.subject = p_subject
      and a.status = 'active'
      and (a.expires_at is null or a.expires_at > now())
      and (a.revocable = false or a.revoked_at is null)
  );
$$;

revoke all on function public.omnii_has_active_authority(text) from public;
revoke all on function public.omnii_has_active_authority(text) from anon;
grant execute on function public.omnii_has_active_authority(text) to authenticated;

drop policy if exists transport_compliance_reviewer_write on public.omnii_transport_compliance_cases;
drop policy if exists transport_compliance_reviewer_update on public.omnii_transport_compliance_cases;
drop policy if exists transport_compliance_reviewer_delete on public.omnii_transport_compliance_cases;

create policy transport_compliance_reviewer_write
on public.omnii_transport_compliance_cases
for insert to authenticated
with check (
  authority_ref = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
);

create policy transport_compliance_reviewer_update
on public.omnii_transport_compliance_cases
for update to authenticated
using (
  authority_ref = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
)
with check (
  authority_ref = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
);

create policy transport_compliance_reviewer_delete
on public.omnii_transport_compliance_cases
for delete to authenticated
using (
  authority_ref = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
);

drop policy if exists transport_credentials_issuer_insert on public.omnii_transport_credentials;
drop policy if exists transport_credentials_issuer_update on public.omnii_transport_credentials;
drop policy if exists transport_credentials_issuer_delete on public.omnii_transport_credentials;

create policy transport_credentials_issuer_insert
on public.omnii_transport_credentials
for insert to authenticated
with check (
  issuer = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
);

create policy transport_credentials_issuer_update
on public.omnii_transport_credentials
for update to authenticated
using (
  issuer = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
)
with check (
  issuer = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
);

create policy transport_credentials_issuer_delete
on public.omnii_transport_credentials
for delete to authenticated
using (
  issuer = (select auth.uid()::text)
  and public.omnii_has_active_authority((select auth.uid()::text))
);
