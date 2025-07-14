import { Request, Response } from 'express';
import * as usuarioPermissaoService from '../services/usuarioPermissao.service';

// Criar usuário-permissão
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const usuarioPermissao = await usuarioPermissaoService.createUsuarioPermissao(schema, req.body);
    res.status(201).json(usuarioPermissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar usuário-permissão
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const usuarioPermissoes = await usuarioPermissaoService.listUsuarioPermissoes(schema);
    res.json(usuarioPermissoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter usuário-permissão por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const usuarioPermissao = await usuarioPermissaoService.getUsuarioPermissao(schema, Number(id));
    if (!usuarioPermissao) return res.status(404).json({ error: 'Usuário-permissão não encontrado.' });
    res.json(usuarioPermissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar usuário-permissão
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const usuarioPermissao = await usuarioPermissaoService.updateUsuarioPermissao(schema, Number(id), req.body);
    res.json(usuarioPermissao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover usuário-permissão
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await usuarioPermissaoService.deleteUsuarioPermissao(schema, Number(id));
    res.json({ message: 'Usuário-permissão removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};