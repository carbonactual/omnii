-- OMNII runtime security hardening.
-- Constrain function name resolution without changing constitutional semantics.

alter function public.omnii_touch_updated_at() set search_path = public, pg_temp;
alter function public.omnii_atomic_state_event(text,text,text,jsonb,jsonb,jsonb,text,text,text,text,text,text,jsonb,jsonb) set search_path = public, pg_temp;
alter function public.omnii_atomic_execution_audit(text,text,text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) set search_path = public, pg_temp;
alter function public.omnii_atomic_ledger_audit(text,jsonb,jsonb,jsonb,text,text,jsonb,jsonb,jsonb) set search_path = public, pg_temp;
alter function public.omnii_authority_issue(text,text,text,jsonb,jsonb,jsonb,jsonb,timestamptz,timestamptz,boolean,text,jsonb,text) set search_path = public, pg_temp;
alter function public.omnii_authority_revoke(text,text,timestamptz) set search_path = public, pg_temp;
alter function public.omnii_authority_suspend(text,text) set search_path = public, pg_temp;
