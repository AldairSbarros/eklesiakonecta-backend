import { getPrisma } from "../utils/prismaDynamic";

export const createLicao = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresLicao.create({ data });
};

export const listLicoes = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresLicao.findMany({
    include: {
      EscolaLideresEtapa: true
    }
  });
};

export const getLicao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresLicao.findUnique({
    where: { id },
    include: {
      EscolaLideresEtapa: true
    }
  });
};

export const updateLicao = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresLicao.update({
    where: { id },
    data
  });
};

export const deleteLicao = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.escolaLideresLicao.delete({
    where: { id }
  });
};

export default {
  createLicao,
  listLicoes,
  getLicao,
  updateLicao,
  deleteLicao
};