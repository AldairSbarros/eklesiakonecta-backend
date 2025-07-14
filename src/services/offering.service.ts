import { getPrisma } from "../utils/prismaDynamic";

export const createOffering = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.offering.create({ data });
};

export const listOfferings = async (schema: string, where: any = {}) => {
  const prisma = getPrisma(schema);
  return prisma.offering.findMany({
    where,
    include: { Member: true, Congregacao: true }
  });
};

export const updateOffering = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.offering.update({
    where: { id },
    data
  });
};

export const removeOffering = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.offering.delete({
    where: { id }
  });
};

export const getOffering = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.offering.findUnique({
    where: { id },
    include: { Member: true, Congregacao: true }
  });
};

export const listReceipts = async (schema: string, where: any = {}) => {
  const prisma = getPrisma(schema);
  return prisma.offering.findMany({
    where,
    select: {
      id: true,
      memberId: true,
      value: true,
      date: true,
      service: true,
      receiptPhoto: true
    }
  });
};

export function findCongregacaoByNome(schema: string, congregacaoNome: any) {
  throw new Error('Function not implemented.');
}
export function findMemberByNome(schema: string, memberNome: any, id: any) {
  throw new Error('Function not implemented.');
}

