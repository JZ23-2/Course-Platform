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
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              placeholder="Course title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="description">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Short course description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="thumbnail">
              Thumbnail URL
            </label>
            <Input
              id="thumbnail"
              placeholder="https://jackson.jpg"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  thumbnail: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="status">
              Status
            </label>
            <select
              id="status"
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
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="type">
              Type
            </label>
            <select
              id="type"
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

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="sortOrder">
              Sort Order
            </label>
            <Input
              id="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
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
