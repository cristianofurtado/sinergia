import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  role: text("role", { enum: ["pendente", "colaborador", "admin", "bloqueado"] })
    .notNull()
    .default("pendente"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: text("expires_at").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("idx_sessions_user_id").on(table.userId),
    index("idx_sessions_expires_at").on(table.expiresAt),
  ]
);

export const files = sqliteTable(
  "files",
  {
    id: text("id").primaryKey(),
    category: text("category", { enum: ["video", "chat", "document", "image", "text"] }).notNull(),
    title: text("title").notNull(),
    originalName: text("original_name").notNull(),
    r2Key: text("r2_key").unique(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull().default(0),
    textBody: text("text_body"),
    uploadedBy: text("uploaded_by")
      .notNull()
      .references(() => users.id),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [index("idx_files_category").on(table.category)]
);

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    actorId: text("actor_id")
      .notNull()
      .references(() => users.id),
    action: text("action", {
      enum: ["login", "logout", "login_failed", "upload", "download", "rename", "delete", "role_change"],
    }).notNull(),
    targetType: text("target_type", { enum: ["file", "user", "session"] }).notNull(),
    targetId: text("target_id").notNull(),
    metadataJson: text("metadata_json"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("idx_audit_logs_created_at").on(table.createdAt),
    index("idx_audit_logs_actor_id").on(table.actorId),
  ]
);
