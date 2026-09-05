create or replace function public.omnii_abba_world_context(p_query text default null,p_type text default null,p_context jsonb default '{}'::jsonb,p_limit integer default 25)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare v_limit integer:=greatest(1,least(coalesce(p_limit,25),100));
begin
 return jsonb_build_object(
  'atlas',public.omnii_atlas_lookup(p_query,p_type,v_limit),
  'discovery',public.omnii_discover_capabilities(null,p_context,v_limit),
  'recent_pulse',(select coalesce(jsonb_agg(to_jsonb(x)),'[]'::jsonb) from (select id,subject_ref,metric,value_numeric,unit,context,evidence_refs,observed_at from public.omnii_pulse_observations order by observed_at desc limit v_limit) x),
  'value_feedback',(select coalesce(jsonb_agg(to_jsonb(y)),'[]'::jsonb) from (select id,subject_ref,value_numeric,value_unit,cost_numeric,cost_unit,pulse_numeric,classification,methodology_version,observed_at from public.omnii_value_feedback order by observed_at desc limit v_limit) y)
 );
end $$;
revoke all on function public.omnii_abba_world_context(text,text,jsonb,integer) from public,anon,authenticated;
grant execute on function public.omnii_abba_world_context(text,text,jsonb,integer) to service_role;

create or replace function public.omnii_abba_world_model_query(p_query text default null,p_type text default null,p_context jsonb default '{}'::jsonb,p_limit integer default 25)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare v jsonb;
begin
 v:=public.omnii_abba_world_context(p_query,p_type,p_context,p_limit);
 return jsonb_build_object('abba','master','world_model',v,'authority_boundary',(select authority_boundary from public.omnii_common_layer_contract where id='omnii:common-layer'));
end $$;
revoke all on function public.omnii_abba_world_model_query(text,text,jsonb,integer) from public,anon,authenticated;
grant execute on function public.omnii_abba_world_model_query(text,text,jsonb,integer) to service_role;
