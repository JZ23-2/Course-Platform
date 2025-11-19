"use server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { registerInterface } from "@/interface/auth/register-interface";
import { hashPassword } from "@/lib/password";
import { eq } from "drizzle-orm";

export async function registerUser(data: registerInterface) {
  const exisiting = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (exisiting.length > 0) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await hashPassword(data.password);

  await db.insert(users).values({
    userId: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return { success: true, message: "Register Success" };
}
