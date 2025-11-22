import { GetQuizWithCount } from "@/interface/admin/quiz/get-quiz-with-count";
import { QuizQuestionEdit } from "@/interface/admin/quiz/quiz-question-edit";
import { Dispatch, SetStateAction } from "react";

export interface viewQuizPanelProps {
  viewQuiz: GetQuizWithCount | null;
  setViewQuiz: Dispatch<SetStateAction<GetQuizWithCount | null>>;
  openEditQuizModal(q: GetQuizWithCount): void;
  setDeleteTarget: Dispatch<SetStateAction<GetQuizWithCount | null>>;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  deleteQuestionFromQuiz(
    parentQuizId: string,
    questionId: string
  ): Promise<void>;
  setQuestionEditTarget: React.Dispatch<
    React.SetStateAction<QuizQuestionEdit | null>
  >;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  setQuestionPoints: React.Dispatch<React.SetStateAction<number>>;
  setOptions: React.Dispatch<
    React.SetStateAction<
      {
        quizOptionId: string;
        option_text: string;
        is_correct: boolean;
      }[]
    >
  >;
  setQuestionPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
