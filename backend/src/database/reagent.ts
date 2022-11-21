import Prisma from "@prisma/client";
import prisma from "./client";

export const createReagent = async (
  input: Prisma.reagent & Prisma.reagents_on_methods
): Promise<Prisma.reagent> => {
  const reagent: Prisma.reagent = await prisma.reagent.create({
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
      user_id: input.user_id,
      link: input.link,
      type: input.type,
    },
  });

  if (input.method_id) {
    await prisma.reagents_on_methods.create({
      data: {
        method_id: input.method_id,
        reagent_id: reagent.id,
        amount: input.amount,
      },
    });
  }
  return reagent;
};

export const updateReagent = async (
  reagentId: string,
  input: Prisma.reagent & Prisma.reagents_on_methods,
  methodId?: string
): Promise<Prisma.reagent> => {
  const updatedReagent: Prisma.reagent = await prisma.reagent.update({
    where: { id: +reagentId },
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
      user_id: input.user_id,
      link: input.link,
      type: input.type,
    },
  });
  if (input.amount && input.method_id) {
    prisma.reagents_on_methods.update({
      where: {
        reagent_id_method_id: { method_id: +methodId!, reagent_id: +reagentId },
      },
      data: { amount: input.amount },
    });
  }
  return updatedReagent;
};

export const deleteReagent = async (id: string) => {
  const reagent = await prisma.reagent.delete({ where: { id: +id } });
  return reagent;
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
): Promise<Prisma.reagent[] | false> => {
  const reagents: Prisma.reagent[] = await prisma.reagent.findMany({
    where: { user_id: +userId },
    include: { methods: true },
  });
  return reagents;
};

export const getAllReagents = async (): Promise<Prisma.reagent[]> => {
  const reagents: Prisma.reagent[] = await prisma.reagent.findMany();
  return reagents;
};

export const getReagentsForMethod = async (
  methodId: string
): Promise<Prisma.reagent[] | false> => {
  const reagents: any = await prisma.reagents_on_methods.findMany({
    where: { method_id: +methodId },
    select: { reagent: true, amount: true },
  });
  return reagents;
};
