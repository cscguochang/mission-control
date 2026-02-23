import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    status: v.union(
      v.literal("Backlog"),
      v.literal("Doing"),
      v.literal("Blocked"),
      v.literal("Done"),
    ),
    assignee: v.union(v.literal("Guo"), v.literal("Sao")),
    priority: v.optional(v.union(v.literal("P0"), v.literal("P1"), v.literal("P2"))),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
    source: v.optional(v.string()), // e.g. feishu, manual
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assignee"]),

  agentRuns: defineTable({
    kind: v.union(v.literal("sessions_spawn"), v.literal("cron"), v.literal("manual")),
    role: v.union(
      v.literal("Dev"),
      v.literal("Writer"),
      v.literal("Designer"),
      v.literal("Research"),
      v.literal("QA"),
      v.literal("Ops"),
    ),
    title: v.string(),
    status: v.union(v.literal("Queued"), v.literal("Running"), v.literal("Succeeded"), v.literal("Failed")),
    startedAt: v.optional(v.number()),
    endedAt: v.optional(v.number()),
    // linkage
    parentSessionKey: v.optional(v.string()),
    childSessionKey: v.optional(v.string()),
    runId: v.optional(v.string()),
    // payload/result
    input: v.optional(v.string()),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_role", ["role"]),
});
