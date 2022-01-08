/*
  Warnings:

  - Changed the type of `type` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserEvents" AS ENUM ('QUIT', 'RELAPSE', 'PANIC_ATTACK', 'ANXIETY');

-- AlterTable
ALTER TABLE "events" DROP COLUMN "type",
ADD COLUMN     "type" "UserEvents" NOT NULL;
