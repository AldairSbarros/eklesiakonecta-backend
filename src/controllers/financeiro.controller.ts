import { Request, Response } from "express";
import * as financeiroService from '../services/financeiro.service';

// Resumo financeiro
export const resumoFinanceiro = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { congregacaoId, mes, ano } = req.query;
    if (!schema) {
      return res.status(400).json({ error: "Schema não informado no header." });
    }
    if (!congregacaoId) {
      return res.status(400).json({ error: "Informe o congregacaoId" });
    }
    const data = await financeiroService.getResumoFinanceiro(
      schema,
      Number(congregacaoId),
      mes ? Number(mes) : undefined,
      ano ? Number(ano) : undefined
    );

    const { offerings, receitas, despesas, investimentos } = data;

    const totalOfferings = offerings.reduce((acc, o) => acc + o.value, 0);
    const totalReceitas = receitas.reduce((acc, r) => acc + r.valor, 0);
    const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
    const totalInvestimentos = investimentos.reduce((acc, i) => acc + i.valor, 0);

    const totalEntradas = totalOfferings + totalReceitas;
    const totalSaidas = totalDespesas + totalInvestimentos;
    const saldo = totalEntradas - totalSaidas;

    const receitasPorCategoria = receitas.reduce((acc, r) => {
      acc[r.categoria || "Outros"] = (acc[r.categoria || "Outros"] || 0) + r.valor;
      return acc;
    }, {} as Record<string, number>);

    const despesasPorCategoria = despesas.reduce((acc, d) => {
      acc[d.categoria || "Outros"] = (acc[d.categoria || "Outros"] || 0) + d.valor;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      totalOfferings,
      totalReceitas,
      totalDespesas,
      totalInvestimentos,
      totalEntradas,
      totalSaidas,
      receitasPorCategoria,
      despesasPorCategoria,
      saldo,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Relatório mensal
export const relatorioMensal = async (req: Request, res: Response, next: Function) => {
  try {
    const schema = req.headers['schema'] as string;
    const { congregacaoId, mes, ano } = req.query;
    if (!schema) {
      return res.status(400).json({ error: "Schema não informado no header." });
    }
    if (!congregacaoId || !mes || !ano) {
      return res.status(400).json({ error: 'Informe congregacaoId, mes e ano' });
    }
    const relatorio = await financeiroService.getRelatorioMensal(
      schema,
      Number(congregacaoId),
      Number(mes),
      Number(ano)
    );
    res.json(relatorio);
  } catch (err) {
    next(err);
  }
};