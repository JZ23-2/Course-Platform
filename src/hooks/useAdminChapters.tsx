import {
  createChapterAction,
  deleteChapterAction,
  getChaptersWithLessons,
  updateChapterAction,
} from "@/actions/admin/chapters-services";
import { createChapterInterface } from "@/interface/admin/chapters/create-chapter-interface";
import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import { adminChapterProps } from "@/props/hooks/admin-chapter-props";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useAdminChapters({ courseDetail }: adminChapterProps) {
  const [chapters, setChapters] = useState<getChapterInterface[]>([]);
  const [openChapterModal, setOpenChapterModal] = useState<boolean>(false);
  const [editingChapter, setEditingChapter] =
    useState<getChapterInterface | null>(null);
  const [chapterForm, setChapterForm] = useState<createChapterInterface>({
    title: "",
    description: "",
    sortOrder: 0,
  });
  const [activeChapter, setActiveChapter] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [chapterToDelete, setChapterToDelete] =
    useState<getChapterInterface | null>(null);

  const fetchChaptersDetail = async () => {
    if (courseDetail) {
      const res = await getChaptersWithLessons(courseDetail?.courseId);
      setChapters(res);
    }
  };

  useEffect(() => {
    fetchChaptersDetail();
  }, [courseDetail]);

  const handleAddChapter = () => {
    setEditingChapter(null);
    setChapterForm({ title: "", description: "", sortOrder: 0 });
    setOpenChapterModal(true);
  };

  const handleEditChapter = (chapter: getChapterInterface) => {
    setEditingChapter(chapter);
    setChapterForm({
      title: chapter.title,
      description: chapter.description || "",
      sortOrder: chapter.sortOrder || 0,
    });
    setOpenChapterModal(true);
  };

  const saveChapter = async () => {
    if (editingChapter) {
      const res = await updateChapterAction(
        editingChapter.chapterId,
        chapterForm
      );

      if (res.success) {
        toast.success(res.message);
        fetchChaptersDetail();
      } else {
        toast.error(res.message);
      }
    } else {
      if (courseDetail) {
        const res = await createChapterAction(
          chapterForm,
          courseDetail.courseId
        );

        if (res.success) {
          toast.success(res.message);
          fetchChaptersDetail();
        } else {
          toast.error(res.message);
        }
      }
    }
    setOpenChapterModal(false);
  };

  const confirmDelete = (chapter: getChapterInterface) => {
    setChapterToDelete(chapter);
    setDeleteDialog(true);
  };

  const deleteChapter = async () => {
    if (!chapterToDelete) return;
    const res = await deleteChapterAction(chapterToDelete?.chapterId);
    if (!courseDetail) return;
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setDeleteDialog(false);
    setChapterToDelete(null);
    const chapterRes = await getChaptersWithLessons(courseDetail.courseId);
    setChapters(chapterRes);
  };

  return {
    fetchChaptersDetail,
    activeChapter,
    setActiveChapter,
    handleEditChapter,
    confirmDelete,
    handleAddChapter,
    chapters,
    openChapterModal,
    setOpenChapterModal,
    editingChapter,
    chapterForm,
    setChapterForm,
    saveChapter,
    deleteChapter,
    deleteDialog,
    setDeleteDialog,
    chapterToDelete,
  };
}
