import { getPrismaForSchema } from '../config/prismaDynamic';

// Quantidade de discipulandos por discipulador
export const countDiscipulandosPorDiscipulador = async (schema: string) => {
  return getPrismaForSchema(schema).member.groupBy({
    by: ['discipuladorId'],
    _count: { id: true },
    where: { discipuladorId: { not: null } },
  });
};

// Discipulandos sem encontro nos últimos X dias
export const discipulandosSemEncontro = async (schema: string, dias: number) => {
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - dias);

  return getPrismaForSchema(schema).member.findMany({
    where: {
      discipuladorId: { not: null },
      encontrosComoDiscipulando: {
        none: { data: { gte: dataLimite } }
      }
    },
    include: { discipulador: true }
  });
};