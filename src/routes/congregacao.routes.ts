import { Router } from 'express';
import * as congregacaoController from '../controllers/congregacao.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

router.post('/', congregacaoController.create);
router.get('/', congregacaoController.list);
router.put('/:id', congregacaoController.update);
router.delete('/:id', congregacaoController.remove);
router.put(
  '/:id/localizacao',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  (req, res, next) => {
	Promise.resolve(congregacaoController.atualizarLocalizacao(req, res)).catch(next);
  }
);

export default router;