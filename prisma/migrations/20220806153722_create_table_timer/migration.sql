-- CreateTable
CREATE TABLE "TaskTimer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "stoppedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "TaskTimer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskTimer" ADD CONSTRAINT "TaskTimer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTimer" ADD CONSTRAINT "TaskTimer_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "GigTasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
