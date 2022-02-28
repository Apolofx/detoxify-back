/*
  Warnings:

  - You are about to drop the `UserConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserConfig" DROP CONSTRAINT "UserConfig_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "UserConfig";

-- DropTable
DROP TABLE "UserStats";

-- CreateTable
CREATE TABLE "users_config" (
    "id" SERIAL NOT NULL,
    "locale" TEXT DEFAULT E'en',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "users_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_stats" (
    "id" SERIAL NOT NULL,
    "moneySaved" INTEGER DEFAULT 0,
    "lifeGain" INTEGER DEFAULT 0,
    "panicEvents" INTEGER DEFAULT 0,

    CONSTRAINT "users_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_config_userId_key" ON "users_config"("userId");

-- AddForeignKey
ALTER TABLE "users_config" ADD CONSTRAINT "users_config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
