"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { createCourseInterface } from "@/interface/admin/create-course-interface";
import {
  createCourseAction,
  deleteCourseAction,
  getAllCoursesAction,
  updateCourseAction,
} from "@/actions/admin/courses-services";
import toast from "react-hot-toast";
import { GetCourseInterface } from "@/interface/admin/get-course-interface";

export default function AdminCoursesDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<GetCourseInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [formData, setFormData] = useState<createCourseInterface>({
    title: "",
    description: "",
    thumbnail: "",
    sortOrder: 0,
    status: "",
  });
  const [search, setSearch] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] =
    useState<GetCourseInterface | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async (q: string = "") => {
    setLoading(true);
    const test = await getAllCoursesAction(q);
    setCourses(test);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(() => loadCourses(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const openCreate = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      thumbnail: "",
      sortOrder: 0,
      status: "",
    });
    setOpenDialog(true);
  };

  const openEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({ ...course });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (editingCourse) {
      const res = await updateCourseAction(editingCourse.courseId, formData);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await createCourseAction(formData);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
    setOpenDialog(false);
    loadCourses(search);
  };

  const confirmDelete = (course: GetCourseInterface) => {
    setCourseToDelete(course);
    setDeleteDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!courseToDelete) return;

    const res = await deleteCourseAction(courseToDelete.courseId);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setDeleteDialog(false);
    setCourseToDelete(null);
    loadCourses(search);
  };

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
                        <Badge>{course.status}</Badge>
                        <div className="text-xs text-muted-foreground">
                          3 modules
                        </div>
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

        <div className="mt-8 flex items-center justify-center">
          <Button variant="ghost">Load more</Button>
        </div>
      </main>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Course" : "Create Course"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: (e.target as HTMLInputElement).value,
                })
              }
            />
            <Textarea
              placeholder="Short description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: (e.target as HTMLTextAreaElement).value,
                })
              }
            />
            <Input
              placeholder="Thumbnail URL (optional)"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  thumbnail: (e.target as HTMLInputElement).value,
                })
              }
            />

            <Input
              type="number"
              placeholder="Sort Order"
              value={formData.sortOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sortOrder: Number(e.target.value),
                })
              }
            />

            <select
              className="border rounded-md px-3 py-2 w-full"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <DialogFooter>
            <div className="w-full flex justify-between items-center">
              <div />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingCourse ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{courseToDelete?.title}</span>?{" "}
            <br />
            This action cannot be undone.
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirmed}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
