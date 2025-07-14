import { Request, Response } from 'express';
import * as licaoService from '../services/escolaLideresLicao.service';

// Criar lição
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const licao = await licaoService.createLicao(schema, req.body);
    res.status(201).json(licao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar lições
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const licoes = await licaoService.listLicoes(schema);
    res.json(licoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter lição por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const licao = await licaoService.getLicao(schema, Number(id));
    if (!licao) return res.status(404).json({ error: 'Lição não encontrada.' });
    res.json(licao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar lição
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const licao = await licaoService.updateLicao(schema, Number(id), req.body);
    res.json(licao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover lição
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await licaoService.deleteLicao(schema, Number(id));
    res.json({ message: 'Lição removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};