/*
  Warnings:

  - Made the column `user_id` on table `reagent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "reagent" DROP CONSTRAINT "reagent_user_id_fkey";

-- AlterTable
ALTER TABLE "reagent" ADD COLUMN     "link" TEXT,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "reagent" ADD CONSTRAINT "reagent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
