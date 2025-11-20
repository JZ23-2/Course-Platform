import {
  boolean,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { lessons } from "./lessons";
import { users } from "./users";

export const progress = pgTable("progress", {
  progressId: text("progressId").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.userId),
  lessonId: text("lessionId")
    .notNull()
    .references(() => lessons.lessonId),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
