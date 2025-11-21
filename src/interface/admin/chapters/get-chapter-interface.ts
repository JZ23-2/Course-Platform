import { LessonInterface } from "../lessons/lesson-interface";
import { ChapterInterface } from "./chapter-interface";

export interface getChapterInterface extends ChapterInterface {
  lessons: LessonInterface[];
}
