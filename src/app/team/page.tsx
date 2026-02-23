"use client";

import { Shell } from "../(ui)/Shell";
import { roles } from "@/lib/roles";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function TeamPage() {
  const runs = useQuery(api.agentRuns.list, {}) ?? [];
  const create = useMutation(api.agentRuns.create);

  return (
    <Shell title="🧑‍🤝‍🧑 Team">
      <div className="grid gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="text-sm font-medium">角色编制（Roles）</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r) => (
              <div key={r.key} className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{r.emoji}</div>
                  <div className="font-medium">{r.title}</div>
                </div>
                <div className="mt-1 text-sm text-neutral-400">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Runs（subagent/cron 执行记录）</div>
            <button
              onClick={async () => {
                await create({
                  kind: "manual",
                  role: "Ops",
                  title: "(demo) 手动记录一条 run",
                  status: "Succeeded",
                  input: "demo",
                });
              }}
              className="rounded-lg bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-950 hover:bg-white"
            >
              + demo run
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {runs.length === 0 ? <div className="text-xs text-neutral-500">暂无 run 记录</div> : null}
            {runs.map((r) => (
              <div key={r._id} className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="mt-1 text-xs text-neutral-400">
                      {r.kind} · {r.role} · {r.status}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {r.startedAt ? new Date(r.startedAt).toLocaleString() : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
