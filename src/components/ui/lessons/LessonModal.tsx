"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { Input } from "../input";
import { modalProps } from "@/props/lessons/modal-props";
import { getQuizInterface } from "@/interface/quiz/get-quiz-interface";
import { useEffect, useState } from "react";
import { getQuizAction } from "@/actions/quiz/quiz-service";

export function LessonModal({
  editingLesson,
  lessonForm,
  openLessonModal,
  saveLesson,
  setOpenLessonModal,
  setLessonForm,
}: modalProps) {
  const [quizzes, setQuizzes] = useState<getQuizInterface[]>([]);
  useEffect(() => {
    if (openLessonModal && lessonForm.type === "quiz") {
      getQuizAction().then(setQuizzes);
    }
  }, [openLessonModal, lessonForm.type]);

  return (
    <Dialog open={openLessonModal} onOpenChange={setOpenLessonModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingLesson ? "Edit Lesson" : "Add Lesson"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <label htmlFor="lessonTitle" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="lessonTitle"
              placeholder="Lesson title"
              value={lessonForm.title}
              onChange={(e) =>
                setLessonForm({ ...lessonForm, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="lessonDescription" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="lessonDescription"
              placeholder="Lesson description"
              value={lessonForm.description}
              onChange={(e) =>
                setLessonForm({ ...lessonForm, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="lessonType" className="text-sm font-medium">
              Type
            </label>
            <select
              id="lessonType"
              className="border rounded-md px-3 py-2 w-full"
              value={lessonForm.type}
              onChange={(e) =>
                setLessonForm({ ...lessonForm, type: e.target.value })
              }
            >
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>

          {lessonForm.type === "video" && (
            <div className="space-y-1">
              <label htmlFor="videoUrl" className="text-sm font-medium">
                Video URL
              </label>
              <Input
                id="videoUrl"
                placeholder="https://video"
                value={lessonForm.videoUrl}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, videoUrl: e.target.value })
                }
              />
            </div>
          )}

          {lessonForm.type === "article" && (
            <div className="space-y-1">
              <label htmlFor="articleContent" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="articleContent"
                placeholder="Write your article"
                value={lessonForm.content}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, content: e.target.value })
                }
              />
            </div>
          )}

          {lessonForm.type === "quiz" && (
            <div className="space-y-1">
              <label htmlFor="quizId" className="text-sm font-medium">
                Select Quiz
              </label>
              <select
                id="quizId"
                className="border rounded-md px-3 py-2 w-full"
                value={lessonForm.quizId || ""}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, quizId: e.target.value })
                }
              >
                <option value="">-- Select a Quiz --</option>
                {quizzes.map((quiz) => (
                  <option key={quiz.quizId} value={quiz.quizId}>
                    {quiz.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="sortOrder" className="text-sm font-medium">
              Sort Order
            </label>
            <Input
              id="sortOrder"
              type="number"
              placeholder="Sort order"
              value={lessonForm.sortOrder}
              onChange={(e) =>
                setLessonForm({
                  ...lessonForm,
                  sortOrder: Number(e.target.value),
                })
              }
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first in lists.
            </p>
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end">
            <Button onClick={saveLesson}>
              {editingLesson ? "Update" : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
