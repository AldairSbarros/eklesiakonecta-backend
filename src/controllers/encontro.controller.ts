import { Request, Response } from 'express';
import * as encontroService from '../services/encontro.service';

// Criar encontro
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const encontro = await encontroService.createEncontro(schema, req.body);
    res.status(201).json(encontro);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar encontros
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const encontros = await encontroService.listEncontros(schema);
    res.json(encontros);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter encontro por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const encontro = await encontroService.getEncontro(schema, Number(id));
    if (!encontro) return res.status(404).json({ error: 'Encontro não encontrado.' });
    res.json(encontro);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar encontro
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const encontro = await encontroService.updateEncontro(schema, Number(id), req.body);
    res.json(encontro);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover encontro
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await encontroService.deleteEncontro(schema, Number(id));
    res.json({ message: 'Encontro removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};