-- CVE is exposed through the authenticated Edge Function, not directly as a public RPC.
revoke all on function public.omnii_cve_evaluate(jsonb,jsonb) from public;
revoke execute on function public.omnii_cve_evaluate(jsonb,jsonb) from anon;
revoke execute on function public.omnii_cve_evaluate(jsonb,jsonb) from authenticated;
grant execute on function public.omnii_cve_evaluate(jsonb,jsonb) to service_role;
