"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TourDeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function remove() {
    if (!confirm(`Delete "${name}" permanently? Its image will be removed. Past requests are kept but will no longer link to it.`)) return;
    setBusy(true); setMsg("");
    const res = await fetch(`/api/admin/tours/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else setMsg((await res.json().catch(() => null))?.error ?? "Failed.");
  }

  return (
    <>
      <button onClick={remove} disabled={busy} className="text-red-700 underline disabled:opacity-60">
        {busy ? "Deleting…" : "Delete"}
      </button>
      {msg && <span className="ml-2 text-xs text-red-700">{msg}</span>}
    </>
  );
}
