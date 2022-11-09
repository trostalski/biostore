import Prisma from "@prisma/client";
import prisma from "./client";

export const createDevice = async (input: Prisma.device) => {
  await prisma.device.create({
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
    },
  });
};

export const updateReagent = async (
  id: string,
  input: Prisma.device
): Promise<void> => {
  const updatedUser = await prisma.device.update({
    where: { id: +id },
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
    },
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  await prisma.device.delete({ where: { id: +id } });
};

export const getCategory = async (id: string) => {
  const reagent = await prisma.device.findUnique({ where: { id: +id } });
  return reagent;
};
