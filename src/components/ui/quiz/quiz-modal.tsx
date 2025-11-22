import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../input";
import { Button } from "../button";
import { quizModalProps } from "@/props/quiz/quiz-modal-props";

function QuizModal({
  handleSaveQuiz,
  quizEditTarget,
  quizModalOpen,
  quizTitleInput,
  setQuizModalOpen,
  setQuizTitleInput,
}: quizModalProps) {
  return (
    <Dialog open={quizModalOpen} onOpenChange={setQuizModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {quizEditTarget ? "Edit Quiz" : "Create Quiz"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Quiz Title</label>
            <Input
              placeholder="Enter quiz title"
              value={quizTitleInput}
              onChange={(e) => setQuizTitleInput(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setQuizModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveQuiz}>
              {quizEditTarget ? "Save Changes" : "Create Quiz"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default QuizModal;
