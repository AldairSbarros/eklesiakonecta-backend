import { PrismaClient } from '@prisma/client';

// Cache de conexões para evitar múltiplas instâncias
const prismaCache: { [key: string]: PrismaClient } = {};

export function getPrisma(schema: string) {
  // Se já existe no cache, retorna
  if (prismaCache[schema]) {
    return prismaCache[schema];
  }

  let dbUrl: string;

  if (schema === 'public') {
    // Para schema public, usar URL padrão sem modificação
    dbUrl = process.env.DATABASE_URL!;
  } else {
    // Para outros schemas, modificar a URL
    dbUrl = process.env.DATABASE_URL!.replace(/schema=([a-zA-Z0-9_]+)/, `schema=${schema}`);
  }

  // Criar nova instância
  const prisma = new PrismaClient({
    datasources: {
      db: { url: dbUrl }
    }
  });

  // Adicionar ao cache
  prismaCache[schema] = prisma;

  return prisma;
}

// Função para limpar cache (útil para testes)
export function clearPrismaCache() {
  Object.values(prismaCache).forEach(prisma => {
    prisma.$disconnect();
  });
  Object.keys(prismaCache).forEach(key => {
    delete prismaCache[key];
  });
}

// Função específica para acessar tabelas do schema public
export function getPrismaPublic() {
  return getPrisma('public');
}