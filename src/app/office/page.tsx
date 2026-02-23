"use client";

import { Shell } from "../(ui)/Shell";
import { roles } from "@/lib/roles";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

type Run = { role: string; status: string };

function roleStatusFromRuns(role: string, runs: Run[]) {
  const latest = runs.find((r) => r.role === role);
  if (!latest) return { status: "Idle", label: "Idle" };
  if (latest.status === "Running" || latest.status === "Queued") return { status: "Working", label: latest.status };
  if (latest.status === "Failed") return { status: "Blocked", label: "Failed" };
  return { status: "Done", label: "Succeeded" };
}

export default function OfficePage() {
  const runs = useQuery(api.agentRuns.list, {}) ?? [];

  return (
    <Shell title="🏢 Digital Office">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
        <div className="text-sm text-neutral-300">每个座位=一个角色（emoji）。状态来自 Runs 记录（后续我会把 sessions_spawn/cron 自动写进来）。</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((r) => {
          const st = roleStatusFromRuns(r.key, runs);
          const color =
            st.status === "Working" ? "bg-blue-500" : st.status === "Blocked" ? "bg-red-500" : st.status === "Done" ? "bg-green-500" : "bg-neutral-600";
          return (
            <div key={r.key} className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-3xl">{r.emoji}</div>
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-neutral-400">{r.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${color}`} />
                  <div className="text-xs text-neutral-300">{st.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
