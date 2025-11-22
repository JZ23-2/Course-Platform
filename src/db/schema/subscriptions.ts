import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const subscriptions = pgTable("subscriptions", {
  subscriptionId: text("subscriptionId").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.userId, { onDelete: "cascade" }),
  plan: varchar("plan", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).default("active"),
  startDate: timestamp("startDate").defaultNow().notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});
