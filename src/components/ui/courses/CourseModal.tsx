import { modalProps } from "@/props/courses/modal-props";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../input";
import { Button } from "../button";
import { Textarea } from "../textarea";

export function CourseModal({
  open,
  formData,
  editingCourse,
  onClose,
  onConfirm,
  setFormData,
}: modalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingCourse ? "Edit Course" : "Create Course"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: (e.target as HTMLInputElement).value,
              })
            }
          />
          <Textarea
            placeholder="Short description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: (e.target as HTMLTextAreaElement).value,
              })
            }
          />
          <Input
            placeholder="Thumbnail URL (optional)"
            value={formData.thumbnail}
            onChange={(e) =>
              setFormData({
                ...formData,
                thumbnail: (e.target as HTMLInputElement).value,
              })
            }
          />

          <Input
            type="number"
            placeholder="Sort Order"
            value={formData.sortOrder}
            onChange={(e) =>
              setFormData({
                ...formData,
                sortOrder: Number(e.target.value),
              })
            }
          />

          <select
            className="border rounded-md px-3 py-2 w-full"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          <select
            className="border rounded-md px-3 py-2 w-full"
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value,
              })
            }
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <DialogFooter>
          <div className="w-full flex justify-between items-center">
            <div />
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onConfirm}>
                {editingCourse ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
