BEGIN;
CREATE OR REPLACE FUNCTION public.omnii_validate_abba_execution_context(
  p_session_id text,
  p_plan_id text,
  p_authority_ref text,
  p_capability_ref text,
  p_required boolean DEFAULT false
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE gate jsonb;
BEGIN
  IF p_required IS NOT TRUE THEN RETURN jsonb_build_object('required',false,'allowed',true); END IF;
  IF p_session_id IS NULL OR p_plan_id IS NULL OR p_authority_ref IS NULL OR p_capability_ref IS NULL THEN
    RAISE EXCEPTION 'abba_dispatch_context_incomplete';
  END IF;
  SELECT public.omnii_abba_guard_action(p_session_id,p_capability_ref,p_authority_ref,false) INTO gate;
  IF COALESCE((gate->>'allowed')::boolean,false) IS NOT TRUE THEN RAISE EXCEPTION 'abba_dispatch_context_blocked'; END IF;
  RETURN gate || jsonb_build_object('required',true,'plan_id',p_plan_id);
END;
$$;
REVOKE ALL ON FUNCTION public.omnii_validate_abba_execution_context(text,text,text,text,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.omnii_validate_abba_execution_context(text,text,text,text,boolean) TO service_role;

CREATE OR REPLACE FUNCTION public.omnii_bind_abba_task(
  p_task_id text,
  p_session_id text,
  p_plan_id text,
  p_authority_ref text,
  p_capability_ref text,
  p_required boolean DEFAULT true
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE gate jsonb;
BEGIN
  gate := public.omnii_validate_abba_execution_context(p_session_id,p_plan_id,p_authority_ref,p_capability_ref,p_required);
  UPDATE public.omnii_process_tasks
  SET abba_execution_required=p_required, abba_session_id=p_session_id, abba_plan_id=p_plan_id, authority_ref=p_authority_ref, capability_ref=p_capability_ref, updated_at=now()
  WHERE id=p_task_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'abba_task_not_found'; END IF;
  RETURN gate || jsonb_build_object('task_id',p_task_id,'bound',true);
END;
$$;
REVOKE ALL ON FUNCTION public.omnii_bind_abba_task(text,text,text,text,text,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.omnii_bind_abba_task(text,text,text,text,text,boolean) TO service_role;
COMMIT;