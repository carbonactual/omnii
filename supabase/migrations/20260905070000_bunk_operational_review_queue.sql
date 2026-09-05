create table if not exists public.bunk_review_queue (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  form_submission_id text,
  action_type text not null,
  status text not null default 'pending',
  priority text not null default 'normal',
  requester_id uuid references public.profiles(id),
  assigned_reviewer_id uuid references public.profiles(id),
  evidence_refs jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  authority_reference text,
  operating_context_id text,
  tip_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bunk_review_queue_status_idx on public.bunk_review_queue(status, priority, created_at);
create index if not exists bunk_review_queue_property_idx on public.bunk_review_queue(property_id, status);

create table if not exists public.bunk_action_outcomes (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.bunk_review_queue(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  outcome_type text not null,
  result text not null,
  authority_reference text,
  evidence_refs jsonb not null default '[]'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  tip_reference text,
  pulse_event_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists bunk_action_outcomes_property_idx on public.bunk_action_outcomes(property_id, created_at desc);

alter table public.bunk_review_queue enable row level security;
alter table public.bunk_action_outcomes enable row level security;

drop policy if exists bunk_review_queue_self_or_reviewer on public.bunk_review_queue;
create policy bunk_review_queue_self_or_reviewer on public.bunk_review_queue
for select using (auth.uid() = requester_id or auth.uid() = assigned_reviewer_id);

drop policy if exists bunk_action_outcomes_self_or_reviewer on public.bunk_action_outcomes;
create policy bunk_action_outcomes_self_or_reviewer on public.bunk_action_outcomes
for select using (exists (select 1 from public.bunk_review_queue q where q.id = review_id and (auth.uid() = q.requester_id or auth.uid() = q.assigned_reviewer_id)));
