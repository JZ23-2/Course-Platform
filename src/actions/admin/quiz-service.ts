"use server";
import { db } from "@/db/drizzle";
import { quiz_options, quiz_questions, quizzes } from "@/db/schema";
import { actionResposneInterface } from "@/interface/action/action-response-interface";
import { CreateQuestionInput } from "@/interface/admin/quiz/create-question-interface";
import { eq } from "drizzle-orm";

export async function createQuiz(
  title: string
): Promise<actionResposneInterface> {
  try {
    if (!title) throw new Error("Title is required");
    const quizId = crypto.randomUUID();

    await db.insert(quizzes).values({ quizId: quizId, title: title });
    return { success: true, message: "Create quiz success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function createQuizQuestions(
  input: CreateQuestionInput
): Promise<actionResposneInterface> {
  try {
    const { quizId, question, points = 1, options } = input;

    if (!quizId) throw new Error("quizId is required");
    if (!question) throw new Error("Question text is required");
    if (!options || options.length === 0)
      throw new Error("At least one option is required");

    const quizQuestionId = crypto.randomUUID();

    await db.insert(quiz_questions).values({
      quizQuestionId,
      quizId,
      question,
      points,
    });

    const optionsToInsert = options.map((o) => ({
      quizOptionId: crypto.randomUUID(),
      quizQuestionId,
      optionText: o.option_text,
      isCorrect: o.is_correct ?? false,
    }));

    await db.insert(quiz_options).values(optionsToInsert);

    return {
      success: true,
      message: "Question and options created success!",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function updateQuiz(
  quizId: string,
  title: string
): Promise<actionResposneInterface> {
  try {
    if (!quizId) throw new Error("quizId is required");
    if (!title) throw new Error("Title is required");

    await db
      .update(quizzes)
      .set({ title: title })
      .where(eq(quizzes.quizId, quizId));
    return { success: true, message: "Quiz updated sucess!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function deleteQuiz(
  quizId: string
): Promise<actionResposneInterface> {
  try {
    if (!quizId) throw new Error("quizId is required");

    await db.delete(quizzes).where(eq(quizzes.quizId, quizId));

    return { success: true, message: "Quiz deleted success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function updateQuizQuestion(input: {
  quizQuestionId: string;
  question: string;
  points?: number;
  options: {
    option_text: string;
    is_correct?: boolean;
    quizOptionId?: string;
  }[];
}): Promise<actionResposneInterface> {
  try {
    const { quizQuestionId, question, points = 1, options } = input;

    if (!quizQuestionId) throw new Error("quizQuestionId is required");
    if (!question) throw new Error("Question text is required");
    if (!options || options.length === 0)
      throw new Error("At least one option is required");

    await db
      .update(quiz_questions)
      .set({ question, points })
      .where(eq(quiz_questions.quizQuestionId, quizQuestionId));

    await db
      .delete(quiz_options)
      .where(eq(quiz_options.quizQuestionId, quizQuestionId));

    const optionsToInsert = options.map((o) => ({
      quizOptionId: o.quizOptionId || crypto.randomUUID(),
      quizQuestionId,
      optionText: o.option_text,
      isCorrect: o.is_correct ?? false,
    }));

    await db.insert(quiz_options).values(optionsToInsert);

    return { success: true, message: "Question updated success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function deleteQuizQuestion(
  quizQuestionId: string
): Promise<actionResposneInterface> {
  try {
    if (!quizQuestionId) throw new Error("quizQuestionId is required");

    await db
      .delete(quiz_options)
      .where(eq(quiz_options.quizQuestionId, quizQuestionId));
    await db
      .delete(quiz_questions)
      .where(eq(quiz_questions.quizQuestionId, quizQuestionId));

    return { success: true, message: "Question deleted sucesss!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}
