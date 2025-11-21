import { createLessonsInterface } from "@/interface/admin/lessons/create-lesson-interface";
import { LessonInterface } from "@/interface/admin/lessons/lesson-interface";
import { Dispatch, SetStateAction } from "react";

export interface modalProps {
  openLessonModal: boolean;
  setOpenLessonModal: Dispatch<SetStateAction<boolean>>;
  editingLesson: LessonInterface | null;
  lessonForm: createLessonsInterface;
  saveLesson: () => Promise<void>;
  setLessonForm: Dispatch<SetStateAction<createLessonsInterface>>;
}
