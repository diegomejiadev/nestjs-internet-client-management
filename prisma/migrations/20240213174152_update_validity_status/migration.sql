/*
  Warnings:

  - You are about to drop the column `isInvalid` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "isInvalid",
ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT true;
