/*
  Warnings:

  - The values [INVALID] on the enum `LeadStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `course` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `telecrmError` on the `leads` table. All the data in the column will be lost.
  - Made the column `email` on table `leads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."LeadStatus_new" AS ENUM ('NEW', 'CONTACTED', 'SCHEDULED', 'CONVERTED', 'LOST');
ALTER TABLE "public"."leads" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."leads" ALTER COLUMN "status" TYPE "public"."LeadStatus_new" USING ("status"::text::"public"."LeadStatus_new");
ALTER TYPE "public"."LeadStatus" RENAME TO "LeadStatus_old";
ALTER TYPE "public"."LeadStatus_new" RENAME TO "LeadStatus";
DROP TYPE "public"."LeadStatus_old";
ALTER TABLE "public"."leads" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- DropIndex
DROP INDEX "public"."leads_createdAt_idx";

-- DropIndex
DROP INDEX "public"."leads_email_idx";

-- DropIndex
DROP INDEX "public"."leads_phone_idx";

-- DropIndex
DROP INDEX "public"."leads_status_idx";

-- AlterTable
ALTER TABLE "public"."leads" DROP COLUMN "course",
DROP COLUMN "priority",
DROP COLUMN "telecrmError",
ADD COLUMN     "age" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "concern" TEXT,
ADD COLUMN     "error" TEXT,
ADD COLUMN     "hairLossStage" TEXT,
ADD COLUMN     "preferredDate" TEXT,
ADD COLUMN     "procedure" TEXT,
ADD COLUMN     "treatment" TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- DropEnum
DROP TYPE "public"."LeadPriority";
