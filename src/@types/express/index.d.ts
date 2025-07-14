import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        perfil: string;
        congregacaoId?: number;
        iat?: number;
        exp?: number;
      };
    }
  }
}