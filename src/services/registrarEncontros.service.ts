import { getPrismaForSchema } from '../config/prismaDynamic';

export const registrarEncontro = async (schema: string, data: any) => {
  return getPrismaForSchema(schema).encontros.create({ data });
};

export const listarEncontros = async (schema: string, filtro: any) => {
  return getPrismaForSchema(schema).encontros.findMany({ where: filtro });
};