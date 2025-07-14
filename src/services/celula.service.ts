import { getPrisma } from "../utils/prismaDynamic";

export const createCelula = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.celula.create({ data });
};

export const listCelulas = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.celula.findMany({
    include: {
      Congregacao: true,
      lider: true,
      anfitriao: true,
      membros: true,
      reunioes: true
    }
  });
};

export const getCelula = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.celula.findUnique({
    where: { id },
    include: {
      Congregacao: true,
      lider: true,
      anfitriao: true,
      membros: true,
      reunioes: true
    }
  });
};

export const updateCelula = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.celula.update({
    where: { id },
    data
  });
};

export const deleteCelula = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.celula.delete({
    where: { id }
  });
};

// Buscar membros da célula
export const listarMembrosCelula = async (schema: string, celulaId: number) => {
  const prisma = getPrisma(schema);
  return prisma.member.findMany({ where: { celulaId } });
};

// Associar membro à célula
export const addMembroCelula = async (schema: string, celulaId: number, membroId: number) => {
  const prisma = getPrisma(schema);
  return prisma.member.update({
    where: { id: membroId },
    data: { celulaId }
  });
};

// Remover membro da célula
export const removeMembroCelula = async (schema: string, membroId: number) => {
  const prisma = getPrisma(schema);
  return prisma.member.update({
    where: { id: membroId },
    data: { celulaId: null }
  });
};