import { Request, Response } from 'express';
import * as reuniaoService from '../services/reuniaoCelula.service';

// Criar reunião
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const reuniao = await reuniaoService.createReuniao(schema, req.body);
    res.status(201).json(reuniao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar reuniões
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const reunioes = await reuniaoService.listReunioes(schema);
    res.json(reunioes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter reunião por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const reuniao = await reuniaoService.getReuniao(schema, Number(id));
    if (!reuniao) return res.status(404).json({ error: 'Reunião não encontrada.' });
    res.json(reuniao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar reunião
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const reuniao = await reuniaoService.updateReuniao(schema, Number(id), req.body);
    res.json(reuniao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover reunião
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await reuniaoService.deleteReuniao(schema, Number(id));
    res.json({ message: 'Reunião removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message }); 
  }
};