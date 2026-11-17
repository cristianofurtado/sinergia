import "server-only";

export function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
}

export function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function validateServerEnv() {
  const required = [
    "TURSO_DATABASE_URL",
    "TURSO_AUTH_TOKEN",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "AUTH_SECRET",
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET",
  ];
  const missing = required.filter((k) => !process.env[k]?.trim());
  if (missing.length > 0) {
    throw new Error(`Variáveis de ambiente ausentes: ${missing.join(", ")}`);
  }
}
