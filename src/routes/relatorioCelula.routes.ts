import { Router } from 'express';
import * as relatorioController from '../controllers/relatorioCelula.controller';

const router = Router();

router.get('/:celulaId/completo', relatorioController.relatorioCompleto);
router.get('/:celulaId/presencas', relatorioController.relatorioPresenca);

export default router;