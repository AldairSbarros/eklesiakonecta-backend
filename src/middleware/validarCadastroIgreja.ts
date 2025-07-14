import { body } from "express-validator";

export const validarCadastroIgreja = [
  body("nome")
    .trim()
    .notEmpty().withMessage("Nome é obrigatório.")
    .isLength({ min: 3 }).withMessage("Nome deve ter pelo menos 3 caracteres."),
  body("email")
    .trim()
    .notEmpty().withMessage("E-mail é obrigatório.")
    .isEmail().withMessage("E-mail inválido."),
  body("password")
    .optional()
    .isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres."),
    body("status")
    .optional()
    .isIn(["ativa", "inativa"])
    .withMessage("Status deve ser 'ativa' ou 'inativa'."),
];