-- Stream aggregation is a backend worker operation, not a public API capability.
-- The Edge Function is separately secret-gated; the underlying RPC must not bypass that boundary.

revoke execute on function public.aggregate_stream_window(uuid, timestamptz, timestamptz, text) from public, anon, authenticated;
grant execute on function public.aggregate_stream_window(uuid, timestamptz, timestamptz, text) to service_role;
