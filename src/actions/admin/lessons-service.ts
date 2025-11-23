"use server";
import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { actionResposneInterface } from "@/interface/action/action-response-interface";
import { createLessonsInterface } from "@/interface/admin/lessons/create-lesson-interface";
import { updateLessonsInterface } from "@/interface/admin/lessons/update-lesson-interface";
import { eq } from "drizzle-orm";

export async function createLessonsAction(
  data: createLessonsInterface,
  chapterId: string
): Promise<actionResposneInterface> {
  try {
    if (!data.title) throw new Error("Title is required");
    if (!data.description) throw new Error("Description is required");
    if (!data.type) throw new Error("Type is required");

    const lessonId = crypto.randomUUID();

    if (data.type === "video") {
      await db.insert(lessons).values({
        lessonId: lessonId,
        chapterId: chapterId,
        title: data.title,
        type: data.type,
        description: data.description,
        videoUrl: data.videoUrl,
      });
    } else if (data.type === "article") {
      await db.insert(lessons).values({
        lessonId: lessonId,
        chapterId: chapterId,
        title: data.title,
        type: data.type,
        description: data.description,
        content: data.content,
      });
    } else {
      await db.insert(lessons).values({
        lessonId: lessonId,
        chapterId: chapterId,
        title: data.title,
        type: data.type,
        description: data.description,
        quizId: data.quizId,
      });
    }

    return { success: true, message: "Create lesson success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function updateLessonsAction(
  lessonId: string,
  data: updateLessonsInterface
): Promise<actionResposneInterface> {
  try {
    const updates: updateLessonsInterface = {
      updatedAt: new Date(),
    };

    if (data.title !== undefined) updates.title = data.title;
    if (data.description !== undefined) updates.description = data.description;
    if (data.sortOrder !== undefined) updates.sortOrder = data.sortOrder;
    if (data.type !== undefined) {
      if (data.type === "video") {
        if (data.videoUrl !== undefined) updates.videoUrl = data.videoUrl;
      } else if (data.type === "article") {
        if (data.content !== undefined) updates.content = data.content;
      } else {
        if (data.quizId !== undefined) updates.quizId = data.quizId;
      }
    }

    updates.type = data.type;

    await db.update(lessons).set(updates).where(eq(lessons.lessonId, lessonId));

    return { success: true, message: "Update lesson success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function deleteLessonAction(
  lessonId: string
): Promise<actionResposneInterface> {
  try {
    await db.delete(lessons).where(eq(lessons.lessonId, lessonId));
    return { success: true, message: "Delete lesson success!" };
  } catch (err) {
    return {
      success: true,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}
