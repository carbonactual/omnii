create table if not exists public.omnii_pulse_observations (
 id text primary key,
 subject_ref text,
 event_ref text,
 metric text not null,
 value_numeric numeric not null,
 unit text,
 direction text not null default 'observed',
 context jsonb not null default '{}'::jsonb,
 evidence_refs jsonb not null default '[]'::jsonb,
 provenance jsonb not null default '{}'::jsonb,
 observed_at timestamptz not null default now(),
 created_at timestamptz not null default now()
);
create index if not exists omnii_pulse_observations_subject_idx on public.omnii_pulse_observations(subject_ref,observed_at desc);
create table if not exists public.omnii_value_feedback (
 id text primary key,
 subject_ref text,
 value_numeric numeric not null,
 value_unit text,
 cost_numeric numeric,
 cost_unit text,
 pulse_numeric numeric,
 classification text not null,
 methodology_version text not null default 'omnii-v1',
 inputs jsonb not null default '{}'::jsonb,
 evidence_refs jsonb not null default '[]'::jsonb,
 provenance jsonb not null default '{}'::jsonb,
 observed_at timestamptz not null default now(),
 created_at timestamptz not null default now()
);
create index if not exists omnii_value_feedback_subject_idx on public.omnii_value_feedback(subject_ref,observed_at desc);
alter table public.omnii_pulse_observations enable row level security;
alter table public.omnii_value_feedback enable row level security;
revoke all on public.omnii_pulse_observations,public.omnii_value_feedback from public,anon,authenticated;
grant select,insert,update,delete on public.omnii_pulse_observations,public.omnii_value_feedback to service_role;
create or replace function public.omnii_record_pulse_and_value(p_subject_ref text,p_metric text,p_value numeric,p_unit text default null,p_cost numeric default null,p_cost_unit text default null,p_context jsonb default '{}'::jsonb,p_evidence_refs jsonb default '[]'::jsonb)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare v_class text; v_pulse numeric; v_id text:= 'pulse:'||gen_random_uuid()::text; v_val_id text:='value:'||gen_random_uuid()::text;
begin
 if p_value is null then raise exception 'pulse_value_missing'; end if;
 v_pulse:=case when p_cost is null or p_cost=0 then p_value else p_value-p_cost end;
 v_class:=case when p_cost is null then 'observed_value' when v_pulse>0 then 'asset' when v_pulse<0 then 'liability' else 'balanced' end;
 insert into public.omnii_pulse_observations(id,subject_ref,metric,value_numeric,unit,direction,context,evidence_refs,provenance)
 values(v_id,p_subject_ref,p_metric,p_value,p_unit,'observed',p_context,p_evidence_refs,jsonb_build_object('source','omnii:value_feedback'));
 insert into public.omnii_value_feedback(id,subject_ref,value_numeric,value_unit,cost_numeric,cost_unit,pulse_numeric,classification,inputs,evidence_refs,provenance)
 values(v_val_id,p_subject_ref,p_value,p_unit,p_cost,p_cost_unit,v_pulse,v_class,jsonb_build_object('metric',p_metric,'context',p_context),p_evidence_refs,jsonb_build_object('pulse_observation_id',v_id));
 return jsonb_build_object('pulse_observation_id',v_id,'value_feedback_id',v_val_id,'pulse',v_pulse,'classification',v_class);
end $$;
revoke all on function public.omnii_record_pulse_and_value(text,text,numeric,text,numeric,text,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.omnii_record_pulse_and_value(text,text,numeric,text,numeric,text,jsonb,jsonb) to service_role;
