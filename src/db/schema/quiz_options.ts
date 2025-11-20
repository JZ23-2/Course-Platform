import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { quiz_questions } from "./quiz_questions";

export const quiz_options = pgTable("quiz_options", {
  quizOptionId: text("id").primaryKey(),
  quizQuestionId: text("quizQuestionId")
    .notNull()
    .references(() => quiz_questions.quizQuestionId),
  option_text: text("option_text").notNull(),
  is_correct: boolean("is_correct").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
