import { HttpError } from "@/lib/auth/rbac";
import { checkFile } from "@/lib/validation/upload";
import { storage } from "@/lib/storage";

/** Scalar fields from a tour FormData, skipping the file input and any File values. */
export function tourFieldsFrom(form: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  // Later duplicate keys (checkbox over its hidden false) win.
  for (const [k, v] of form.entries()) {
    if (k === "image" || v instanceof File) continue;
    out[k] = v;
  }
  return out;
}

/** Saves an uploaded tour image and returns its public URL, or null when none was sent. */
export async function saveTourImage(form: FormData): Promise<string | null> {
  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) return null;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const check = checkFile(file.name, file.type, bytes);
  if (!check.ok) throw new HttpError(400, check.error);
  if (!check.mime.startsWith("image/")) {
    throw new HttpError(400, "Only image files are allowed for the tour image.");
  }
  const key = await storage.save(bytes, check.safeName, check.mime);
  return storage.resolveUrl(key);
}
