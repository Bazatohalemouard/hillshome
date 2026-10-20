import { NextResponse } from "next/server";
import { requirePermission, assertSameOrigin, HttpError } from "@/lib/auth/rbac";
import { tourSchema } from "@/lib/validation/admin";
import { tourFieldsFrom, saveTourImage, removeStoredImage } from "@/server/tours/media";
import { db } from "@/lib/db";
import { handleError } from "@/lib/http";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(req);
    await requirePermission("tours:manage");
    const form = await req.formData();
    const parsed = tourSchema.partial().safeParse(tourFieldsFrom(form));
    if (!parsed.success) throw new HttpError(400, "Invalid tour details.");
    const { id } = await params;
    const d = parsed.data;
    const uploaded = await saveTourImage(form);
    // New upload wins; otherwise use the form value (null clears it); else leave unchanged.
    const nextImage = uploaded ?? (d.mainImage !== undefined ? d.mainImage : undefined);
    const old = nextImage !== undefined
      ? await db.tour.findUnique({ where: { id }, select: { mainImage: true } })
      : null;
    const tour = await db.tour.update({
      where: { id },
      data: {
        ...(d.name !== undefined ? { name: d.name } : {}),
        ...(d.destination !== undefined ? { destination: d.destination } : {}),
        ...(d.durationDays !== undefined ? { durationDays: d.durationDays } : {}),
        ...(d.shortDescription !== undefined ? { shortDescription: d.shortDescription } : {}),
        ...(d.description !== undefined ? { description: d.description } : {}),
        ...(d.price !== undefined ? { price: d.price } : {}),
        ...(d.currency !== undefined ? { currency: d.currency } : {}),
        ...(nextImage !== undefined ? { mainImage: nextImage } : {}),
        ...(d.mainVideo !== undefined ? { mainVideo: d.mainVideo } : {}),
        ...(d.includedText !== undefined ? { included: d.includedText } : {}),
        ...(d.excludedText !== undefined ? { excluded: d.excludedText } : {}),
        ...(d.requirementsText !== undefined ? { requirements: d.requirementsText } : {}),
        ...(d.available !== undefined ? { available: d.available } : {}),
        ...(d.published !== undefined ? { published: d.published } : {}),
        ...(d.archived !== undefined ? { archivedAt: d.archived ? new Date() : null } : {}),
      },
    });
    // When the image is cleared or replaced, drop the old stored file too.
    if (old?.mainImage && old.mainImage !== nextImage) {
      await removeStoredImage(old.mainImage);
    }
    return NextResponse.json(tour);
  } catch (e) { return handleError(e); }
}
