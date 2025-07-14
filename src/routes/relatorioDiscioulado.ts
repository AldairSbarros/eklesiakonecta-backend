import { Router } from 'express';
import * as controller from '../controllers/relatoiroDiscipulado.controller';

const router = Router();

router.get('/por-discipulador', controller.relatorioDiscipulandosPorDiscipulador);
router.get('/sem-encontro', controller.relatorioDiscipulandosSemEncontro);

export default router;