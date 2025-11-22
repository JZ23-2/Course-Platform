import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const quizzes = pgTable("quizzes", {
  quizId: text("quizId").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
