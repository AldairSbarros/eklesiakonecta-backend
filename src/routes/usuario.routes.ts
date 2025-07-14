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

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post('/login', asyncHandler(usuarioController.login));

/**
 * @swagger
 * /usuario/dizimos:
 *   get:
 *     summary: Lista todos os dízimos da congregação
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de dízimos retornada com sucesso
 */
router.get(
  '/dizimos',
  autenticarJWT,
  autorizarRoles(['ADMIN', 'Tesoureiro', 'Dirigente']),
  asyncHandler(usuarioController.listDizimosCongregacao)
);

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get(
  '/',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.list)
);

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post(
  '/',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.create)
);

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.put(
  '/:id',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.update)
);

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 */
router.delete(
  '/:id',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.deleteUsuario)
);

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 */
router.get(
  '/:id',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  asyncHandler(usuarioController.get)
);

/**
 * @swagger
 * /usuario/change-password:
 *   post:
 *     summary: Troca a própria senha
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 */
router.post(
  '/change-password',
  autenticarJWT,
  asyncHandler(usuarioController.changePassword)
);

/**
 * @swagger
 * /usuario/upload-comprovante:
 *   post:
 *     summary: Upload de comprovante de dízimo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               comprovante:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Comprovante enviado com sucesso
 */
router.post(
  '/upload-comprovante',
  autenticarJWT,
  asyncHandler(usuarioController.uploadComprovante)
);

export default router;