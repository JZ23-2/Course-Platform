"use server";
import { db } from "@/db/drizzle";
import { quiz_options, quiz_questions, quizzes } from "@/db/schema";
import { GetQuizWithCount } from "@/interface/admin/quiz/get-quiz-with-count";
import { QuizOption } from "@/interface/admin/quiz/quiz-option-interface";
import { QuizQuestion } from "@/interface/admin/quiz/quiz-question-interface";
import { getQuizInterface } from "@/interface/quiz/get-quiz-interface";
import { eq } from "drizzle-orm";

export async function getQuizWithQuestionCount(): Promise<GetQuizWithCount[]> {
  const allQuizzes = await db.select().from(quizzes);

  const quizList: GetQuizWithCount[] = await Promise.all(
    allQuizzes.map(async (quiz) => {
      const questionsRaw = await db
        .select()
        .from(quiz_questions)
        .where(eq(quiz_questions.quizId, quiz.quizId));

      const questionsWithOptions: QuizQuestion[] = await Promise.all(
        questionsRaw.map(async (q) => {
          const optionsRaw = await db
            .select()
            .from(quiz_options)
            .where(eq(quiz_options.quizQuestionId, q.quizQuestionId));

          const options: QuizOption[] = optionsRaw.map((o) => ({
            quizOptionId: o.quizOptionId,
            option_text: o.optionText || "",
            is_correct: o.isCorrect ?? false,
          }));

          return {
            quizQuestionId: q.quizQuestionId,
            quizId: q.quizId,
            question: q.question,
            points: q.points ?? 1,
            options,
          };
        })
      );

      return {
        quizId: quiz.quizId,
        title: quiz.title,
        questions: questionsWithOptions,
        questionCount: questionsWithOptions.length,
      };
    })
  );

  return quizList;
}

export async function getQuizAction(): Promise<getQuizInterface[]> {
  const result = await db
    .select({
      quizId: quizzes.quizId,
      title: quizzes.title,
    })
    .from(quizzes);

  const res: getQuizInterface[] = result.map((r) => ({
    quizId: r.quizId,
    title: r.title,
  }));

  return res;
}
