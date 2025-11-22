import {
  createQuiz,
  deleteQuiz,
  updateQuiz,
} from "@/actions/admin/quiz-service";
import { getQuizWithQuestionCount } from "@/actions/quiz/quiz-service";
import { GetQuizWithCount } from "@/interface/admin/quiz/get-quiz-with-count";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useAdminQuiz() {
  const [quizzes, setQuizzes] = useState<GetQuizWithCount[]>([]);
  const [viewQuiz, setViewQuiz] = useState<GetQuizWithCount | null>(null);
  const [quizEditTarget, setQuizEditTarget] = useState<GetQuizWithCount | null>(
    null
  );
  const [quizTitleInput, setQuizTitleInput] = useState("");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GetQuizWithCount | null>(
    null
  );
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getQuiz = async () => {
    const res = await getQuizWithQuestionCount();
    setQuizzes(res);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  async function handleSaveQuiz() {
    if (quizEditTarget) {
      const res = await updateQuiz(quizEditTarget.quizId, quizTitleInput);
      if (!res.success) toast.error(res.message);
      toast.success(res.message);

      setQuizzes((prev) =>
        prev.map((q) =>
          q.quizId === quizEditTarget.quizId
            ? { ...q, title: quizTitleInput }
            : q
        )
      );
      if (viewQuiz?.quizId === quizEditTarget.quizId) {
        setViewQuiz((v) => {
          if (!v) return v;
          return { ...v, title: quizTitleInput };
        });
      }
    } else {
      const res = await createQuiz(quizTitleInput);
      if (!res.success) toast.error(res.message);
      toast.success(res.message);
      getQuiz();
    }
    setQuizModalOpen(false);
  }

  async function handleDeleteQuizConfirmed() {
    if (!deleteTarget) return;

    const res = await deleteQuiz(deleteTarget.quizId);
    if (!res.success) toast.error(res.message);
    toast.success(res.message);

    setQuizzes((prev) => prev.filter((q) => q.quizId !== deleteTarget.quizId));
    if (viewQuiz?.quizId === deleteTarget.quizId) setViewQuiz(null);

    setDeleteOpen(false);
    setDeleteTarget(null);
  }

  function openEditQuizModal(q: GetQuizWithCount) {
    setQuizEditTarget(q);
    setQuizTitleInput(q.title);
    setQuizModalOpen(true);
  }

  function openCreateQuizModal() {
    setQuizEditTarget(null);
    setQuizTitleInput("");
    setQuizModalOpen(true);
  }

  return {
    handleSaveQuiz,
    handleDeleteQuizConfirmed,
    openCreateQuizModal,
    openEditQuizModal,
    quizzes,
    setQuizzes,
    viewQuiz,
    setViewQuiz,
    quizEditTarget,
    quizModalOpen,
    quizTitleInput,
    setQuizModalOpen,
    setQuizTitleInput,
    deleteOpen,
    setDeleteOpen,
    deleteTarget,
    setDeleteTarget,
  };
}
