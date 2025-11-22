import { getAllCoursesAction } from "@/actions/courses/course-service";
import { GetCourseWithCount } from "@/interface/admin/courses/get-course-with-count";
import { useEffect, useState } from "react";

export function useCourses() {
  const [courses, setCourses] = useState<GetCourseWithCount[]>([]);
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

  return { courses, setSearch, search, loading, loadCourses };
}
