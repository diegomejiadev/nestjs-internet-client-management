/*
  Warnings:

  - You are about to drop the column `anthenaId` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `IpAdress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mainIpAdressId]` on the table `Anthena` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parentAnthenaId]` on the table `IpAdress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "IpAdress" DROP CONSTRAINT "IpAdress_anthenaId_fkey";

-- DropForeignKey
ALTER TABLE "IpAdress" DROP CONSTRAINT "IpAdress_clientId_fkey";

-- AlterTable
ALTER TABLE "Anthena" ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "mainIpAdressId" INTEGER;

-- AlterTable
ALTER TABLE "IpAdress" DROP COLUMN "anthenaId",
DROP COLUMN "clientId",
ADD COLUMN     "parentAnthenaId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Anthena_mainIpAdressId_key" ON "Anthena"("mainIpAdressId");

-- CreateIndex
CREATE UNIQUE INDEX "IpAdress_parentAnthenaId_key" ON "IpAdress"("parentAnthenaId");

-- AddForeignKey
ALTER TABLE "IpAdress" ADD CONSTRAINT "IpAdress_parentAnthenaId_fkey" FOREIGN KEY ("parentAnthenaId") REFERENCES "Anthena"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anthena" ADD CONSTRAINT "Anthena_mainIpAdressId_fkey" FOREIGN KEY ("mainIpAdressId") REFERENCES "IpAdress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anthena" ADD CONSTRAINT "Anthena_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
