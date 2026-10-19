"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function StaffDeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm(`Delete ${name} permanently? Their notes will be removed and any requests assigned to them will be unassigned.`)) return;
    setBusy(true); setMsg("");
    const res = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else setMsg((await res.json().catch(() => null))?.error ?? "Could not delete.");
  }

  return (
    <span className="flex items-center gap-3">
      <button onClick={remove} disabled={busy} className="btn-outline text-xs disabled:opacity-60">
        {busy ? "Deleting…" : "Delete"}
      </button>
      {msg && <span className="text-xs text-red-700">{msg}</span>}
    </span>
  );
}
