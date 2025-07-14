import { Request, Response } from 'express';
import * as turmaService from '../services/escolaLideresTurma.service';

// Criar turma
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const turma = await turmaService.createTurma(schema, req.body);
    res.status(201).json(turma);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar turmas
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const turmas = await turmaService.listTurmas(schema);
    res.json(turmas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter turma por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const turma = await turmaService.getTurma(schema, Number(id));
    if (!turma) return res.status(404).json({ error: 'Turma não encontrada.' });
    res.json(turma);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar turma
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const turma = await turmaService.updateTurma(schema, Number(id), req.body);
    res.json(turma);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover turma
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await turmaService.deleteTurma(schema, Number(id));
    res.json({ message: 'Turma removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};