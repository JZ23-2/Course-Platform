"use server";

import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { actionResposneInterface } from "@/interface/action/action-response-interface";
import { createCourseInterface } from "@/interface/admin/courses/create-course-interface";
import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";
import { updateCourseInterface } from "@/interface/admin/courses/update-course-interface";
import { eq } from "drizzle-orm";
import slugify from "slugify";

export async function createCourseAction(
  data: createCourseInterface
): Promise<actionResposneInterface> {
  try {
    if (!data.title) throw new Error("Title is required!");

    const courseId = crypto.randomUUID();

    const slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    const existing = await db
      .select()
      .from(courses)
      .where(eq(courses.slug, slug));

    const finalSlug = existing.length
      ? `${slug}-${courseId.slice(0, 6)}`
      : slug;

    await db.insert(courses).values({
      courseId,
      title: data.title,
      description: data.description || "",
      thumbnail: data.thumbnail || "",
      slug: finalSlug,
      status: data.status,
      sortOrder: data.sortOrder,
      type: data.type,
    });

    return { success: true, message: "Create course success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function getCourseAction(
  slug: string
): Promise<GetCourseInterface | null> {
  try {
    if (!slug) return null;

    const course = await db.query.courses.findFirst({
      where: (c, { ilike }) => ilike(c.slug, `%${slug}%`),
    });

    return course ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateCourseAction(
  id: string,
  data: updateCourseInterface
): Promise<actionResposneInterface> {
  try {
    const updates: updateCourseInterface = {
      updatedAt: new Date(),
    };

    if (data.title) {
      updates.title = data.title;
      updates.slug = slugify(data.title, { lower: true, strict: true });
    }
    if (data.description !== undefined) updates.description = data.description;
    if (data.thumbnail !== undefined) updates.thumbnail = data.thumbnail;
    if (data.status !== undefined) updates.status = data.status;
    if (data.sortOrder !== undefined) updates.sortOrder = data.sortOrder;
    if (data.type !== undefined) updates.type = data.type;

    await db.update(courses).set(updates).where(eq(courses.courseId, id));

    return { success: true, message: "Update course success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}

export async function deleteCourseAction(
  id: string
): Promise<actionResposneInterface> {
  try {
    await db.delete(courses).where(eq(courses.courseId, id));
    return { success: true, message: "Delete course success!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}
