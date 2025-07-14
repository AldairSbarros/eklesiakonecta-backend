import { Request, Response } from 'express';
import * as celulaService from '../services/celula.service';

// Criar célula
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const celula = await celulaService.createCelula(schema, req.body);
    res.status(201).json(celula);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarLocalizacao = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const celula = await celulaService.updateCelula(schema, Number(id), { latitude, longitude });
    res.json(celula);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


// Listar células
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const celulas = await celulaService.listCelulas(schema);
    res.json(celulas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter célula por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const celula = await celulaService.getCelula(schema, Number(id));
    if (!celula) return res.status(404).json({ error: 'Célula não encontrada.' });
    res.json(celula);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar célula
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const celula = await celulaService.updateCelula(schema, Number(id), req.body);
    res.json(celula);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover célula
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    await celulaService.deleteCelula(schema, Number(id));
    res.json({ message: 'Célula removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const addMembro = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const { membroId } = req.body;
    const membro = await celulaService.addMembroCelula(schema, Number(id), Number(membroId));
    res.status(201).json(membro);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeMembro = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { membroId } = req.params;
    await celulaService.removeMembroCelula(schema, Number(membroId));
    res.json({ message: 'Membro removido da célula.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export function listarMembros(listarMembros: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
	throw new Error('Function not implemented.');
}
