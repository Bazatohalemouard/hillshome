import { NextResponse } from "next/server";
import { requirePermission, assertSameOrigin, HttpError } from "@/lib/auth/rbac";
import { tourSchema } from "@/lib/validation/admin";
import { tourFieldsFrom, saveTourImage } from "@/server/tours/media";
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
        // A freshly uploaded image wins; otherwise keep the existing URL field value.
        ...(uploaded ? { mainImage: uploaded } : d.mainImage !== undefined ? { mainImage: d.mainImage } : {}),
        ...(d.mainVideo !== undefined ? { mainVideo: d.mainVideo } : {}),
        ...(d.includedText !== undefined ? { included: d.includedText } : {}),
        ...(d.excludedText !== undefined ? { excluded: d.excludedText } : {}),
        ...(d.requirementsText !== undefined ? { requirements: d.requirementsText } : {}),
        ...(d.available !== undefined ? { available: d.available } : {}),
        ...(d.published !== undefined ? { published: d.published } : {}),
        ...(d.archived !== undefined ? { archivedAt: d.archived ? new Date() : null } : {}),
      },
    });
    return NextResponse.json(tour);
  } catch (e) { return handleError(e); }
}
