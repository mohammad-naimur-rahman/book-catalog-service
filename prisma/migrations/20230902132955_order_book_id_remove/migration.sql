/*
  Warnings:

  - You are about to drop the column `orderId` on the `orderedBooks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderedBooks" DROP CONSTRAINT "orderedBooks_orderId_fkey";

-- AlterTable
ALTER TABLE "orderedBooks" DROP COLUMN "orderId";
