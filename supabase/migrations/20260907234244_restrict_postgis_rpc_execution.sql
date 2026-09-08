-- Managed PostGIS RPC exposure hardening.
-- PostGIS is currently installed in public and is non-relocatable on this hosted instance.
-- Revoke direct API-role execution of extension SECURITY DEFINER overloads where possible.
-- Hosted extension management may reassert these grants; verification is required after deployment.

revoke execute on function public.st_estimatedextent(text, text) from public, anon, authenticated;
revoke execute on function public.st_estimatedextent(text, text, text) from public, anon, authenticated;
revoke execute on function public.st_estimatedextent(text, text, text, boolean) from public, anon, authenticated;
