import { NextResponse } from "next/server";
import { requirePermission, assertSameOrigin, HttpError } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { handleError } from "@/lib/http";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(req);
    const session = await requirePermission("staff:manage");
    // Only a super admin may remove staff accounts.
    if (session.role !== "SUPER_ADMIN") {
      throw new HttpError(403, "Only a super admin can delete staff members.");
    }
    const { id } = await params;
    if (id === session.id) throw new HttpError(400, "You cannot delete your own account.");

    const target = await db.user.findUnique({ where: { id } });
    if (!target) throw new HttpError(404, "Staff member not found.");

    // Never let the last active super admin be removed.
    if (target.role === "SUPER_ADMIN") {
      const otherAdmins = await db.user.count({
        where: { role: "SUPER_ADMIN", active: true, id: { not: id } },
      });
      if (otherAdmins === 0) throw new HttpError(400, "Cannot delete the last super admin.");
    }

    await db.$transaction([
      // Unassign any requests so they stay in the system.
      db.serviceRequest.updateMany({ where: { assigneeId: id }, data: { assigneeId: null } }),
      // InternalNote.author is required with no cascade, so remove their notes.
      db.internalNote.deleteMany({ where: { authorId: id } }),
      db.user.delete({ where: { id } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (e) { return handleError(e); }
}
