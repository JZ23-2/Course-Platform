import { quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type GetQuizInterface = InferSelectModel<typeof quizzes>;
