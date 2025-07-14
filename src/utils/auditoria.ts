// src/utils/auditoria.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function registrarAuditoria({
  acao,
  usuarioId,
  superuser = false,
  detalhes
}: {
  acao: string,
  usuarioId?: number,
  superuser?: boolean,
  detalhes?: any
}) {
  await prisma.auditoria.create({
    data: {
      acao,
      usuarioId,
      superuser,
      detalhes: detalhes ? JSON.stringify(detalhes) : null
    }
  });
}