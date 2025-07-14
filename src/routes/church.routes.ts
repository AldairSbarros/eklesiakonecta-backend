import { Router } from "express";
import churchController from "../controllers/church.controller";
import { autorizarRoles } from "../middleware/autorizarRoles";
import { autenticarJWT } from "../middleware/autenticarJWT";
import { validarCadastroIgreja } from "../middleware/validarCadastroIgreja";
import { handleValidation } from "../middleware/handleValidation";

const router = Router();

/**
 * @swagger
 * /church:
 *   post:
 *     summary: Cria uma nova igreja
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Igreja criada
 */
router.post(
  "/",
  autenticarJWT,
  autorizarRoles(["ADMIN"]),
  validarCadastroIgreja,
  handleValidation,
  churchController.create
);

/**
 * @swagger
 * /church/{id}:
 *   put:
 *     summary: Atualiza uma igreja
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Igreja atualizada
 */
router.put(
  "/:id",
  autenticarJWT,
  autorizarRoles(["ADMIN"]),
  churchController.update
);

/**
 * @swagger
 * /church/{id}:
 *   delete:
 *     summary: Remove uma igreja
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Igreja removida
 */
router.delete(
  "/:id",
  autenticarJWT,
  autorizarRoles(["ADMIN"]),
  churchController.remove
);

/**
 * @swagger
 * /church/{id}/localizacao:
 *   put:
 *     summary: Atualiza a localização da igreja
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Localização da igreja atualizada
 */
router.put(
  "/:id/localizacao",
  autenticarJWT,
  autorizarRoles(["ADMIN"]),
  churchController.atualizarLocalizacao
);

/**
 * @swagger
 * /church:
 *   get:
 *     summary: Lista todas as igrejas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de igrejas
 */
router.get("/", autenticarJWT, churchController.list);

/**
 * @swagger
 * /church/{id}:
 *   get:
 *     summary: Busca uma igreja por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Igreja encontrada
 */
router.get("/:id", autenticarJWT, churchController.get);
export default router;