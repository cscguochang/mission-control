import { Shell } from "../(ui)/Shell";

export default function ContentPage() {
  return (
    <Shell title="🧩 Content Pipeline">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-sm text-neutral-300">
        第一版先把页面占位跑通。下一步接入 Convex 表：Ideas / Scripts / Assets（图片附件）/ Stages。
      </div>
    </Shell>
  );
}
