import { Router } from 'express';
import { createDevUser } from '../controllers/devuser.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { onlySuperUser } from '../middleware/onlySuperUser';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

/**
 * @swagger
 * /devuser:
 *   post:
 *     summary: Cria um novo DevUser (apenas superusuário)
 *     security:
 *       - bearerAuth: []
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
 *         description: DevUser criado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão insuficiente
 */
router.post('/devuser', autenticarJWT, onlySuperUser, asyncHandler(createDevUser));

export default router;