/*
  Warnings:

  - A unique constraint covering the columns `[nationalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "nationalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_nationalId_key" ON "public"."User"("nationalId");
