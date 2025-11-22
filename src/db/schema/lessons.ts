import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { chapters } from "./chapters";
import { quizzes } from "./quizzes";

export const lessons = pgTable("lessons", {
  lessonId: text("lessonId").primaryKey(),
  chapterId: text("chapterId")
    .notNull()
    .references(() => chapters.chapterId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content"),
  type: varchar("type", { length: 20 }).notNull(),
  videoUrl: varchar("videoUrl", { length: 512 }),
  sortOrder: integer("sortOrder").default(0),
  quizId: text("quizId").references(() => quizzes.quizId, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
