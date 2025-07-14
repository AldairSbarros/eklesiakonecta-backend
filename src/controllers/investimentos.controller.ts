import { Request, Response } from 'express';
import * as investimentosService from '../services/investimentos.service';
import manualCodigos from '../utils/manualCodigos.json';

// CREATE
export const criarInvestimento = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    let { congregacaoId, descricao, valor, data, categoria, codigoManual } = req.body;

    if (codigoManual && !descricao) {
      const found = manualCodigos.investimentos.find(i => i.codigo === codigoManual);
      if (found) descricao = found.descricao;
    }
    if (descricao && !codigoManual) {
      const found = manualCodigos.investimentos.find(i => i.descricao.toLowerCase() === descricao.toLowerCase());
      if (found) codigoManual = found.codigo;
    }

    if (!codigoManual || !descricao) {
      return res.status(400).json({ error: 'Código ou descrição de investimento inválidos.' });
    }

    const investimento = await investimentosService.criarInvestimento(schema, {
      congregacaoId: Number(congregacaoId),
      descricao,
      valor: Number(valor),
      data: new Date(data),
      categoria,
      codigoManual
    });

    res.status(201).json(investimento);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const listarInvestimentos = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const investimentos = await investimentosService.listarInvestimentos(schema);
    res.json(investimentos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ONE
export const obterInvestimento = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const investimento = await investimentosService.obterInvestimento(schema, Number(id));
    if (!investimento) return res.status(404).json({ error: 'Investimento não encontrado' });
    res.json(investimento);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const atualizarInvestimento = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const investimento = await investimentosService.atualizarInvestimento(schema, Number(id), req.body);
    res.json(investimento);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const removerInvestimento = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await investimentosService.removerInvestimento(schema, Number(id));
    res.json({ message: 'Investimento removido com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};