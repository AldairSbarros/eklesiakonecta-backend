import { Request, Response } from 'express';
import * as notificacaoService from '../services/notificacao.service';

// Criar notificação
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const notificacao = await notificacaoService.createNotificacao(schema, req.body);
    res.status(201).json(notificacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar notificações
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const notificacoes = await notificacaoService.listNotificacoes(schema);
    res.json(notificacoes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter notificação por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const notificacao = await notificacaoService.getNotificacao(schema, Number(id));
    if (!notificacao) return res.status(404).json({ error: 'Notificação não encontrada.' });
    res.json(notificacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar notificação
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const notificacao = await notificacaoService.updateNotificacao(schema, Number(id), req.body);
    res.json(notificacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover notificação
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await notificacaoService.deleteNotificacao(schema, Number(id));
    res.json({ message: 'Notificação removida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message }); 
  }
};