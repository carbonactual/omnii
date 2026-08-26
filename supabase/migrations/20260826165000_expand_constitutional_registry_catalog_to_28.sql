-- OMNII Constitutional Registry Catalog expansion: 26 -> 28.
-- Adds the cross-cutting Provenance and Communication registries.
-- These registries are logical contracts in the single omnii_registries index.

insert into public.omnii_registries (id,version,lifecycle,authority,provenance,payload) values
('registry:provenance','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-26"}','{"type":"registry","name":"Provenance Registry","domain":"provenance","canonical_source":"OMNII Provenance Contract","expected_relations":["derived_from","sourced_from","verified_by","attested_by","supersedes"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:communication','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-26"}','{"type":"registry","name":"Communication Registry","domain":"communication","canonical_source":"OMNII Communication Contract","expected_relations":["communicates_with","published_to","delivered_to","permitted_by","blocked_by"],"open_world":true,"authority_policy":{"non_granting":true}}')
on conflict (id) do update
set version=excluded.version,
    lifecycle=excluded.lifecycle,
    provenance=excluded.provenance,
    payload=excluded.payload,
    updated_at=now();

-- Catalog invariant: the canonical implementation catalog is exactly 28 registries.
do $$
declare v_count integer;
begin
  select count(*) into v_count
  from public.omnii_registries
  where id like 'registry:%';
  if v_count <> 28 then
    raise exception 'OMNII constitutional registry catalog expected 28 registries, found %', v_count;
  end if;
end $$;
