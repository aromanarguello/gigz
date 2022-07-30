-- CreateEnum
CREATE TYPE "TimeUnits" AS ENUM ('MINUTE', 'SECOND', 'HOUR', 'DAY');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "GigTasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timeEstimateAmount" INTEGER,
    "timeEstimateUnit" "TimeUnits",
    "deadline" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "gigId" TEXT NOT NULL,

    CONSTRAINT "GigTasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GigTasks_gigId_key" ON "GigTasks"("gigId");

-- AddForeignKey
ALTER TABLE "GigTasks" ADD CONSTRAINT "GigTasks_id_fkey" FOREIGN KEY ("id") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
