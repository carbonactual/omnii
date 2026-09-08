-- ABBA master-orchestrator policy update: common-layer-first reuse.
-- This strengthens the existing ABBA profile; it does not create a new authority model.

update public.omnii_abba_profiles
set
  version = '2',
  autonomy_policy = autonomy_policy || jsonb_build_object(
    'common_layer_first', true,
    'reuse_canonical_capabilities', true,
    'technology_provider_agnostic', true,
    'promote_repeated_capabilities_only_through_governance', true,
    'plans_are_not_execution', true,
    'recommendations_are_not_authority', true
  ),
  model_policy = model_policy || jsonb_build_object(
    'semantic_foundation', 'public.omnii_common_primitives',
    'capability_foundation', 'public.omnii_common_primitives',
    'domain_extensions_allowed', true,
    'technology_adapters_at_edge', true
  ),
  provenance = provenance || jsonb_build_object(
    'updated_by', '20260908000500_abba_common_layer_orchestration_policy_20260908',
    'common_layer_policy', 'canonical_common_layer_first'
  ),
  updated_at = now()
where id = 'abba:master';

comment on table public.omnii_abba_profiles is 'Canonical ABBA master-intelligence profile: bounded orchestrator, common-layer-first reuse, delegated authority only.';
