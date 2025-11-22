import { QuizOption } from "./quiz-option-interface";

export interface QuizQuestion {
  quizQuestionId: string;
  quizId: string;
  question: string;
  points: number;
  created_at?: string;
  updated_at?: string;
  options?: QuizOption[];
}
