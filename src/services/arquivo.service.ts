import { getPrisma } from "../utils/prismaDynamic";

export const createArquivo = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.arquivo.create({ data });
};

export const listArquivos = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.arquivo.findMany({
    include: {
      Usuario: true
    }
  });
};

export const getArquivo = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.arquivo.findUnique({
    where: { id },
    include: {
      Usuario: true
    }
  });
};

export const updateArquivo = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.arquivo.update({
    where: { id },
    data
  });
};

export const deleteArquivo = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.arquivo.delete({
    where: { id }
  });
};