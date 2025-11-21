export interface updateChapterInterface {
  chapterId?: string;
  courseId?: string;
  title?: string;
  description?: string | null;
  sortOrder?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
