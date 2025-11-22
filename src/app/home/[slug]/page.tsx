"use client";
import React, { use } from "react";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAdminCourses } from "@/hooks/useAdminCourses";
import { useAdminChapters } from "@/hooks/useAdminChapters";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { courseDetail } = useAdminCourses({ slug });
  const { chapters } = useAdminChapters({ courseDetail });

  if (!courseDetail) return <div>Loading...</div>;

  const courseChapters = chapters;

  console.log(chapters)

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
                {courseDetail.thumbnail && (
                  <img
                    src={courseDetail.thumbnail}
                    className="rounded-lg shadow-md w-full"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4">Chapters</h3>

            <Card className="h-full">
              <CardContent className="p-4">
                {courseChapters.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No chapters available.
                  </p>
                ) : (
                  <Accordion type="single" collapsible className="space-y-3">
                    {courseChapters.map((chapter) => (
                      <AccordionItem
                        key={chapter.chapterId}
                        value={chapter.chapterId}
                        className="border border-border/50 rounded-xl shadow-sm bg-card"
                      >
                        <AccordionTrigger className="hover:no-underline py-4 px-2">
                          <div className="flex flex-col w-full text-left">
                            <span className="font-semibold text-lg">
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
                          {(chapter.lessons || []).length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              No lessons in this chapter.
                            </p>
                          ) : (
                            (chapter.lessons || []).map((lesson) => (
                              <div
                                key={lesson.lessonId}
                                className="p-4 rounded-xl border bg-muted/50 backdrop-blur-sm shadow-sm flex flex-col gap-3"
                              >
                                <span className="font-medium text-base">
                                  {lesson.title}
                                </span>
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
                                {lesson.type === "article" &&
                                  lesson.content && (
                                    <div
                                      className="prose prose-neutral max-w-full"
                                      dangerouslySetInnerHTML={{
                                        __html: lesson.content,
                                      }}
                                    />
                                  )}
                              </div>
                            ))
                          )}
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
    </div>
  );
}
