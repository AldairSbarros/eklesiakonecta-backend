import { getPrisma } from "../utils/prismaDynamic";

export const criarInvestimento = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.investimento.create({ data });
};

export const listarInvestimentos = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.investimento.findMany({
    orderBy: { data: 'desc' }
  });
};

export const atualizarInvestimento = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.investimento.update({
    where: { id },
    data
  });
};

export const removerInvestimento = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.investimento.delete({
    where: { id }
  });
};

export const obterInvestimento = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.investimento.findUnique({
    where: { id }
  });
};