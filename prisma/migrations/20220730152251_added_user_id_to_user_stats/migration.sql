/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `users_stats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `users_stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_stats" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_stats_userId_key" ON "users_stats"("userId");

-- AddForeignKey
ALTER TABLE "users_stats" ADD CONSTRAINT "users_stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
