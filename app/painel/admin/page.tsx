import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { auditLogs, files, users } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { AdminDashboard } from "@/components/painel/admin-dashboard";

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/painel");

  const db = getDb();
  const [fileList, userList, logList] = await Promise.all([
    db.select().from(files).orderBy(desc(files.createdAt)),
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      })
      .from(users),
    db
      .select({
        id: auditLogs.id,
        actorId: auditLogs.actorId,
        action: auditLogs.action,
        targetType: auditLogs.targetType,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(30),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold text-[#0e526c]">Administração</h1>
      <AdminDashboard
        initialFiles={fileList}
        initialUsers={userList}
        initialLogs={logList}
      />
    </div>
  );
}
