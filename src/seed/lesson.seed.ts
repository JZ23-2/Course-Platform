import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";

export async function seedLessons() {
  await db.insert(lessons).values([
    {
      lessonId: "lesson123",
      chapterId: "chapter123",
      title: "Introduction to JS",
      description: "Learn the basics of JavaScript programming.",
      content: null,
      type: "video",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      sortOrder: 1,
      quizId: null,
    },
    {
      lessonId: "lesson456",
      chapterId: "chapter456",
      title: "React Functional Components",
      description: "Deep dive into functional components and hooks.",
      content: "<p>This is a sample article content for React components.</p>",
      type: "article",
      videoUrl: null,
      sortOrder: 1,
      quizId: null,
    },
    {
      lessonId: "lesson789",
      chapterId: "chapter789",
      title: "Database Quiz 1",
      description: "Test your knowledge of database fundamentals.",
      content: null,
      type: "quiz",
      videoUrl: null,
      sortOrder: 1,
      quizId: "quiz123",
    },
  ]);
}
