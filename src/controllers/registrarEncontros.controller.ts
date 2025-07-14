import { Request, Response } from 'express';
import * as service from '../services/registrarEncontros.service';

export const registrarEncontro = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const encontro = await service.registrarEncontro(schema, req.body);
  res.status(201).json(encontro);
};

export const listarEncontros = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const filtro = req.query;
  const encontros = await service.listarEncontros(schema, filtro);
  res.json(encontros);
};