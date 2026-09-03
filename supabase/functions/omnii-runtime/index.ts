import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type RuntimeSignalInput = {
  source?: string;
  eventType?: string;
  payload?: Record<string, unknown>;
  correlationId?: string;
  idempotencyKey?: string;
  subjectId?: string;
  operatingContextId?: string;
  provenance?: Record<string, unknown>;
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "runtime_not_configured" }, 500);

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "missing_authorization" }, 401);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    global: { headers: { Authorization: authorization } },
  });

  const { data: { user }, error: userError } = await client.auth.getUser(authorization.slice("Bearer ".length));
  if (userError || !user) return json({ error: "unauthorized" }, 401);

  let input: RuntimeSignalInput;
  try {
    input = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  if (!input.source || !input.eventType || !input.correlationId || !input.idempotencyKey || !input.payload) {
    return json({ error: "invalid_signal", required: ["source", "eventType", "correlationId", "idempotencyKey", "payload"] }, 422);
  }

  const idempotencyKey = `runtime:signal:${input.idempotencyKey}`;
  const { data: existing, error: lookupError } = await client
    .from("omnii_events")
    .select("id, version, lifecycle, correlation_id, idempotency_key, operating_context_id, provenance, payload")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();
  if (lookupError) return json({ error: "lookup_failed", detail: lookupError.message }, 500);
  if (existing) return json({ accepted: true, replayed: true, eventId: existing.id, correlationId: existing.correlation_id }, 200);

  const eventId = crypto.randomUUID();
  const provenance = {
    ...(input.provenance ?? {}),
    authenticatedUserId: user.id,
    authenticatedAt: new Date().toISOString(),
    ingress: "supabase:function:omnii-runtime",
  };

  const { error: insertError } = await client.from("omnii_events").insert({
    id: eventId,
    version: "1",
    lifecycle: "active",
    authority: {},
    provenance,
    payload: {
      type: input.eventType,
      source: input.source,
      actor: user.id,
      subject: input.subjectId ?? null,
      payload: input.payload,
    },
    correlation_id: input.correlationId,
    idempotency_key: idempotencyKey,
    operating_context_id: input.operatingContextId ?? null,
  });

  if (insertError) return json({ error: "ingress_failed", detail: insertError.message }, 500);

  return json({
    accepted: true,
    replayed: false,
    eventId,
    correlationId: input.correlationId,
    status: "received",
  }, 202);
});
