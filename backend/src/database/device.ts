import Prisma from "@prisma/client";
import prisma from "./client";

export const createDevice = async (
  input: Prisma.device & Prisma.devices_on_methods
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

  if (input.method_id) {
    await prisma.devices_on_methods.create({
      data: {
        method_id: input.method_id,
        device_id: device.id,
      },
    });
  }
  return device;
};

export const updateDevice = async (
  deviceId: string,
  input: Prisma.device & Prisma.devices_on_methods
): Promise<Prisma.device> => {
  const updatedDevice: Prisma.device = await prisma.device.update({
    where: { id: +deviceId },
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
    include: { methods: true },
  });
  return Devices;
};

export const getAllDevices = async (): Promise<Prisma.device[]> => {
  const devices: Prisma.device[] = await prisma.device.findMany();
  return devices;
};

export const getDevicesForMethod = async (
  methodId: string
): Promise<Prisma.device[] | false> => {
  const devices: any = await prisma.devices_on_methods.findMany({
    where: { method_id: +methodId },
    select: { device: true },
  });
  return devices;
};
