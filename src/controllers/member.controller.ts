import { Request, Response } from 'express';
import * as memberService from '../services/member.service';

// CREATE
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const member = await memberService.createMember(schema, req.body);
    res.status(201).json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { congregacaoId } = req.query;
    const members = await memberService.listMembers(schema, congregacaoId ? Number(congregacaoId) : undefined);
    res.json(members);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ONE
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    const member = await memberService.getMember(schema, Number(id));
    if (!member) return res.status(404).json({ error: 'Membro não encontrado.' });
    res.json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    const member = await memberService.updateMember(schema, Number(id), req.body);
    res.json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar geolocalização do membro
export const atualizarLocalizacao = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const member = await memberService.updateMember(schema, Number(id), { latitude, longitude });
    res.json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    await memberService.deleteMember(schema, Number(id));
    res.json({ message: 'Membro removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }   
}