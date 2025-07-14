import { getPrisma } from "../utils/prismaDynamic";

export const createNotificacao = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.notificacao.create({ data });
};

export const listNotificacoes = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.notificacao.findMany({
    include: {
      Usuario: true
    }
  });
};

export const getNotificacao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.notificacao.findUnique({
    where: { id },
    include: {
      Usuario: true
    }
  });
};

export const updateNotificacao = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.notificacao.update({
    where: { id },
    data
  });
};

export const deleteNotificacao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.notificacao.delete({
    where: { id }
  });
};