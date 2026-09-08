import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const allowed = new Set(["play", "view", "start", "complete", "pause", "seek", "share", "follow", "save"]);
const MAX_BODY_BYTES = 128 * 1024;
const MAX_SOURCE_LENGTH = 100;
const MAX_EVENT_ID_LENGTH = 200;
const MAX_MEDIA_ID_LENGTH = 200;
const MAX_PAST_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_FUTURE_MS = 5 * 60 * 1000;

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function cleanString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const secret = Deno.env.get("MEDIA_INGEST_SECRET");
  if (!secret || req.headers.get("x-media-ingest-secret") !== secret) {
    return json({ error: "unauthorized" }, 401);
  }

  const declaredLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const mediaId = cleanString(body.mediaId, MAX_MEDIA_ID_LENGTH);
  const source = cleanString(body.source, MAX_SOURCE_LENGTH);
  const sourceEventId = cleanString(body.sourceEventId, MAX_EVENT_ID_LENGTH);
  const eventType = cleanString(body.eventType, 32);
  const occurredAtText = cleanString(body.occurredAt, 64);

  if (!mediaId || !source || !sourceEventId || !eventType || !allowed.has(eventType) || !occurredAtText) {
    return json({ error: "invalid_event" }, 400);
  }

  const occurredMs = Date.parse(occurredAtText);
  if (!Number.isFinite(occurredMs)) return json({ error: "invalid_occurred_at" }, 400);
  const now = Date.now();
  if (occurredMs < now - MAX_PAST_MS || occurredMs > now + MAX_FUTURE_MS) {
    return json({ error: "event_time_out_of_window" }, 422);
  }

  const sessionRef = cleanString(body.sessionRef, 200);
  const actorRef = cleanString(body.actorRef, 200);
  const deviceRef = cleanString(body.deviceRef, 200);
  const networkRef = cleanString(body.networkRef, 200);
  const countryCode = cleanString(body.countryCode, 8);

  const completionRatio = body.completionRatio;
  if (completionRatio !== undefined && completionRatio !== null) {
    if (typeof completionRatio !== "number" || !Number.isFinite(completionRatio)) {
      return json({ error: "invalid_completion_ratio" }, 400);
    }
  }

  const durationMs = body.durationMs;
  if (durationMs !== undefined && durationMs !== null) {
    if (typeof durationMs !== "number" || !Number.isFinite(durationMs) || durationMs < 0 || durationMs > 86_400_000) {
      return json({ error: "invalid_duration" }, 400);
    }
  }

  const payload = body.payload ?? {};
  const quality = Math.max(
    0,
    Math.min(1, (!sessionRef ? 0.85 : 1) - (typeof completionRatio === "number" && (completionRatio < 0 || completionRatio > 1) ? 0.35 : 0)),
  );

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ error: "backend_configuration_missing" }, 503);

  const response = await fetch(`${url}/rest/v1/stream_events?on_conflict=source%2Csource_event_id`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=representation",
    },
    body: JSON.stringify([{
      media_id: mediaId,
      source,
      source_event_id: sourceEventId,
      event_type: eventType,
      occurred_at: new Date(occurredMs).toISOString(),
      session_ref: sessionRef,
      actor_ref: actorRef,
      device_ref: deviceRef,
      network_ref: networkRef,
      country_code: countryCode,
      duration_ms: durationMs,
      completion_ratio: completionRatio,
      quality_score: quality,
      payload,
    }]),
  });

  if (!response.ok) return json({ error: "upstream_insert_failed" }, 502);
  return json({ accepted: true, quality }, 202);
});
