/*
  Warnings:

  - You are about to drop the column `smokerAge` on the `user_details` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'TRANSGENDER', 'NEUTRAL', 'NON_BINARY', 'AGENDER', 'PANGENDER');

-- AlterTable
ALTER TABLE "user_details" DROP COLUMN "smokerAge",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "smokerTime" INTEGER;

-- CreateTable
CREATE TABLE "UserConfig" (
    "id" SERIAL NOT NULL,
    "locale" TEXT DEFAULT E'en',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConfig_userId_key" ON "UserConfig"("userId");

-- AddForeignKey
ALTER TABLE "UserConfig" ADD CONSTRAINT "UserConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
