/*
  Warnings:

  - Added the required column `updatedAt` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SubPayment" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Anthena_name_mainIpAdressId_clientId_idx" ON "Anthena"("name", "mainIpAdressId", "clientId");

-- CreateIndex
CREATE INDEX "Client_name_lastName_idx" ON "Client"("name", "lastName");

-- CreateIndex
CREATE INDEX "IpAdress_fullIp_range_parentAnthenaId_idx" ON "IpAdress"("fullIp", "range", "parentAnthenaId");

-- CreateIndex
CREATE INDEX "Payment_clientId_idx" ON "Payment"("clientId");

-- CreateIndex
CREATE INDEX "Receipt_paymentId_idx" ON "Receipt"("paymentId");

-- CreateIndex
CREATE INDEX "SubPayment_paymentId_idx" ON "SubPayment"("paymentId");
