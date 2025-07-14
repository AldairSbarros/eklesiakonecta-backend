import { Request, Response } from 'express';
import * as faturaService from '../services/fatura.service';

// Criar fatura
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const fatura = await faturaService.createFatura(schema, req.body);
    res.status(201).json(fatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar faturas
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const faturas = await faturaService.listFaturas(schema);
    res.json(faturas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter fatura por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const fatura = await faturaService.getFatura(schema, Number(id));
    if (fatura === null) return res.status(404).json({ error: 'Fatura não encontrada.' });
    res.json(fatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar fatura
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const fatura = await faturaService.updateFatura(schema, Number(id), req.body);
    res.json(fatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover fatura
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await faturaService.deleteFatura(schema, Number(id));
    res.json({ message: 'Fatura removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};