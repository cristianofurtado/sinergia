import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { files } from "@/db/schema";
import { ColaboradorBrowser } from "@/components/painel/colaborador-browser";

export const dynamic = "force-dynamic";

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const category = params.categoria ?? "all";
  const items = process.env.TURSO_DATABASE_URL?.trim()
    ? await getDb().select().from(files).orderBy(desc(files.createdAt))
    : [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold text-[#0e526c]">
        Materiais do Colaborador
      </h1>
      <ColaboradorBrowser items={items} category={category} />
    </div>
  );
}
