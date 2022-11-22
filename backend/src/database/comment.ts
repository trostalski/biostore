import Prisma from "@prisma/client";
import prisma from "./client";

export const createComment = async (input: Prisma.comment) => {
  const comment: Prisma.comment = await prisma.comment.create({
    data: {
      content: input.content,
      y_position: +input.y_position,
      x_position: input.x_position,
      method_id: +input.method_id,
      is_important: input.is_important,
    },
  });
  return comment;
};

export const updateComment = async (
  id: string,
  input: Prisma.comment
): Promise<Prisma.comment> => {
  const updatedComment = await prisma.comment.update({
    where: { id: +id },
    data: {
      content: input.content,
      is_important: input.is_important,
    },
  });
  return updatedComment;
};

export const deleteComment = async (id: string) => {
  const comment: Prisma.comment = await prisma.comment.delete({
    where: { id: +id },
  });
  return comment;
};

export const getComment = async (id: string) => {
  const comment: Prisma.comment | null = await prisma.comment.findUnique({
    where: { id: +id },
  });
  return comment;
};

export const getCommentsForMethod = async (methodId: string) => {
  const comments: Prisma.comment[] = await prisma.comment.findMany({
    where: { method_id: +methodId },
  });
  return comments;
};
