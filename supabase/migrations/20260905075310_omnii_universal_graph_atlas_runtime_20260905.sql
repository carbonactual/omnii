create or replace view public.omnii_graph_edges as
select r.id as relationship_id,r.version,r.lifecycle,
       r.payload->>'relationship_type' as relationship_type,
       coalesce(r.payload->>'from_ref', r.payload->>'subject_ref') as from_ref,
       coalesce(r.payload->>'to_ref', r.payload->>'object_ref') as to_ref,
       r.authority,r.provenance,r.payload,r.correlation_id,r.created_at,r.updated_at
from public.omnii_relationships r
where r.lifecycle='active';

create or replace view public.omnii_atlas_objects as
select o.id,o.version,o.lifecycle,o.canonical_type,o.scope_horizon,o.reality_state,o.architectural_class,
       o.authority,o.provenance,o.payload,o.correlation_id,o.created_at,o.updated_at
from public.omnii_objects o
where o.lifecycle='active';

create index if not exists omnii_relationships_payload_gin_idx on public.omnii_relationships using gin(payload);
create index if not exists omnii_objects_payload_gin_idx on public.omnii_objects using gin(payload);

create or replace function public.omnii_atlas_lookup(p_query text default null,p_type text default null,p_limit integer default 50)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare v_limit integer := greatest(1,least(coalesce(p_limit,50),200));
begin
 return jsonb_build_object(
  'objects',(select coalesce(jsonb_agg(to_jsonb(x)), '[]'::jsonb) from (
     select id,version,canonical_type,scope_horizon,reality_state,architectural_class,payload,provenance,created_at
     from public.omnii_atlas_objects
     where (p_type is null or canonical_type=p_type)
       and (p_query is null or p_query='' or payload::text ilike '%'||p_query||'%' or id ilike '%'||p_query||'%')
     order by updated_at desc limit v_limit) x),
  'edges',(select coalesce(jsonb_agg(to_jsonb(y)), '[]'::jsonb) from (
     select relationship_id,relationship_type,from_ref,to_ref,payload,provenance,created_at
     from public.omnii_graph_edges
     where (p_query is null or p_query='' or from_ref ilike '%'||p_query||'%' or to_ref ilike '%'||p_query||'%' or relationship_type ilike '%'||p_query||'%')
     order by updated_at desc limit v_limit) y)
 );
end $$;
revoke all on function public.omnii_atlas_lookup(text,text,integer) from public,anon,authenticated;
grant execute on function public.omnii_atlas_lookup(text,text,integer) to service_role;
