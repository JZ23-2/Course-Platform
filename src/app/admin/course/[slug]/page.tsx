"use client";
import React, { use, useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Edit, Trash } from "lucide-react";
import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";
import { getCourseAction } from "@/actions/admin/courses-services";
import toast from "react-hot-toast";
import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import DeleteModal from "@/components/ui/delete-modal";
import {
  createLessonsAction,
  deleteLessonAction,
  updateLessonsAction,
} from "@/actions/admin/lessons-service";
import { createLessonsInterface } from "@/interface/admin/lessons/create-lesson-interface";
import { LessonInterface } from "@/interface/admin/lessons/lesson-interface";
import { useAdminChapters } from "@/hooks/useAdminChapters";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [course, setCourse] = useState<GetCourseInterface | null>(null);

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

  useEffect(() => {
    const getCourseDetail = async () => {
      const res = await getCourseAction(slug);

      setCourse(res);
    };

    getCourseDetail();
  }, [slug]);

  const {
    fetchChaptersDetail,
    activeChapter,
    setActiveChapter,
    chapters,
    confirmDelete,
    handleAddChapter,
    handleEditChapter,
    chapterForm,
    deleteChapter,
    deleteDialog,
    editingChapter,
    openChapterModal,
    saveChapter,
    setChapterForm,
    setDeleteDialog,
    setOpenChapterModal,
    chapterToDelete,
  } = useAdminChapters({ course });

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
        if (!course) return;
        fetchChaptersDetail();
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await createLessonsAction(lessonForm, activeChapter);

      if (res.success) {
        toast.success(res.message);
        if (!course) return;
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
    if (!course) return;
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setDeleteLessonDialog(false);
    setLessonToDelete(null);
    fetchChaptersDetail();
  };

  if (!course) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <div className="flex gap-3">
              <Badge>{course.status}</Badge>
              <Badge variant="secondary">{course.type}</Badge>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">{course.description}</p>
                <img
                  src={course.thumbnail || ""}
                  className="rounded-lg shadow-md w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Chapters</h3>
              <Button onClick={handleAddChapter} size="sm">
                <Plus size={16} className="mr-2" /> Add Chapter
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <Accordion type="single" collapsible>
                  {chapters.map((chapter) => (
                    <AccordionItem
                      key={chapter.chapterId}
                      value={chapter.chapterId}
                    >
                      <AccordionTrigger>
                        <div className="flex flex-col w-full text-left">
                          <span className="font-medium text-base">
                            {chapter.title}
                          </span>
                          {chapter.description && (
                            <span className="text-sm text-muted-foreground">
                              {chapter.description}
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="pl-4 py-2">
                          <div className="flex gap-2 mb-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditChapter(chapter)}
                            >
                              <Edit size={12} />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => confirmDelete(chapter)}
                            >
                              <Trash size={12} />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAddLesson(chapter)}
                            >
                              <Plus size={12} className="mr-1" /> Add Lesson
                            </Button>
                          </div>

                          {(chapter.lessons || []).map((lesson) => (
                            <div
                              key={lesson.lessonId}
                              className="p-3 rounded-md bg-muted flex flex-col gap-2 mb-3"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  {lesson.title}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditLesson(lesson)}
                                  >
                                    <Edit size={12} />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => confirmLessonDelete(lesson)}
                                  >
                                    <Trash size={12} />
                                  </Button>
                                </div>
                              </div>

                              {lesson.description && (
                                <p className="text-sm text-muted-foreground">
                                  {lesson.description}
                                </p>
                              )}

                              {lesson.type === "video" && lesson.videoUrl && (
                                <video
                                  controls
                                  src={lesson.videoUrl}
                                  className="w-full rounded-md"
                                />
                              )}
                              {lesson.type === "article" && lesson.content && (
                                <div
                                  className="prose max-w-full"
                                  dangerouslySetInnerHTML={{
                                    __html: lesson.content,
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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

      <DeleteModal
        open={deleteDialog}
        title="Delete Chapter"
        description="Are you sure you want to delete"
        onClose={() => setDeleteDialog(false)}
        itemName={chapterToDelete?.title}
        onConfirm={deleteChapter}
      />

      <DeleteModal
        open={deleteLessonsDialog}
        title="Delete Lesson"
        description="Are you sure you want to delete"
        onClose={() => setDeleteLessonDialog(false)}
        itemName={lessonToDelete?.title || ""}
        onConfirm={deleteLesson}
      />
    </div>
  );
}
