import { GetQuizWithCount } from "@/interface/admin/quiz/get-quiz-with-count";
import { QuizQuestionEdit } from "@/interface/admin/quiz/quiz-question-edit";

export interface addQuestionPanelProps {
  questionPanelOpen: boolean;
  setQuestionPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionEditTarget: QuizQuestionEdit | null;
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  questionPoints: number;
  setQuestionPoints: React.Dispatch<React.SetStateAction<number>>;
  options: {
    quizOptionId: string;
    option_text: string;
    is_correct: boolean;
  }[];
  viewQuiz: GetQuizWithCount | null;
  saveQuestionToQuiz(parentQuizId: string): Promise<void>;
  setOptions: React.Dispatch<
    React.SetStateAction<
      {
        quizOptionId: string;
        option_text: string;
        is_correct: boolean;
      }[]
    >
  >;
}
