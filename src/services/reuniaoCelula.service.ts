import { getPrisma } from "../utils/prismaDynamic";

export const createReuniao = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.reuniaoCelula.create({ data });
};

export const listReunioes = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.reuniaoCelula.findMany({
    include: {
      Celula: true,
      presencas: true,
      visitantes: true
    }
  });
};

export const getReuniao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.reuniaoCelula.findUnique({
    where: { id },
    include: {
      Celula: true,
      presencas: true,
      visitantes: true
    }
  });
};

export const updateReuniao = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.reuniaoCelula.update({
    where: { id },
    data
  });
};

export const deleteReuniao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.reuniaoCelula.delete({
    where: { id }
  });
};