import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type RequestBody = {
  scope?: { registry_ids?: string[]; domain?: string };
  subject?: Record<string, unknown>;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "POST required" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ ok: false, error: "Runtime configuration unavailable" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const scope = body.scope ?? {};
  if (scope.registry_ids && (!Array.isArray(scope.registry_ids) || scope.registry_ids.some((id) => typeof id !== "string"))) {
    return new Response(JSON.stringify({ ok: false, error: "scope.registry_ids must be an array of strings" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (scope.domain !== undefined && typeof scope.domain !== "string") {
    return new Response(JSON.stringify({ ok: false, error: "scope.domain must be a string" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/omnii_cve_evaluate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_scope: scope, p_subject: body.subject ?? {} }),
  });

  const text = await response.text();
  let result: unknown;
  try {
    result = JSON.parse(text);
  } catch {
    result = { raw: text };
  }

  return new Response(JSON.stringify({ ok: response.ok, result: response.ok ? result : undefined, error: response.ok ? undefined : result }), {
    status: response.ok ? 200 : 500,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
