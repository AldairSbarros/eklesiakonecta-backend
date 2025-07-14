import { getPrisma } from "../utils/prismaDynamic";

export const createEncontro = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.encontro.create({ data });
};

export const listEncontros = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.encontro.findMany({
    include: {
      Congregacao: true,
      participantes: true
    }
  });
};

export const getEncontro = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.encontro.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      participantes: true
    }
  });
};

export const updateEncontro = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.encontro.update({
    where: { id },
    data
  });
};

export const deleteEncontro = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.encontro.delete({
    where: { id }
  });
};