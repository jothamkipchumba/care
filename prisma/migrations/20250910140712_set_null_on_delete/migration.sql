-- DropForeignKey
ALTER TABLE "public"."Allergy" DROP CONSTRAINT "Allergy_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."HealthRecord" DROP CONSTRAINT "HealthRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MedicalHistory" DROP CONSTRAINT "MedicalHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Medication" DROP CONSTRAINT "Medication_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Staff" DROP CONSTRAINT "Staff_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Visit" DROP CONSTRAINT "Visit_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Allergy" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."HealthRecord" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."MedicalHistory" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Medication" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Staff" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Visit" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Visit" ADD CONSTRAINT "Visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HealthRecord" ADD CONSTRAINT "HealthRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medication" ADD CONSTRAINT "Medication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Allergy" ADD CONSTRAINT "Allergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedicalHistory" ADD CONSTRAINT "MedicalHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
