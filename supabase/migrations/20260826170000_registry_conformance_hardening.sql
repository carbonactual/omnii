-- OMNII registry conformance hardening.
-- Standardizes boundary, relationship, continuity and dependency policies across the 28-registry catalog.
-- Does not grant authority or change constitutional semantics.

update public.omnii_registries
set payload = jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(payload, '{boundary_policy}', coalesce(payload->'boundary_policy', '{"authority_boundary_explicit":true,"jurisdiction_aware":true,"non_authority_granting":true}'::jsonb), true),
      '{relationship_policy}', coalesce(payload->'relationship_policy', '{"typed":true,"provenance_required":true,"cross_registry_allowed":true}'::jsonb), true),
    '{continuity_policy}', coalesce(payload->'continuity_policy', '{"lineage_required":true,"silent_delete_forbidden":true}'::jsonb), true),
  '{dependencies}', coalesce(payload->'dependencies', '[]'::jsonb), true),
  updated_at = now()
where id like 'registry:%';

create index if not exists omnii_registries_domain_idx on public.omnii_registries ((payload->>'domain'));
create index if not exists omnii_registries_canonical_source_idx on public.omnii_registries ((payload->>'canonical_source'));

create or replace function public.omnii_registry_hardening_report(p_registry_id text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path=public
as $$
declare
  v_total integer := 0;
  v_valid integer := 0;
  v_invalid jsonb := '[]'::jsonb;
  r record;
  v_errors jsonb;
  v_relations jsonb;
  v_dependencies jsonb;
begin
  for r in
    select id, version, lifecycle, provenance, payload
    from public.omnii_registries
    where id like 'registry:%'
      and (p_registry_id is null or id = p_registry_id)
    order by id
  loop
    v_total := v_total + 1;
    v_errors := '[]'::jsonb;
    v_relations := coalesce(r.payload->'expected_relations', '[]'::jsonb);
    v_dependencies := coalesce(r.payload->'dependencies', '[]'::jsonb);

    if left(r.id, 9) <> 'registry:' then v_errors := v_errors || jsonb_build_array('REGISTRY_IDENTITY'); end if;
    if coalesce(r.version, '') = '' then v_errors := v_errors || jsonb_build_array('VERSION'); end if;
    if r.lifecycle not in ('proposed','active','deprecated','suspended','retired') then v_errors := v_errors || jsonb_build_array('LIFECYCLE'); end if;
    if coalesce(r.provenance->>'source','') = '' or coalesce(r.provenance->>'catalog_version','') = '' then v_errors := v_errors || jsonb_build_array('PROVENANCE'); end if;
    if coalesce(r.payload->>'type','') <> 'registry' then v_errors := v_errors || jsonb_build_array('REGISTRY_TYPE'); end if;
    if coalesce(r.payload->>'domain','') = '' then v_errors := v_errors || jsonb_build_array('REGISTRY_DOMAIN'); end if;
    if coalesce(r.payload->>'canonical_source','') = '' then v_errors := v_errors || jsonb_build_array('CANONICAL_SOURCE'); end if;
    if jsonb_typeof(v_relations) <> 'array' or (select count(*) from jsonb_array_elements_text(v_relations)) <> (select count(distinct value) from jsonb_array_elements_text(v_relations)) then v_errors := v_errors || jsonb_build_array('RELATION_VOCABULARY'); end if;
    if jsonb_typeof(r.payload->'open_world') <> 'boolean' then v_errors := v_errors || jsonb_build_array('OPEN_WORLD'); end if;
    if coalesce(r.payload->'authority_policy'->>'non_granting','false') <> 'true' then v_errors := v_errors || jsonb_build_array('AUTHORITY_ESCALATION_POLICY'); end if;
    if coalesce(r.payload->'boundary_policy'->>'authority_boundary_explicit','false') <> 'true' then v_errors := v_errors || jsonb_build_array('BOUNDARY_POLICY'); end if;
    if coalesce(r.payload->'relationship_policy'->>'typed','false') <> 'true' or coalesce(r.payload->'relationship_policy'->>'provenance_required','false') <> 'true' then v_errors := v_errors || jsonb_build_array('RELATIONSHIP_POLICY'); end if;
    if coalesce(r.payload->'continuity_policy'->>'lineage_required','false') <> 'true' or coalesce(r.payload->'continuity_policy'->>'silent_delete_forbidden','false') <> 'true' then v_errors := v_errors || jsonb_build_array('CONTINUITY_POLICY'); end if;
    if jsonb_typeof(v_dependencies) <> 'array' or exists(select 1 from jsonb_array_elements_text(v_dependencies) d where d.value = r.id) then v_errors := v_errors || jsonb_build_array('DEPENDENCY_POLICY'); end if;

    if jsonb_array_length(v_errors) = 0 then v_valid := v_valid + 1; else v_invalid := v_invalid || jsonb_build_array(jsonb_build_object('registry_id', r.id, 'errors', v_errors)); end if;
  end loop;

  return jsonb_build_object('total', v_total, 'valid', v_valid, 'invalid', v_total - v_valid, 'complete', v_total = 28 and v_valid = 28, 'invalid_registries', v_invalid);
end;
$$;

grant execute on function public.omnii_registry_hardening_report(text) to authenticated, service_role;
