import { PrismaClient } from "@prisma/client";

export function getPrismaClient(igrejaId: string) {
  // Corrigido para usar a porta 5433
  const dbUrl = `postgresql://user:senha@host:5433/igreja_${igrejaId}`;
  return new PrismaClient({ datasources: { db: { url: dbUrl } } });
}