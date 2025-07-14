import { getPrisma } from "../utils/prismaDynamic";

export const createModulo = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresModulo.create({ data });
};

export const listModulos = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresModulo.findMany();
};

export const getModulo = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresModulo.findUnique({
    where: { id }
  });
};

export const updateModulo = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresModulo.update({
    where: { id },
    data
  });
};

export const deleteModulo = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresModulo.delete({
    where: { id }
  });
};