import { Router, Request, Response, NextFunction } from 'express';
import * as sermaoController from '../controllers/sermao.controller';

const router = Router();

/**
 * @swagger
 * /sermao:
 *   post:
 *     summary: Cria um novo sermão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Sermão criado com sucesso
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.create(req, res)).catch(next);
});

/**
 * @swagger
 * /sermao:
 *   get:
 *     summary: Lista todos os sermões
 *     responses:
 *       200:
 *         description: Lista de sermões retornada com sucesso
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.list(req, res)).catch(next);
});

/**
 * @swagger
 * /sermao/{id}:
 *   get:
 *     summary: Busca um sermão por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sermão encontrado com sucesso
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.get(req, res)).catch(next);
});

/**
 * @swagger
 * /sermao/{id}:
 *   put:
 *     summary: Atualiza um sermão
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
 *         description: Sermão atualizado com sucesso
 */
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.update(req, res)).catch(next);
});

/**
 * @swagger
 * /sermao/{id}:
 *   delete:
 *     summary: Remove um sermão
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sermão removido com sucesso
 */
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.remove(req, res)).catch(next);
});
export default router;