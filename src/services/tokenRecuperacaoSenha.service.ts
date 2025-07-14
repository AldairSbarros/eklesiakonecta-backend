import { getPrisma } from "../utils/prismaDynamic";

export const criarToken = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.tokenRecuperacaoSenha.create({ data });
};

export const obterToken = async (schema: string, token: string) => {
  const prisma = getPrisma(schema);
  return prisma.tokenRecuperacaoSenha.findUnique({
    where: { token }
  });
};

export const removerToken = async (schema: string, token: string) => {
  const prisma = getPrisma(schema);
  return prisma.tokenRecuperacaoSenha.delete({
    where: { token }
  });
};

export const atualizarToken = async (schema: string, token: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.tokenRecuperacaoSenha.update({
    where: { token },
    data
  });
};