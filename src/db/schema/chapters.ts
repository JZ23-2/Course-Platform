import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { courses } from "./courses";

export const chapters = pgTable("chapters", {
  chapterId: text("chapterId").primaryKey(),
  courseId: text("courseId")
    .notNull()
    .references(() => courses.courseId),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
