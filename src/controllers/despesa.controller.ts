import { Request, Response } from 'express';
import * as despesaService from '../services/despesa.service';
import manualCodigos from '../utils/manualCodigos.json';

// CREATE
export const criarDespesa = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    let { congregacaoId, descricao, valor, data, categoria, codigoManual } = req.body;
    const notaFiscalFoto = req.file ? req.file.path.replace(/\\/g, '/') : null;

    if (codigoManual && !descricao) {
      const found = manualCodigos.despesas.find(d => d.codigo === codigoManual);
      if (found) descricao = found.descricao;
    }

    if (descricao && !codigoManual) {
      const found = manualCodigos.despesas.find(d => d.descricao.toLowerCase() === descricao.toLowerCase());
      if (found) codigoManual = found.codigo;
    }

    if (!codigoManual || !descricao) {
      return res.status(400).json({ error: 'Código ou descrição de despesa inválidos.' });
    }

    const despesa = await despesaService.criarDespesa(schema, {
      congregacaoId: Number(congregacaoId),
      descricao,
      valor: Number(valor),
      data: new Date(data),
      categoria,
      codigoManual,
      notaFiscalFoto
    });

    res.status(201).json(despesa);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const listarDespesas = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const despesas = await despesaService.listarDespesas(schema);
    res.status(200).json(despesas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const obterDespesa = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const despesa = await despesaService.obterDespesa(schema, Number(id));
    if (!despesa) return res.status(404).json({ error: 'Despesa não encontrada' });
    res.json(despesa);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const atualizarDespesa = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const despesa = await despesaService.atualizarDespesa(schema, Number(id), req.body);
    res.json(despesa);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const removerDespesa = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await despesaService.removerDespesa(schema, Number(id));
    res.json({ message: 'Despesa removida com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};