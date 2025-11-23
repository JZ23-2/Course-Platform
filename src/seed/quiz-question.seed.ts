import { db } from "@/db/drizzle";
import { quiz_questions } from "@/db/schema";

export async function seedQuizQuestions() {
  await db.insert(quiz_questions).values([
    {
      quizQuestionId: "q1231",
      quizId: "quiz123",
      question: "What is JavaScript?",
      points: 1,
    },
    {
      quizQuestionId: "q1232",
      quizId: "quiz123",
      question: "Which company developed JavaScript?",
      points: 1,
    },
    {
      quizQuestionId: "q1233",
      quizId: "quiz123",
      question: "What is the difference between var, let, and const?",
      points: 2,
    },
  ]);
}
