import { db } from "@/db/drizzle";
import { quizzes } from "@/db/schema";

export async function seedQuizzes() {
  await db.insert(quizzes).values([
    {
      quizId: "quiz123",
      title: "JavaScript Basics Quiz",
    },
  ]);
}
