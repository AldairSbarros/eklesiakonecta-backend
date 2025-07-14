import { Router, Request, Response, NextFunction } from 'express';
import * as arquivoController from '../controllers/arquivo.controller';

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
 * /arquivos:
 *   post:
 *     summary: Cria um novo arquivo
 *     responses:
 *       201:
 *         description: Arquivo criado
 */
router.post('/', asyncHandler(arquivoController.create));

/**
 * @swagger
 * /arquivos:
 *   get:
 *     summary: Lista todos os arquivos
 *     responses:
 *       200:
 *         description: Lista de arquivos
 */
router.get('/', asyncHandler(arquivoController.list));

/**
 * @swagger
 * /arquivos/{id}:
 *   get:
 *     summary: Busca um arquivo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo encontrado
 */
router.get('/:id', asyncHandler(arquivoController.get));

/**
 * @swagger
 * /arquivos/{id}:
 *   put:
 *     summary: Atualiza um arquivo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo atualizado
 */
router.put('/:id', asyncHandler(arquivoController.update));

/**
 * @swagger
 * /arquivos/{id}:
 *   delete:
 *     summary: Remove um arquivo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Arquivo removido
 */
router.delete('/:id', asyncHandler(arquivoController.remove));

export default router;