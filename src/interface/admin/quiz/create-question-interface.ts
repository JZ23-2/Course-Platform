export interface CreateQuestionInput {
  quizId: string;
  question: string;
  points?: number;
  options: {
    option_text: string;
    is_correct?: boolean;
  }[];
}
