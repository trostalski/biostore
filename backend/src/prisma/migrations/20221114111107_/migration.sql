/*
  Warnings:

  - You are about to drop the column `referenceNumber` on the `method_sample` table. All the data in the column will be lost.
  - Added the required column `reference_number` to the `method_sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "method_sample" DROP COLUMN "referenceNumber",
ADD COLUMN     "reference_number" INTEGER NOT NULL;
