import { getPrisma } from "../utils/prismaDynamic";

export const createVenda = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.venda.create({ data });
};

export const listVendas = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.venda.findMany({
    include: {
      Church: true,
      upgradeDe: true,
      upgrades: true,
      faturas: true
    }
  });
};

export const getVenda = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.venda.findUnique({
    where: { id },
    include: {
      Church: true,
      upgradeDe: true,
      upgrades: true,
      faturas: true
    }
  });
};

export const updateVenda = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.venda.update({
    where: { id },
    data
  });
};

export const deleteVenda = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.venda.delete({
    where: { id }
  });
};