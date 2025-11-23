import { seedSubscriptions } from "./subscription.seed";
import "dotenv/config";
import { seedUsers } from "./user.seed";
import { seedCourses } from "./course.seed";
import { seedChapters } from "./chapter.seed";
import { seedLessons } from "./lesson.seed";
import { seedQuizzes } from "./quiz.seed";
import { seedQuizQuestions } from "./quiz-question.seed";

async function main() {
  await seedUsers();
  await seedCourses();
  await seedChapters();
  await seedQuizzes();
  await seedQuizQuestions();
  await seedLessons();

  await seedSubscriptions();

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
