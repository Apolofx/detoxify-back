import { PrismaClient } from "@prisma/client";
import faker from "faker";
const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV !== "dev") {
    console.log(
      `Current environment: ${process.env.NODE_ENV}, no seeds will run ⚠️.`
    );
    return;
  }
  //remove existing records
  await prisma.user.deleteMany({});
  //create users with details, events, and achievements
  console.log("Seeding database ✅");
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        name: faker.name.firstName(),
        email: faker.internet.email(),
      },
    });
  }
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
