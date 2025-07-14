import { Request, Response } from 'express';
import * as presencaService from '../services/presencaCelula.service';

// Criar presença
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const presenca = await presencaService.createPresenca(schema, req.body);
    res.status(201).json(presenca);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar presenças
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const presencas = await presencaService.listPresencas(schema);
    res.json(presencas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter presença por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const presenca = await presencaService.getPresenca(schema, Number(id));
    if (!presenca) return res.status(404).json({ error: 'Presença não encontrada.' });
    res.json(presenca);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar presença
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const presenca = await presencaService.updatePresenca(schema, Number(id), req.body);
    res.json(presenca);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover presença
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await presencaService.deletePresenca(schema, Number(id));
    res.json({ message: 'Presença removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  } 
};