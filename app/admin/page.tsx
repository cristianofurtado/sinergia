import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export default async function AdminAliasPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/painel");
  redirect("/painel/admin");
}
