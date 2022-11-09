import Prisma from "@prisma/client";
import prisma from "./client";

export const createMethod = async (input: Prisma.method) => {
  const method: Prisma.method = await prisma.method.create({
    data: {
      name: input.name,
      duration: input.duration,
      description: input.description,
      sections: input.sections,
      comments: input.comments,
      number_of_samples: input.number_of_samples,
      creator_id: input.creator_id,
      category_id: input.category_id,
    },
  });
  return method;
};

export const updateMethod = async (
  id: string,
  input: Prisma.method
): Promise<void> => {
  const updatedUser = await prisma.method.update({
    where: { id: +id },
    data: {
      name: input.name,
      duration: input.duration,
      description: input.description,
      sections: input.sections,
      comments: input.comments,
      number_of_samples: input.number_of_samples,
      creator_id: input.creator_id,
      category_id: input.category_id,
    },
  });
};

export const deleteMethod = async (id: string): Promise<void> => {
  await prisma.method.delete({ where: { id: +id } });
};

export const getMethod = async (id: string) => {
  const method = await prisma.method.findUnique({ where: { id: +id } });
  return method;
};
