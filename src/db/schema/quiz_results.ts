import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { quizzes } from "./quizzes";

export const quiz_results = pgTable("quiz_results", {
  quizResultId: text("quizResultId").primaryKey(),
  userId: text("userId").notNull(),
  quizId: text("quizId")
    .notNull()
    .references(() => quizzes.quizId),
  score: integer("score").notNull(),
  passed: boolean("passed").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
