import { getPrisma } from "../utils/prismaDynamic";

export const createEndereco = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoMembro.create({ data });
};

export const listEnderecos = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoMembro.findMany({
    include: {
      member: true
    }
  });
};

export const getEndereco = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoMembro.findUnique({
    where: { id },
    include: {
      member: true
    }
  });
};

export const updateEndereco = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoMembro.update({
    where: { id },
    data
  });
};

export const deleteEndereco = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoMembro.delete({
    where: { id }
  });
};