import { getPrisma } from "../utils/prismaDynamic";

export const criarMensagem = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.mensagemCelula.create({ data });
};

export const listarMensagens = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.mensagemCelula.findMany({
    orderBy: { data: 'desc' }
  });
};

export const obterMensagem = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.mensagemCelula.findUnique({
    where: { id }
  });
};

export const atualizarMensagem = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.mensagemCelula.update({
    where: { id },
    data
  });
};

export const removerMensagem = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.mensagemCelula.delete({
    where: { id }
  });
};