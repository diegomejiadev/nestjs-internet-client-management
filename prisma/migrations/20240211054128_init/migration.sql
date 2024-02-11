/*
  Warnings:

  - You are about to alter the column `amount` on the `SubPayment` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(8,2)`.

*/
-- AlterTable
ALTER TABLE "SubPayment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(8,2);
