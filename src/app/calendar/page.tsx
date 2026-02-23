import { Shell } from "../(ui)/Shell";

export default function CalendarPage() {
  return (
    <Shell title="📅 Calendar">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-sm text-neutral-300">
        第一版先把页面占位跑通。下一步：把 OpenClaw cron job 列表同步进 Convex（只读），并用日历视图展示。
      </div>
    </Shell>
  );
}
