import {
  createQuizQuestions,
  deleteQuizQuestion,
  updateQuizQuestion,
} from "@/actions/admin/quiz-service";
import { GetQuizWithCount } from "@/interface/admin/quiz/get-quiz-with-count";
import { QuizQuestionEdit } from "@/interface/admin/quiz/quiz-question-edit";
import { QuizQuestion } from "@/interface/admin/quiz/quiz-question-interface";
import { adminQuizQuestionProps } from "@/props/hooks/admin-quiz-question-props";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAdminQuizQuestion({
  quizzes,
  setQuizzes,
  viewQuiz,
  setViewQuiz,
}: adminQuizQuestionProps) {
  const [questionPanelOpen, setQuestionPanelOpen] = useState(false);
  const [questionEditTarget, setQuestionEditTarget] =
    useState<QuizQuestionEdit | null>(null);

  const [questionText, setQuestionText] = useState("");
  const [questionPoints, setQuestionPoints] = useState<number>(1);
  const [options, setOptions] = useState<
    { quizOptionId: string; option_text: string; is_correct: boolean }[]
  >([]);

  async function saveQuestionToQuiz(parentQuizId: string) {
    const questionObj = {
      quizQuestionId: questionEditTarget?.quizQuestionId || `q_${Date.now()}`,
      question: questionText,
      points: questionPoints,
      options: options.map((o) => ({
        quizOptionId: o.quizOptionId || `opt_${Date.now()}`,
        option_text: o.option_text,
        is_correct: !!o.is_correct,
      })),
    };

    if (questionEditTarget) {
      const res = await updateQuizQuestion({
        quizQuestionId: questionEditTarget.quizQuestionId,
        question: questionObj.question,
        points: questionObj.points,
        options: questionObj.options,
      });
      if (!res.success) toast.error(res.message);
      toast.success(res.message);
    } else {
      const res = await createQuizQuestions({
        quizId: parentQuizId,
        question: questionObj.question,
        points: questionObj.points,
        options: questionObj.options,
      });
      if (!res.success) toast.error(res.message);
      toast.success(res.message);
    }

    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.quizId !== parentQuizId) return q;

        let updatedQuestions;
        if (questionEditTarget) {
          updatedQuestions = (q.questions || []).map((qq: any) =>
            qq.quizQuestionId === questionEditTarget.quizQuestionId
              ? questionObj
              : qq
          );
        } else {
          updatedQuestions = [...(q.questions || []), questionObj];
        }

        return {
          ...q,
          questions: updatedQuestions,
          questionCount: updatedQuestions.length,
        };
      })
    );

    if (viewQuiz?.quizId === parentQuizId) {
      setViewQuiz((prev: any) => {
        const qs = prev.questions ? [...prev.questions] : [];
        const updated = questionEditTarget
          ? qs.map((qq: any) =>
              qq.quizQuestionId === questionEditTarget.quizQuestionId
                ? questionObj
                : qq
            )
          : [...qs, questionObj];
        return { ...prev, questions: updated, questionCount: updated.length };
      });
    }

    setQuestionPanelOpen(false);
  }

  async function deleteQuestionFromQuiz(
    parentQuizId: string,
    questionId: string
  ) {
    const res = await deleteQuizQuestion(questionId);
    if (!res.success) toast.error(res.message);
    toast.success(res.message);

    setQuizzes((prev: GetQuizWithCount[]) =>
      prev.map((q) =>
        q.quizId !== parentQuizId
          ? q
          : {
              ...q,
              questions: (q.questions || []).filter(
                (qq: QuizQuestion) => qq.quizQuestionId !== questionId
              ),
              questionCount: (q.questions || []).length - 1,
            }
      )
    );

    if (viewQuiz?.quizId === parentQuizId) {
      setViewQuiz((prev: GetQuizWithCount | null) => {
        if (!prev) return prev;
        const updated = (prev.questions || []).filter(
          (qq: QuizQuestion) => qq.quizQuestionId !== questionId
        );
        return { ...prev, questions: updated, questionCount: updated.length };
      });
    }
  }

  function openViewQuizPanel(q: GetQuizWithCount) {
    setViewQuiz(q);
    const fresh = quizzes.find((x) => x.quizId === q.quizId);
    if (fresh) setViewQuiz(fresh);
  }

  return {
    openViewQuizPanel,
    deleteQuestionFromQuiz,
    setOptions,
    setQuestionEditTarget,
    setQuestionPanelOpen,
    setQuestionPoints,
    setQuestionText,
    options,
    questionEditTarget,
    questionPanelOpen,
    questionPoints,
    saveQuestionToQuiz,
    questionText,
  };
}
