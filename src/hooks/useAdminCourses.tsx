import {
  createCourseAction,
  deleteCourseAction,
  getAllCoursesAction,
  updateCourseAction,
} from "@/actions/admin/courses-services";
import { createCourseInterface } from "@/interface/admin/courses/create-course-interface";
import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useAdminCourses() {
  const [courses, setCourses] = useState<GetCourseInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState<GetCourseInterface | null>(
    null
  );
  const [formData, setFormData] = useState<createCourseInterface>({
    title: "",
    description: "",
    thumbnail: "",
    sortOrder: 0,
    status: "Draft",
    type: "",
  });
  const [search, setSearch] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] =
    useState<GetCourseInterface | null>(null);

  const loadCourses = async (q: string = "") => {
    setLoading(true);
    const test = await getAllCoursesAction(q);
    setCourses(test);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(() => loadCourses(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const openCreate = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      thumbnail: "",
      sortOrder: 0,
      status: "Draft",
      type: "Free",
    });
    setOpenDialog(true);
  };

  const openEdit = (course: GetCourseInterface) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description ?? "",
      thumbnail: course.thumbnail ?? "",
      sortOrder: course.sortOrder ?? 0,
      status: course.status ?? "Draft",
      type: course.type ?? "Free",
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (editingCourse) {
      const res = await updateCourseAction(editingCourse.courseId, formData);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await createCourseAction(formData);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
    setOpenDialog(false);
    loadCourses(search);
  };

  const confirmDelete = (course: GetCourseInterface) => {
    setCourseToDelete(course);
    setDeleteDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!courseToDelete) return;

    const res = await deleteCourseAction(courseToDelete.courseId);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setDeleteDialog(false);
    setCourseToDelete(null);
    loadCourses(search);
  };

  return {
    search,
    setSearch,
    openCreate,
    loading,
    courses,
    openEdit,
    confirmDelete,
    editingCourse,
    formData,
    setOpenDialog,
    openDialog,
    handleSave,
    setFormData,
    deleteDialog,
    setDeleteDialog,
    courseToDelete,
    handleDeleteConfirmed,
  };
}
