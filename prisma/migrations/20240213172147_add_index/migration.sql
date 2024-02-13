/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Anthena` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `SubPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anthena" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isRetired" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "IpAdress" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "isInvalid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SubPayment" DROP COLUMN "deletedAt";
