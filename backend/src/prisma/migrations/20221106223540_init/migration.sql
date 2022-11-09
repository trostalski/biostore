-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "expertise" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_on_methods" (
    "user_id" INTEGER NOT NULL,
    "method_id" INTEGER NOT NULL,

    CONSTRAINT "user_on_methods_pkey" PRIMARY KEY ("user_id","method_id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reagent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "product_id" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "reagent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "product_id" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "method" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "duration" TEXT,
    "description" TEXT,
    "sections" TEXT[],
    "comments" TEXT[],
    "number_of_samples" INTEGER,
    "creator_id" INTEGER,
    "category_id" INTEGER,

    CONSTRAINT "method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reagents_on_methods" (
    "reagent_id" INTEGER NOT NULL,
    "method_id" INTEGER NOT NULL,
    "amount" TEXT,

    CONSTRAINT "reagents_on_methods_pkey" PRIMARY KEY ("reagent_id","method_id")
);

-- CreateTable
CREATE TABLE "devices_on_methods" (
    "device_id" INTEGER NOT NULL,
    "method_id" INTEGER NOT NULL,

    CONSTRAINT "devices_on_methods_pkey" PRIMARY KEY ("device_id","method_id")
);

-- CreateTable
CREATE TABLE "method_step" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "temperatur" TEXT,
    "duration" TEXT,
    "link" TEXT,
    "method_id" INTEGER,

    CONSTRAINT "method_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "method_sample" (
    "id" SERIAL NOT NULL,
    "condition_key" TEXT,
    "condition_value" TEXT,
    "method_id" INTEGER,

    CONSTRAINT "method_sample_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_on_methods" ADD CONSTRAINT "user_on_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_on_methods" ADD CONSTRAINT "user_on_methods_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reagent" ADD CONSTRAINT "reagent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method" ADD CONSTRAINT "method_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method" ADD CONSTRAINT "method_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reagents_on_methods" ADD CONSTRAINT "reagents_on_methods_reagent_id_fkey" FOREIGN KEY ("reagent_id") REFERENCES "reagent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reagents_on_methods" ADD CONSTRAINT "reagents_on_methods_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices_on_methods" ADD CONSTRAINT "devices_on_methods_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices_on_methods" ADD CONSTRAINT "devices_on_methods_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method_step" ADD CONSTRAINT "method_step_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method_sample" ADD CONSTRAINT "method_sample_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "method"("id") ON DELETE SET NULL ON UPDATE CASCADE;
