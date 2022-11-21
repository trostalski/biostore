-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "method" DROP CONSTRAINT "method_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "user_on_methods" DROP CONSTRAINT "user_on_methods_method_id_fkey";

-- DropForeignKey
ALTER TABLE "user_on_methods" DROP CONSTRAINT "user_on_methods_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_on_methods" ADD CONSTRAINT "user_on_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_on_methods" ADD CONSTRAINT "user_on_methods_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method" ADD CONSTRAINT "method_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
