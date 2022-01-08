-- AlterTable
ALTER TABLE "user_details" ADD COLUMN     "quitAt" TIMESTAMP(3),
ALTER COLUMN "smokesPerDay" DROP NOT NULL;
