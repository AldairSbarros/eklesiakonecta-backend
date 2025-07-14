import { getPrisma } from "../utils/prismaDynamic";

export async function registrarLog(
  schema: string,
  {
    usuarioId,
    acao,
    detalhes,
    ip
  }: {
    usuarioId?: number;
    acao: string;
    detalhes?: string;
    ip?: string;
  }
) {
  const prisma = getPrisma(schema);
  await prisma.logAcesso.create({
    data: { usuarioId, acao, detalhes, ip }
  });
}