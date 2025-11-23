"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../button";
import { getQuizWithQuestionCount } from "@/actions/quiz/quiz-service";
import { QuizQuestion } from "@/interface/admin/quiz/quiz-question-interface";

interface QuizModalProps {
  quizId: string | null;
  open: boolean;
  onClose: () => void;
}

export default function QuizStartModal({
  quizId,
  open,
  onClose,
}: QuizModalProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (quizId) {
      getQuizWithQuestionCount().then((all) => {
        console.log("all quizzes", all);
        const selected = all.find((q) => q.quizId === quizId);
        console.log("selected quiz", selected);
        setQuestions(selected?.questions || []);
        setAnswers({});
        setSubmitted(false);
        setScore(null);
      });
    }
  }, [quizId]);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    let total = 0;
    questions.forEach((q) => {
      const selected = q.options?.find(
        (o) => o.quizOptionId === answers[q.quizQuestionId]
      );
      if (selected?.is_correct) total += q.points;
    });
    setScore(total);
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quiz</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
          {questions.map((q, idx) => (
            <div key={q.quizQuestionId} className="p-2 border rounded-md">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <div className="flex flex-col mt-1 gap-1">
                {q.options?.map((o) => (
                  <label
                    key={o.quizOptionId}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name={q.quizQuestionId}
                      value={o.quizOptionId}
                      checked={answers[q.quizQuestionId] === o.quizOptionId}
                      onChange={() =>
                        handleAnswerChange(q.quizQuestionId, o.quizOptionId)
                      }
                    />
                    {o.option_text}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {!submitted ? (
            <Button onClick={handleSubmit} className="mt-2">
              Submit Quiz
            </Button>
          ) : (
            <p className="mt-2 font-semibold">
              Score: {score} / {questions.reduce((a, q) => a + q.points, 0)}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
