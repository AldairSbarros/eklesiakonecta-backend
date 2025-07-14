import { getPrisma } from "../utils/prismaDynamic";

export const createMinisterio = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.ministerio.create({ data });
};

export const listMinisterios = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.ministerio.findMany({
    include: {
      Congregacao: true,
      Lider: true,
      membros: true
    }
  });
};

export const getMinisterio = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.ministerio.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      Lider: true,
      membros: true
    }
  });
};

export const updateMinisterio = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.ministerio.update({
    where: { id },
    data
  });
};

export const deleteMinisterio = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.ministerio.delete({
    where: { id }
  });
};