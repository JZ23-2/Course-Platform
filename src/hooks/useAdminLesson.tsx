import {
  createLessonsAction,
  deleteLessonAction,
  updateLessonsAction,
} from "@/actions/admin/lessons-service";
import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import { createLessonsInterface } from "@/interface/admin/lessons/create-lesson-interface";
import { LessonInterface } from "@/interface/admin/lessons/lesson-interface";
import { adminLessonProps } from "@/props/hooks/admin-lesson-props";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAdminLesson({
  courseDetail,
  fetchChaptersDetail,
  activeChapter,
  setActiveChapter,
}: adminLessonProps) {
  const [openLessonModal, setOpenLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonInterface | null>(
    null
  );
  const [lessonForm, setLessonForm] = useState<createLessonsInterface>({
    title: "",
    type: "video",
    videoUrl: "",
    description: "",
    content: "",
    sortOrder: 0,
  });

  const [deleteLessonsDialog, setDeleteLessonDialog] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<LessonInterface | null>(
    null
  );

  const confirmLessonDelete = (lesson: LessonInterface) => {
    setLessonToDelete(lesson);
    setDeleteLessonDialog(true);
  };

  const handleAddLesson = (chapter: getChapterInterface) => {
    setActiveChapter(chapter.chapterId);
    setEditingLesson(null);
    setLessonForm({
      title: "",
      type: "video",
      videoUrl: "",
      description: "",
      content: "",
      sortOrder: 0,
    });
    setOpenLessonModal(true);
  };

  const handleEditLesson = (lesson: LessonInterface) => {
    setEditingLesson(lesson);
    setLessonForm({
      title: lesson.title || "",
      type: lesson.type || "",
      videoUrl: lesson.videoUrl || "",
      description: lesson.description || "",
      content: lesson.content || "",
      sortOrder: lesson.sortOrder || 0,
    });
    setOpenLessonModal(true);
  };

  const saveLesson = async () => {
    if (editingLesson) {
      const res = await updateLessonsAction(editingLesson.lessonId, lessonForm);

      if (res.success) {
        toast.success(res.message);
        if (!courseDetail) return;
        fetchChaptersDetail();
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await createLessonsAction(lessonForm, activeChapter);

      if (res.success) {
        toast.success(res.message);
        if (!courseDetail) return;
        fetchChaptersDetail();
      } else {
        toast.error(res.message);
      }
    }
    setOpenLessonModal(false);
  };

  const deleteLesson = async () => {
    if (!lessonToDelete) return;
    const res = await deleteLessonAction(lessonToDelete.lessonId);
    if (!courseDetail) return;
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setDeleteLessonDialog(false);
    setLessonToDelete(null);
    fetchChaptersDetail();
  };

  return {
    handleAddLesson,
    handleEditLesson,
    confirmLessonDelete,
    openLessonModal,
    setOpenLessonModal,
    editingLesson,
    lessonForm,
    setLessonForm,
    deleteLessonsDialog,
    setDeleteLessonDialog,
    lessonToDelete,
    deleteLesson,
    saveLesson,
  };
}
