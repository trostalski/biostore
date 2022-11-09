import Prisma from "@prisma/client";
import prisma from "./client";

export const createReagent = async (input: Prisma.reagent) => {
  await prisma.reagent.create({
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
    },
  });
};

export const updateReagent = async (
  id: string,
  input: Prisma.reagent
): Promise<void> => {
  const updatedUser = await prisma.reagent.update({
    where: { id: +id },
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
    },
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  await prisma.reagent.delete({ where: { id: +id } });
};

export const getCategory = async (id: string) => {
  const reagent = await prisma.reagent.findUnique({ where: { id: +id } });
  return reagent;
};
