/*
  Warnings:

  - You are about to drop the column `isActive` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "isActive",
ADD COLUMN     "isSleeping" BOOLEAN NOT NULL DEFAULT true;
