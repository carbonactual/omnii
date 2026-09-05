create table if not exists public.omnii_interoperability_adapters (
 id text primary key,
 name text not null,
 adapter_type text not null,
 direction text not null default 'bidirectional',
 endpoint_ref text,
 protocol text,
 identity_mapping jsonb not null default '{}'::jsonb,
 schema_mapping jsonb not null default '{}'::jsonb,
 capabilities jsonb not null default '[]'::jsonb,
 policy jsonb not null default '{}'::jsonb,
 status text not null default 'active',
 provenance jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.omnii_interoperability_messages (
 id text primary key,
 adapter_id text references public.omnii_interoperability_adapters(id),
 direction text not null,
 external_reference text,
 canonical_reference text,
 message_type text not null,
 payload jsonb not null,
 mapping_result jsonb not null default '{}'::jsonb,
 evidence_refs jsonb not null default '[]'::jsonb,
 idempotency_key text,
 status text not null default 'received',
 created_at timestamptz not null default now()
);
create unique index if not exists omnii_interop_message_idem_idx on public.omnii_interoperability_messages(idempotency_key) where idempotency_key is not null;
create index if not exists omnii_interop_adapter_status_idx on public.omnii_interoperability_adapters(status,adapter_type);
alter table public.omnii_interoperability_adapters enable row level security;
alter table public.omnii_interoperability_messages enable row level security;
revoke all on public.omnii_interoperability_adapters,public.omnii_interoperability_messages from public,anon,authenticated;
grant select,insert,update,delete on public.omnii_interoperability_adapters,public.omnii_interoperability_messages to service_role;
create or replace function public.omnii_register_interoperability_message(p_adapter_id text,p_direction text,p_message_type text,p_payload jsonb,p_external_reference text default null,p_canonical_reference text default null,p_idempotency_key text default null,p_evidence_refs jsonb default '[]'::jsonb)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare v_id text; v_status text := 'received';
begin
 if not exists(select 1 from public.omnii_interoperability_adapters where id=p_adapter_id and status='active') then raise exception 'interop_adapter_unavailable'; end if;
 if p_idempotency_key is not null then
   select id,status into v_id,v_status from public.omnii_interoperability_messages where idempotency_key=p_idempotency_key;
   if v_id is not null then return jsonb_build_object('id',v_id,'status',v_status,'replayed',true); end if;
 end if;
 v_id:='interop:'||gen_random_uuid()::text;
 insert into public.omnii_interoperability_messages(id,adapter_id,direction,external_reference,canonical_reference,message_type,payload,evidence_refs,idempotency_key,status)
 values(v_id,p_adapter_id,p_direction,p_external_reference,p_canonical_reference,p_message_type,p_payload,p_evidence_refs,p_idempotency_key,v_status);
 insert into public.omnii_events(id,version,lifecycle,authority,provenance,payload,correlation_id,idempotency_key)
 values(gen_random_uuid()::text,'1','active','{}'::jsonb,jsonb_build_object('adapter_id',p_adapter_id),jsonb_build_object('type','INTEROPERABILITY_MESSAGE_RECORDED','message_id',v_id),v_id,case when p_idempotency_key is null then 'interop:event:'||v_id else 'interop:event:'||p_idempotency_key end);
 return jsonb_build_object('id',v_id,'status',v_status,'replayed',false);
end;
$$;
revoke all on function public.omnii_register_interoperability_message(text,text,text,jsonb,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.omnii_register_interoperability_message(text,text,text,jsonb,text,text,text,jsonb) to service_role;
