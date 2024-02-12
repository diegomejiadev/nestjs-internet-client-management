/*
  Warnings:

  - You are about to drop the column `full_name` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "full_name",
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT 'Doe',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Jhon';
