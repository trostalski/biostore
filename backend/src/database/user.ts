import Prisma from "@prisma/client";
import prisma from "./client";

export const createUser = async (input: Prisma.user): Promise<Prisma.user> => {
  const userCount = await prisma.user.count({
    where: { username: input.username },
  });

  if (userCount) {
    throw new Error("Username already taken.");
  } else {
    const user: Prisma.user = await prisma.user.create({
      data: {
        first_name: input.first_name,
        last_name: input.last_name,
        username: input.username,
        password: input.password,
        expertise: input.expertise,
      },
    });
    return user;
  }
};

export const updateUser = async (
  id: string,
  input: Prisma.user
): Promise<Prisma.user> => {
  const updatedUser: Prisma.user = await prisma.user.update({
    where: { id: +id },
    data: {
      first_name: input.first_name,
      last_name: input.last_name,
      expertise: input.expertise,
    },
  });
  return updatedUser;
};

export const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({ where: { id: +id } });
};

export const getUser = async (id: string): Promise<Prisma.user | null> => {
  const user: Prisma.user | null = await prisma.user.findUnique({
    where: { id: +id },
  });
  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<Prisma.user | null> => {
  const user: Prisma.user | null = await prisma.user.findUnique({
    where: { username: username },
  });
  return user;
};

export const getMethodsForUser = async (id: string) => {
  const methods = await prisma.method.findMany({ where: { creator_id: +id } });
  return methods;
};
