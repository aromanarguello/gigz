-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'SUBMITTED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING';
