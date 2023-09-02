/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ORDER_STATUS_ENUM" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "ORDER_STATUS_ENUM" NOT NULL DEFAULT 'PENDING';
