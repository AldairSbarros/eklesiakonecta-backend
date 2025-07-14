import { Router, Request, Response } from 'express';
import * as ministerioLocalController from '../controllers/ministerioLocal.controller';

const router = Router();

/**
 * @swagger
 * /ministerio-local:
 *   post:
 *     summary: Cria um novo ministério local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Ministério local criado com sucesso
 */
router.post('/', ministerioLocalController.create as (req: Request, res: Response) => any);

/**
 * @swagger
 * /ministerio-local:
 *   get:
 *     summary: Lista todos os ministérios locais
 *     responses:
 *       200:
 *         description: Lista de ministérios locais retornada com sucesso
 */
router.get('/', ministerioLocalController.list as (req: Request, res: Response) => any);

/**
 * @swagger
 * /ministerio-local/{id}:
 *   get:
 *     summary: Busca um ministério local por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ministério local encontrado com sucesso
 */
router.get('/:id', ministerioLocalController.get as (req: Request, res: Response) => any);

/**
 * @swagger
 * /ministerio-local/{id}:
 *   put:
 *     summary: Atualiza um ministério local
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
 *         description: Ministério local atualizado com sucesso
 */
router.put('/:id', ministerioLocalController.update as (req: Request, res: Response) => any);

/**
 * @swagger
 * /ministerio-local/{id}:
 *   delete:
 *     summary: Remove um ministério local
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ministério local removido com sucesso
 */
router.delete('/:id', ministerioLocalController.remove as (req: Request, res: Response) => any);
export default router;