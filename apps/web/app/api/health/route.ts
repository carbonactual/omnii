import { createSupabaseServerClient } from "../../../lib/supabase/server";

export async function GET() {
  const startedAt = Date.now();

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("properties").select("id", { head: true, count: "exact" }).limit(1);

    return Response.json({
      status: error ? "degraded" : "ok",
      service: "bunk-web",
      integrations: {
        supabase: error ? "degraded" : "connected"
      },
      latency_ms: Date.now() - startedAt,
      timestamp: new Date().toISOString()
    }, { status: error ? 503 : 200 });
  } catch (error) {
    return Response.json({
      status: "error",
      service: "bunk-web",
      message: error instanceof Error ? error.message : "Unknown health failure",
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
