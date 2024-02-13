/*
  Warnings:

  - A unique constraint covering the columns `[fullIp]` on the table `IpAdress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IpAdress_fullIp_key" ON "IpAdress"("fullIp");
