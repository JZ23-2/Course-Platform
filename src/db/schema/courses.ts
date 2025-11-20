import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  courseId: text("courseId").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  thumbnail: varchar("thumbnail", { length: 512 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 20 }).default("draft"),
  type: varchar("type", { length: 20 }).notNull(),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
