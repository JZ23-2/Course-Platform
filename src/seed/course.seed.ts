import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { nanoid } from "nanoid";

export async function seedCourses() {
  await db.insert(courses).values([
    {
      courseId: "course123",
      title: "Advanced JavaScript",
      description: "Deep dive into JavaScript concepts and patterns.",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      slug: "advanced-javascript",
      status: "Published",
      type: "Paid",
      sortOrder: 1,
    },
    {
      courseId: "course456",
      title: "React for Beginners",
      description: "Learn React from scratch and build amazing UIs.",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      slug: "react-for-beginners",
      status: "Published",
      type: "Free",
      sortOrder: 2,
    },
    {
      courseId: "course789",
      title: "Introduction to Databases",
      description: "Understand relational databases and basic queries.",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      slug: "intro-to-databases",
      status: "Draft",
      type: "Free",
      sortOrder: 3,
    },
  ]);
}
