"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useAdminCourses } from "@/hooks/useAdminCourses";

export default function HomePage() {
  const { courses } = useAdminCourses();
  const router = useRouter();

  const visibleCourses = courses.filter((course) => course.status !== "Draft");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          Explore Courses
        </h1>
        <p className="text-muted-foreground mb-6">
          Browse all available courses. Paid courses are locked until you
          purchase them.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCourses.map((course) => (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow relative">
                <div className="relative h-44 bg-muted/30 flex items-center justify-center">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="p-6 text-center">
                      <div className="text-lg font-semibold">
                        {course.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        No thumbnail
                      </div>
                    </div>
                  )}

                  {course.type === "Paid" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-bold">
                      <Lock className="mr-2" /> Locked
                    </div>
                  )}
                </div>

                <CardContent>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <Badge>{course.status}</Badge>
                    <Badge>{course.type}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {course.chapterCount} Chapters
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <button
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md font-semibold transition ${
                      course.type === "Paid"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    disabled={course.type === "Paid"}
                    onClick={() =>
                      course.type !== "Paid" &&
                      router.push(`/course/${course.slug}`)
                    }
                  >
                    <Eye size={16} />
                    {course.type === "Paid" ? "Locked" : "View Course"}
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
