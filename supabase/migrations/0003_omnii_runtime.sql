-- OMNII universal runtime persistence boundary.
-- Constitutional semantics remain in OMNII contracts; PostgreSQL is storage infrastructure only.

create extension if not exists pgcrypto;

do $$
declare
  t text;
begin
  foreach t in array array[
    'omnii_objects','omnii_relationships','omnii_dependencies','omnii_registries',
    'omnii_events','omnii_state','omnii_executions','omnii_workflows','omnii_agents',
    'omnii_audit','omnii_ledger'
  ] loop
    execute format($sql$
      create table if not exists %I (
        id text primary key,
        version text not null default '1',
        lifecycle text not null default 'active',
        authority jsonb not null default '{}'::jsonb,
        provenance jsonb not null default '{}'::jsonb,
        payload jsonb not null default '{}'::jsonb,
        correlation_id text,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )
    $sql$, t);
    execute format('create index if not exists %I on %I (correlation_id)', t || '_correlation_idx', t);
    execute format('create index if not exists %I on %I (lifecycle)', t || '_lifecycle_idx', t);
  end loop;
end $$;

create index if not exists omnii_objects_type_idx on omnii_objects ((payload->>'type'));
create index if not exists omnii_relationships_source_idx on omnii_relationships ((payload->>'source'));
create index if not exists omnii_relationships_target_idx on omnii_relationships ((payload->>'target'));
create index if not exists omnii_events_type_idx on omnii_events ((payload->>'type'));
create index if not exists omnii_executions_actor_idx on omnii_executions ((payload->>'actorIdentity'));

-- Runtime tables are intentionally server-side by default. Explicit authorization policies
-- belong to the hosting application and must not redefine OMNII authority semantics.
alter table omnii_objects enable row level security;
alter table omnii_relationships enable row level security;
alter table omnii_dependencies enable row level security;
alter table omnii_registries enable row level security;
alter table omnii_events enable row level security;
alter table omnii_state enable row level security;
alter table omnii_executions enable row level security;
alter table omnii_workflows enable row level security;
alter table omnii_agents enable row level security;
alter table omnii_audit enable row level security;
alter table omnii_ledger enable row level security;

create or replace function omnii_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'omnii_objects','omnii_relationships','omnii_dependencies','omnii_registries',
    'omnii_events','omnii_state','omnii_executions','omnii_workflows','omnii_agents',
    'omnii_audit','omnii_ledger'
  ] loop
    execute format('drop trigger if exists %I on %I', t || '_touch_updated_at', t);
    execute format('create trigger %I before update on %I for each row execute function omnii_touch_updated_at()', t || '_touch_updated_at', t);
  end loop;
end $$;
