/*
  Warnings:

  - Added the required column `orderId` to the `orderedBooks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderedBooks" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "bookId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orderedBooks" ADD CONSTRAINT "orderedBooks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
