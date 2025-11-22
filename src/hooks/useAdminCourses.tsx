import {
  createCourseAction,
  deleteCourseAction,
  getCourseAction,
  updateCourseAction,
} from "@/actions/admin/courses-services";
import { createCourseInterface } from "@/interface/admin/courses/create-course-interface";
import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";
import { adminCourseProps } from "@/props/hooks/admin-course-props";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useAdminCourses({
  slug,
  loadCourses,
  search,
}: adminCourseProps = {}) {
  const [courseDetail, setCourseDetail] = useState<GetCourseInterface | null>(
    null
  );
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
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] =
    useState<GetCourseInterface | null>(null);

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
    if (loadCourses) loadCourses(search);
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
    if (loadCourses) loadCourses(search);
  };

  useEffect(() => {
    const getCourseDetail = async () => {
      if (!slug) return;
      const res = await getCourseAction(slug);

      setCourseDetail(res);
    };

    getCourseDetail();
  }, [slug]);

  return {
    openCreate,
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
    courseDetail,
  };
}
