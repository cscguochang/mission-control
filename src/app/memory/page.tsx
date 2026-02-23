import { Shell } from "../(ui)/Shell";

export default function MemoryPage() {
  return (
    <Shell title="🧠 Memory">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-sm text-neutral-300">
        第一版先把页面占位跑通。下一步：把 workspace 的 MEMORY.md、memory/*.md 索引进 Convex，并提供搜索/高亮。
      </div>
    </Shell>
  );
}
