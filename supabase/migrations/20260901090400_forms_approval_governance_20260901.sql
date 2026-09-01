BEGIN;

CREATE INDEX IF NOT EXISTS idx_form_reviews_submission_decision
  ON public.omnii_form_reviews (submission_id, decision, decided_at DESC);

CREATE INDEX IF NOT EXISTS idx_form_submissions_template_status
  ON public.omnii_form_submissions (template_id, status, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_institutional_forms_lifecycle_category
  ON public.omnii_institutional_forms (lifecycle, category);

CREATE INDEX IF NOT EXISTS idx_institutional_workflows_lifecycle_category
  ON public.omnii_institutional_workflows (lifecycle, category);

DROP POLICY IF EXISTS authenticated_read_institutional_forms ON public.omnii_institutional_forms;
CREATE POLICY authenticated_read_institutional_forms
  ON public.omnii_institutional_forms FOR SELECT TO authenticated
  USING (lifecycle = 'active');

DROP POLICY IF EXISTS authenticated_read_institutional_workflows ON public.omnii_institutional_workflows;
CREATE POLICY authenticated_read_institutional_workflows
  ON public.omnii_institutional_workflows FOR SELECT TO authenticated
  USING (lifecycle = 'active');

DROP POLICY IF EXISTS omnii_form_reviews_insert_assigned ON public.omnii_form_reviews;
CREATE POLICY omnii_form_reviews_insert_assigned
  ON public.omnii_form_reviews FOR INSERT TO authenticated
  WITH CHECK (reviewer_id = ((SELECT auth.uid()))::text);

DROP POLICY IF EXISTS omnii_form_reviews_update_own ON public.omnii_form_reviews;
CREATE POLICY omnii_form_reviews_update_own
  ON public.omnii_form_reviews FOR UPDATE TO authenticated
  USING (reviewer_id = ((SELECT auth.uid()))::text)
  WITH CHECK (reviewer_id = ((SELECT auth.uid()))::text);

COMMIT;
