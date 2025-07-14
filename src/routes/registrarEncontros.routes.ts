import { Router } from 'express';
import * as controller from '../controllers/registrarEncontros.controller';

const router = Router();

router.post('/', controller.registrarEncontro);
router.get('/', controller.listarEncontros);

export default router;