import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { auditLogs, files, users } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { AdminDashboard } from "@/components/painel/admin-dashboard";

export const dynamic = "force-dynamic";

const ACTION_LABELS: Record<string, string> = {
  login: "Entrou no sistema",
  logout: "Saiu do sistema",
  login_failed: "Tentativa de login bloqueada",
  upload: "Publicou arquivo/texto",
  download: "Baixou/Visualizou arquivo",
  rename: "Editou/Moveu item",
  delete: "Excluiu item",
  role_change: "Alterou papel de usuário",
};

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/painel");

  const db = getDb();
  const [fileList, userList, rawLogs] = await Promise.all([
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
        targetId: auditLogs.targetId,
        metadataJson: auditLogs.metadataJson,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(50),
  ]);

  const userById = new Map(userList.map((u) => [u.id, u]));
  const fileById = new Map(fileList.map((f) => [f.id, f]));

  const logList = rawLogs.map((log) => {
    const actor = userById.get(log.actorId);
    let meta: Record<string, unknown> = {};
    if (log.metadataJson) {
      try {
        meta = JSON.parse(log.metadataJson) as Record<string, unknown>;
      } catch {
        meta = {};
      }
    }

    let detail = "";
    if (log.targetType === "file") {
      const title =
        (typeof meta.title === "string" && meta.title) ||
        fileById.get(log.targetId)?.title ||
        "Arquivo";
      detail = title;
    } else if (log.targetType === "user") {
      const targetUser = userById.get(log.targetId);
      const roleNote = typeof meta.role === "string" ? ` → ${meta.role}` : "";
      detail = targetUser ? `${targetUser.name} (${targetUser.email})${roleNote}` : log.targetId;
    }

    return {
      id: log.id,
      actorName: actor?.name ?? "Usuário desconhecido",
      actorEmail: actor?.email ?? "",
      actionLabel: ACTION_LABELS[log.action] ?? log.action,
      detail,
      createdAt: log.createdAt,
    };
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-4">
      <h1 className="text-2xl font-extrabold text-[#0e526c]">Administração</h1>
      <AdminDashboard
        initialFiles={fileList}
        initialUsers={userList}
        initialLogs={logList}
      />
    </div>
  );
}
