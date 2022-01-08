-- CreateTable
CREATE TABLE "UserStats" (
    "id" SERIAL NOT NULL,
    "moneySaved" INTEGER DEFAULT 0,
    "lifeGain" INTEGER DEFAULT 0,
    "panicEvents" INTEGER DEFAULT 0,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);
