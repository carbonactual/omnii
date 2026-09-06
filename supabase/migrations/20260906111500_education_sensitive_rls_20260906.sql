begin;

-- Education operating data is not public merely because an actor is authenticated.
-- Keep institution/programme/curriculum/course/cohort discovery readable to authenticated users;
-- keep learner, assessment, placement, credential and AI-capability records service-role mediated
-- until product-specific ownership policies are composed from canonical identity/authority data.

drop policy if exists education_enrollments_authenticated_select on public.omnii_education_enrollments;
drop policy if exists education_assessment_results_authenticated_select on public.omnii_education_assessment_results;
drop policy if exists education_placements_authenticated_select on public.omnii_education_placements;
drop policy if exists education_credentials_authenticated_select on public.omnii_education_credential_references;
drop policy if exists education_ai_assessments_authenticated_select on public.omnii_education_ai_capability_assessments;

commit;
