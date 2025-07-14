import { PrismaClient } from "@prisma/client";

export function getPrismaClient(igrejaId: string) {
  const dbUrl = `postgresql://user:senha@host:5432/igreja_${igrejaId}`;
  return new PrismaClient({ datasources: { db: { url: dbUrl } } });
}