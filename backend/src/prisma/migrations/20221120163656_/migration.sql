-- DropForeignKey
ALTER TABLE "device" DROP CONSTRAINT "device_user_id_fkey";

-- DropForeignKey
ALTER TABLE "devices_on_methods" DROP CONSTRAINT "devices_on_methods_device_id_fkey";

-- DropForeignKey
ALTER TABLE "devices_on_methods" DROP CONSTRAINT "devices_on_methods_method_id_fkey";

-- DropForeignKey
ALTER TABLE "method_sample" DROP CONSTRAINT "method_sample_method_id_fkey";

-- DropForeignKey
ALTER TABLE "method_step" DROP CONSTRAINT "method_step_method_id_fkey";

-- DropForeignKey
ALTER TABLE "reagent" DROP CONSTRAINT "reagent_user_id_fkey";

-- AddForeignKey
ALTER TABLE "reagent" ADD CONSTRAINT "reagent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices_on_methods" ADD CONSTRAINT "devices_on_methods_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices_on_methods" ADD CONSTRAINT "devices_on_methods_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method_step" ADD CONSTRAINT "method_step_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method_sample" ADD CONSTRAINT "method_sample_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE CASCADE ON UPDATE CASCADE;
