import { createCourseInterface } from "@/interface/admin/courses/create-course-interface";
import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";

export interface modalProps {
  open: boolean;
  editingCourse: GetCourseInterface | null;
  formData: createCourseInterface;
  onClose: () => void;
  onConfirm: () => void;
  setFormData: React.Dispatch<React.SetStateAction<createCourseInterface>>;
}
