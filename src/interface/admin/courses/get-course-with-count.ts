import { GetCourseInterface } from "./get-course-interface";

export interface GetCourseWithCount extends GetCourseInterface {
  chapterCount: number;
}
