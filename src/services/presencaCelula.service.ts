import { getPrisma } from "../utils/prismaDynamic";

export const createPresenca = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.presencaCelula.create({ data });
};

export const listPresencas = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.presencaCelula.findMany({
    include: {
      Member: true,
      ReuniaoCelula: true
    }
  });
};

export const getPresenca = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.presencaCelula.findUnique({
    where: { id },
    include: {
      Member: true,
      ReuniaoCelula: true
    }
  });
};

export const updatePresenca = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.presencaCelula.update({
    where: { id },
    data
  });
};

export const deletePresenca = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.presencaCelula.delete({
    where: { id }
  });
};

export const listarPresencasPorReuniao = async (schema: string, reuniaoId: number) => {
  const prisma = getPrisma(schema);
  return prisma.presencaCelula.findMany({
    where: { reuniaoId },
    include: { Member: true }
  });
};

export const registrarOuAtualizarPresenca = async (schema: string, reuniaoId: number, membroId: number, presente: boolean) => {
  const prisma = getPrisma(schema);
  return prisma.presencaCelula.upsert({
    where: {
      presenca_unica: {
        reuniaoId,
        membroId
      }
    },
    update: { presente },
    create: { reuniaoId, membroId, presente }
  });
};

export default {
  createPresenca,
  listPresencas,
  getPresenca,
  updatePresenca,
  deletePresenca,
  listarPresencasPorReuniao,
  registrarOuAtualizarPresenca
};