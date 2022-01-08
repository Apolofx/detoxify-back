import { PrismaClient } from "@prisma/client";
import faker, { fake } from "faker";
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
        userDetails: {
          create: {
            sports: true,
            quitAt: faker.date.recent(),
            smokerTime: faker.datatype.number({ min: 0, max: 100 }), //smoking time in years
            smokesPerDay: faker.datatype.number({ min: 0, max: 100 }), //cigarettes per day
            gender: faker.random.arrayElement([
              "FEMALE",
              "MALE",
              "TRANSGENDER",
              "NON_BINARY",
            ]),
            age: faker.datatype.number({ min: 0, max: 100 }),
            location: faker.address.cityName(),
          },
        },
        achievements: {
          createMany: {
            data: faker.random.arrayElements([
              { name: "90 dias sin fumar" },
              { name: "30 dias sin fumar" },
              { name: "7 dias sin fumar" },
              { name: "15 dias sin fumar" },
              { name: "4 almuerzos ahorrados" },
              { name: "20% más capacidad respiratoria" },
              { name: "1 dia mas de vida" },
              { name: "10% menos de probabilidad de tener un acv" },
            ]),
          },
        },
        events: {
          create: {
            type: faker.random.arrayElement([
              "ANXIETY",
              "PANIC_ATTACK",
              "RELAPSE",
              "QUIT",
            ]),
          },
        },
        userConfig: {
          create: {
            locale: faker.random.arrayElement(["es_ES", "en_EN"]),
          },
        },
      },
    });
  }
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
