import { createBrowserClient } from "@supabase/ssr";

export function createBunkBrowserClient() {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!projectUrl || !publicKey) throw new Error("Supabase public configuration is missing");
  return createBrowserClient(projectUrl, publicKey);
}
