import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { modalProps } from "@/props/chapters/modal-props";

export function ChapterModal({
  chapterForm,
  editingChapter,
  openChapterModal,
  saveChapter,
  setChapterForm,
  setOpenChapterModal,
}: modalProps) {
  return (
    <Dialog open={openChapterModal} onOpenChange={setOpenChapterModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingChapter ? "Edit Chapter" : "Add Chapter"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="chapterTitle">
              Title
            </label>
            <Input
              id="chapterTitle"
              placeholder="Chapter title"
              value={chapterForm.title}
              onChange={(e) =>
                setChapterForm({ ...chapterForm, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="chapterDescription">
              Description
            </label>
            <Textarea
              id="chapterDescription"
              placeholder="Short chapter description"
              value={chapterForm.description}
              onChange={(e) =>
                setChapterForm({
                  ...chapterForm,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="sortOrder">
              Sort Order
            </label>
            <Input
              id="sortOrder"
              type="number"
              value={chapterForm.sortOrder}
              onChange={(e) =>
                setChapterForm({
                  ...chapterForm,
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
          <div className="w-full flex justify-end">
            <Button onClick={saveChapter}>
              {editingChapter ? "Update" : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
