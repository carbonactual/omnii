-- Corrective migration for the live CVE evaluator.
-- The evaluator must select created_at for auditability checks and report
-- rules_evaluated as registries x active rules, not as an accumulated counter.

create or replace function public.omnii_cve_evaluate(p_scope jsonb default '{}'::jsonb,p_subject jsonb default '{}'::jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_run uuid:=gen_random_uuid(); v_total int:=0; v_findings int:=0; v_critical int:=0; v_error int:=0; v_warning int:=0; v_rules_per_registry int:=0; r record; v_rules record; v_pass boolean; v_expected jsonb; v_observed jsonb;
begin
insert into public.omnii_cve_runs(id,scope,subject,status,provenance) values(v_run,coalesce(p_scope,'{}'::jsonb),coalesce(p_subject,'{}'::jsonb),'running',jsonb_build_object('source','OMNII CVE','evaluator_version','1'));
select count(*) into v_rules_per_registry from public.omnii_cve_rules where active;
for r in select id,version,lifecycle,authority,provenance,payload,created_at from public.omnii_registries where left(id,9)='registry:' and (not(p_scope ? 'registry_ids') or id in(select jsonb_array_elements_text(p_scope->'registry_ids'))) and (not(p_scope ? 'domain') or payload->>'domain'=p_scope->>'domain') order by id loop
 v_total:=v_total+1;
 for v_rules in select * from public.omnii_cve_rules where active order by id loop
  case v_rules.id
   when 'REGISTRY_IDENTITY' then v_pass:=left(r.id,9)='registry:' and r.payload->>'type'='registry'; v_expected:='{"id_prefix":"registry:","type":"registry"}'::jsonb; v_observed:=jsonb_build_object('id',r.id,'type',r.payload->>'type');
   when 'REGISTRY_PROVENANCE' then v_pass:=coalesce(nullif(r.provenance->>'source',''),'')<>''; v_expected:='{"provenance_source":true}'::jsonb; v_observed:=jsonb_build_object('source',r.provenance->>'source');
   when 'REGISTRY_AUTHORITY' then v_pass:=r.authority is not null; v_expected:='{"authority_context":true}'::jsonb; v_observed:=jsonb_build_object('authority_context_present',r.authority is not null);
   when 'REGISTRY_LIFECYCLE' then v_pass:=coalesce(nullif(r.lifecycle,''),'')<>''; v_expected:='{"lifecycle":true}'::jsonb; v_observed:=jsonb_build_object('lifecycle',r.lifecycle);
   when 'REGISTRY_DOMAIN' then v_pass:=coalesce(nullif(r.payload->>'domain',''),'')<>''; v_expected:='{"domain":true}'::jsonb; v_observed:=jsonb_build_object('domain',r.payload->>'domain');
   when 'REGISTRY_SOURCE' then v_pass:=coalesce(nullif(r.payload->>'canonical_source',''),'')<>''; v_expected:='{"canonical_source":true}'::jsonb; v_observed:=jsonb_build_object('canonical_source',r.payload->>'canonical_source');
   when 'REGISTRY_RELATIONSHIPS' then v_pass:=jsonb_typeof(r.payload->'expected_relations')='array' and jsonb_array_length(r.payload->'expected_relations')>0; v_expected:='{"expected_relations":"non-empty array"}'::jsonb; v_observed:=jsonb_build_object('expected_relations',coalesce(r.payload->'expected_relations','[]'::jsonb));
   when 'REGISTRY_AUDITABILITY' then v_pass:=coalesce(nullif(r.provenance->>'source',''),'')<>'' and r.created_at is not null; v_expected:='{"source":true,"created_at":true}'::jsonb; v_observed:=jsonb_build_object('source_present',coalesce(nullif(r.provenance->>'source',''),'')<>'','created_at_present',r.created_at is not null);
   when 'OPEN_WORLD' then v_pass:=coalesce((r.payload->>'open_world')::boolean,false)=true; v_expected:='{"open_world":true}'::jsonb; v_observed:=jsonb_build_object('open_world',coalesce((r.payload->>'open_world')::boolean,false));
   when 'NO_AUTHORITY_ESCALATION' then v_pass:=coalesce((r.payload#>>'{authority_policy,non_granting}')::boolean,false)=true; v_expected:='{"authority_policy":{"non_granting":true}}'::jsonb; v_observed:=jsonb_build_object('non_granting',coalesce((r.payload#>>'{authority_policy,non_granting}')::boolean,false));
   else v_pass:=true; v_expected:='{}'::jsonb; v_observed:='{}'::jsonb;
  end case;
  if not v_pass then v_findings:=v_findings+1; if v_rules.severity='critical' then v_critical:=v_critical+1; elsif v_rules.severity='error' then v_error:=v_error+1; elsif v_rules.severity='warning' then v_warning:=v_warning+1; end if; insert into public.omnii_cve_findings(run_id,rule_id,registry_id,subject,severity,message,expected,observed,remediation_class) values(v_run,v_rules.id,r.id,coalesce(p_subject,'{}'::jsonb),v_rules.severity,format('%s failed for %s',v_rules.id,r.id),v_expected,v_observed,'constitutional-review'); end if;
 end loop;
end loop;
update public.omnii_cve_runs set status='completed',lifecycle='completed',completed_at=now(),summary=jsonb_build_object('registries_evaluated',v_total,'rules_evaluated',v_total*v_rules_per_registry,'findings',v_findings,'critical',v_critical,'errors',v_error,'warnings',v_warning) where id=v_run;
insert into public.omnii_audit(id,version,lifecycle,authority,provenance,payload,correlation_id) values('cve-run:'||v_run::text,'1','active','{}'::jsonb,jsonb_build_object('source','OMNII CVE'),jsonb_build_object('type','cve_evaluation','run_id',v_run::text,'summary',jsonb_build_object('registries_evaluated',v_total,'findings',v_findings,'critical',v_critical,'errors',v_error,'warnings',v_warning)),v_run::text) on conflict(id) do nothing;
return jsonb_build_object('run_id',v_run::text,'status','completed','summary',jsonb_build_object('registries_evaluated',v_total,'rules_evaluated',v_total*v_rules_per_registry,'findings',v_findings,'critical',v_critical,'errors',v_error,'warnings',v_warning));
exception when others then update public.omnii_cve_runs set status='failed',lifecycle='failed',completed_at=now(),summary=jsonb_build_object('error',sqlerrm) where id=v_run; raise; end; $$;
