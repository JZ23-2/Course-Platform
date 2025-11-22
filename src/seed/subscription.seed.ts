import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";
import { nanoid } from "nanoid";

export async function seedSubscriptions() {
  await db.insert(subscriptions).values({
    subscriptionId: nanoid(),
    userId: "a7aac8b0-403e-46aa-ad13-9b8c911a5c2a",
    plan: "monthly",
    status: "active",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 86400000),
  });
}
