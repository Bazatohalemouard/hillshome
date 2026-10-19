"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton({ collapsed = false }: { collapsed?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      title="Log out"
      aria-label="Log out"
      className={`mt-4 flex w-full shrink-0 items-center gap-3 rounded border border-white/20 bg-white/5 py-2.5 text-sm font-medium text-white/80 transition hover:border-red-400/60 hover:bg-red-500/15 hover:text-red-200 disabled:opacity-60 ${collapsed ? "justify-center px-0" : "px-3"}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5M21 12H9" />
      </svg>
      {!collapsed && <span>{busy ? "Logging out…" : "Log out"}</span>}
    </button>
  );
}
