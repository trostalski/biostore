import Prisma from "@prisma/client";
import prisma from "./client";

export const createSample = async (input: Prisma.method_sample) => {
  const sample = await prisma.method_sample.create({
    data: {
      reference_number: input.reference_number,
      name: input.name,
      method_id: input.method_id,
      conditions: input.conditions!,
    },
  });
  return sample;
};

export const updateSample = async (
  id: string,
  input: Prisma.method_sample
): Promise<void> => {
  const updatedUser = await prisma.method_sample.update({
    where: { id: +id },
    data: {
      method_id: input.method_id,
      conditions: input.conditions!,
    },
  });
};

export const deleteSample = async (id: string): Promise<void> => {
  await prisma.method_sample.delete({ where: { id: +id } });
};

export const getSamplesForMethod = async (id: string) => {
  const samples = await prisma.method_sample.findMany({
    where: { method_id: +id },
  });
  return samples;
};
