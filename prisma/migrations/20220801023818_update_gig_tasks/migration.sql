-- DropForeignKey
ALTER TABLE "GigTasks" DROP CONSTRAINT "GigTasks_id_fkey";

-- AlterTable
ALTER TABLE "GigTasks" ADD COLUMN     "isPriority" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "GigTasks" ADD CONSTRAINT "GigTasks_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
