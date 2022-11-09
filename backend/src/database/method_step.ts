import Prisma from "@prisma/client";
import prisma from "./client";

export const createMethodStep = async (input: Prisma.method_step) => {
  await prisma.method_step.create({
    data: {
      description: input.description,
      temperatur: input.temperatur,
      duration: input.duration,
      link: input.link,
      method_id: input.method_id,
    },
  });
};

export const updateMethodStep = async (
  id: string,
  input: Prisma.method_step
): Promise<void> => {
  const updatedUser = await prisma.method_step.update({
    where: { id: +id },
    data: {
      description: input.description,
      temperatur: input.temperatur,
      duration: input.duration,
      link: input.link,
      method_id: input.method_id,
    },
  });
};

export const deleteMethodStep = async (id: string): Promise<void> => {
  await prisma.method_step.delete({ where: { id: +id } });
};

export const getMethodStep = async (id: string) => {
  const method_step = await prisma.method_step.findUnique({
    where: { id: +id },
  });
  return method_step;
};
