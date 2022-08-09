/*
  Warnings:

  - You are about to drop the column `completed` on the `GigTasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GigTasks" DROP COLUMN "completed",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startDate" TIMESTAMP(3);
