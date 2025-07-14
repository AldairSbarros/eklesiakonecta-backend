import { Router, Request, Response, NextFunction } from 'express';
import { criarMensagem, listarMensagens, listarMensagensPDF, obterMensagem, atualizarMensagem, removerMensagem } from '../controllers/mensagemCelula.controller';

const router = Router();

// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', asyncHandler(criarMensagem));
router.get('/', asyncHandler(listarMensagens));
router.get('/pdfs', asyncHandler(listarMensagensPDF));

router.get('/:id', asyncHandler(obterMensagem));
router.put('/:id', asyncHandler(atualizarMensagem));
router.delete('/:id', asyncHandler(removerMensagem));

export default router;