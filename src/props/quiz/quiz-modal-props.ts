import { GetQuizWithCount } from "@/interface/admin/quiz/get-quiz-with-count";

export interface quizModalProps {
  quizModalOpen: boolean;
  setQuizModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  quizEditTarget: GetQuizWithCount | null;
  quizTitleInput: string;
  setQuizTitleInput: React.Dispatch<React.SetStateAction<string>>;
  handleSaveQuiz(): Promise<void>;
}
