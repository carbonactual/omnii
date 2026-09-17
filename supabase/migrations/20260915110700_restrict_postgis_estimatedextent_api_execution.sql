-- SECURITY HARDENING
-- PostGIS estimated-extent helpers are implementation functions, not application RPCs.
-- Keep service_role access available while preventing direct PostgREST execution.
-- Supabase-managed PostGIS privileges may be reasserted after this migration;
-- the live advisor and privilege checks remain the source of truth.

revoke execute on function public.st_estimatedextent(text,text) from anon, authenticated;
revoke execute on function public.st_estimatedextent(text,text,text) from anon, authenticated;
revoke execute on function public.st_estimatedextent(text,text,text,boolean) from anon, authenticated;
