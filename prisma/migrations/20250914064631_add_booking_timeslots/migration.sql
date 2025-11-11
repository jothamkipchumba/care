-- CreateEnum
CREATE TYPE "public"."TimeSlot" AS ENUM ('SLOT_09_10', 'SLOT_10_11', 'SLOT_11_12', 'SLOT_12_13', 'SLOT_14_15');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "timeSlot" "public"."TimeSlot" NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_scheduledDate_timeSlot_key" ON "public"."Booking"("scheduledDate", "timeSlot");

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
