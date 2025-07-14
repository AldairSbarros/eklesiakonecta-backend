import { Router, Request, Response, NextFunction } from 'express';
import * as usuarioController from '../controllers/usuario.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Login (público)
router.post('/login', asyncHandler(usuarioController.login));

// Listar todos os dízimos da congregação (admin, tesoureiro ou dirigente)
router.get(
  '/dizimos',
  autenticarJWT,
  autorizarRoles(['ADMIN', 'Tesoureiro', 'Dirigente']),
  asyncHandler(usuarioController.listDizimosCongregacao)
);

// Listar usuários (apenas admin)
router.get(
  '/',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.list)
);

// Criar usuário (apenas admin)
router.post(
  '/',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.create)
);

// Atualizar usuário (apenas admin)
router.put(
  '/:id',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.update)
);

// Remover usuário (apenas admin)
router.delete(
  '/:id',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.deleteUsuario)
);

// Obter usuário por ID (apenas admin)
router.get(
  '/:id',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.get)
);

// Trocar a própria senha (autenticado)
router.post(
  '/change-password',
  autenticarJWT,
  asyncHandler(usuarioController.changePassword)
);

// Upload de comprovante de dízimo (autenticado)
router.post(
  '/upload-comprovante',
  autenticarJWT,
  asyncHandler(usuarioController.uploadComprovante)
);

export default router;