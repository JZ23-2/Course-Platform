"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Trash, Edit, Eye, Plus, Search, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import DeleteModal from "@/components/ui/delete-modal";
import { CourseModal } from "@/components/ui/courses/CourseModal";
import { useAdminCourses } from "@/hooks/useAdminCourses";

export default function AdminCoursesDashboard() {
  const router = useRouter();

  const {
    search,
    setSearch,
    openCreate,
    loading,
    courses,
    openEdit,
    confirmDelete,
    courseToDelete,
    deleteDialog,
    editingCourse,
    formData,
    handleDeleteConfirmed,
    handleSave,
    openDialog,
    setDeleteDialog,
    setFormData,
    setOpenDialog,
  } = useAdminCourses();

  return (
    <div className="min-h-screen bg-linear-to-b from-background/60 via-background to-background p-0">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-foreground">
              Courses
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your courses, media and settings.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Input
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none">
                <Search size={16} />
              </div>
            </div>

            <Button onClick={openCreate} className="flex items-center gap-2">
              <Plus size={16} /> Create Course
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full p-8 rounded-lg bg-card">
              Loading...
            </div>
          ) : courses.length === 0 ? (
            <div className="col-span-full p-8 rounded-lg bg-card text-center">
              No courses found.
            </div>
          ) : (
            courses.map((course) => (
              <motion.div
                key={course.courseId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative h-44 bg-linear-to-br from-muted/60 to-muted/40 flex items-center justify-center">
                    {course.thumbnail ? (
                      <Avatar>
                        <AvatarImage
                          src={course.thumbnail}
                          alt={course.title}
                        />
                        <AvatarFallback>
                          {course.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="p-6 text-center">
                        <div className="text-lg font-semibold">
                          {course.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          No cover image
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full p-2"
                          >
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/admin/courses/${course.courseId}`)
                            }
                          >
                            <Eye size={14} className="mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(course)}>
                            <Edit size={14} className="mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmDelete(course)}
                          >
                            <Trash size={14} className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <CardContent>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex flex-row gap-2">
                          <Badge>{course.status}</Badge>
                          <Badge>{course.type}</Badge>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          3 modules
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="w-full flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/admin/courses/${course.courseId}`)
                          }
                        >
                          <Eye size={14} /> View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(course)}
                        >
                          <Edit size={14} /> Edit
                        </Button>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => confirmDelete(course)}
                      >
                        <Trash size={14} className="mr-2" /> Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <CourseModal
        open={openDialog}
        editingCourse={editingCourse}
        formData={formData}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleSave}
        setFormData={setFormData}
      />

      <DeleteModal
        open={deleteDialog}
        title="Delete Course"
        description="Are you sure you want to delete"
        onClose={() => setDeleteDialog(false)}
        itemName={courseToDelete?.title}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
}
