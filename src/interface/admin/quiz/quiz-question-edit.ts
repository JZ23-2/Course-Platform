import { QuizOption } from "./get-quiz-with-count";

export interface QuizQuestionEdit {
  quizQuestionId: string;
  quizId?: string;
  question: string;
  points: number;
  options: QuizOption[];
  created_at?: Date | null;
  updated_at?: Date | null;
}
