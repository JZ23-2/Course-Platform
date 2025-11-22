"use server";
import { db } from "@/db/drizzle";
import { chapters, lessons } from "@/db/schema";
import { actionResposneInterface } from "@/interface/action/action-response-interface";
import { ChapterInterface } from "@/interface/admin/chapters/chapter-interface";
import { createChapterInterface } from "@/interface/admin/chapters/create-chapter-interface";
import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import { updateChapterInterface } from "@/interface/admin/chapters/update-chapter-interface";
import { updateCourseInterface } from "@/interface/admin/courses/update-course-interface";
import { eq } from "drizzle-orm";

export async function createChapterAction(
  data: createChapterInterface,
  courseId: string
): Promise<actionResposneInterface> {
  try {
    if (!data.title) throw new Error("Title is required!");
    if (!data.description) throw new Error("Description is required!");

    const chapterId = crypto.randomUUID();

    await db.insert(chapters).values({
      chapterId: chapterId,
      title: data.title,
      description: data.description,
      courseId: courseId,
    });

    return { success: true, message: "Create chapter success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function updateChapterAction(
  chapterId: string,
  data: updateChapterInterface
): Promise<actionResposneInterface> {
  try {
    const updates: updateCourseInterface = {
      updatedAt: new Date(),
    };

    if (data.title !== undefined) updates.title = data.title;
    if (data.description !== null) updates.description = data.description;
    if (data.sortOrder !== null) updates.sortOrder = data.sortOrder;

    await db
      .update(chapters)
      .set(updates)
      .where(eq(chapters.chapterId, chapterId));

    return { success: true, message: "Update chapter success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function deleteChapterAction(
  chapterId: string
): Promise<actionResposneInterface> {
  try {
    await db.delete(chapters).where(eq(chapters.chapterId, chapterId));
    return { success: true, message: "Delete chapter success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}
