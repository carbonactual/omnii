# NASC Deployment

NASC is a portable institutional composition built from OMNII reusable capabilities.

## Package contents

The deployment contains reusable registry, form, workflow, evidence, control, metrics, authority and handoff contracts plus the Supabase migration that instantiates the composition.

## Assembly

1. Provision/identify the target Supabase environment.
2. Apply the NASC migration `20260829235149_nasc_institutional_deployment_v1`.
3. Load only NASC-authorized reference data (statutory codes, schedules, laboratory scopes, geography and other controlled lists).
4. Configure identity, notification, payment, laboratory and public-verification integrations using institution-owned credentials.
5. Configure roles/authority and test the lifecycle/UAT suite.
6. Complete institutional acceptance before production activation.

## Boundary

OMNII provides reusable machinery. NASC controls institutional authority, policy, data, statutory decisions and operational ownership.
