import { getPrisma } from "../utils/prismaDynamic";

export const createMinisterioLocal = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.ministerioLocal.create({ data });
};

export const listMinisteriosLocais = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.ministerioLocal.findMany({
    include: {
      Congregacao: true,
      membros: true
    }
  });
};

export const getMinisterioLocal = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.ministerioLocal.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      membros: true
    }
  });
};

export const updateMinisterioLocal = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.ministerioLocal.update({
    where: { id },
    data
  });
};

export const deleteMinisterioLocal = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.ministerioLocal.delete({
    where: { id }
  });
};