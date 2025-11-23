export interface LessonInterface {
  lessonId: string;
  chapterId?: string;
  title: string | null;
  description: string | null;
  content: string | null;
  type: string | null;
  videoUrl: string | null;
  sortOrder: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  quizId: string | null;
}
