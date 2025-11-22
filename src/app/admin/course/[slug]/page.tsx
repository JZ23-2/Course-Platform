"use client";
import React, { use } from "react";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Edit, Trash } from "lucide-react";
import DeleteModal from "@/components/ui/delete-modal";
import { useAdminChapters } from "@/hooks/useAdminChapters";
import { useAdminCourses } from "@/hooks/useAdminCourses";
import { useAdminLesson } from "@/hooks/useAdminLesson";
import { LessonModal } from "@/components/ui/lessons/LessonModal";
import { ChapterModal } from "@/components/ui/chapters/ChapterModal";
import { useCourses } from "@/hooks/useCourses";
import { useChapters } from "@/hooks/useChapters";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { courseDetail } = useCourses({ slug });
  const { chapters, fetchChaptersDetail, setChapters } = useChapters({
    courseDetail,
  });

  const {
    activeChapter,
    setActiveChapter,
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
  } = useAdminChapters({
    courseDetail,
    chapters,
    fetchChaptersDetail,
    setChapters,
  });

  const {
    confirmLessonDelete,
    deleteLesson,
    deleteLessonsDialog,
    editingLesson,
    handleAddLesson,
    handleEditLesson,
    lessonForm,
    lessonToDelete,
    openLessonModal,
    saveLesson,
    setDeleteLessonDialog,
    setLessonForm,
    setOpenLessonModal,
  } = useAdminLesson({
    courseDetail,
    fetchChaptersDetail,
    activeChapter,
    setActiveChapter,
  });

  if (!courseDetail) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col h-full space-y-6">
            <h1 className="text-3xl font-bold">{courseDetail.title}</h1>
            <div className="flex gap-3">
              <Badge>{courseDetail.status}</Badge>
              <Badge variant="secondary">{courseDetail.type}</Badge>
            </div>

            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">
                  {courseDetail.description}
                </p>
                <img
                  src={courseDetail.thumbnail || ""}
                  className="rounded-lg shadow-md w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Chapters</h3>
              <Button onClick={handleAddChapter} size="sm">
                <Plus size={16} className="mr-2" /> Add Chapter
              </Button>
            </div>

            <Card className="h-full">
              <CardContent className="p-4">
                {chapters.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No chapters added yet.
                  </p>
                ) : (
                  <Accordion type="single" collapsible className="space-y-3">
                    {chapters.map((chapter) => (
                      <AccordionItem
                        key={chapter.chapterId}
                        value={chapter.chapterId}
                        className="border border-border/50 rounded-xl shadow-sm bg-card"
                      >
                        <AccordionTrigger className="hover:no-underline py-4 px-2">
                          <div className="flex flex-col w-full text-left">
                            <span className="font-semibold text-lg flex items-center gap-2">
                              {chapter.title}
                            </span>

                            {chapter.description && (
                              <span className="text-sm text-muted-foreground mt-1">
                                {chapter.description}
                              </span>
                            )}
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg"
                              onClick={() => handleEditChapter(chapter)}
                            >
                              <Edit size={14} className="mr-1" /> Edit
                            </Button>

                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-lg"
                              onClick={() => confirmDelete(chapter)}
                            >
                              <Trash size={14} className="mr-1" /> Delete
                            </Button>

                            <Button
                              size="sm"
                              className="rounded-lg"
                              onClick={() => handleAddLesson(chapter)}
                            >
                              <Plus size={14} className="mr-1" /> Add Lesson
                            </Button>
                          </div>

                          {(chapter.lessons?.length ?? 0) === 0 && (
                            <p className="text-sm text-muted-foreground">
                              No lessons in this chapter.
                            </p>
                          )}

                          {(chapter.lessons || []).map((lesson) => (
                            <div
                              key={lesson.lessonId}
                              className="p-4 rounded-xl border bg-muted/50 backdrop-blur-sm shadow-sm flex flex-col gap-3"
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-base">
                                    {lesson.title}
                                  </span>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-lg"
                                    onClick={() => handleEditLesson(lesson)}
                                  >
                                    <Edit size={12} />
                                  </Button>

                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="rounded-lg"
                                    onClick={() => confirmLessonDelete(lesson)}
                                  >
                                    <Trash size={12} />
                                  </Button>
                                </div>
                              </div>

                              {lesson.description && (
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {lesson.description}
                                </p>
                              )}

                              {lesson.type === "video" && lesson.videoUrl && (
                                <video
                                  controls
                                  src={lesson.videoUrl}
                                  className="w-full rounded-lg shadow-md"
                                />
                              )}

                              {lesson.type === "article" && lesson.content && (
                                <div
                                  className="prose prose-neutral max-w-full"
                                  dangerouslySetInnerHTML={{
                                    __html: lesson.content,
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ChapterModal
        chapterForm={chapterForm}
        editingChapter={editingChapter}
        openChapterModal={openChapterModal}
        saveChapter={saveChapter}
        setChapterForm={setChapterForm}
        setOpenChapterModal={setOpenChapterModal}
      />

      <LessonModal
        editingLesson={editingLesson}
        lessonForm={lessonForm}
        openLessonModal={openLessonModal}
        saveLesson={saveLesson}
        setLessonForm={setLessonForm}
        setOpenLessonModal={setOpenLessonModal}
      />

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
