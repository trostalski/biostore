import Prisma from "@prisma/client";
import prisma from "./client";

export const createCategory = async (input: Prisma.category) => {
  const category: Prisma.category = await prisma.category.create({
    data: {
      name: input.name,
      user_id: input.user_id,
    },
  });
  return category;
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

export const deleteCategory = async (id: string) => {
  const category: Prisma.category = await prisma.category.delete({
    where: { id: +id },
  });
  return category;
};

export const getCategory = async (id: string) => {
  const category: Prisma.category | null = await prisma.category.findUnique({
    where: { id: +id },
  });
  return category;
};

export const getCategoriesForUser = async (userId: string) => {
  const categories: Prisma.category[] = await prisma.category.findMany({
    where: { user_id: +userId },
  });
  return categories;
};

export const getCategoriesForUserWithMethods = async (userId: string) => {
  const categories: Prisma.category[] = await prisma.category.findMany({
    where: { user_id: +userId },
    include: { methods: true },
  });
  return categories;
};
