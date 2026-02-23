"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Shell } from "../(ui)/Shell";
import { useMemo, useState } from "react";

const statuses = ["Backlog", "Doing", "Blocked", "Done"] as const;
const assignees = [
  { key: "Guo" as const, label: "郭大喵" },
  { key: "Sao" as const, label: "扫地僧" },
];

export default function TasksPage() {
  const tasksQuery = useQuery(api.tasks.list, {});
  const tasks = (tasksQuery ?? []) as Array<{
    _id: string;
    title: string;
    status: (typeof statuses)[number];
    assignee: "Guo" | "Sao";
  }>;
  const create = useMutation(api.tasks.create);
  const update = useMutation(api.tasks.update);

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState<"Guo" | "Sao">("Sao");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Backlog");

  const tasksMemo = useMemo(() => tasks, [tasks]);

  const byStatus = useMemo(() => {
    const m = new Map<string, typeof tasks>();
    for (const s of statuses) m.set(s, []);
    for (const t of tasksMemo) m.get(t.status)?.push(t);
    return m;
  }, [tasksMemo]);

  return (
    <Shell title="✅ Tasks">
      <div className="grid gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="text-sm text-neutral-300">新建任务</div>
          <div className="mt-2 grid gap-2 sm:grid-cols-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="任务标题"
              className="sm:col-span-3 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
            />
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value as "Guo" | "Sao")}
              className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
            >
              {assignees.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as (typeof statuses)[number])}
              className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={async () => {
                if (!title.trim()) return;
                await create({ title: title.trim(), assignee, status, source: "manual" });
                setTitle("");
              }}
              className="rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-950 hover:bg-white"
            >
              添加
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {statuses.map((s) => (
            <div key={s} className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-3">
              <div className="mb-2 text-sm font-medium text-neutral-200">{s}</div>
              <div className="space-y-2">
                {(byStatus.get(s) ?? []).map((t) => (
                  <div key={t._id} className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="mt-1 text-xs text-neutral-400">
                      负责人：{t.assignee === "Guo" ? "郭大喵" : "扫地僧"}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <select
                        value={t.status}
                        onChange={(e) =>
                          update({
                            // Convex Id type is generated; keep runtime string id
                            id: t._id as unknown as Parameters<typeof update>[0]["id"],
                            status: e.target.value as (typeof statuses)[number],
                          })
                        }
                        className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                      >
                        {statuses.map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                      <select
                        value={t.assignee}
                        onChange={(e) =>
                          update({
                            id: t._id as unknown as Parameters<typeof update>[0]["id"],
                            assignee: e.target.value as "Guo" | "Sao",
                          })
                        }
                        className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                      >
                        {assignees.map((a) => (
                          <option key={a.key} value={a.key}>
                            {a.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                {(byStatus.get(s) ?? []).length === 0 ? (
                  <div className="text-xs text-neutral-500">暂无任务</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
