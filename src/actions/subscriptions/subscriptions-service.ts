"use server"
import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function getUserSubscription(userId: string): Promise<boolean> {
  const now = new Date();

  const result = await db
    .select({
      subscriptionId: subscriptions.subscriptionId,
    })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active"),
        gt(subscriptions.endDate, now)
      )
    )
    .limit(1);

  return result.length > 0;
}
