import { db } from "@/db/drizzle";
import { chapters } from "@/db/schema";

export async function seedChapters() {
  await db.insert(chapters).values([
    {
      chapterId: "chapter123",
      courseId: "course123",
      title: "JavaScript Basics",
      description: "Introduction to variables, loops, and functions in JS.",
      sortOrder: 1,
    },
    {
      chapterId: "chapter456",
      courseId: "course456",
      title: "React Components",
      description: "Understanding React components, props, and state.",
      sortOrder: 1,
    },
    {
      chapterId: "chapter789",
      courseId: "course789",
      title: "Database Fundamentals",
      description: "Learn tables, queries, and relational database concepts.",
      sortOrder: 1,
    },
  ]);
}
