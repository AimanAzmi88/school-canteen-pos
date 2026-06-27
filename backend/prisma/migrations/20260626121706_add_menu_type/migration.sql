-- CreateEnum
CREATE TYPE "MenuType" AS ENUM ('NASI', 'GORENG');

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "type" "MenuType";
