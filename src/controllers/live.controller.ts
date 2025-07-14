import { Request, Response } from 'express';
import { getPrismaForSchema } from '../config/prismaDynamic'; // ajuste o caminho conforme necessário

// Cadastrar uma nova live/transmissão
export const create = async (req: Request, res: Response) => {
  const { churchId, titulo, descricao, url, agendadaEm } = req.body;
  const prisma = getPrismaForSchema(churchId); // get PrismaClient for the schema
  const live = await prisma.liveStream.create({
    data: { churchId, titulo, descricao, url, agendadaEm }
  });
  res.status(201).json(live);
};

// Listar lives de uma igreja
export const listByChurch = async (req: Request, res: Response) => {
  const { churchId } = req.params;
  const prisma = getPrismaForSchema(churchId);
  const lives = await prisma.liveStream.findMany({
    where: { churchId: Number(churchId) },
    orderBy: { agendadaEm: 'desc' }
  });
  res.json(lives);
};