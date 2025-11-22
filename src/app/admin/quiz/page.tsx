"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import ViewQuizPanel from "@/components/ui/quiz/view-quiz-panel";
import AddQuestionPanel from "@/components/ui/quiz/add-question-panel";
import DeleteModal from "@/components/ui/delete-modal";
import QuizModal from "@/components/ui/quiz/quiz-modal";
import { useAdminQuiz } from "@/hooks/useAdminQuiz";
import { useAdminQuizQuestion } from "@/hooks/useAdminQuizQuestion";

export default function QuizzesAdminPage() {
  const [search, setSearch] = useState("");

  const {
    handleDeleteQuizConfirmed,
    handleSaveQuiz,
    openCreateQuizModal,
    openEditQuizModal,
    quizzes,
    setQuizzes,
    viewQuiz,
    setViewQuiz,
    deleteOpen,
    deleteTarget,
    quizEditTarget,
    quizModalOpen,
    quizTitleInput,
    setDeleteOpen,
    setQuizModalOpen,
    setQuizTitleInput,
    setDeleteTarget,
  } = useAdminQuiz();

  const {
    openViewQuizPanel,
    deleteQuestionFromQuiz,
    options,
    questionEditTarget,
    questionPanelOpen,
    questionPoints,
    saveQuestionToQuiz,
    setOptions,
    setQuestionEditTarget,
    setQuestionPanelOpen,
    setQuestionPoints,
    setQuestionText,
    questionText,
  } = useAdminQuizQuestion({
    quizzes,
    setQuizzes,
    setViewQuiz,
    viewQuiz,
  });

  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Quizzes</h1>
            <p className="text-muted-foreground">
              View, search, create, edit and delete quizzes and questions.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search quizzes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>

            <Button
              onClick={openCreateQuizModal}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Create Quiz
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center bg-card rounded-xl text-muted-foreground">
            No quizzes found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((quiz) => (
              <motion.div
                key={quiz.quizId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-md hover:shadow-xl transition">
                  <CardContent className="p-5">
                    <h2 className="text-xl font-semibold">{quiz.title}</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      {(quiz.questions || []).length} Questions
                    </p>
                  </CardContent>

                  <CardFooter className="flex gap-2 p-4 border-t">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => openViewQuizPanel(quiz)}
                    >
                      View
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditQuizModal(quiz)}
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setDeleteTarget(quiz);
                          setDeleteOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <QuizModal
        handleSaveQuiz={handleSaveQuiz}
        quizEditTarget={quizEditTarget}
        quizModalOpen={quizModalOpen}
        quizTitleInput={quizTitleInput}
        setQuizModalOpen={setQuizModalOpen}
        setQuizTitleInput={setQuizTitleInput}
      />

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteQuizConfirmed}
        description="Are you sure you want to delete"
        itemName={deleteTarget?.title}
        title="Delete Quiz"
      />

      <ViewQuizPanel
        deleteQuestionFromQuiz={deleteQuestionFromQuiz}
        openEditQuizModal={openEditQuizModal}
        setDeleteOpen={setDeleteOpen}
        setDeleteTarget={setDeleteTarget}
        setViewQuiz={setViewQuiz}
        viewQuiz={viewQuiz}
        setOptions={setOptions}
        setQuestionEditTarget={setQuestionEditTarget}
        setQuestionPanelOpen={setQuestionPanelOpen}
        setQuestionPoints={setQuestionPoints}
        setQuestionText={setQuestionText}
      />

      <AddQuestionPanel
        options={options}
        questionEditTarget={questionEditTarget}
        questionPanelOpen={questionPanelOpen}
        questionPoints={questionPoints}
        questionText={questionText}
        saveQuestionToQuiz={saveQuestionToQuiz}
        setQuestionPanelOpen={setQuestionPanelOpen}
        setQuestionPoints={setQuestionPoints}
        setQuestionText={setQuestionText}
        viewQuiz={viewQuiz}
        setOptions={setOptions}
      />
    </div>
  );
}
