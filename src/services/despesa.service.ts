import { getPrisma } from "../utils/prismaDynamic";

export const criarDespesa = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.despesa.create({ data });
};

export const listarDespesas = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.despesa.findMany({
    orderBy: { data: 'desc' },
  });
};

export const atualizarDespesa = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.despesa.update({
    where: { id },
    data,
  });
};

export const removerDespesa = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.despesa.delete({
    where: { id },
  });
};

export const obterDespesa = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.despesa.findUnique({
    where: { id },
  });
};