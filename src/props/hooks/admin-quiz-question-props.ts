import { GetQuizWithCount } from "@/interface/admin/quiz/get-quiz-with-count";

export interface adminQuizQuestionProps {
  setQuizzes: React.Dispatch<React.SetStateAction<GetQuizWithCount[]>>;
  viewQuiz: GetQuizWithCount | null;
  quizzes: GetQuizWithCount[];
  setViewQuiz: React.Dispatch<React.SetStateAction<GetQuizWithCount | null>>;
  
}
