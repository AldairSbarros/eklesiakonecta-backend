import { Request, Response } from 'express';
import { getPrismaForSchema } from '../config/prismaDynamic';

// Criar discipulando
export const criarDiscipulando = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { nome, congregacaoId, discipuladorId, celulaId } = req.body;
  try {
    const novo = await getPrismaForSchema(schema).member.create({
      data: { nome, congregacaoId, discipuladorId, celulaId }
    });
    res.status(201).json(novo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os discipulandos
export const listarTodosDiscipulandos = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const membros = await getPrismaForSchema(schema).member.findMany();
  res.json(membros);
};

// Atualizar discipulando
export const atualizarDiscipulando = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { id } = req.params;
  try {
    const membro = await getPrismaForSchema(schema).member.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(membro);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover discipulando
export const removerDiscipulando = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { id } = req.params;
  try {
    await getPrismaForSchema(schema).member.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Discipulando removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar discipulandos de um discipulador
export const listarDiscipulandos = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { id } = req.params;
  const discipulandos = await getPrismaForSchema(schema).member.findMany({
    where: { discipuladorId: Number(id) }
  });
  res.json(discipulandos);
};

// Trocar discipulador de um membro
export const trocarDiscipulador = async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { id } = req.params;
  const { novoDiscipuladorId } = req.body;
  const membro = await getPrismaForSchema(schema).member.update({
    where: { id: Number(id) },
    data: { discipuladorId: novoDiscipuladorId }
  });
  res.json(membro);
};