create table if not exists public.omnii_trade_intents (
 id text primary key,
 actor_ref text not null,
 intent_type text not null,
 instrument_type text not null,
 subject_ref text,
 quantity numeric,
 value jsonb not null default '{}'::jsonb,
 terms jsonb not null default '{}'::jsonb,
 context jsonb not null default '{}'::jsonb,
 authority_ref text,
 capability_ref text,
 status text not null default 'proposed',
 provenance jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.omnii_trade_offers (
 id text primary key,
 provider_ref text not null,
 intent_ref text,
 instrument_type text not null,
 subject_ref text,
 quantity numeric,
 ask_value jsonb not null default '{}'::jsonb,
 terms jsonb not null default '{}'::jsonb,
 availability jsonb not null default '{}'::jsonb,
 rights_constraints jsonb not null default '{}'::jsonb,
 authority_ref text,
 status text not null default 'open',
 provenance jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.omnii_investment_positions (
 id text primary key,
 investor_ref text not null,
 subject_ref text not null,
 position_type text not null,
 quantity numeric,
 entry_value jsonb not null default '{}'::jsonb,
 rights jsonb not null default '{}'::jsonb,
 obligations jsonb not null default '{}'::jsonb,
 thesis jsonb not null default '{}'::jsonb,
 risk_profile jsonb not null default '{}'::jsonb,
 status text not null default 'open',
 provenance jsonb not null default '{}'::jsonb,
 opened_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists omnii_trade_intents_instrument_idx on public.omnii_trade_intents(instrument_type,status);
create index if not exists omnii_trade_offers_instrument_idx on public.omnii_trade_offers(instrument_type,status);
create index if not exists omnii_investment_positions_subject_idx on public.omnii_investment_positions(subject_ref,status);
alter table public.omnii_trade_intents enable row level security;
alter table public.omnii_trade_offers enable row level security;
alter table public.omnii_investment_positions enable row level security;
revoke all on public.omnii_trade_intents,public.omnii_trade_offers,public.omnii_investment_positions from public,anon,authenticated;
grant select,insert,update,delete on public.omnii_trade_intents,public.omnii_trade_offers,public.omnii_investment_positions to service_role;
create or replace function public.omnii_create_trade_intent(p_actor_ref text,p_intent_type text,p_instrument_type text,p_subject_ref text default null,p_quantity numeric default null,p_value jsonb default '{}'::jsonb,p_terms jsonb default '{}'::jsonb,p_context jsonb default '{}'::jsonb,p_authority_ref text default null,p_capability_ref text default null)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare v_id text := 'intent:'||gen_random_uuid()::text;
begin
 insert into public.omnii_trade_intents(id,actor_ref,intent_type,instrument_type,subject_ref,quantity,value,terms,context,authority_ref,capability_ref,provenance)
 values(v_id,p_actor_ref,p_intent_type,p_instrument_type,p_subject_ref,p_quantity,p_value,p_terms,p_context,p_authority_ref,p_capability_ref,jsonb_build_object('source','omnii:trade-common'));
 return jsonb_build_object('id',v_id,'status','proposed');
end; $$;
revoke all on function public.omnii_create_trade_intent(text,text,text,text,numeric,jsonb,jsonb,jsonb,text,text) from public,anon,authenticated;
grant execute on function public.omnii_create_trade_intent(text,text,text,text,numeric,jsonb,jsonb,jsonb,text,text) to service_role;
