import { getPrisma } from "../utils/prismaDynamic";

export const criarReceita = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.receita.create({ data });
};

export const listarReceitas = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.receita.findMany({
    orderBy: { data: 'desc' }
  });
};

export const obterReceita = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.receita.findUnique({
    where: { id }
  });
};

export const atualizarReceita = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.receita.update({
    where: { id },
    data
  });
};

export const removerReceita = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.receita.delete({
    where: { id }
  });
};