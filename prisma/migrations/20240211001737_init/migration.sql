/*
  Warnings:

  - You are about to drop the column `reference_address` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "reference_address",
ADD COLUMN     "reference_addresses" TEXT[];
