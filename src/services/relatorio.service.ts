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

export async function gerarRelatorioMensalHTML(clienteId: number, mes: number, ano: number): Promise<string> {
  // Aqui você pode buscar os dados no banco e montar o HTML do relatório
  // Exemplo mock:
  return `<h1>Relatório Mensal</h1><p>Cliente: ${clienteId}, Mês: ${mes}, Ano: ${ano}</p>`;
}

