import { body } from "express-validator";

export const validarCadastroUsuario = [
  body("nome")
    .notEmpty().withMessage("Nome é obrigatório."),
  body("email")
    .isEmail().withMessage("E-mail inválido."),
  body("senha")
    .isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres."),
  body("perfil")
    .isIn(["admin", "dirigente", "tesoureiro"])
    .withMessage("Perfil deve ser admin, dirigente ou tesoureiro."),
  // ...outras validações se necessário
];