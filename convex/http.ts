import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Simple bearer auth for local-only usage. You can rotate this.
const TOKEN = process.env.MISSION_CONTROL_TOKEN || "devtoken";

function unauthorized() {
  return new Response("unauthorized", { status: 401 });
}

http.route({
  path: "/runs",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const auth = req.headers.get("authorization") || "";
    if (auth !== `Bearer ${TOKEN}`) return unauthorized();

    const body = await req.json();

    // Minimal validation (no v.parse in runtime; keep simple and defensive)
    const parsed = {
      kind: body?.kind,
      role: body?.role,
      title: body?.title,
      status: body?.status,
      parentSessionKey: body?.parentSessionKey,
      childSessionKey: body?.childSessionKey,
      runId: body?.runId,
      input: body?.input,
      output: body?.output,
      error: body?.error,
    } as any;

    if (!parsed.kind || !parsed.role || !parsed.title || !parsed.status) {
      return new Response(JSON.stringify({ ok: false, error: "missing required fields" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const id = await ctx.runMutation("agentRuns:create", {
      kind: parsed.kind,
      role: parsed.role,
      title: parsed.title,
      status: parsed.status,
      parentSessionKey: parsed.parentSessionKey,
      childSessionKey: parsed.childSessionKey,
      runId: parsed.runId,
      input: parsed.input,
    });

    if (parsed.output || parsed.error) {
      await ctx.runMutation("agentRuns:update", {
        id,
        status: parsed.status,
        output: parsed.output,
        error: parsed.error,
        childSessionKey: parsed.childSessionKey,
        runId: parsed.runId,
      });
    }

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }),
});

export default http;
