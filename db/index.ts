import "server-only";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  const url = process.env.TURSO_DATABASE_URL?.trim();
  if (!url) {
    throw new Error("Variável de ambiente obrigatória ausente: TURSO_DATABASE_URL");
  }
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
  const client = createClient({ url, authToken });
  cachedDb = drizzle(client, { schema });
  return cachedDb;
}
