import { courses } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type GetCourseInterface = InferSelectModel<typeof courses>;
