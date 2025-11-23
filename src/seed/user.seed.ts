import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/password";

export async function seedUsers() {
  await db.insert(users).values([
    {
      userId: "user1",
      email: "jackson@gmail.com",
      password: await hashPassword("jackson123"),
      name: "Jackson",
      role: "admin",
    },
    {
      userId: "user2",
      email: "wiwin@gmail.com",
      password: await hashPassword("wiwin123"),
      name: "Wiwin",
      role: "student",
    },
  ]);
}
