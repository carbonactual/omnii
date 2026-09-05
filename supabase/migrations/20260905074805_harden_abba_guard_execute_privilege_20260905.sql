revoke execute on function public.omnii_abba_guard_action(text,text,text,boolean) from public;
revoke execute on function public.omnii_abba_guard_action(text,text,text,boolean) from anon;
revoke execute on function public.omnii_abba_guard_action(text,text,text,boolean) from authenticated;
grant execute on function public.omnii_abba_guard_action(text,text,text,boolean) to service_role;
