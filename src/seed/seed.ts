import { seedSubscriptions } from "./subscription.seed";
import "dotenv/config";

async function main() {
  await seedSubscriptions();

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
