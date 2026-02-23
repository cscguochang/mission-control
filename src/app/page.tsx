import Link from "next/link";

const items = [
  { href: "/tasks", title: "Tasks", desc: "任务看板（你/我）", emoji: "✅" },
  { href: "/content", title: "Content", desc: "内容流水线（idea→script→publish）", emoji: "🧩" },
  { href: "/calendar", title: "Calendar", desc: "cron/计划任务日历", emoji: "📅" },
  { href: "/memory", title: "Memory", desc: "记忆文档 + 搜索", emoji: "🧠" },
  { href: "/team", title: "Team", desc: "角色编制 + runs", emoji: "🧑‍🤝‍🧑" },
  { href: "/office", title: "Office", desc: "数字办公室（状态面板）", emoji: "🏢" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold">Mission Control</h1>
          <div className="text-xs text-neutral-400">local • no-login • emoji</div>
        </div>
        <p className="mt-2 text-sm text-neutral-300">
          这是我们协作的控制台：任务/内容/日历/记忆/团队/办公室。后续我所有工作都会在这里留痕。
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{it.emoji}</div>
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-neutral-400">{it.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 text-sm text-neutral-300">
          <div className="font-medium">运行提示</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              本地 Convex dashboard：<span className="text-neutral-200">http://127.0.0.1:6790</span>
            </li>
            <li>
              外部访问（临时）：trycloudflare 链接（你那边验收可用性）。
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
