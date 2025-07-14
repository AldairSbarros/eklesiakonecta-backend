import { getPrisma } from "../utils/prismaDynamic";

// Todas as funções agora recebem o schema como parâmetro

export const createCongregacao = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.congregacao.create({ data });
};

export const listCongregacoes = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.congregacao.findMany();
};

export const updateCongregacao = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.congregacao.update({
    where: { id },
    data,
  });
};

export const deleteCongregacao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.congregacao.delete({
    where: { id },
  });
};