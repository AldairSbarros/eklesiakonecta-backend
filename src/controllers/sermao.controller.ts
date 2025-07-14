import { Request, Response } from 'express';
import * as sermaoService from '../services/sermao.service';

// Criar sermão
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const sermao = await sermaoService.createSermao(schema, req.body);
    res.status(201).json(sermao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar sermões
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const sermaos = await sermaoService.listSermaos(schema);
    res.json(sermaos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter sermão por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const sermao = await sermaoService.getSermao(schema, Number(id));
    if (!sermao) return res.status(404).json({ error: 'Sermão não encontrado.' });
    res.json(sermao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar sermão
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const sermao = await sermaoService.updateSermao(schema, Number(id), req.body);
    res.json(sermao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover sermão
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await sermaoService.deleteSermao(schema, Number(id));
    res.json({ message: 'Sermão removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};