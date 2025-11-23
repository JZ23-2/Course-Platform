export interface adminCourseProps {
  search?: string;
  loadCourses?: (q?: string) => Promise<void>;
}
