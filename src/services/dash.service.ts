import { getPrisma } from "../utils/prismaDynamic";

export const getResumoFinanceiro = async (
  schema: string,
  congregacaoId: string,
  ano: string,
  mes?: string
) => {
  const prisma = getPrisma(schema);
  const ids = String(congregacaoId).split(',').map(Number);

  let dataInicio: Date, dataFim: Date;
  if (mes) {
    dataInicio = new Date(Number(ano), Number(mes) - 1, 1);
    dataFim = new Date(Number(ano), Number(mes), 0, 23, 59, 59);
  } else {
    dataInicio = new Date(Number(ano), 0, 1);
    dataFim = new Date(Number(ano), 11, 31, 23, 59, 59);
  }

  let resumoPorCongregacao: any[] = [];
  let totalDizimosGeral = 0;
  let totalOfertasGeral = 0;

  for (const id of ids) {
    const congregacao = await prisma.congregacao.findUnique({
      where: { id },
      select: { nome: true }
    });

    const dizimos = await prisma.offering.findMany({
      where: {
        congregacaoId: id,
        type: 'dizimo',
        date: { gte: dataInicio, lte: dataFim }
      },
      include: {
        Member: { select: { nome: true } }
      }
    });

    const ofertas = await prisma.offering.findMany({
      where: {
        congregacaoId: id,
        type: 'oferta',
        date: { gte: dataInicio, lte: dataFim }
      },
      include: {
        Member: { select: { nome: true } }
      }
    });

    const dizimosDetalhados = dizimos.map(d => ({
      nomeDizimista: d.Member?.nome || 'Desconhecido',
      valor: d.value,
      data: d.date,
      congregacao: congregacao?.nome || 'Desconhecida'
    }));

    const ofertasDetalhadas = ofertas.map(o => ({
      nomeOfertante: o.Member?.nome || 'Desconhecido',
      valor: o.value,
      data: o.date,
      culto: o.service,
      congregacao: congregacao?.nome || 'Desconhecida'
    }));

    const somaDizimos = dizimos.reduce((acc, d) => acc + d.value, 0);
    const somaOfertas = ofertas.reduce((acc, o) => acc + o.value, 0);
    const total = somaDizimos + somaOfertas;
    const comissao = total * 0.33;
    const recolhimento = total * 0.67;

    totalDizimosGeral += somaDizimos;
    totalOfertasGeral += somaOfertas;

    resumoPorCongregacao.push({
      congregacaoId: id,
      congregacaoNome: congregacao?.nome || 'Desconhecida',
      periodo: mes ? `${mes.toString().padStart(2, '0')}/${ano}` : `${ano}`,
      dizimos: dizimosDetalhados,
      ofertas: ofertasDetalhadas,
      somaDizimos,
      somaOfertas,
      total,
      comissao: Number(comissao.toFixed(2)),
      recolhimento: Number(recolhimento.toFixed(2))
    });
  }

  const totalGeral = totalDizimosGeral + totalOfertasGeral;
  const comissaoGeral = totalGeral * 0.33;
  const recolhimentoGeral = totalGeral * 0.67;

  return {
    resumoPorCongregacao,
    resumoGeral: {
      somaDizimos: totalDizimosGeral,
      somaOfertas: totalOfertasGeral,
      total: totalGeral,
      comissao: Number(comissaoGeral.toFixed(2)),
      recolhimento: Number(recolhimentoGeral.toFixed(2))
    }
  };
};

export const getResumoFinanceiroMensal = async (
  schema: string,
  congregacaoId: string,
  ano: string
) => {
  const prisma = getPrisma(schema);
  const id = Number(congregacaoId);
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);
  const dadosMensais: any[] = [];

  for (const mes of meses) {
    const dataInicio = new Date(Number(ano), mes - 1, 1);
    const dataFim = new Date(Number(ano), mes, 0, 23, 59, 59);

    const somaDizimos = await prisma.offering.aggregate({
      where: {
        congregacaoId: id,
        type: 'dizimo',
        date: { gte: dataInicio, lte: dataFim }
      },
      _sum: { value: true }
    });

    const somaOfertas = await prisma.offering.aggregate({
      where: {
        congregacaoId: id,
        type: 'oferta',
        date: { gte: dataInicio, lte: dataFim }
      },
      _sum: { value: true }
    });

    let somaDespesas: { _sum: { valor: number | null } } = { _sum: { valor: 0 } };
    if (prisma.despesa) {
      somaDespesas = await prisma.despesa.aggregate({
        where: {
          congregacaoId: id,
          data: { gte: dataInicio, lte: dataFim }
        },
        _sum: { valor: true }
      });
    }

    dadosMensais.push({
      mes,
      totalDizimos: somaDizimos._sum.value || 0,
      totalOfertas: somaOfertas._sum.value || 0,
      totalDespesas: somaDespesas._sum.valor ?? 0
    });
  }

  return { dadosMensais };
};