"use server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { actionResposneInterface } from "@/interface/action/action-response-interface";
import { updateProfileInterface } from "@/interface/user/update-profile-interface";
import { comparePassword, hashPassword } from "@/lib/password";
import { eq } from "drizzle-orm";

export async function getUserData(email: string) {
  const result = await db
    .select({
      role: users.role,
      name: users.name,
    })
    .from(users)
    .where(eq(users.email, email));

  return result;
}

export async function updateUserProfileAction(
  data: updateProfileInterface
): Promise<actionResposneInterface> {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (!user) throw new Error("User not found");

    const updates: Partial<{ name: string; password: string }> = {};
    if (data.name) updates.name = data.name;

    if (data.newPassword) {
      if (!data.currentPassword)
        throw new Error("Current password is required to change password");

      const isMatch = await comparePassword(
        data.currentPassword,
        user.password
      );

      if (!isMatch) throw new Error("Current password is incorrect");

      updates.password = await hashPassword(data.newPassword);
    }

    if (Object.keys(updates).length > 0) {
      await db.update(users).set(updates).where(eq(users.email, data.email));
    }

    return { success: true, message: "Update profile success! " };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown Error",
    };
  }
}
