"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Initial = {
  name: string; destination: string; durationDays: number; shortDescription: string; description: string;
  price: string; currency: string; mainImage: string; mainVideo: string;
  included: string; excluded: string; requirements: string;
  available: boolean; published: boolean; archived: boolean;
};

/** Checkbox backed by a hidden false so the value is always present in FormData. */
function BoolField({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="hidden" name={name} value="false" />
      <input type="checkbox" name={name} value="true" defaultChecked={defaultChecked} /> {label}
    </label>
  );
}

export function TourForm({ action, method, initial }: { action: string; method: "POST" | "PATCH"; initial: Initial }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg("");
    // Multipart so the API can store an uploaded image file.
    const body = new FormData(e.currentTarget);
    const res = await fetch(action, { method, body });
    setBusy(false);
    if (res.ok) { router.push("/admin/tours"); router.refresh(); }
    else setMsg((await res.json().catch(() => null))?.error ?? "Could not save.");
  }

  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  const shownImage = preview ?? (initial.mainImage || null);

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-2xl space-y-4 bg-white p-6">
      <div><label className="label" htmlFor="name">Name</label><input id="name" name="name" required defaultValue={initial.name} className="input" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="destination">Destination</label><input id="destination" name="destination" required defaultValue={initial.destination} className="input" /></div>
        <div><label className="label" htmlFor="durationDays">Duration (days)</label><input id="durationDays" name="durationDays" type="number" min={1} required defaultValue={initial.durationDays} className="input" /></div>
      </div>
      <div><label className="label" htmlFor="shortDescription">Short description</label><input id="shortDescription" name="shortDescription" required defaultValue={initial.shortDescription} className="input" /></div>
      <div><label className="label" htmlFor="description">Description</label><textarea id="description" name="description" rows={4} required defaultValue={initial.description} className="input" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="price">Price (empty = on request)</label><input id="price" name="price" type="number" step="0.01" min={0} defaultValue={initial.price} className="input" /></div>
        <div><label className="label" htmlFor="currency">Currency</label><input id="currency" name="currency" maxLength={3} defaultValue={initial.currency} className="input" /></div>
      </div>

      <div>
        <span className="label">Tour image</span>
        <input id="image" name="image" type="file" accept="image/jpeg,image/png" onChange={onPickImage} className="input" />
        <p className="mt-1 text-xs text-ink/70">JPG or PNG, up to 5 MB. Leave empty to keep the current image.</p>
        {shownImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shownImage} alt="Tour image preview" className="mt-3 h-40 w-auto rounded border border-navy-900/10 object-cover" />
        )}
        {/* Keeps the stored image when no new file is chosen. */}
        <input type="hidden" name="mainImage" value={initial.mainImage} />
      </div>

      <div>
        <label className="label" htmlFor="mainVideo">Video link (optional)</label>
        <input id="mainVideo" name="mainVideo" defaultValue={initial.mainVideo} placeholder="https://youtube.com/… or https://…/video.mp4" className="input" />
        <p className="mt-1 text-xs text-ink/70">YouTube, Vimeo or a direct mp4 link shown on the tour page.</p>
      </div>

      <div><label className="label" htmlFor="included">Included (one per line)</label><textarea id="included" name="included" rows={3} defaultValue={initial.included} className="input" /></div>
      <div><label className="label" htmlFor="excluded">Excluded (one per line)</label><textarea id="excluded" name="excluded" rows={3} defaultValue={initial.excluded} className="input" /></div>
      <div><label className="label" htmlFor="requirements">Requirements (one per line)</label><textarea id="requirements" name="requirements" rows={3} defaultValue={initial.requirements} className="input" /></div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <BoolField name="available" label="Available" defaultChecked={initial.available} />
        <BoolField name="published" label="Published (visible on website)" defaultChecked={initial.published} />
        <BoolField name="archived" label="Archived" defaultChecked={initial.archived} />
      </div>
      <div className="flex items-center gap-4">
        <button disabled={busy} className="btn-navy disabled:opacity-60">{busy ? "Saving…" : "Save tour"}</button>
        {msg && <p role="status" className="text-sm">{msg}</p>}
      </div>
    </form>
  );
}
