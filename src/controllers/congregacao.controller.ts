import { Request, Response } from 'express';
import * as congregacaoService from '../services/congregacao.service';

// Criar congregação
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const congregacao = await congregacaoService.createCongregacao(schema, req.body);
    res.status(201).json(congregacao);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao criar congregação' });
  }
};

// Listar congregações
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const congregacoes = await congregacaoService.listCongregacoes(schema);
    res.status(200).json(congregacoes);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao listar congregações' });
  }
};

// Editar congregação
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    const congregacao = await congregacaoService.updateCongregacao(schema, Number(id), req.body);
    res.json(congregacao);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao atualizar congregação' });
  }
};

// Atualizar geolocalização da congregação
export const atualizarLocalizacao = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const congregacao = await congregacaoService.updateCongregacao(schema, Number(id), { latitude, longitude });
    res.json(congregacao);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao atualizar localização da congregação' });
  }
};

// Deletar congregação
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    await congregacaoService.deleteCongregacao(schema, Number(id));
    res.json({ message: 'Congregação removida com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao remover congregação' });
  }
};