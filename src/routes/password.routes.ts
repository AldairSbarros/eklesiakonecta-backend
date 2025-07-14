import { Router } from "express";
import * as passwordController from "../controllers/password.controller";

const router = Router();

import { Request, Response, NextFunction } from "express";

/**
 * @swagger
 * /password/solicitar-recuperacao:
 *   post:
 *     summary: Solicita recuperação de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitação enviada com sucesso
 */
router.post(
  "/solicitar-recuperacao",
  passwordController.solicitarRecuperacao as (req: Request, res: Response, next: NextFunction) => any
);

/**
 * @swagger
 * /password/redefinir-senha:
 *   post:
 *     summary: Redefine a senha do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 */
router.post(
  "/redefinir-senha",
  passwordController.redefinirSenha as (req: Request, res: Response, next: NextFunction) => any
);

export default router;