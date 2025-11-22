import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../button";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { viewQuizPanelProps } from "@/props/quiz/view-quiz-panel-props";
import { QuizQuestion } from "@/interface/admin/quiz/quiz-question-interface";
import { QuizQuestionEdit } from "@/interface/admin/quiz/quiz-question-edit";

function ViewQuizPanel({
  deleteQuestionFromQuiz,
  openEditQuizModal,
  setDeleteOpen,
  setDeleteTarget,
  setViewQuiz,
  viewQuiz,
  setOptions,
  setQuestionEditTarget,
  setQuestionPanelOpen,
  setQuestionPoints,
  setQuestionText,
}: viewQuizPanelProps) {
  function openCreateQuestionPanel() {
    setQuestionEditTarget(null);
    setQuestionText("");
    setQuestionPoints(1);
    setOptions([
      {
        quizOptionId: `opt_${Date.now()}_0`,
        option_text: "",
        is_correct: false,
      },
    ]);
    setQuestionPanelOpen(true);
  }

  function openEditQuestionPanel(question: QuizQuestionEdit) {
    setQuestionEditTarget(question);
    setQuestionText(question.question || "");
    setQuestionPoints(question.points ?? 1);
    setOptions(
      (question.options || []).map((o: any) => ({
        quizOptionId: o.quizOptionId,
        option_text: o.option_text,
        is_correct: !!o.is_correct,
      }))
    );
    setQuestionPanelOpen(true);
  }
  return (
    <AnimatePresence>
      {viewQuiz && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full sm:w-2/5 bg-background z-40 shadow-2xl overflow-auto"
        >
          <div className="p-6 max-w-full h-full">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" onClick={() => setViewQuiz(null)}>
                <ArrowLeft size={16} /> Back
              </Button>
              <h2 className="text-2xl font-bold">{viewQuiz.title}</h2>
            </div>

            <div className="bg-card rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Quiz</div>
                  <div className="text-lg font-semibold">{viewQuiz.title}</div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => openEditQuizModal(viewQuiz)}>
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setDeleteTarget(viewQuiz);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-muted-foreground">Questions</div>
                  <Button onClick={openCreateQuestionPanel}>
                    <Plus size={14} className="mr-2" /> Add Question
                  </Button>
                </div>

                <div className="space-y-3">
                  {((viewQuiz.questions || []) as QuizQuestion[]).length ===
                  0 ? (
                    <div className="p-4 rounded-lg bg-muted/30 text-sm text-muted-foreground">
                      No questions yet.
                    </div>
                  ) : (
                    ((viewQuiz.questions || []) as QuizQuestionEdit[]).map(
                      (q: QuizQuestionEdit) => (
                        <div
                          key={q.quizQuestionId}
                          className="p-3 bg-muted/10 rounded-lg flex items-start justify-between"
                        >
                          <div>
                            <div className="font-medium">{q.question}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {q.points} pts - {(q.options || []).length}
                              options
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditQuestionPanel(q)}
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() =>
                                deleteQuestionFromQuiz(
                                  viewQuiz.quizId,
                                  q.quizQuestionId
                                )
                              }
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default ViewQuizPanel;
