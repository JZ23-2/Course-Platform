import { QuizOption } from "./quiz-option-interface";

export interface QuizQuestionEdit {
  quizQuestionId: string;
  quizId?: string;
  question: string;
  points: number;
  options: QuizOption[];
  created_at?: Date | null;
  updated_at?: Date | null;
}
