import { Request, Response } from 'express';
import * as tokenService from '../services/tokenRecuperacaoSenha.service';

// Criar token de recuperação de senha
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const token = await tokenService.criarToken(schema, req.body);
    res.status(201).json(token);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter token por valor do token
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { token } = req.params;
    const result = await tokenService.obterToken(schema, token);
    if (!result) return res.status(404).json({ error: 'Token não encontrado.' });
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar token
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { token } = req.params;
    const result = await tokenService.atualizarToken(schema, token, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover token
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { token } = req.params;
    await tokenService.removerToken(schema, token);
    res.json({ message: 'Token removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};