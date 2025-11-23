import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";

export async function seedSubscriptions() {
  await db.insert(subscriptions).values({
    subscriptionId: "subscription123",
    userId: "user1",
    plan: "monthly",
    status: "active",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 86400000),
  });
}
