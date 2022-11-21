/*
  Warnings:

  - You are about to drop the column `condition_key` on the `method_sample` table. All the data in the column will be lost.
  - You are about to drop the column `condition_value` on the `method_sample` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "method_sample" DROP COLUMN "condition_key",
DROP COLUMN "condition_value",
ADD COLUMN     "conditions" JSONB;
