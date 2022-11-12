import Prisma from "@prisma/client";
import prisma from "./client";

export const createReagent = async (
  input: Prisma.reagent
): Promise<Prisma.reagent> => {
  const reagent: Prisma.reagent = await prisma.reagent.create({
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
    },
  });
  return reagent;
};

export const updateReagent = async (
  id: string,
  input: Prisma.reagent
): Promise<Prisma.reagent> => {
  const updatedReagent: Prisma.reagent = await prisma.reagent.update({
    where: { id: +id },
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
    },
  });
  return updatedReagent;
};

export const deleteReagent = async (id: string): Promise<void> => {
  await prisma.reagent.delete({ where: { id: +id } });
};

export const getReagent = async (
  id: string
): Promise<Prisma.reagent | null> => {
  const reagent: Prisma.reagent | null = await prisma.reagent.findUnique({
    where: { id: +id },
  });
  return reagent;
};

export const getReagentsForUser = async (
  userId: string
): Promise<Prisma.reagent[]> => {
  const reagents: Prisma.reagent[] = await prisma.reagent.findMany({
    where: { user_id: +userId },
  });
  return reagents;
};