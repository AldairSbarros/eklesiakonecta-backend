import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET || "seuSegredoSuperSecreto";

// 1. Tenta autenticar como DevUser (superusuário global)
export const tryDevUserAuth = async (email: string, senha: string, res: Response) => {
  const devUser = await prisma.devUser.findUnique({ where: { email } });
  if (devUser && await bcrypt.compare(senha, devUser.senha)) {
    const token = jwt.sign(
      { id: devUser.id, superuser: true, perfil: devUser.perfil },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
    return res.json({ token, perfil: 'SUPERUSER', nome: devUser.nome });
  }
  return null;
};


// Cadastro
export const register = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { nome, email, senha, perfil, congregacaoId } = req.body;
    if (!nome || !email || !senha || !perfil) {
      res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
      return;
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const usuario = await authService.createUsuario(schema, {
      nome,
      email,
      senha: hashedPassword,
      perfil,
      congregacaoId
    });

    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      congregacaoId: usuario.congregacaoId
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { email, senha } = req.body;

    // 1. Tenta autenticar como DevUser (superusuário global)
    const devUserResult = await tryDevUserAuth(email, senha, res);
    if (devUserResult) return; // Se autenticou como DevUser, já respondeu

    // 2. Fluxo normal para usuários comuns
    const usuario = await authService.findUsuarioByEmail(schema, email);
    if (!usuario) {
      res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      return;
    }

    const valid = await bcrypt.compare(senha, usuario.senha);
    if (!valid) {
      res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      return;
    }

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil, congregacaoId: usuario.congregacaoId },
      secret,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        congregacaoId: usuario.congregacaoId
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};