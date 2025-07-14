import { Request, Response } from 'express';
import * as moduloService from '../services/escolaLideresModulo.service';

// Criar módulo
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const modulo = await moduloService.createModulo(schema, req.body);
    res.status(201).json(modulo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar módulos
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const modulos = await moduloService.listModulos(schema);
    res.json(modulos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter módulo por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const modulo = await moduloService.getModulo(schema, Number(id));
    if (!modulo) return res.status(404).json({ error: 'Módulo não encontrado.' });
    res.json(modulo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar módulo
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const modulo = await moduloService.updateModulo(schema, Number(id), req.body);
    res.json(modulo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover módulo
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await moduloService.deleteModulo(schema, Number(id));
    res.json({ message: 'Módulo removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};