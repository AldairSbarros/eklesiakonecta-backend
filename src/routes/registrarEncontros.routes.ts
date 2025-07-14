import { Router } from 'express';
import * as controller from '../controllers/registrarEncontros.controller';

const router = Router();

/**
 * @swagger
 * /registrar-encontros:
 *   post:
 *     summary: Registra um novo encontro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Encontro registrado com sucesso
 */
router.post('/', controller.registrarEncontro);

/**
 * @swagger
 * /registrar-encontros:
 *   get:
 *     summary: Lista todos os encontros registrados
 *     responses:
 *       200:
 *         description: Lista de encontros retornada com sucesso
 */
router.get('/', controller.listarEncontros);

export default router;