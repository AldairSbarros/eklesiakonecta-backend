import { getPrisma } from "../utils/prismaDynamic";

export const createPastor = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.pastor.create({ data });
};

export const listPastores = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.pastor.findMany({
    include: {
      churchPrincipal: true,
      congregacoes: true
    }
  });
};

export const getPastor = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.pastor.findUnique({
    where: { id },
    include: {
      churchPrincipal: true,
      congregacoes: true
    }
  });
};

export const updatePastor = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.pastor.update({
    where: { id },
    data
  });
};

export const deletePastor = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.pastor.delete({
    where: { id }
  });
};