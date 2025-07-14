import { Request, Response } from 'express';
import * as memberService from '../services/member.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoaqui';

interface Membro {
  id: number;
  nome: string;
  email: string;
  senha: string;
  password?: string;
  congregacaoId: number;
  [key: string]: any;
}

export const loginMembro = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { email, senha } = req.body;

    // Use o service para buscar o membro pelo schema
    const membro = await memberService.findMemberByEmail(schema, email) as unknown as Membro | null;

    if (membro == null || !('senha' in membro)) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const senhaCorreta = membro.password && membro.senha.startsWith('$2a')
      ? await bcrypt.compare(senha, membro.senha)
      : senha === membro.senha;

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: membro.id, nome: membro.nome, email: membro.email, tipo: 'membro', congregacaoId: membro.congregacaoId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      membro: {
        id: membro.id,
        nome: membro.nome,
        email: membro.email,
        congregacaoId: membro.congregacaoId,
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};