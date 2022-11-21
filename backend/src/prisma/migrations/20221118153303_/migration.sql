-- DropForeignKey
ALTER TABLE "reagents_on_methods" DROP CONSTRAINT "reagents_on_methods_method_id_fkey";

-- DropForeignKey
ALTER TABLE "reagents_on_methods" DROP CONSTRAINT "reagents_on_methods_reagent_id_fkey";

-- AddForeignKey
ALTER TABLE "reagents_on_methods" ADD CONSTRAINT "reagents_on_methods_reagent_id_fkey" FOREIGN KEY ("reagent_id") REFERENCES "reagent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reagents_on_methods" ADD CONSTRAINT "reagents_on_methods_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE CASCADE ON UPDATE CASCADE;
