import { getPrisma } from "../utils/prismaDynamic";

export const criarUsuario = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.usuario.create({ data });
};

export const listarDizimosPorCongregacao = async (schema: string, congregacaoId?: number) => {
  const prisma = getPrisma(schema);
  // Se congregacaoId não for informado, retorna todos (admin)
  if (!congregacaoId) {
    return prisma.offering.findMany();
  }
  // Se informado, retorna só daquela congregação
  return prisma.offering.findMany({
    where: { congregacaoId }
  });
};

export const obterUsuario = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.usuario.findUnique({
    where: { id }
  });
};

export const atualizarUsuario = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.usuario.update({
    where: { id },
    data
  });
};

export const removerUsuario = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.usuario.delete({
    where: { id }
  });
};