import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const MAX_BODY_BYTES = 16 * 1024;
const MAX_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function bounded(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  return v.length > 0 && v.length <= max ? v : null;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const secret = Deno.env.get("MEDIA_WORKER_SECRET");
  if (!secret || req.headers.get("x-media-worker-secret") !== secret) return json({ error: "unauthorized" }, 401);

  const declaredLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const mediaId = bounded(body.mediaId, 200);
  const startText = bounded(body.start, 64);
  const endText = bounded(body.end, 64);
  const source = bounded(body.source, 100);
  if (!mediaId || !startText || !endText || !source) return json({ error: "mediaId,start,end,source required" }, 400);

  const startMs = Date.parse(startText);
  const endMs = Date.parse(endText);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return json({ error: "invalid_window" }, 400);
  if (endMs <= startMs) return json({ error: "invalid_window_order" }, 422);
  if (endMs - startMs > MAX_WINDOW_MS) return json({ error: "window_too_large" }, 422);
  if (endMs > Date.now() + 5 * 60 * 1000) return json({ error: "window_in_future" }, 422);

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ error: "backend_configuration_missing" }, 503);

  const response = await fetch(`${url}/rest/v1/rpc/aggregate_stream_window`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      p_media_id: mediaId,
      p_start: new Date(startMs).toISOString(),
      p_end: new Date(endMs).toISOString(),
      p_source: source,
    }),
  });

  const text = await response.text();
  if (!response.ok) return json({ error: "aggregation_failed" }, 502);

  let result: unknown = text;
  try { result = JSON.parse(text); } catch { /* Preserve non-JSON upstream output as opaque text. */ }
  return json(result, 200);
});
