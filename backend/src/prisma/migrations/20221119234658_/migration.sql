/*
  Warnings:

  - Added the required column `number` to the `method_step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "method_step" ADD COLUMN     "number" INTEGER NOT NULL;
