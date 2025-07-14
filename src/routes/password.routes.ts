import { Router } from "express";
import * as passwordController from "../controllers/password.controller";

const router = Router();

import { Request, Response, NextFunction } from "express";

router.post(
  "/solicitar-recuperacao",
  passwordController.solicitarRecuperacao as (req: Request, res: Response, next: NextFunction) => any
);
router.post(
  "/redefinir-senha",
  passwordController.redefinirSenha as (req: Request, res: Response, next: NextFunction) => any
);

export default router;