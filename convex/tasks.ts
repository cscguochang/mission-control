import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const Status = v.union(
  v.literal("Backlog"),
  v.literal("Doing"),
  v.literal("Blocked"),
  v.literal("Done"),
);

const Assignee = v.union(v.literal("Guo"), v.literal("Sao"));

export const list = query({
  args: {
    status: v.optional(Status),
    assignee: v.optional(Assignee),
  },
  handler: async (ctx, args) => {
    // Keep it simple for MVP: full scan + filter (small dataset)
    const tasks = await ctx.db.query("tasks").collect();
    return tasks
      .filter((t) => (args.status ? t.status === args.status : true))
      .filter((t) => (args.assignee ? t.assignee === args.assignee : true));
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    status: Status,
    assignee: Assignee,
    priority: v.optional(v.union(v.literal("P0"), v.literal("P1"), v.literal("P2"))),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("tasks", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    status: v.optional(Status),
    assignee: v.optional(Assignee),
    priority: v.optional(v.union(v.literal("P0"), v.literal("P1"), v.literal("P2"))),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { id, ...patch }) => {
    await ctx.db.patch(id, { ...patch, updatedAt: Date.now() });
  },
});
