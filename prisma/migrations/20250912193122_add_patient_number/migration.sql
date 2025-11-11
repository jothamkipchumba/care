-- AlterTable
ALTER TABLE "public"."Medication" ADD COLUMN     "visitId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Medication" ADD CONSTRAINT "Medication_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "public"."Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
