import Prisma from "@prisma/client";
import prisma from "./client";

export const createMethodStep = async (input: Prisma.method_step) => {
  await prisma.method_step.create({
    data: {
      number: +input.number,
      day: input.day,
      time: input.time,
      temperature: input.temperature,
      duration: input.duration,
      description: input.description,
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
      number: +input.number,
      day: input.day,
      time: input.time,
      temperature: input.temperature,
      duration: input.duration,
      description: input.description,
      method_id: input.method_id,
    },
  });
};

export const deleteMethodStep = async (id: string): Promise<void> => {
  await prisma.method_step.delete({ where: { id: +id } });
};

export const getMethodStep = async (id: string) => {
  const methodStep = await prisma.method_step.findUnique({
    where: { id: +id },
  });
  return methodStep;
};

export const getStepsForMethod = async (methodId: string) => {
  const methodSteps = await prisma.method_step.findMany({
    where: { method_id: +methodId },
  });
  return methodSteps;
};
