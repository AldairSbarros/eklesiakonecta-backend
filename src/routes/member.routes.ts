import { Router, Request, Response } from 'express';
import * as memberController from '../controllers/member.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

router.post('/', memberController.create);
router.get('/', memberController.list);
router.get('/:id', (req, res, next) => {
  memberController.get(req, res).catch(next);
});
router.put('/:id', memberController.update);
router.delete('/:id', memberController.remove);
router.put(
  '/:id/localizacao',
  autenticarJWT,
  autorizarRoles(['ADMIN', 'LIDER']),
  (req, res, next) => {
    memberController.atualizarLocalizacao(req, res).catch(next);
  }
);
export default router;