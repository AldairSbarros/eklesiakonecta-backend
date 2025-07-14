import { Router, Request, Response, NextFunction } from 'express';
import * as enderecoMembroController from '../controllers/enderecoMembro.controller';

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
 * /endereco-membro:
 *   post:
 *     summary: Cria um novo endereço de membro
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
router.post('/', asyncHandler(enderecoMembroController.create));

/**
 * @swagger
 * /endereco-membro:
 *   get:
 *     summary: Lista todos os endereços de membros
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 */
router.get('/', asyncHandler(enderecoMembroController.list));

/**
 * @swagger
 * /endereco-membro/{id}:
 *   get:
 *     summary: Busca um endereço de membro por ID
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
router.get('/:id', asyncHandler(enderecoMembroController.get));

/**
 * @swagger
 * /endereco-membro/{id}:
 *   put:
 *     summary: Atualiza um endereço de membro
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
router.put('/:id', asyncHandler(enderecoMembroController.update));

/**
 * @swagger
 * /endereco-membro/{id}:
 *   delete:
 *     summary: Remove um endereço de membro
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
router.delete('/:id', asyncHandler(enderecoMembroController.remove));
export default router;