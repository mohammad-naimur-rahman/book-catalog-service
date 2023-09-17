/*
  Warnings:

  - The values [PENDING,SHIPPED,DELIVERED] on the enum `ORDER_STATUS_ENUM` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,CUSTOMER] on the enum `USER_ROLE_ENUM` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ORDER_STATUS_ENUM_new" AS ENUM ('pending', 'shipped', 'delivered');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "ORDER_STATUS_ENUM_new" USING ("status"::text::"ORDER_STATUS_ENUM_new");
ALTER TYPE "ORDER_STATUS_ENUM" RENAME TO "ORDER_STATUS_ENUM_old";
ALTER TYPE "ORDER_STATUS_ENUM_new" RENAME TO "ORDER_STATUS_ENUM";
DROP TYPE "ORDER_STATUS_ENUM_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "USER_ROLE_ENUM_new" AS ENUM ('admin', 'customer');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "USER_ROLE_ENUM_new" USING ("role"::text::"USER_ROLE_ENUM_new");
ALTER TYPE "USER_ROLE_ENUM" RENAME TO "USER_ROLE_ENUM_old";
ALTER TYPE "USER_ROLE_ENUM_new" RENAME TO "USER_ROLE_ENUM";
DROP TYPE "USER_ROLE_ENUM_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer';
COMMIT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer';
