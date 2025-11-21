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

export function LessonModal({
  editingLesson,
  lessonForm,
  openLessonModal,
  saveLesson,
  setOpenLessonModal,
  setLessonForm,
}: modalProps) {
  return (
    <Dialog open={openLessonModal} onOpenChange={setOpenLessonModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingLesson ? "Edit Lesson" : "Add Lesson"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Lesson Title"
            value={lessonForm.title}
            onChange={(e) =>
              setLessonForm({ ...lessonForm, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Description"
            value={lessonForm.description}
            onChange={(e) =>
              setLessonForm({ ...lessonForm, description: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Sort Order"
            value={lessonForm.sortOrder}
            onChange={(e) =>
              setLessonForm({
                ...lessonForm,
                sortOrder: Number(e.target.value),
              })
            }
          />

          <select
            className="border rounded-md px-3 py-2 w-full"
            value={lessonForm.type}
            onChange={(e) =>
              setLessonForm({ ...lessonForm, type: e.target.value })
            }
          >
            <option value="video">Video</option>
            <option value="article">Article</option>
          </select>

          {lessonForm.type === "video" && (
            <Input
              placeholder="Video URL"
              value={lessonForm.videoUrl}
              onChange={(e) =>
                setLessonForm({ ...lessonForm, videoUrl: e.target.value })
              }
            />
          )}

          {lessonForm.type === "article" && (
            <Textarea
              placeholder="Content"
              value={lessonForm.content}
              onChange={(e) =>
                setLessonForm({ ...lessonForm, content: e.target.value })
              }
            />
          )}
        </div>

        <DialogFooter>
          <Button onClick={saveLesson}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
