import { Router, RequestHandler } from 'express';
import { cadastroInicial } from '../controllers/cadastroInicial.controller';

const router = Router();

/**
 * @swagger
 * /api/cadastro-inicial:
 *   post:
 *     summary: Cadastro inicial de uma nova igreja
 *     description: Cria uma nova igreja com pastor administrador no sistema multi-tenant
 *     tags:
 *       - Cadastro Inicial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeIgreja
 *               - nomePastor
 *               - emailPastor
 *               - senhaPastor
 *             properties:
 *               nomeIgreja:
 *                 type: string
 *                 description: Nome da igreja
 *                 example: "Igreja Batista Central"
 *               nomePastor:
 *                 type: string
 *                 description: Nome completo do pastor
 *                 example: "João Silva"
 *               emailPastor:
 *                 type: string
 *                 format: email
 *                 description: E-mail do pastor para login
 *                 example: "pastor@igreja.com"
 *               senhaPastor:
 *                 type: string
 *                 description: Senha para login (mínimo 6 caracteres)
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Igreja cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cadastro inicial realizado com sucesso!"
 *                 igreja:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                       example: "Igreja Batista Central"
 *                     schema:
 *                       type: string
 *                       example: "igreja_1721234567890"
 *                 pastor:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "pastor@igreja.com"
 *       400:
 *         description: Dados obrigatórios não informados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Todos os campos são obrigatórios"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao realizar cadastro"
 */
router.post('/cadastro-inicial', (req, res, next) => {
  Promise.resolve(cadastroInicial(req, res)).catch(next);
});

export default router;