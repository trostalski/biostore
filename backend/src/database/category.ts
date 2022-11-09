import Prisma from "@prisma/client";
import prisma from "./client";

export const createCategory = async (input: Prisma.category) => {
  await prisma.category.create({
    data: {
      name: input.name,
    },
  });
};

export const updateCategory = async (
  id: string,
  input: Prisma.category
): Promise<void> => {
  const updatedUser = await prisma.category.update({
    where: { id: +id },
    data: {
      name: input.name,
    },
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  await prisma.category.delete({ where: { id: +id } });
};

export const getCategory = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id: +id } });
  return category;
};