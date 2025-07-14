import { getPrisma } from "../utils/prismaDynamic";

// 1. Lista de membros da célula
export const membrosDaCelula = async (schema: string, celulaId: number) => {
  const prisma = getPrisma(schema);
  return prisma.member.findMany({
    where: { celulaId }
  });
};

// 2. Presenças por reunião
export const presencasPorReuniao = async (schema: string, celulaId: number) => {
  const prisma = getPrisma(schema);
  return prisma.reuniaoCelula.findMany({
    where: { celulaId },
    include: {
      presencas: { include: { Member: true } }
    }
  });
};

// 3. Média de presença dos membros no mês
export const mediaPresencaNoMes = async (schema: string, celulaId: number, mes: number, ano: number) => {
  const prisma = getPrisma(schema);
  const reunioes = await prisma.reuniaoCelula.findMany({
    where: {
      celulaId,
      data: {
        gte: new Date(ano, mes - 1, 1),
        lt: new Date(ano, mes, 1)
      }
    },
    include: {
      presencas: true
    }
  });
  const totalReunioes = reunioes.length;
  if (totalReunioes === 0) return 0;
  const totalPresencas = reunioes.reduce((acc, r) => acc + r.presencas.filter(p => p.presente).length, 0);
  const totalMembros = await prisma.member.count({ where: { celulaId } });
  if (totalMembros === 0) return 0;
  return totalPresencas / (totalReunioes * totalMembros);
};

// 4. Ranking dos mais presentes/faltosos no mês
export const rankingPresenca = async (schema: string, celulaId: number, mes: number, ano: number) => {
  const prisma = getPrisma(schema);
  const reunioes = await prisma.reuniaoCelula.findMany({
    where: {
      celulaId,
      data: {
        gte: new Date(ano, mes - 1, 1),
        lt: new Date(ano, mes, 1)
      }
    },
    include: { presencas: true }
  });
  const presencasPorMembro: Record<number, { presentes: number; faltas: number }> = {};
  reunioes.forEach(r => {
    r.presencas.forEach(p => {
      if (!presencasPorMembro[p.membroId]) presencasPorMembro[p.membroId] = { presentes: 0, faltas: 0 };
      if (p.presente) presencasPorMembro[p.membroId].presentes++;
      else presencasPorMembro[p.membroId].faltas++;
    });
  });
  return presencasPorMembro;
};

// 5. Aniversariantes do mês
export const aniversariantesDoMes = async (schema: string, celulaId: number, mes: number) => {
  const prisma = getPrisma(schema);
  const membros = await prisma.member.findMany({
    where: { celulaId },
    select: {
      id: true,
      nome: true,
      telefone: true,
      email: true,
      senha: true,
      congregacaoId: true,
      dataNascimento: true
    }
  });

  return membros.filter(m => {
    const dataNascimento = m.dataNascimento;
    if (!dataNascimento) return false;
    const data = new Date(dataNascimento);
    return data.getMonth() + 1 === mes;
  });
};