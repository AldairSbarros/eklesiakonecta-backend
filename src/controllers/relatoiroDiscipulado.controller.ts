import { Request, Response } from 'express';
import * as service from '../services/relatorioDiscipulado.service';

export const relatorioDiscipulandosPorDiscipulador = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const dados = await service.countDiscipulandosPorDiscipulador(schema);
  res.json(dados);
};

export const relatorioDiscipulandosSemEncontro = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const dias = Number(req.query.dias) || 30;
  const dados = await service.discipulandosSemEncontro(schema, dias);
  res.json(dados);
};