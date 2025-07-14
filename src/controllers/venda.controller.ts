import { Request, Response } from 'express';
import * as vendaService from '../services/venda.service';

// Criar venda
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const venda = await vendaService.createVenda(schema, req.body);
    res.status(201).json(venda);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar vendas
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const vendas = await vendaService.listVendas(schema);
    res.json(vendas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter venda por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const venda = await vendaService.getVenda(schema, Number(id));
    if (!venda) return res.status(404).json({ error: 'Venda não encontrada.' });
    res.json(venda);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar venda
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const venda = await vendaService.updateVenda(schema, Number(id), req.body);
    res.json(venda);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover venda
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await vendaService.deleteVenda(schema, Number(id));
    res.json({ message: 'Venda removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};