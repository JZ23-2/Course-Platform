import { getChaptersWithLessons } from "@/actions/admin/chapters-services";
import { getChapterInterface } from "@/interface/admin/chapters/get-chapter-interface";
import { chapterProps } from "@/props/hooks/chapter-props";
import { useEffect, useState } from "react";

export function useChapters({ courseDetail }: chapterProps = {}) {
  const [chapters, setChapters] = useState<getChapterInterface[]>([]);
  const fetchChaptersDetail = async () => {
    if (courseDetail) {
      const res = await getChaptersWithLessons(courseDetail?.courseId);
      setChapters(res);
    }
  };

  useEffect(() => {
    fetchChaptersDetail();
  }, [courseDetail]);

  return { chapters, fetchChaptersDetail, setChapters };
}
