-- AlterTable
ALTER TABLE "Gig" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "type" DROP NOT NULL;
