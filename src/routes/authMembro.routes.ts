import { Router } from 'express';
import { loginMembro } from '../controllers/authMembro.controller';

const router = Router();

// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /auth/login-membro:
 *   post:
 *     summary: Autentica um membro
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
 *         description: Membro autenticado com sucesso
 */
router.post('/login-membro', asyncHandler(loginMembro));

export default router;