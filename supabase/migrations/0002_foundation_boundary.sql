create table if not exists public.product_role_activations (
  id uuid primary key default gen_random_uuid(),
  human_id uuid not null,
  human_reference text not null,
  hapi_reference uuid not null,
  minted_ai_reference uuid not null,
  role_key text not null,
  organization_id uuid references public.organizations(id),
  seal_reference uuid not null,
  status text not null default 'active',
  metadata jsonb not null default '{}',
  activated_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique(human_id, role_key, organization_id)
);

alter table public.product_role_activations enable row level security;

create policy role_activation_self_read on public.product_role_activations
for select using (human_id = auth.uid());

create policy role_activation_self_insert on public.product_role_activations
for insert with check (human_id = auth.uid());

create policy role_activation_self_update on public.product_role_activations
for update using (human_id = auth.uid()) with check (human_id = auth.uid());

comment on table public.product_role_activations is
'BUNK-specific roles linked to foundation-issued human, HAPI, minted AI, and SEAL references. This table does not create foundation identity.';
