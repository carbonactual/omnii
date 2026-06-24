import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createBunkServerClient() {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!projectUrl || !publicKey) throw new Error("Supabase public configuration is missing");

  const cookieStore = await cookies();
  return createServerClient(projectUrl, publicKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(values) {
        try {
          values.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components may not write cookies; middleware refreshes sessions.
        }
      }
    }
  });
}
