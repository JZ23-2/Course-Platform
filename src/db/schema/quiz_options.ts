import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { quiz_questions } from "./quiz_questions";

export const quiz_options = pgTable("quiz_options", {
  quizOptionId: text("quizOptionId").primaryKey(),
  quizQuestionId: text("quizQuestionId")
    .notNull()
    .references(() => quiz_questions.quizQuestionId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  optionText: text("optionText").notNull(),
  isCorrect: boolean("isCorrect").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
