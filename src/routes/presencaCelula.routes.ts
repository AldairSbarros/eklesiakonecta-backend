import { Router, Request, Response } from 'express';
import * as presencaController from '../controllers/presencaCelula.controller';

const router = Router();

/**
 * @swagger
 * /presenca-celula:
 *   post:
 *     summary: Cria uma nova presença de célula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Presença criada com sucesso
 */
router.post('/', presencaController.create as (req: Request, res: Response) => any);

/**
 * @swagger
 * /presenca-celula:
 *   get:
 *     summary: Lista todas as presenças de célula
 *     responses:
 *       200:
 *         description: Lista de presenças retornada com sucesso
 */
router.get('/', presencaController.list as (req: Request, res: Response) => any);

/**
 * @swagger
 * /presenca-celula/{id}:
 *   get:
 *     summary: Busca uma presença de célula por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Presença encontrada com sucesso
 */
router.get('/:id', presencaController.get as (req: Request, res: Response) => any);

/**
 * @swagger
 * /presenca-celula/{id}:
 *   put:
 *     summary: Atualiza uma presença de célula
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
 *         description: Presença atualizada com sucesso
 */
router.put('/:id', presencaController.update as (req: Request, res: Response) => any);

/**
 * @swagger
 * /presenca-celula/{id}:
 *   delete:
 *     summary: Remove uma presença de célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Presença removida com sucesso
 */
router.delete('/:id', presencaController.remove as (req: Request, res: Response) => any);

export default router;