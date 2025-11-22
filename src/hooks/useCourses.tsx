import { getCourseAction } from "@/actions/admin/courses-services";
import { getAllCoursesAction } from "@/actions/courses/course-service";
import { GetCourseInterface } from "@/interface/admin/courses/get-course-interface";
import { GetCourseWithCount } from "@/interface/admin/courses/get-course-with-count";
import { courseProps } from "@/props/hooks/course-props";
import { useEffect, useState } from "react";

export function useCourses({ slug }: courseProps = {}) {
  const [courses, setCourses] = useState<GetCourseWithCount[]>([]);
  const [courseDetail, setCourseDetail] = useState<GetCourseInterface | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCourses = async (q: string = "") => {
    setLoading(true);
    const res = await getAllCoursesAction(q);
    setCourses(res);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(() => loadCourses(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const getCourseDetail = async () => {
    if (!slug) return;
    const res = await getCourseAction(slug);

    setCourseDetail(res);
  };

  useEffect(() => {
    getCourseDetail();
  }, [slug]);

  return { courses, setSearch, search, loading, loadCourses, courseDetail };
}
