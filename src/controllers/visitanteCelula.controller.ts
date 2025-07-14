import { Request, Response } from 'express';
import * as visitanteService from '../services/visitante.service';

// Criar visitante
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const visitante = await visitanteService.createVisitante(schema, req.body);
    res.status(201).json(visitante);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar visitantes
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const visitantes = await visitanteService.listVisitantes(schema);
    res.json(visitantes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter visitante por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const visitante = await visitanteService.getVisitante(schema, Number(id));
    if (!visitante) return res.status(404).json({ error: 'Visitante não encontrado.' });
    res.json(visitante);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar visitante
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const visitante = await visitanteService.updateVisitante(schema, Number(id), req.body);
    res.json(visitante);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover visitante
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await visitanteService.deleteVisitante(schema, Number(id));
    res.json({ message: 'Visitante removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};