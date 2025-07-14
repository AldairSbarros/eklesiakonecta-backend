import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
router.post('/register', (req, res, next) => {
  Promise.resolve(register(req, res)).catch(next);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 */
router.post('/login', (req, res, next) => {
  Promise.resolve(login(req, res)).catch(next);
});

export default router;