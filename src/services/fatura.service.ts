import { getPrisma } from "../utils/prismaDynamic";

export type Fatura = {
  id: number;
  valor: number;
  descricao: string;
};

export const createFatura = async (
  schema: string,
  data: { valor: number; descricao: string; status: string; Venda: any }
) => {
  const prisma = getPrisma(schema);
  return prisma.fatura.create({ data });
};

export const listFaturas = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.fatura.findMany();
};

export const getFatura = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.fatura.findUnique({ where: { id } });
};

export const updateFatura = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.fatura.update({
    where: { id },
    data
  });
};

export const deleteFatura = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.fatura.delete({
    where: { id }
  });
};