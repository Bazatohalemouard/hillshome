import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";
import { StaffForm } from "@/components/admin/StaffForm";
import { StaffDeleteButton } from "@/components/admin/StaffDeleteButton";

export const dynamic = "force-dynamic";

export default async function StaffAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (!can(session.role, "staff:manage")) redirect("/admin");
  const isSuper = session.role === "SUPER_ADMIN";
  const users = await db.user.findMany({ orderBy: { createdAt: "asc" } });
  const headers = ["Name", "Email", "Role", "Active", "Created", ...(isSuper ? ["Actions"] : [])];
  return (
    <div>
      <h1 className="text-3xl font-semibold">Staff</h1>
      <div className="mt-6 overflow-x-auto bg-white">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="border-b"><tr>{headers.map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role.replace("_", " ")}</td>
                <td className="p-3">{u.active ? "Yes" : "No"}</td>
                <td className="p-3">{u.createdAt.toLocaleDateString()}</td>
                {isSuper && (
                  <td className="p-3">
                    {u.id === session.id ? (
                      <span className="text-xs text-ink/50">Your account</span>
                    ) : (
                      <StaffDeleteButton id={u.id} name={u.name} />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StaffForm />
    </div>
  );
}
