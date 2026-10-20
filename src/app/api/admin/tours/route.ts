import { NextResponse } from "next/server";
import { requirePermission, assertSameOrigin, HttpError } from "@/lib/auth/rbac";
import { tourSchema } from "@/lib/validation/admin";
import { tourFieldsFrom, saveTourImage } from "@/server/tours/media";
import { db } from "@/lib/db";
import { handleError } from "@/lib/http";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    await requirePermission("tours:manage");
    const form = await req.formData();
    const parsed = tourSchema.safeParse(tourFieldsFrom(form));
    if (!parsed.success) throw new HttpError(400, "Invalid tour details.");
    const d = parsed.data;
    const uploaded = await saveTourImage(form);
    const base = slugify(d.name) || "tour";
    const slug = (await db.tour.findUnique({ where: { slug: base } })) ? `${base}-${Date.now().toString(36)}` : base;
    const tour = await db.tour.create({
      data: {
        slug, name: d.name, destination: d.destination, durationDays: d.durationDays,
        shortDescription: d.shortDescription, description: d.description,
        price: d.price, currency: d.currency,
        mainImage: uploaded ?? d.mainImage, mainVideo: d.mainVideo,
        included: d.includedText, excluded: d.excludedText, requirements: d.requirementsText,
        available: d.available ?? true, published: d.published ?? false,
      },
    });
    return NextResponse.json(tour, { status: 201 });
  } catch (e) { return handleError(e); }
}
