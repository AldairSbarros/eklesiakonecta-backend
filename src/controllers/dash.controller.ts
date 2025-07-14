import { Request, Response } from 'express';
import * as dashService from '../services/dash.service';

// Resumo financeiro geral (total do período)
export const resumoFinanceiro = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { congregacaoId, ano, mes } = req.query;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    if (!congregacaoId || !ano) {
      return res.status(400).json({ error: 'Informe congregacaoId e ano' });
    }
    const resumo = await dashService.getResumoFinanceiro(
      schema,
      String(congregacaoId),
      String(ano),
      mes ? String(mes) : undefined
    );
    res.json(resumo);
  } catch (error) {
    console.error('Erro ao obter resumo financeiro:', error);
    res.status(500).json({ error: 'Erro ao obter resumo financeiro' });
  }
};

// Resumo financeiro mensal (para gráficos)
export const resumoFinanceiroMensal = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { congregacaoId, ano } = req.query;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    if (!congregacaoId || !ano) {
      return res.status(400).json({ error: 'Informe congregacaoId e ano' });
    }
    const dados = await dashService.getResumoFinanceiroMensal(
      schema,
      String(congregacaoId),
      String(ano)
    );
    res.json(dados);
  } catch (error) {
    console.error('Erro ao obter resumo financeiro mensal:', error);
    res.status(500).json({ error: 'Erro ao obter resumo financeiro mensal' });
  }
};