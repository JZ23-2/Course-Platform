import { createChapterInterface } from "@/interface/admin/chapters/create-chapter-interface";
import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import { Dispatch, SetStateAction } from "react";

export interface modalProps {
  openChapterModal: boolean;
  setOpenChapterModal: Dispatch<SetStateAction<boolean>>;
  editingChapter: getChapterInterface | null;
  chapterForm: createChapterInterface;
  setChapterForm: Dispatch<SetStateAction<createChapterInterface>>;
  saveChapter: () => Promise<void>;
}
