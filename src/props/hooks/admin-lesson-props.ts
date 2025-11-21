import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";
import { Dispatch, SetStateAction } from "react";

export interface adminLessonProps {
  courseDetail: GetCourseInterface | null;
  fetchChaptersDetail: () => Promise<void>;
  activeChapter: string;
  setActiveChapter: Dispatch<SetStateAction<string>>;
}
