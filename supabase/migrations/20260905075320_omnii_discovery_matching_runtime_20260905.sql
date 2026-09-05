create table if not exists public.omnii_discovery_indexes (
 id text primary key,
 subject_ref text not null,
 subject_type text not null,
 discoverable boolean not null default true,
 capabilities jsonb not null default '[]'::jsonb,
 resources jsonb not null default '[]'::jsonb,
 availability jsonb not null default '{}'::jsonb,
 context jsonb not null default '{}'::jsonb,
 ranking jsonb not null default '{}'::jsonb,
 provenance jsonb not null default '{}'::jsonb,
 valid_from timestamptz not null default now(),
 valid_until timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists omnii_discovery_indexes_subject_idx on public.omnii_discovery_indexes(subject_ref,discoverable);
create index if not exists omnii_discovery_indexes_capabilities_gin on public.omnii_discovery_indexes using gin(capabilities);
create index if not exists omnii_discovery_indexes_context_gin on public.omnii_discovery_indexes using gin(context);
alter table public.omnii_discovery_indexes enable row level security;
revoke all on public.omnii_discovery_indexes from public,anon,authenticated;
grant select,insert,update,delete on public.omnii_discovery_indexes to service_role;
create or replace function public.omnii_discover_capabilities(p_intent_ref text default null,p_context jsonb default '{}'::jsonb,p_limit integer default 50)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare v_limit integer:=greatest(1,least(coalesce(p_limit,50),200));
begin
 return (select coalesce(jsonb_agg(to_jsonb(x)),'[]'::jsonb) from (
  select id,subject_ref,subject_type,capabilities,availability,context,ranking,provenance
  from public.omnii_discovery_indexes
  where discoverable and (valid_until is null or valid_until>now())
    and (p_context='{}'::jsonb or context @> p_context or p_context @> context)
  order by coalesce((ranking->>'priority')::numeric,0) desc,updated_at desc limit v_limit) x);
end $$;
revoke all on function public.omnii_discover_capabilities(text,jsonb,integer) from public,anon,authenticated;
grant execute on function public.omnii_discover_capabilities(text,jsonb,integer) to service_role;
