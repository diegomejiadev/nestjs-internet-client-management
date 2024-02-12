/*
  Warnings:

  - You are about to drop the column `payment_day` on the `Client` table. All the data in the column will be lost.
  - Added the required column `paymentDay` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "payment_day",
ADD COLUMN     "paymentDay" INTEGER NOT NULL;
