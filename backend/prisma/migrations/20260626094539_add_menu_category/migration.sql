-- CreateEnum
CREATE TYPE "MenuCategory" AS ENUM ('FOOD', 'DRINK');

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "category" "MenuCategory" NOT NULL DEFAULT 'FOOD';
