import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { quizzes } from "./quizzes";

export const quiz_questions = pgTable("quiz_questions", {
  quizQuestionId: text("quizQuestionId").primaryKey(),
  quizId: text("quizId")
    .notNull()
    .references(() => quizzes.quizId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  question: text("question").notNull(),
  points: integer("points").default(1),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
