import { getPrisma } from "../utils/prismaDynamic";

export const createVisitante = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.visitanteCelula.create({ data });
};

export const listVisitantes = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.visitanteCelula.findMany({
    include: {
      ReuniaoCelula: true
    }
  });
};

export const getVisitante = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.visitanteCelula.findUnique({
    where: { id },
    include: {
      ReuniaoCelula: true
    }
  });
};

export const updateVisitante = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.visitanteCelula.update({
    where: { id },
    data
  });
};

export const deleteVisitante = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.visitanteCelula.delete({
    where: { id }
  });
};