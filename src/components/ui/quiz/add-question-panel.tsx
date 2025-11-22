import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "../button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Textarea } from "../textarea";
import { Input } from "../input";
import { addQuestionPanelProps } from "@/props/quiz/add-question-panel-props";

function AddQuestionPanel({
  options,
  questionEditTarget,
  questionPanelOpen,
  questionPoints,
  questionText,
  saveQuestionToQuiz,
  setQuestionPanelOpen,
  setQuestionPoints,
  setQuestionText,
  viewQuiz,
  setOptions,
}: addQuestionPanelProps) {
  function addOption() {
    setOptions((prev) => [
      ...prev,
      {
        quizOptionId: `opt_${Date.now()}_${prev.length}`,
        option_text: "",
        is_correct: false,
      },
    ]);
  }

  function updateOptionText(idx: number, text: string) {
    setOptions((prev) =>
      prev.map((o, i) => (i === idx ? { ...o, option_text: text } : o))
    );
  }

  function toggleOptionCorrect(idx: number) {
    setOptions((prev) =>
      prev.map((o, i) => (i === idx ? { ...o, is_correct: !o.is_correct } : o))
    );
  }

  function removeOption(idx: number) {
    setOptions((prev) => prev.filter((_, i) => i !== idx));
  }
  return (
    <AnimatePresence>
      {questionPanelOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full sm:w-2/5 z-50"
        >
          <div className="h-full bg-background shadow-2xl overflow-auto p-6">
            <div className="flex items-center gap-3 mb-6">
              <Button
                variant="ghost"
                onClick={() => setQuestionPanelOpen(false)}
              >
                <ArrowLeft size={16} /> Back
              </Button>
              <h3 className="text-xl font-bold">
                {questionEditTarget ? "Edit Question" : "Add Question"}
              </h3>
            </div>

            <div className="bg-card rounded-xl p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold">Question</label>
                <Textarea
                  placeholder="Enter the question"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Points</label>
                <Input
                  type="number"
                  value={questionPoints}
                  onChange={(e) => setQuestionPoints(Number(e.target.value))}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">Options</label>
                  <Button variant="ghost" onClick={addOption}>
                    <Plus size={14} />
                  </Button>
                </div>

                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <div
                      key={opt.quizOptionId}
                      className="flex items-center gap-2 bg-muted/10 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={!!opt.is_correct}
                        onChange={() => toggleOptionCorrect(idx)}
                      />
                      <Input
                        placeholder={`Option ${idx + 1}`}
                        value={opt.option_text}
                        onChange={(e) => updateOptionText(idx, e.target.value)}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeOption(idx)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setQuestionPanelOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!viewQuiz) return;
                    saveQuestionToQuiz(viewQuiz.quizId);
                  }}
                >
                  {questionEditTarget ? "Save Question" : "Add Question"}
                </Button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default AddQuestionPanel;
