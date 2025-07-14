import { Router, Request, Response, NextFunction } from 'express';
import * as enderecoIgrejaController from '../controllers/enderecoIgreja.controller';

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
 * /endereco-igreja:
 *   post:
 *     summary: Cria um novo endereço de igreja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 */
router.post('/', asyncHandler(enderecoIgrejaController.create));

/**
 * @swagger
 * /endereco-igreja:
 *   get:
 *     summary: Lista todos os endereços de igreja
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 */
router.get('/', asyncHandler(enderecoIgrejaController.list));

/**
 * @swagger
 * /endereco-igreja/{id}:
 *   get:
 *     summary: Busca um endereço de igreja por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Endereço encontrado com sucesso
 */
router.get('/:id', asyncHandler(enderecoIgrejaController.get));

/**
 * @swagger
 * /endereco-igreja/{id}:
 *   put:
 *     summary: Atualiza um endereço de igreja
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
 *         description: Endereço atualizado com sucesso
 */
router.put('/:id', asyncHandler(enderecoIgrejaController.update));

/**
 * @swagger
 * /endereco-igreja/{id}:
 *   delete:
 *     summary: Remove um endereço de igreja
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Endereço removido com sucesso
 */
router.delete('/:id', asyncHandler(enderecoIgrejaController.remove));

export default router;