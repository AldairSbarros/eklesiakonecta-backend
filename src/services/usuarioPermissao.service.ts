import { getPrisma } from "../utils/prismaDynamic";

export const createUsuarioPermissao = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.usuarioPermissao.create({ data });
};

export const listUsuarioPermissoes = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.usuarioPermissao.findMany({
    include: {
      Usuario: true,
      Permissao: true
    }
  });
};

export const getUsuarioPermissao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.usuarioPermissao.findUnique({
    where: { id },
    include: {
      Usuario: true,
      Permissao: true
    }
  });
};

export const updateUsuarioPermissao = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.usuarioPermissao.update({
    where: { id },
    data
  });
};

export const deleteUsuarioPermissao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.usuarioPermissao.delete({
    where: { id }
  });
};