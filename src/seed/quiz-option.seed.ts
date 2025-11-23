import { db } from "@/db/drizzle";
import { quiz_options } from "@/db/schema";

export async function seedQuizOptions() {
  await db.insert(quiz_options).values([
    {
      quizOptionId: "q1231a",
      quizQuestionId: "q1231",
      optionText: "A programming language",
      isCorrect: true,
    },
    {
      quizOptionId: "q1231b",
      quizQuestionId: "q1231",
      optionText: "A database",
      isCorrect: false,
    },
    {
      quizOptionId: "q1231c",
      quizQuestionId: "q1231",
      optionText: "A web server",
      isCorrect: false,
    },
    {
      quizOptionId: "q1231d",
      quizQuestionId: "q1231",
      optionText: "A text editor",
      isCorrect: false,
    },

    {
      quizOptionId: "q1232a",
      quizQuestionId: "q1232",
      optionText: "Microsoft",
      isCorrect: false,
    },
    {
      quizOptionId: "q1232b",
      quizQuestionId: "q1232",
      optionText: "Netscape",
      isCorrect: true,
    },
    {
      quizOptionId: "q1232c",
      quizQuestionId: "q1232",
      optionText: "Google",
      isCorrect: false,
    },
    {
      quizOptionId: "q1232d",
      quizQuestionId: "q1232",
      optionText: "Apple",
      isCorrect: false,
    },

    {
      quizOptionId: "q1233a",
      quizQuestionId: "q1233",
      optionText: "var is function-scoped, let and const are block-scoped",
      isCorrect: true,
    },
    {
      quizOptionId: "q1233b",
      quizQuestionId: "q1233",
      optionText: "var is block-scoped, let and const are function-scoped",
      isCorrect: false,
    },
    {
      quizOptionId: "q1233c",
      quizQuestionId: "q1233",
      optionText: "All three are the same",
      isCorrect: false,
    },
    {
      quizOptionId: "q1233d",
      quizQuestionId: "q1233",
      optionText: "Only const exists in modern JS",
      isCorrect: false,
    },
  ]);
}
