/*
  Warnings:

  - You are about to drop the column `temperatur` on the `method_step` table. All the data in the column will be lost.
  - Added the required column `day` to the `method_step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `method_step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "method_step" DROP COLUMN "temperatur",
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "temperature" TEXT,
ADD COLUMN     "time" TEXT NOT NULL;
