import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function createDevUser(req: Request, res: Response): Promise<void> {
  try {
    const { nome, email, senha, perfil } = req.body;
    if (!nome || !email || !senha || !perfil) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      return;
    }
    const hashed = await bcrypt.hash(senha, 10);
    const devUser = await prisma.devUser.create({
      data: { nome, email, senha: hashed, perfil }
    });
    res.status(201).json({ id: devUser.id, nome: devUser.nome, email: devUser.email, perfil: devUser.perfil });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}