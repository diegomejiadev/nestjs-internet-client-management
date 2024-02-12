/*
  Warnings:

  - You are about to drop the column `last_name` on the `Client` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "last_name",
ADD COLUMN     "lastName" TEXT NOT NULL;
