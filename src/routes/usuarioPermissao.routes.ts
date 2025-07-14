import { Router } from 'express';
import * as usuarioPermissaoController from '../controllers/usuarioPermissao.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';

const router = Router();

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
	Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post('/', autenticarJWT, asyncHandler(usuarioPermissaoController.create));
router.get('/', autenticarJWT, asyncHandler(usuarioPermissaoController.list));
router.put('/:id', autenticarJWT, asyncHandler(usuarioPermissaoController.update));
router.delete('/:id', autenticarJWT, asyncHandler(usuarioPermissaoController.remove));

export default router;