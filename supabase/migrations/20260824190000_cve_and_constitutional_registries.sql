-- OMNII Constitutional Validation & Evaluation Engine (CVE)
-- Canonical 26-registry catalog.

create table if not exists public.omnii_cve_rules (
  id text primary key,
  version text not null default '1',
  severity text not null default 'error' check (severity in ('info','warning','error','critical')),
  description text not null,
  evaluator text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.omnii_cve_runs (
  id uuid primary key default gen_random_uuid(),
  version text not null default '1', lifecycle text not null default 'completed',
  authority jsonb not null default '{}'::jsonb, provenance jsonb not null default '{}'::jsonb,
  scope jsonb not null default '{}'::jsonb, subject jsonb not null default '{}'::jsonb,
  status text not null default 'running' check (status in ('running','completed','failed')),
  summary jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(), completed_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.omnii_cve_findings (
  id uuid primary key default gen_random_uuid(), run_id uuid not null references public.omnii_cve_runs(id) on delete cascade,
  rule_id text not null references public.omnii_cve_rules(id), registry_id text,
  subject jsonb not null default '{}'::jsonb,
  severity text not null check (severity in ('info','warning','error','critical')),
  status text not null default 'open' check (status in ('open','acknowledged','resolved','waived')),
  message text not null, expected jsonb not null default '{}'::jsonb,
  observed jsonb not null default '{}'::jsonb, evidence_refs jsonb not null default '[]'::jsonb,
  remediation_class text, created_at timestamptz not null default now()
);

create index if not exists omnii_cve_runs_status_idx on public.omnii_cve_runs(status);
create index if not exists omnii_cve_runs_started_idx on public.omnii_cve_runs(started_at desc);
create index if not exists omnii_cve_findings_run_idx on public.omnii_cve_findings(run_id);
create index if not exists omnii_cve_findings_registry_idx on public.omnii_cve_findings(registry_id);
create index if not exists omnii_cve_findings_rule_idx on public.omnii_cve_findings(rule_id);

alter table public.omnii_cve_rules enable row level security;
alter table public.omnii_cve_runs enable row level security;
alter table public.omnii_cve_findings enable row level security;

drop trigger if exists omnii_cve_runs_touch_updated_at on public.omnii_cve_runs;
create trigger omnii_cve_runs_touch_updated_at before update on public.omnii_cve_runs for each row execute function public.omnii_touch_updated_at();
drop trigger if exists omnii_cve_rules_touch_updated_at on public.omnii_cve_rules;
create trigger omnii_cve_rules_touch_updated_at before update on public.omnii_cve_rules for each row execute function public.omnii_touch_updated_at();

insert into public.omnii_cve_rules (id,version,severity,description,evaluator) values
('REGISTRY_IDENTITY','1','error','Registry has a stable registry identity and explicit registry type.','registry_identity'),
('REGISTRY_PROVENANCE','1','error','Registry identifies its canonical provenance source.','registry_provenance'),
('REGISTRY_AUTHORITY','1','error','Registry carries an explicit authority context without treating capability as authority.','registry_authority'),
('REGISTRY_LIFECYCLE','1','error','Registry lifecycle is explicitly represented.','registry_lifecycle'),
('REGISTRY_DOMAIN','1','error','Registry declares its semantic domain.','registry_domain'),
('REGISTRY_SOURCE','1','error','Foundational registry declares its canonical source reference.','registry_source'),
('REGISTRY_RELATIONSHIPS','1','warning','Registry declares expected cross-registry relationship vocabulary.','registry_relationships'),
('REGISTRY_AUDITABILITY','1','error','Registry has attributable provenance sufficient for audit linkage.','registry_auditability'),
('OPEN_WORLD','1','warning','Registry preserves explicit unknown/gap semantics instead of forcing certainty.','open_world'),
('NO_AUTHORITY_ESCALATION','1','critical','Registry explicitly declares that evaluation/capability cannot grant constitutional authority.','no_authority_escalation')
on conflict (id) do update set version=excluded.version,severity=excluded.severity,description=excluded.description,evaluator=excluded.evaluator,active=true,updated_at=now();

insert into public.omnii_registries (id,version,lifecycle,authority,provenance,payload) values
('registry:identity','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Identity Registry","domain":"identity","canonical_source":"OMNII Identity Contract","expected_relations":["identifies","aliases","continues","verified_by"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:territory','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Territory Registry","domain":"territory","canonical_source":"OMNII Territory Contract","expected_relations":["contains","adjacent_to","governed_by","located_in"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:population','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Population Registry","domain":"population","canonical_source":"OMNII Population Contract","expected_relations":["resides_in","belongs_to","counted_by"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:authority','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Authority Registry","domain":"authority","canonical_source":"OMNII Authority Contract","expected_relations":["authorizes","delegates","revokes","governs"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:institution','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Institution Registry","domain":"institution","canonical_source":"OMNII Institution Contract","expected_relations":["operates","mandates","members","serves"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:enterprise','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Enterprise Registry","domain":"enterprise","canonical_source":"OMNII Enterprise Contract","expected_relations":["owns","employs","trades_with","provides"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:person','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Person Registry","domain":"person","canonical_source":"OMNII Human Identity Contract","expected_relations":["related_to","employs","educates","receives_service"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:asset','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Asset Registry","domain":"asset","canonical_source":"OMNII Value Contract","expected_relations":["owned_by","custodied_by","located_in","valued_by"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:liability','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Liability Registry","domain":"liability","canonical_source":"OMNII Economic Contract","expected_relations":["owed_by","owed_to","secured_by","settled_by"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:value','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Value Registry","domain":"value","canonical_source":"OMNII Value Contract","expected_relations":["valued_as","created_by","given_to","received_from"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:pulse','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Pulse Registry","domain":"pulse","canonical_source":"OMNII Pulse Contract","expected_relations":["measures","feedback_from","affects","correlates_with"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:relationship','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Relationship Registry","domain":"relationship","canonical_source":"OMNII Universal Relationship Contract","expected_relations":["relates","depends_on","causes","requires"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:knowledge','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Knowledge Registry","domain":"knowledge","canonical_source":"OMNII Knowledge Contract","expected_relations":["supports","contradicts","derived_from","verified_by"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:health','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Health Registry","domain":"health","canonical_source":"OMNII Health Contract","expected_relations":["has_condition","receives_care","measured_by","located_at"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:education','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Education Registry","domain":"education","canonical_source":"OMNII Education Contract","expected_relations":["learns","teaches","certifies","attends"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:justice','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Justice Registry","domain":"justice","canonical_source":"OMNII Justice Contract","expected_relations":["decides","appeals","disputes","enforces"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:environment','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Environment Registry","domain":"environment","canonical_source":"OMNII Ecology Contract","expected_relations":["affects","located_in","measured_by","protected_by"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:infrastructure','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Infrastructure Registry","domain":"infrastructure","canonical_source":"OMNII Infrastructure Contract","expected_relations":["supports","connects","located_in","maintained_by"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:transport','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Transport Registry","domain":"transport","canonical_source":"OMNII Motion and Charter Contracts","expected_relations":["operated_by","moves","routes_to","serves"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:culture','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Culture Registry","domain":"culture","canonical_source":"OMNII Cultural Continuity Contract","expected_relations":["expresses","preserves","belongs_to","transmits"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:continuity','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Continuity Registry","domain":"continuity","canonical_source":"OMNII Constitutional Continuity Contract","expected_relations":["continues","inherits","recovers","transitions_to"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:token','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Token Registry","domain":"token","canonical_source":"OMNII Tokenization Doctrine","expected_relations":["represents","issued_by","owned_by","transferred_to"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:mint','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Mint Registry","domain":"mint","canonical_source":"OMNII Mint Contract","expected_relations":["mints","issues","burns","references"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:settlement','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Settlement Registry","domain":"settlement","canonical_source":"OMNII Settlement Contract","expected_relations":["settles","receives","delivers","reconciles"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:governance','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"Governance Registry","domain":"governance","canonical_source":"OMNII Governance Contract","expected_relations":["governs","approves","reviews","revokes"],"open_world":true,"authority_policy":{"non_granting":true}}'),
('registry:ai-entity','1','active','{}','{"source":"OMNII constitutional registry catalog","catalog_version":"2026-08-24"}','{"type":"registry","name":"AI Entity Registry","domain":"ai-entity","canonical_source":"OMNII AI Entity Contract","expected_relations":["operates_for","delegated_by","executes","observes"],"open_world":true,"authority_policy":{"non_granting":true}}')
on conflict (id) do update set version=excluded.version,lifecycle=excluded.lifecycle,provenance=excluded.provenance,payload=excluded.payload,updated_at=now();

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
insert into public.omnii_audit(id,version,lifecycle,authority,provenance,payload,correlation_id) values('cve-run:'||v_run::text,'1','active','{}'::jsonb,jsonb_build_object('source','OMNII CVE'),jsonb_build_object('type','cve_evaluation','run_id',v_run::text,'summary',jsonb_build_object('registries_evaluated',v_total,'findings',v_findings)),v_run::text) on conflict(id) do nothing;
return jsonb_build_object('run_id',v_run::text,'status','completed','summary',jsonb_build_object('registries_evaluated',v_total,'rules_evaluated',v_total*v_rules_per_registry,'findings',v_findings,'critical',v_critical,'errors',v_error,'warnings',v_warning));
exception when others then update public.omnii_cve_runs set status='failed',lifecycle='failed',completed_at=now(),summary=jsonb_build_object('error',sqlerrm) where id=v_run; raise; end; $$;
revoke all on function public.omnii_cve_evaluate(jsonb,jsonb) from public;
