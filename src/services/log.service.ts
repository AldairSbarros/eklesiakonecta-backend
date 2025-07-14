import { getPrisma } from "../utils/prismaDynamic";

export const createLog = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.log.create({ data });
};

export const listLogs = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.log.findMany();
};

export const getLog = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.log.findUnique({
    where: { id }
  });
};

export const updateLog = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.log.update({
    where: { id },
    data
  });
};

export const deleteLog = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.log.delete({
    where: { id }
  });
};