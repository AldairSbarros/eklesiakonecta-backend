import { getPrisma } from "../utils/prismaDynamic";

export const createSermao = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.sermao.create({ data });
};

export const listSermaos = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.sermao.findMany();
};

export const getSermao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.sermao.findUnique({
    where: { id }
  });
};

export const updateSermao = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.sermao.update({
    where: { id },
    data
  });
};

export const deleteSermao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.sermao.delete({
    where: { id }
  });
};