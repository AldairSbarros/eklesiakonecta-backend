import { getPrisma } from "../utils/prismaDynamic";

export const createPermissao = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.permissao.create({ data });
};

export const listPermissoes = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.permissao.findMany({
    include: {
      usuarios: true
    }
  });
};

export const getPermissao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.permissao.findUnique({
    where: { id },
    include: {
      usuarios: true
    }
  });
};

export const updatePermissao = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.permissao.update({
    where: { id },
    data
  });
};

export const deletePermissao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.permissao.delete({
    where: { id }
  });
};