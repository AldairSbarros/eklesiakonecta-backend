import { getPrisma } from "../utils/prismaDynamic";

export const createTurma = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresTurma.create({ data });
};

export const listTurmas = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresTurma.findMany({
    include: {
      Congregacao: true,
      alunos: true,
      etapas: true
    }
  });
};

export const getTurma = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresTurma.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      alunos: true,
      etapas: true
    }
  });
};

export const updateTurma = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresTurma.update({
    where: { id },
    data
  });
};

export const deleteTurma = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresTurma.delete({
    where: { id }
  });
};