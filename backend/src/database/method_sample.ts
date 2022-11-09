import Prisma from "@prisma/client";
import prisma from "./client";

export const createMethodSample = async (input: Prisma.method_sample) => {
  await prisma.method_sample.create({
    data: {
      condition_key: input.condition_key,
      condition_value: input.condition_value,
      method_id: input.method_id,
    },
  });
};

export const updateMethodSample = async (
  id: string,
  input: Prisma.method_sample
): Promise<void> => {
  const updatedUser = await prisma.method_sample.update({
    where: { id: +id },
    data: {
      condition_key: input.condition_key,
      condition_value: input.condition_value,
      method_id: input.method_id,
    },
  });
};

export const deleteMethodSample = async (id: string): Promise<void> => {
  await prisma.method_sample.delete({ where: { id: +id } });
};

export const getMethodSample = async (id: string) => {
  const method_sample = await prisma.method_sample.findUnique({
    where: { id: +id },
  });
  return method_sample;
};
