/*
  Warnings:

  - Made the column `method_id` on table `method_sample` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "method_sample" DROP CONSTRAINT "method_sample_method_id_fkey";

-- AlterTable
ALTER TABLE "method_sample" ALTER COLUMN "method_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "method_sample" ADD CONSTRAINT "method_sample_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
