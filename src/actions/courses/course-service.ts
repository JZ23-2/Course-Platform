"use server";
import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { GetCourseWithCount } from "@/interface/admin/courses/get-course-with-count";
import { ilike, or, sql } from "drizzle-orm";

export async function getAllCoursesAction(
  search?: string
): Promise<GetCourseWithCount[]> {
  try {
    const whereClause = search
      ? or(
          ilike(courses.title, `%${search}%`),
          ilike(courses.description, `%${search}%`)
        )
      : undefined;

    const data = await db
      .select({
        courseId: courses.courseId,
        slug: courses.slug,
        title: courses.title,
        description: courses.description,
        thumbnail: courses.thumbnail,
        status: courses.status,
        type: courses.type,
        sortOrder: courses.sortOrder,
        createdAt: courses.createdAt,
        updatedAt: courses.updatedAt,
        chapterCount: sql<number>`
          (SELECT COUNT(*) FROM chapters 
            WHERE chapters."courseId" = ${courses.courseId})
        `,
      })
      .from(courses)
      .where(whereClause as any)
      .orderBy(courses.sortOrder);

    return data;
  } catch (err) {
    return [];
  }
}
