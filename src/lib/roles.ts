export type RoleKey = "Dev" | "Writer" | "Designer" | "Research" | "QA" | "Ops";

export const roles: { key: RoleKey; emoji: string; title: string; desc: string }[] = [
  { key: "Dev", emoji: "🧑‍💻", title: "Dev", desc: "Next.js/Convex/自动化/脚本" },
  { key: "Writer", emoji: "✍️", title: "Writer", desc: "报告/总结/文案/结构化输出" },
  { key: "Designer", emoji: "🎨", title: "Designer", desc: "信息架构/排版/可视化" },
  { key: "Research", emoji: "🔎", title: "Research", desc: "检索/资料核验/竞品" },
  { key: "QA", emoji: "🧪", title: "QA", desc: "验收/可复现步骤/质量门禁" },
  { key: "Ops", emoji: "🛠️", title: "Ops", desc: "运行稳定性/监控/交付通道" },
];
