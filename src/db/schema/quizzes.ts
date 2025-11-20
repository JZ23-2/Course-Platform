import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { lessons } from "./lessons";

export const quizzes = pgTable("quizzes", {
  quizId: text("quizId").primaryKey(),
  lessonId: text("lessonId")
    .notNull()
    .references(() => lessons.lessonId),
  title: varchar("title", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
