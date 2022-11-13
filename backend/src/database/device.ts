import Prisma from "@prisma/client";
import prisma from "./client";

export const createDevice = async (
  input: Prisma.device
): Promise<Prisma.device> => {
  const device: Prisma.device = await prisma.device.create({
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
      user_id: input.user_id,
      link: input.link,
      type: input.type,
    },
  });
  return device;
};

export const updateDevice = async (
  id: string,
  input: Prisma.device
): Promise<Prisma.device> => {
  const updatedDevice: Prisma.device = await prisma.device.update({
    where: { id: +id },
    data: {
      name: input.name,
      company: input.company,
      product_id: input.product_id,
      user_id: input.user_id,
      link: input.link,
      type: input.type,
    },
  });
  return updatedDevice;
};

export const deleteDevice = async (id: string) => {
  const device = await prisma.device.delete({ where: { id: +id } });
  return device;
};

export const getDevice = async (id: string): Promise<Prisma.device | null> => {
  const device: Prisma.device | null = await prisma.device.findUnique({
    where: { id: +id },
  });
  return device;
};

export const getDevicesForUser = async (
  userId: string
): Promise<Prisma.device[] | false> => {
  const Devices: Prisma.device[] = await prisma.device.findMany({
    where: { user_id: +userId },
  });
  return Devices;
};
