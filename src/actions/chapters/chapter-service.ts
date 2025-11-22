"use server"
import { db } from "@/db/drizzle";
import { chapters, lessons } from "@/db/schema";
import { ChapterInterface } from "@/interface/admin/chapters/chapter-interface";
import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import { eq } from "drizzle-orm";

export async function getChaptersWithLessons(
  courseId: string
): Promise<getChapterInterface[]> {
  const rows = await db
    .select({
      chapterId: chapters.chapterId,
      chapterTitle: chapters.title,
      chapterDescription: chapters.description,
      chapterSortOrder: chapters.sortOrder,
      chapterCreatedAt: chapters.createdAt,
      chapterUpdatedAt: chapters.updatedAt,

      lessonId: lessons.lessonId,
      lessonTitle: lessons.title,
      lessonType: lessons.type,
      lessonDescription: lessons.description,
      lessonContent: lessons.content,
      lessonVideoUrl: lessons.videoUrl,
      lessonSortOrder: lessons.sortOrder,
      lessonCreatedAt: lessons.createdAt,
      lessonUpdatedAt: lessons.updatedAt,
    })
    .from(chapters)
    .leftJoin(lessons, eq(chapters.chapterId, lessons.chapterId))
    .where(eq(chapters.courseId, courseId))
    .orderBy(chapters.sortOrder, lessons.sortOrder);

  const map = new Map<string, ChapterInterface>();

  rows.forEach((row) => {
    if (!map.has(row.chapterId)) {
      map.set(row.chapterId, {
        chapterId: row.chapterId,
        title: row.chapterTitle,
        description: row.chapterDescription,
        sortOrder: row.chapterSortOrder,
        createdAt: row.chapterCreatedAt,
        updatedAt: row.chapterUpdatedAt,
        lessons: [],
      });
    }

    if (row.lessonId) {
      map.get(row.chapterId)!.lessons.push({
        lessonId: row.lessonId,
        title: row.lessonTitle,
        type: row.lessonType,
        description: row.lessonDescription,
        content: row.lessonContent,
        videoUrl: row.lessonVideoUrl,
        sortOrder: row.lessonSortOrder,
        createdAt: row.lessonCreatedAt,
        updatedAt: row.lessonUpdatedAt,
      });
    }
  });

  return Array.from(map.values());
}
