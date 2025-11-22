import { QuizQuestion } from "./quiz-question-interface";

export interface GetQuizWithCount {
  quizId: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  questions?: QuizQuestion[];
  questionCount: number;
}
