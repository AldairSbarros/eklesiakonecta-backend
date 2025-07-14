import { PrismaClient } from '@prisma/client';

export function getPrismaForSchema(schema: string) {
  // Clona a variável de ambiente e troca o schema na connection string
  const url = process.env.DATABASE_URL?.replace('schema=public', `schema=${schema}`);
  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}

export async function buscarAniversariantesPorSchema(schema: string) {
  const prismaSchema = getPrismaForSchema(schema);
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;

  const aniversariantes = await prismaSchema.member.findMany({
    where: {
      dataNascimento: { not: null },
    },
  });

  // Filtra no JS
  return aniversariantes.filter((m) => {
    if (!m.dataNascimento) return false;
    const data = new Date(m.dataNascimento);
    return data.getDate() === dia && data.getMonth() + 1 === mes;
  });
}