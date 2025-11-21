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

        <div className="space-y-4">
          <Input
            placeholder="Chapter Title"
            value={chapterForm.title}
            onChange={(e) =>
              setChapterForm({ ...chapterForm, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Description"
            value={chapterForm.description}
            onChange={(e) =>
              setChapterForm({ ...chapterForm, description: e.target.value })
            }
          />

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
        </div>

        <DialogFooter>
          <Button onClick={saveChapter}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
