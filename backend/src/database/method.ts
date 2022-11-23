import Prisma from "@prisma/client";
import prisma from "./client";

export const createMethod = async (input: Prisma.method) => {
  const method: Prisma.method = await prisma.method.create({
    data: {
      name: input.name,
      duration: input.duration,
      description: input.description,
      sections: input.sections,
      number_of_samples: +input.number_of_samples!,
      creator_id: input.creator_id,
      category_id: +input.category_id!,
    },
  });
  return method;
};

export const createNewMethod = async (input: Prisma.method) => {
  // construct new date to generate a unique name for the new method
  console.log(input)
  const method: Prisma.method = await prisma.method.create({
    data: {
      name: "",
      creator: { connect: { id: +input.creator_id } },
      category: {
        connectOrCreate: {
          where: { id: +input.category_id! },
          create: { name: "All Methods", user_id: input.creator_id! },
        },
      },
    },
  });
  return method;
};

export const updateMethod = async (
  id: string,
  input: Prisma.method
): Promise<Prisma.method> => {
  console.log(JSON.stringify(input));
  const updatedMethod = await prisma.method.update({
    where: { id: +id },
    data: {
      name: input.name,
      duration: input.duration,
      description: input.description,
      sections: input.sections,
      number_of_samples: +input.number_of_samples!,
      category_id: +input.category_id!,
    },
  });
  return updatedMethod;
};

export const deleteMethod = async (id: string): Promise<void> => {
  await prisma.method.delete({ where: { id: +id } });
};

export const deleteUnnamedMethods = async () => {
  await prisma.method.deleteMany({ where: { name: "" } });
};

export const getMethod = async (id: string) => {
  const method = await prisma.method.findUnique({ where: { id: +id } });
  return method;
};

export const getAllMethods = async () => {
  const methods: Prisma.method[] = await prisma.method.findMany();
  return methods;
};

export const connectReagentToMethod = async (methodId: string, input: any) => {
  const res: any = await prisma.reagents_on_methods.create({
    data: { method_id: +methodId, reagent_id: input.reagent_id },
  });
  return res;
};

export const connectDeviceToMethod = async (methodId: string, input: any) => {
  const res: any = await prisma.devices_on_methods.create({
    data: { method_id: +methodId, device_id: input.device_id },
  });
  return res;
};

export const connectReagentsToMethods = async (input: any) => {
  //input should be of format [{method_id: method_id, reagent_id: reagent_id}]
  const res: any = await prisma.reagents_on_methods.createMany({
    data: input,
  });
  return res;
};

export const connectDevicesToMethods = async (input: any) => {
  //input should be of format [{method_id: method_id, reagent_id: reagent_id}]
  const res: any = await prisma.devices_on_methods.createMany({
    data: input,
  });
  return res;
};

export const deleteReagentOnMethod = async (methodId: string, input: any) => {
  const res = await prisma.reagents_on_methods.delete({
    where: {
      reagent_id_method_id: { method_id: +methodId, reagent_id: input.id },
    },
  });
  return res;
};

export const deleteDeviceOnMethod = async (methodId: string, input: any) => {
  const res = await prisma.devices_on_methods.delete({
    where: {
      device_id_method_id: { method_id: +methodId, device_id: input.id },
    },
  });
  return res;
};
