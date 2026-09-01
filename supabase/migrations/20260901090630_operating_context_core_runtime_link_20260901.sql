alter table public.omnii_events add column if not exists operating_context_id text;
alter table public.omnii_state add column if not exists operating_context_id text;
alter table public.omnii_ledger add column if not exists operating_context_id text;
alter table public.omnii_workflows add column if not exists operating_context_id text;

create index if not exists idx_omnii_events_operating_context on public.omnii_events(operating_context_id, created_at desc);
create index if not exists idx_omnii_state_operating_context on public.omnii_state(operating_context_id, updated_at desc);
create index if not exists idx_omnii_ledger_operating_context on public.omnii_ledger(operating_context_id, created_at desc);
create index if not exists idx_omnii_workflows_operating_context on public.omnii_workflows(operating_context_id, updated_at desc);
