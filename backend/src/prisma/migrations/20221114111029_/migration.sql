/*
  Warnings:

  - Added the required column `name` to the `method_sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceNumber` to the `method_sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "method_sample" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "referenceNumber" INTEGER NOT NULL;
