import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: text("userId").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
  name: text("name"),
  role: varchar("role", { length: 20 }).default("student"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
