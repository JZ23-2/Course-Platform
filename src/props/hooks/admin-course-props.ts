export interface adminCourseProps {
  slug?: string;
  search?: string;
  loadCourses?: (q?: string) => Promise<void>;
}
