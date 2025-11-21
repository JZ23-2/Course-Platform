import { LessonInterface } from "../lessons/lesson-interface";

export interface ChapterInterface {
  chapterId: string;
  courseId?: string;
  title: string;
  description: string | null;
  sortOrder: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  lessons: LessonInterface[];
}
