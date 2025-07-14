import { getPrisma } from "../utils/prismaDynamic";

export const createEnderecoIgreja = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoIgreja.create({ data });
};

export const listEnderecosIgreja = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoIgreja.findMany({
    include: {
      igrejas: true
    }
  });
};

export const getEnderecoIgreja = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoIgreja.findUnique({
    where: { id },
    include: {
      igrejas: true
    }
  });
};

export const updateEnderecoIgreja = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoIgreja.update({
    where: { id },
    data
  });
};

export const deleteEnderecoIgreja = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.enderecoIgreja.delete({
    where: { id }
  });
};