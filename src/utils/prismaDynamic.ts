import { PrismaClient } from '@prisma/client';

export function getPrisma(schema: string) {
  const dbUrl = process.env.DATABASE_URL!.replace(/schema=([a-zA-Z0-9_]+)/, `schema=${schema}`);
  return new PrismaClient({
    datasources: {
      db: { url: dbUrl }
    }
  });
}