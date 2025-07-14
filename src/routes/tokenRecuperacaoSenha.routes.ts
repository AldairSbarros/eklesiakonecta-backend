import { Router, RequestHandler } from 'express';
import * as tokenController from '../controllers/tokenRecuperacaoSenha.controller';

const router = Router();

router.post('/', tokenController.create as RequestHandler);
// router.get('/', tokenController.list);
// router.get('/:id', tokenController.get);
router.put('/:id', tokenController.update as RequestHandler);
router.delete('/:id', tokenController.remove as RequestHandler);

export default router;