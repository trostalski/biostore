/*
  Warnings:

  - Made the column `creator_id` on table `method` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "method" ALTER COLUMN "creator_id" SET NOT NULL;
