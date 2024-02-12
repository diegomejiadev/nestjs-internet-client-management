/*
  Warnings:

  - You are about to drop the column `created_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Anthena` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Anthena` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Anthena` table. All the data in the column will be lost.
  - You are about to drop the column `physical_address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `reference_addresses` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `anthena_id` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `first_part` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `full_ip` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `second_part` on the `IpAdress` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `creator_admin_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SubPayment` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `SubPayment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `SubPayment` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `SubPayment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `SubPayment` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Anthena` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anthenaId` to the `IpAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstPart` to the `IpAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullIp` to the `IpAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondPart` to the `IpAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `IpAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `SubPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `SubPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SubPayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IpAdress" DROP CONSTRAINT "IpAdress_anthena_id_fkey";

-- DropForeignKey
ALTER TABLE "IpAdress" DROP CONSTRAINT "IpAdress_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_creator_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "SubPayment" DROP CONSTRAINT "SubPayment_payment_id_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Anthena" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "physical_address",
DROP COLUMN "reference_addresses",
ADD COLUMN     "physicalAddress" TEXT,
ADD COLUMN     "referenceAddresses" TEXT[];

-- AlterTable
ALTER TABLE "IpAdress" DROP COLUMN "anthena_id",
DROP COLUMN "client_id",
DROP COLUMN "deleted_at",
DROP COLUMN "first_part",
DROP COLUMN "full_ip",
DROP COLUMN "second_part",
ADD COLUMN     "anthenaId" TEXT NOT NULL,
ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "firstPart" INTEGER NOT NULL,
ADD COLUMN     "fullIp" TEXT NOT NULL,
ADD COLUMN     "secondPart" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "client_id",
DROP COLUMN "created_at",
DROP COLUMN "creator_admin_id",
DROP COLUMN "updated_at",
ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creatorAdminId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "created_at",
DROP COLUMN "file_url",
DROP COLUMN "payment_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SubPayment" DROP COLUMN "created_at",
DROP COLUMN "end_date",
DROP COLUMN "payment_id",
DROP COLUMN "start_date",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "startDate" DATE NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_creatorAdminId_fkey" FOREIGN KEY ("creatorAdminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubPayment" ADD CONSTRAINT "SubPayment_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAdress" ADD CONSTRAINT "IpAdress_anthenaId_fkey" FOREIGN KEY ("anthenaId") REFERENCES "Anthena"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAdress" ADD CONSTRAINT "IpAdress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
