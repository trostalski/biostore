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

export const createNewMethod = async (input: Prisma.method) => {
  // construct new date to generate a unique name for the new method
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();

  const today = mm + "/" + dd + "/" + yyyy;

  const method: Prisma.method = await prisma.method.create({
    data: {
      name: `Untitled Method ${today}`,
      category: {
        connectOrCreate: {
          where: { name: "Untitled Methods" },
          create: { name: "Untitled Methods", user_id: input.creator_id! },
        },
      },
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
