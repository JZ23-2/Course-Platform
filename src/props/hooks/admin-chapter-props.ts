import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";
import { Dispatch, SetStateAction } from "react";

export interface adminChapterProps {
  courseDetail?: GetCourseInterface | null;
  chapters?: getChapterInterface[];
  setChapters?: Dispatch<SetStateAction<getChapterInterface[]>>;
  fetchChaptersDetail?: () => Promise<void>;
}
