/*
  Warnings:

  - You are about to drop the column `price` on the `SubPayment` table. All the data in the column will be lost.
  - Added the required column `amount` to the `SubPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubPayment" DROP COLUMN "price",
ADD COLUMN     "amount" MONEY NOT NULL;
