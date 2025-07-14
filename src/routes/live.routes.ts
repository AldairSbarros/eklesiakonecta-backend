import { Router } from 'express';
import * as liveController from '../controllers/live.controller';

const router = Router();

/**
 * @swagger
 * /live:
 *   post:
 *     summary: Cria uma nova live
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Live criada com sucesso
 */
router.post('/', liveController.create);

/**
 * @swagger
 * /live/{churchId}:
 *   get:
 *     summary: Lista as lives de uma igreja
 *     parameters:
 *       - in: path
 *         name: churchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de lives retornada com sucesso
 */
router.get('/:churchId', liveController.listByChurch);
export default router;