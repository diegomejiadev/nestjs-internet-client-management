/*
  Warnings:

  - You are about to alter the column `amount` on the `SubPayment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.

*/
-- AlterTable
ALTER TABLE "SubPayment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(6,2);
