begin;

create table if not exists public.omnii_process_task_handlers (
  id text primary key,
  version text not null default '1',
  task_type text not null,
  handler_key text not null,
  execution_mode text not null default 'event',
  outcome_event text,
  evidence_template jsonb not null default '[]'::jsonb,
  authority_requirements jsonb not null default '{}'::jsonb,
  lifecycle text not null default 'active',
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (execution_mode in ('event','external','human')),
  check (lifecycle in ('draft','active','suspended','archived'))
);

create unique index if not exists omnii_process_task_handlers_type_active_uidx
  on public.omnii_process_task_handlers (task_type)
  where lifecycle = 'active';

alter table public.omnii_process_task_handlers enable row level security;
revoke all on public.omnii_process_task_handlers from public, anon, authenticated;
grant select, insert, update, delete on public.omnii_process_task_handlers to service_role;

comment on table public.omnii_process_task_handlers is 'Governed process-task handler registry. Service-role mediated; no client execution authority.';
comment on column public.omnii_process_task_handlers.execution_mode is 'event = deterministic local event completion; external = adapter-required; human = approval/operator boundary.';

insert into public.omnii_process_task_handlers (id, version, task_type, handler_key, execution_mode, outcome_event, evidence_template, authority_requirements, lifecycle, provenance)
values ('system.workflow_stage', '1', 'workflow_stage', 'system.workflow_stage', 'event', 'workflow.stage.completed', '[{"type":"worker_execution","source":"omnii-worker"}]'::jsonb, '{}'::jsonb, 'active', '{"seed":"runtime"}'::jsonb)
on conflict (id) do update set version=excluded.version, task_type=excluded.task_type, handler_key=excluded.handler_key, execution_mode=excluded.execution_mode, outcome_event=excluded.outcome_event, evidence_template=excluded.evidence_template, authority_requirements=excluded.authority_requirements, lifecycle=excluded.lifecycle, provenance=excluded.provenance, updated_at=now();

commit;
