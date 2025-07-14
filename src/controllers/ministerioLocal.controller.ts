import { Request, Response } from 'express';
import * as ministerioLocalService from '../services/ministerioLocal.service';

// Criar ministério local
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const ministerio = await ministerioLocalService.createMinisterioLocal(schema, req.body);
    res.status(201).json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar ministérios locais
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const ministerios = await ministerioLocalService.listMinisteriosLocais(schema);
    res.json(ministerios);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter ministério local por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const ministerio = await ministerioLocalService.getMinisterioLocal(schema, Number(id));
    if (!ministerio) return res.status(404).json({ error: 'Ministério local não encontrado.' });
    res.json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar ministério local
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const ministerio = await ministerioLocalService.updateMinisterioLocal(schema, Number(id), req.body);
    res.json(ministerio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover ministério local
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await ministerioLocalService.deleteMinisterioLocal(schema, Number(id));
    res.json({ message: 'Ministério local removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};