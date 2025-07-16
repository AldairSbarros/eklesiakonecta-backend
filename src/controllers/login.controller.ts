import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPrisma, getPrismaPublic } from '../utils/prismaDynamic';

interface LoginData {
  email: string;
  senha: string;
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, senha }: LoginData = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }

    console.log(`Tentativa de login para: ${email}`);

    // 1. Buscar a igreja pelo email no schema público
    const prismaPublic = getPrismaPublic();
    
    try {
      // Query direta na tabela igrejas (sem especificar public.)
      const igrejas = await prismaPublic.$queryRaw`
        SELECT nome, email, senha, schema, ativo
        FROM igrejas 
        WHERE email = ${email}
        LIMIT 1
      ` as any[];

      console.log(`Consulta retornou ${igrejas.length} resultado(s)`);

      if (igrejas.length === 0) {
        return res.status(401).json({
          error: 'Email não encontrado. Verifique se sua igreja foi cadastrada.'
        });
      }

      const dadosIgreja = igrejas[0];

      // Verificar se a igreja está ativa
      if (!dadosIgreja.ativo) {
        return res.status(401).json({
          error: 'Igreja desativada. Entre em contato com o suporte.'
        });
      }

      console.log(`Igreja encontrada: ${dadosIgreja.nome} - Schema: ${dadosIgreja.schema}`);

      // 2. Verificar senha
      const senhaValida = await bcrypt.compare(senha, dadosIgreja.senha);
      
      if (!senhaValida) {
        return res.status(401).json({
          error: 'Senha incorreta'
        });
      }

      console.log('Senha validada com sucesso');

      // 3. Buscar dados completos do usuário no schema da igreja
      const prismaIgreja = getPrisma(dadosIgreja.schema);
      
      // CORREÇÃO: usar 'user' (nome padrão do modelo)
      const usuario = await prismaIgreja.usuario.findFirst({
        where: {
          email: email,
          ativo: true
        },
        select: {
          id: true,
          nome: true,
          email: true,
          perfil: true,
          ativo: true,
          createdAt: true
        }
      });

      if (!usuario) {
        return res.status(401).json({
          error: 'Usuário não encontrado no sistema da igreja ou inativo'
        });
      }

      console.log(`Usuário encontrado: ${usuario.nome} - Perfil: ${usuario.perfil}`);

      // 4. Gerar token JWT com o schema incluído
      const token = jwt.sign(
        {
          userId: usuario.id,
          email: usuario.email,
          perfil: usuario.perfil,
          schema: dadosIgreja.schema,
          igreja: dadosIgreja.nome
        },
        process.env.JWT_SECRET || 'eklesia-konecta-secret-key',
        { expiresIn: '24h' }
      );

      console.log('Token gerado com sucesso');

      return res.json({
        success: true,
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          perfil: usuario.perfil,
          igreja: dadosIgreja.nome,
          schema: dadosIgreja.schema
        }
      });

    } catch (dbError: any) {
      console.error('Erro na consulta da tabela igrejas:', dbError);
      
      // Verificar se é erro de tabela não encontrada
      if (dbError.code === '42P01') {
        return res.status(500).json({
          error: 'Sistema não configurado. Execute a configuração inicial do banco.',
          details: 'Tabela igrejas não encontrada'
        });
      }
      
      // Verificar se é erro de conexão
      if (dbError.code === 'ECONNREFUSED') {
        return res.status(500).json({
          error: 'Erro de conexão com o banco de dados',
          details: 'Verifique se o PostgreSQL está rodando'
        });
      }
      
      throw dbError;
    }

  } catch (error: any) {
    console.error('Erro geral no login:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
    });
  }
};

export const verificarToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: 'Token não fornecido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'eklesia-konecta-secret-key') as any;

    // Verificar se usuário ainda existe e está ativo
    const prismaIgreja = getPrisma(decoded.schema);
    
    // CORREÇÃO: usar 'user' (nome padrão do modelo)
    const usuario = await prismaIgreja.usuario.findFirst({
      where: {
        id: decoded.userId,
        ativo: true
      },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        ativo: true
      }
    });

    if (!usuario) {
      return res.status(401).json({
        error: 'Token inválido ou usuário inativo'
      });
    }

    return res.json({
      valid: true,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        igreja: decoded.igreja,
        schema: decoded.schema
      }
    });

  } catch (error: any) {
    console.error('Erro na verificação do token:', error);
    return res.status(401).json({
      error: 'Token inválido'
    });
  }
};