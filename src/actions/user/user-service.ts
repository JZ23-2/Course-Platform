"use server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserRole(email: string) {
  const result = await db
    .select({
      role: users.role,
    })
    .from(users)
    .where(eq(users.email, email));

  return result;
}
