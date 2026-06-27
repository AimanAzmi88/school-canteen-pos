/*
  Warnings:

  - A unique constraint covering the columns `[receiptNo]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiptNo` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "receiptNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_receiptNo_key" ON "Order"("receiptNo");
