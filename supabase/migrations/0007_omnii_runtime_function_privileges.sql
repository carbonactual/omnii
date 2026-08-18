-- Restrict OMNII mutating database functions to the backend service role.
-- Application-role policies remain intentionally unresolved; do not expose these functions to anon/authenticated.

revoke execute on function public.omnii_touch_updated_at() from public, anon, authenticated;
revoke execute on function public.omnii_atomic_state_event(text,text,text,jsonb,jsonb,jsonb,text,text,text,text,text,text,jsonb,jsonb) from public, anon, authenticated;
revoke execute on function public.omnii_atomic_execution_audit(text,text,text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) from public, anon, authenticated;
revoke execute on function public.omnii_atomic_ledger_audit(text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) from public, anon, authenticated;
revoke execute on function public.omnii_authority_issue(text,text,text,jsonb,jsonb,jsonb,jsonb,timestamptz,timestamptz,boolean,text,jsonb,text) from public, anon, authenticated;
revoke execute on function public.omnii_authority_revoke(text,text,timestamptz) from public, anon, authenticated;
revoke execute on function public.omnii_authority_suspend(text,text) from public, anon, authenticated;

grant execute on function public.omnii_atomic_state_event(text,text,text,jsonb,jsonb,jsonb,text,text,text,text,text,text,jsonb,jsonb) to service_role;
grant execute on function public.omnii_atomic_execution_audit(text,text,text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) to service_role;
grant execute on function public.omnii_atomic_ledger_audit(text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) to service_role;
grant execute on function public.omnii_authority_issue(text,text,text,jsonb,jsonb,jsonb,jsonb,timestamptz,timestamptz,boolean,text,jsonb,text) to service_role;
grant execute on function public.omnii_authority_revoke(text,text,timestamptz) to service_role;
grant execute on function public.omnii_authority_suspend(text,text) to service_role;
