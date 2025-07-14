import { Router } from 'express';
import * as discipuladoController from '../controllers/discipulado.controller';

const router = Router();

router.get('/discipulandos/:id', discipuladoController.listarDiscipulandos); // lista discipulandos de um discipulador
router.get('/discipulandos', discipuladoController.listarTodosDiscipulandos); // lista todos
router.post('/discipulando', discipuladoController.criarDiscipulando); // cria
router.put('/discipulando/:id', discipuladoController.atualizarDiscipulando); // atualiza
router.delete('/discipulando/:id', discipuladoController.removerDiscipulando); // remove
router.put('/discipulador/:id', discipuladoController.trocarDiscipulador); // troca discipulador

export default router;