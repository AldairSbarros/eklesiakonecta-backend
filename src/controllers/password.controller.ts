import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// 1. Solicitar recuperação de senha
export const solicitarRecuperacao = async (req: Request, res: Response) => {
  const { email } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return res.status(404).json({ error: "Usuário não encontrado." });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

  await prisma.tokenRecuperacaoSenha.create({
    data: { token, usuarioId: usuario.id, expiresAt }
  });

  // Aqui você enviaria o e-mail com o link: ex: https://seusite.com/reset-password?token=TOKEN
  // Simulação:
  console.log(`Link de recuperação: https://seusite.com/reset-password?token=${token}`);

  res.json({ message: "E-mail de recuperação enviado (simulado)." });
};

// 2. Redefinir senha
export const redefinirSenha = async (req: Request, res: Response) => {
  const { token, novaSenha } = req.body;
  const registro = await prisma.tokenRecuperacaoSenha.findUnique({ where: { token } });

  if (!registro || registro.used || registro.expiresAt < new Date()) {
    return res.status(400).json({ error: "Token inválido ou expirado." });
  }

  const hashed = await bcrypt.hash(novaSenha, 10);
  await prisma.usuario.update({
    where: { id: registro.usuarioId },
    data: { senha: hashed }
  });

  await prisma.tokenRecuperacaoSenha.update({
    where: { token },
    data: { used: true }
  });

  res.json({ message: "Senha redefinida com sucesso." });
};