import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Tasks" },
  { href: "/content", label: "Content" },
  { href: "/calendar", label: "Calendar" },
  { href: "/memory", label: "Memory" },
  { href: "/team", label: "Team" },
  { href: "/office", label: "Office" },
];

export function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-6xl p-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{title}</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-1 hover:bg-neutral-900"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
