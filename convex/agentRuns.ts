import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const Role = v.union(
  v.literal("Dev"),
  v.literal("Writer"),
  v.literal("Designer"),
  v.literal("Research"),
  v.literal("QA"),
  v.literal("Ops"),
);

const Status = v.union(v.literal("Queued"), v.literal("Running"), v.literal("Succeeded"), v.literal("Failed"));

export const list = query({
  args: {
    status: v.optional(Status),
    role: v.optional(Role),
  },
  handler: async (ctx, args) => {
    const q = ctx.db.query("agentRuns");
    const runs = await q.collect();
    return runs
      .filter((r) => (args.status ? r.status === args.status : true))
      .filter((r) => (args.role ? r.role === args.role : true))
      .sort((a, b) => (b.startedAt ?? 0) - (a.startedAt ?? 0));
  },
});

export const create = mutation({
  args: {
    kind: v.union(v.literal("sessions_spawn"), v.literal("cron"), v.literal("manual")),
    role: Role,
    title: v.string(),
    status: Status,
    parentSessionKey: v.optional(v.string()),
    childSessionKey: v.optional(v.string()),
    runId: v.optional(v.string()),
    input: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("agentRuns", {
      ...args,
      startedAt: args.status === "Running" ? now : undefined,
      endedAt: args.status === "Succeeded" || args.status === "Failed" ? now : undefined,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("agentRuns"),
    status: v.optional(Status),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    childSessionKey: v.optional(v.string()),
    runId: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patch }) => {
    const now = Date.now();
    const endedAt = patch.status === "Succeeded" || patch.status === "Failed" ? now : undefined;
    const startedAt = patch.status === "Running" ? now : undefined;
    await ctx.db.patch(id, { ...patch, ...(startedAt ? { startedAt } : {}), ...(endedAt ? { endedAt } : {}) });
  },
});
