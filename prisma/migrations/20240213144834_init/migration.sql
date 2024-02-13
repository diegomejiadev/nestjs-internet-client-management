-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_paymentId_fkey";

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
