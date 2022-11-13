-- DropForeignKey
ALTER TABLE "method" DROP CONSTRAINT "method_category_id_fkey";

-- AddForeignKey
ALTER TABLE "method" ADD CONSTRAINT "method_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
