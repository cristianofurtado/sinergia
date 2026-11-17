import { redirect } from "next/navigation";
import { canAccessPainel, getSessionUser } from "@/lib/auth";
import { PainelShell } from "@/components/painel/painel-shell";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (!canAccessPainel(user.role)) redirect("/aguardando-aprovacao");

  return (
    <PainelShell
      user={{ name: user.name, email: user.email, role: user.role }}
    >
      {children}
    </PainelShell>
  );
}
