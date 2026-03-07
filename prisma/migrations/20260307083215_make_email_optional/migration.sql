-- AlterTable
ALTER TABLE "public"."leads" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pincode" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
